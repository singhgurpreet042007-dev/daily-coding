const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const executePython = (code) => {

  return new Promise((resolve, reject) => {

    const jobId = Date.now();

    const filePath = path.join(__dirname, "..", "temp", `${jobId}.py`);

    fs.writeFileSync(filePath, code);

    exec(`python ${filePath}`, (error, stdout, stderr) => {

      if (error) {
        return reject("Runtime Error");
      }

      if (stderr) {
        return reject(stderr);
      }

      resolve(stdout);

    });

  });

};

module.exports = executePython;