require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./routes/auth");
const runRoute = require("./routes/run");   // 👈 ADD
const submitRoute = require("./routes/submit"); // 👈 if already created
const submissionsRoute = require("./routes/submissions");
const leaderboardRoute = require("./routes/leaderboard");
const statsRoute = require("./routes/stats");



const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("JudgeNest backend running 🚀");
});

/* ROUTES */

app.use("/api/auth", authRoute);
app.use("/run", runRoute);        // 👈 ADD
app.use("/submit", submitRoute);  // 👈 optional
app.use("/submissions", submissionsRoute);
app.use("/leaderboard", leaderboardRoute);
app.use("stats", statsRoute);


/* DATABASE */

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));


/* SERVER */

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});