require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const app = express();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DBUSER,
  port: process.env.DBPORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  insecureAuth: true,
});

app.get("/api", (req, res) => {
  connection.connect();

  connection.query("show tables;", function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
