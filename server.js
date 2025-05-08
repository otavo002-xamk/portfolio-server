const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");

const NASA_API_TOKEN = process.env.NASA_API_TOKEN;

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST"],
  })
);

app.use((_req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf8mb4");
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

const jsonParser = bodyParser.json();

app.get("/_api", (_req, res) => {
  pool.query("show tables;", (error, results) => {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json; charset=utf8mb4");
    res.json(results);
  });
});

app.post("/_api", jsonParser, (req, res) => {
  pool.query(`SELECT * from ${req.body.table};`, (error, results) => {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json; charset=utf8mb4");
    res.json(results);
  });
});

app.post("/nasa_api", jsonParser, async (req, res) => {
  let fetchURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${req.body.sol}&camera=${req.body.camera}&api_key=${NASA_API_TOKEN}`;
  try {
    const response = await axios.get(fetchURL, { timeout: 10000 });
    res.setHeader("Content-Type", "application/json; charset=utf8mb4");
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error fetching data from NASA API" });
  }
});

module.exports = app;
