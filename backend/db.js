const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "kodama.proxy.rlwy.net",
  user: "root",
  password: "KpIQOiLnVpCSnDSZbstGyRBfIpDWOsYM",
  database: "railway",
  port: 26625,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 30000
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
  connection.release();
});

module.exports = pool;