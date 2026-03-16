const express = require("express");
const fs = require("fs");
const path = require("path");

const executePython = require("../executor/executePython");
const executeCpp = require("../executor/executeCpp");
const executeJs = require("../executor/executeJs");

const Submission = require("../models/Submission"); // ⭐ new

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { code, problemId, language, userId } = req.body;

    const testcasePath = path.join(
      __dirname,
      "..",
      "testcases",
      `${problemId}.json`
    );

    const testcase = JSON.parse(
      fs.readFileSync(testcasePath, "utf8")
    );

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
      return res.json({ verdict: "Unsupported Language" });
    }

    const actual = String(output).trim();
    const expected = String(testcase.expected).trim();

    const verdict = actual === expected ? "Accepted" : "Wrong Answer";

await Submission.create({

  userId: userId || "guest",
  problemId,
  language,
  code,
  verdict

});

    return res.json({
      verdict,
      output
    });

  } catch (err) {

    console.log(err);

    
    await Submission.create({

      userId: req.body.userId || "guest",
      problemId: req.body.problemId,
      language: req.body.language,
      code: req.body.code,
      verdict: "Runtime Error"

    });

    return res.json({
      verdict: "Runtime Error"
    });

  }

});

module.exports = router;