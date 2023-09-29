const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DBUSER,
  port: process.env.DBPORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  insecureAuth: true,
});

var jsonParser = bodyParser.json();

app.get("/api", (_req, res) => {
  pool.query("show tables;", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post("/api", jsonParser, (req, res) => {
  pool.query(`SELECT * from ${req.body.table};`, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

module.exports = app;
