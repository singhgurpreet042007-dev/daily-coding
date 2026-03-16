const { exec } = require("child_process");
const fs = require("fs");

async function runCpp(code) {
  return new Promise((resolve, reject) => {
    fs.writeFileSync("temp.cpp", code);

    exec("g++ temp.cpp -o temp && temp", (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

module.exports = runCpp;