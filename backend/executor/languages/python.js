const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

function runPython(code, input = "") {
  return new Promise((resolve, reject) => {
    const tempDir = path.join(__dirname, "..", "..", "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const filePath = path.join(`tempDir, temp_${Date.now()}.py`);
    fs.writeFileSync(filePath, code, "utf8");

    const cmd = `python "${filePath}"`;

    const child = exec(cmd, (error, stdout, stderr) => {
      // cleanup
      try { fs.unlinkSync(filePath); } catch {}

      if (error) return reject(stderr || error.message);
      if (stderr) return reject(stderr);
      resolve(stdout);
    });

    // input pass
    if (input) {
      child.stdin.write(input);
    }
    child.stdin.end();
  });
}

module.exports = runPython;