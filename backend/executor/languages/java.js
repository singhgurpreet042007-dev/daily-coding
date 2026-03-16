const { exec } = require("child_process");
const fs = require("fs");

async function runJava(code) {
  return new Promise((resolve, reject) => {
    fs.writeFileSync("Main.java", code);

    exec("javac Main.java && java Main", (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

module.exports = runJava;