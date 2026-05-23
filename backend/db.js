const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "kodama.proxy.rlwy.net",
  user: "root",
  password: "KpIQOiLnVpCSnDSZbstGyRBfIpDWOsYM",
  database: "railway",
  port: 3306
});

connection.connect(err => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
});

module.exports = connection;