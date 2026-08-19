const { hello } = require("./index.js");

const result = hello("world");
if (!result.includes("world")) {
  console.error("FAIL: hello() did not return expected string");
  process.exit(1);
}
console.log("PASS: basic test ok");
