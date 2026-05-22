const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid login" });
    const user = results[0];
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  });
});

// REGISTER
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

// GET ALL PRODUCTS
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results);
  });
});

// ADD PRODUCT
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

// UPDATE PRODUCT
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

// DELETE PRODUCT
app.delete("/products/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "Product deleted" });
  });
});

// PLACE ORDER — fixed with full logging
app.post("/orders", (req, res) => {
  console.log("📦 ORDER RECEIVED:", JSON.stringify(req.body, null, 2));

  const {
    id, userId, userName, userEmail,
    items, subtotal, deliveryFee, total,
    deliveryType, deliveryDate, deliveryTime,
    deliveryAddr, giftNote
  } = req.body;

  // Validate required fields
  if (!id || !userId || !items) {
    console.error("❌ Missing required order fields");
    return res.status(400).json({ message: "Missing required order fields" });
  }

  const itemsJson = JSON.stringify(items);

  const values = [
    id,
    userId,
    userName || "",
    userEmail || "",
    itemsJson,
    subtotal || 0,
    deliveryFee || 0,
    total || 0,
    deliveryType || "delivery",
    deliveryDate || "",
    deliveryTime || "",
    deliveryAddr || "",
    giftNote || ""
  ];

  console.log("📝 INSERT VALUES:", values);

  db.query(
    `INSERT INTO orders 
      (id, user_id, user_name, user_email, items, subtotal, delivery_fee, total,
       delivery_type, delivery_date, delivery_time, delivery_address, gift_note, status)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,'Pending')`,
    values,
    (err) => {
      if (err) {
        console.error("❌ ORDER INSERT ERROR:", err.message);
        console.error("SQL State:", err.sqlState);
        console.error("SQL Message:", err.sqlMessage);
        return res.status(500).json({ message: "Failed to save order", error: err.message });
      }
      console.log("✅ Order saved successfully:", id);
      res.json({ message: "Order placed successfully", orderId: id });
    }
  );
});

// GET ALL ORDERS (admin)
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    const orders = results.map(o => ({ ...o, items: JSON.parse(o.items || "[]") }));
    res.json(orders);
  });
});

// GET ORDERS BY USER
app.get("/orders/user/:userId", (req, res) => {
  db.query(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [req.params.userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });
      const orders = results.map(o => ({ ...o, items: JSON.parse(o.items || "[]") }));
      res.json(orders);
    }
  );
});

// UPDATE ORDER STATUS
app.put("/orders/:id/status", (req, res) => {
  db.query("UPDATE orders SET status = ? WHERE id = ?", [req.body.status, req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "Status updated" });
  });
});

// GET ALL USERS
app.get("/users", (req, res) => {
  db.query("SELECT id, name, email, role FROM users", (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});