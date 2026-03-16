const express = require("express");

const executePython = require("../executor/executePython");
const executeCpp = require("../executor/executeCpp");
const executeJs = require("../executor/executeJs");

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { code, language } = req.body;

    let output;

    if (language === "python") {
      output = await executePython(code);
    }

    else if (language === "cpp") {
      output = await executeCpp(code);
    }

    else if (language === "javascript") {
      output = await executeJs(code);
    }

    else {
      return res.json({ output: "Unsupported language" });
    }

    res.json({ output });

  } catch (err) {

    console.log(err);

    res.json({
      output: "Runtime Error"
    });

  }

});

module.exports = router;