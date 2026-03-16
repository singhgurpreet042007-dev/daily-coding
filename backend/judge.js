const runCode = require("./executor/runCode");

function normalize(out) {
  return (out ?? "").toString().replace(/\r\n/g, "\n").trimEnd();
}

async function judgeSolution({ language, code, problem }) {
  const timeLimitMs = problem.timeLimitMs ?? 2000;
  const testcases = problem.testcases ?? [];

  for (let i = 0; i < testcases.length; i++) {
    const tc = testcases[i];

    try {
      const runPromise = runCode(language, code, tc.input || "");

      // basic TLE
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("TLE")), timeLimitMs)
      );

      const actualRaw = await Promise.race([runPromise, timeoutPromise]);

      const actual = normalize(actualRaw);
      const expected = normalize(tc.output);

      if (actual !== expected) {
        return {
          verdict: "Wrong Answer",
          failedTest: i + 1,
          expected,
          actual,
        };
      }
    } catch (err) {
      const msg = err?.toString() || "Runtime Error";
      if (msg.includes("TLE")) return { verdict: "Time Limit Exceeded", failedTest: i + 1 };
      return { verdict: "Runtime Error", failedTest: i + 1, error: msg };
    }
  }

  return { verdict: "Accepted" };
}

module.exports = { judgeSolution };