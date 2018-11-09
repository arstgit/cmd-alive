const assert = require("assert");
let color = require("..");

let str = "foo";
let expected = "\x1b[31mfoo\x1b[0m";

assert.equal(color(str, "red"), expected);
console.log(color("Passed!", "green"));
