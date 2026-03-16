const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([{ id: "addTwo", title: "Add Two Numbers" }]);
});

module.exports = router;