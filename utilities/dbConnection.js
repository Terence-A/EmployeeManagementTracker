const mysql = require("mysql2");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employeeTracker_db",
  },
  console.log("Connected to employeeTracker_db database")
);

module.exports = db;
