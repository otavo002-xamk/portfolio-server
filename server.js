const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DBUSER,
  port: process.env.DBPORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  insecureAuth: true,
});

var jsonParser = bodyParser.json();

app.get("/_api", (_req, res) => {
  pool.query("show tables;", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post("/_api", jsonParser, (req, res) => {
  pool.query(`SELECT * from ${req.body.table};`, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

module.exports = app;
