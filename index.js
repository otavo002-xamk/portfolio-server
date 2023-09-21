require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const app = express();
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DBUSER,
  port: process.env.DBPORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  insecureAuth: true,
});

app.use(express.json());

app.get("/api", (req, res) => {
  if (!req.body.table) {
    pool.query("show tables;", (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  } else {
    pool.query(`SELECT * from ${req.body.table};`, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
