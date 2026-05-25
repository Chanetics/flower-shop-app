require("dotenv").config();
const express = require("express");
const db = require("./db");
const { sendDeliveredEmail } = require("./utils/mailer");

const app = express();
const PORT = process.env.PORT || 4000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "JM Flower Shop API is running" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid login" });
    const user = results[0];
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  db.query("SELECT id FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length > 0) return res.status(400).json({ message: "Email already registered" });
    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'customer')",
      [name, email, password],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Server error" });
        res.json({ id: result.insertId, name, email, role: "customer" });
      }
    );
  });
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results);
  });
});

app.post("/products", (req, res) => {
  const { name, price, stock, category, occasion, emoji, description } = req.body;
  db.query(
    "INSERT INTO products (name, price, stock, category, occasion, emoji, description) VALUES (?,?,?,?,?,?,?)",
    [name, price, stock, category, occasion, emoji, description],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Server error" });
      res.json({ id: result.insertId, name, price, stock, category, occasion, emoji, description });
    }
  );
});

app.put("/products/:id", (req, res) => {
  const { name, price, stock, category, occasion, emoji, description } = req.body;
  db.query(
    "UPDATE products SET name=?, price=?, stock=?, category=?, occasion=?, emoji=?, description=? WHERE id=?",
    [name, price, stock, category, occasion, emoji, description, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Server error" });
      res.json({ message: "Product updated" });
    }
  );
});

app.delete("/products/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "Product deleted" });
  });
});

app.post("/orders", (req, res) => {
  const { id, userId, userName, userEmail, items, subtotal, deliveryFee, total, deliveryType, deliveryDate, deliveryTime, deliveryAddr, giftNote } = req.body;
  if (!id || !userId || !items) return res.status(400).json({ message: "Missing required order fields" });
  const values = [id, userId, userName || "", userEmail || "", JSON.stringify(items), subtotal || 0, deliveryFee || 0, total || 0, deliveryType || "delivery", deliveryDate || "", deliveryTime || "", deliveryAddr || "", giftNote || ""];
  db.query(
    `INSERT INTO orders (id, user_id, user_name, user_email, items, subtotal, delivery_fee, total, delivery_type, delivery_date, delivery_time, delivery_address, gift_note, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,'Pending')`,
    values,
    (err) => {
      if (err) return res.status(500).json({ message: "Failed to save order", error: err.message });
      res.json({ message: "Order placed successfully", orderId: id });
    }
  );
});

app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results.map(o => ({ ...o, items: JSON.parse(o.items || "[]") })));
  });
});

app.get("/orders/user/:userId", (req, res) => {
  db.query("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC", [req.params.userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results.map(o => ({ ...o, items: JSON.parse(o.items || "[]") })));
  });
});

app.put("/orders/:id/status", (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;

  console.log("🔔 Status update received:", orderId, "→", status);

  db.query("UPDATE orders SET status = ? WHERE id = ?", [status, orderId], (err) => {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    console.log("✅ DB updated successfully");

    if (status === "Delivered") {
      console.log("📧 Attempting to send email...");
      db.query("SELECT user_name, user_email, total FROM orders WHERE id = ?", [orderId], (err, results) => {
        if (err) {
          console.error("❌ Query error:", err);
          return;
        }
        console.log("📋 Order data:", results);
        if (results.length > 0) {
          const { user_name, user_email, total } = results[0];
          console.log("📨 Sending email to:", user_email);
          sendDeliveredEmail(user_email, user_name, orderId, total)
            .then((info) => console.log("✅ Email sent!", info.messageId))
            .catch((e) => console.error("❌ Email error:", e));
        }
      });
    }

    res.json({ message: "Status updated" });
  });
});

app.get("/users", (req, res) => {
  db.query("SELECT id, name, email, role FROM users", (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results);
  });
});

// ── TICKETS ────────────────────────────────────────────────────────────────

// Create tickets table if it doesn't exist yet
db.query(`
  CREATE TABLE IF NOT EXISTS tickets (
    id VARCHAR(50) PRIMARY KEY,
    user_id INT,
    user_name VARCHAR(100),
    user_email VARCHAR(100),
    subject VARCHAR(200),
    message TEXT,
    status VARCHAR(50) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) console.error("❌ Failed to create tickets table:", err.message);
  else console.log("✅ Tickets table ready");
});

// GET all tickets — admin dashboard
app.get("/tickets", (req, res) => {
  db.query("SELECT * FROM tickets ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results);
  });
});

// POST new ticket — customer submits
app.post("/tickets", (req, res) => {
  const { id, userId, userName, userEmail, subject, message, status } = req.body;
  if (!id || !message) return res.status(400).json({ message: "Missing required fields" });
  db.query(
    "INSERT INTO tickets (id, user_id, user_name, user_email, subject, message, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, userId || null, userName || "Guest", userEmail || "", subject || "", message, status || "Open"],
    (err) => {
      if (err) {
        console.error("❌ Ticket insert error:", err.message);
        return res.status(500).json({ message: "Failed to save ticket", error: err.message });
      }
      console.log("✅ Ticket saved:", id);
      res.json({ success: true, id });
    }
  );
});

// PUT update ticket status — admin updates
app.put("/tickets/:id/status", (req, res) => {
  const { status } = req.body;
  db.query("UPDATE tickets SET status = ? WHERE id = ?", [status, req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "Ticket status updated" });
  });
});

// ── END TICKETS ────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
