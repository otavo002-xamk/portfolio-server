const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST"],
  })
);

app.use((_req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

const secretPath = process.env.PASSWORD_FILE || "/run/secrets/password";
const dbPassword = fs.existsSync(secretPath)
  ? fs.readFileSync(secretPath, "utf8").trim()
  : process.env.PASSWORD;

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DBUSER,
  port: process.env.DBPORT,
  password: dbPassword,
  database: process.env.DATABASE,
  insecureAuth: true,
  charset: "utf8mb4",
});

var jsonParser = bodyParser.json();

app.get("/_api", (_req, res) => {
  pool.query("show tables;", (error, results) => {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.json(results);
  });
});

app.post("/_api", jsonParser, (req, res) => {
  pool.query(`SELECT * from ${req.body.table};`, (error, results) => {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.json(results);
  });
});

module.exports = app;
