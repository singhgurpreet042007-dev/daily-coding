const express = require("express");
const Submission = require("../models/Submission");

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const submissions = await Submission
      .find()
      .sort({ createdAt: -1 });

    res.json(submissions);

  } catch (err) {

    console.log(err);
    res.json([]);

  }

});

module.exports = router;