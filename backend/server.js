require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("JudgeNest backend running 🚀");
});

const PORT = process.env.PORT || 4000;

// 🔥 Start server safely
async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      console.log("❌ MONGO_URI missing");
    } else {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected ✅");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.log("❌ Error:", err.message);

    // even if Mongo fails, server should still run
    app.listen(PORT, () => {
      console.log(`Server running without DB on port ${PORT}`);
    });
  }
}

startServer();