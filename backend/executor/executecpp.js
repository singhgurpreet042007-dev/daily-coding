const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const executeCpp = (code) => {

  return new Promise((resolve, reject) => {

    const jobId = Date.now();

    const filePath = path.join(__dirname, "..", "temp", `${jobId}.cpp`);
    const outputPath = path.join(__dirname, "..", "temp", `${jobId}.out`);

    fs.writeFileSync(filePath, code);

    const compileCommand = `g++ ${filePath} -o ${outputPath}`;

    exec(compileCommand, (compileErr) => {

      if (compileErr) {
        return reject("Compilation Error");
      }

      exec(outputPath, (runErr, stdout, stderr) => {

        if (runErr) {
          return reject("Runtime Error");
        }

        if (stderr) {
          return reject(stderr);
        }

        resolve(stdout);

      });

    });

  });

};

module.exports = executeCpp;