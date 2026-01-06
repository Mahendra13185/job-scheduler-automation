require("./db/database");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend running successfully"
  });
});

module.exports = app;
