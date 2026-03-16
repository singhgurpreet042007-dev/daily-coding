const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const executeJs = (code) => {

  return new Promise((resolve, reject) => {

    const jobId = Date.now();

    const filePath = path.join(__dirname, "..", "temp", `${jobId}.js`);

    fs.writeFileSync(filePath, code);

    exec(`node ${filePath}`, (err, stdout, stderr) => {

      if (err) {
        return reject("Runtime Error");
      }

      if (stderr) {
        return reject(stderr);
      }

      resolve(stdout);

    });

  });

};

module.exports = executeJs;