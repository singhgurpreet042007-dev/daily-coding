const express = require("express");
const Submission = require("../models/Submission");

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const data = await Submission.aggregate([

      {
        $match: {
          verdict: "Accepted",
          userId: { $ne: "guest" } // guest remove
        }
      },

      {
        $group: {
          _id: "$userId",
          solved: { $sum: 1 }
        }
      },

      { $sort: { solved: -1 } }

    ]);

    res.json(data);

  } catch (err) {

    console.log(err);
    res.json([]);

  }

});

module.exports = router;