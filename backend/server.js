require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("JudgeNest backend running 🚀");
});

// routes (agar hain to use kar)
try {
  app.use("/run", require("./routes/run"));
  app.use("/submit", require("./routes/submit"));
  app.use("/problems", require("./routes/problems"));
  app.use("/api/auth", require("./routes/auth"));
} catch (e) {
  console.log("Routes load error:", e.message);
}

// PORT FIX
const PORT = process.env.PORT || 4000;

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB error:", err.message);
  });