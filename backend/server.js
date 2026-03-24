require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION:", err);
});

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server working 🚀");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});