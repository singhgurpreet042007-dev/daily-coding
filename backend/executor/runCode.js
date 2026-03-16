const runPython = require("./languages/python");
// later: const runCpp = require("./languages/cpp");
// later: const runJava = require("./languages/java");

async function runCode(language, code, input = "") {
  if (language === "python") {
    return await runPython(code, input);
  }

  throw new Error("Language not supported yet");
}

module.exports = runCode;