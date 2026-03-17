const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// USER SCHEMA
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  college: { type: String, default: "" },
  intro: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" }
});

const User = mongoose.model("User", UserSchema);


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.json({ success: false, message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        college: user.college,
        intro: user.intro,
        linkedin: user.linkedin,
        github: user.github
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        college: user.college,
        intro: user.intro,
        linkedin: user.linkedin,
        github: user.github
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ================= UPDATE PROFILE =================
router.post("/update-profile", async (req, res) => {
  try {
    const { email, name, college, intro, linkedin, github } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.name = name;
    user.college = college;
    user.intro = intro;
    user.linkedin = linkedin;
    user.github = github;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        college: user.college,
        intro: user.intro,
        linkedin: user.linkedin,
        github: user.github
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;