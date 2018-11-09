const fs = require("fs");
const path = require("path");
let join = path.join;

module.exports = load;

function load(fictionPath) {
  let files = fs.readdirSync(fictionPath);

  let funs = files.filter(file => path.extname(file) === ".js");
  let fictions = files.filter(file => path.extname(file) === ".ca");

  let funsPath = funs.map(fun => join(fictionPath, fun));
  let fictionsPath = fictions.map(fiction => join(fictionPath, fiction));

  let funStr = funsPath.reduce((r, funPath) => {
    r += fs.readFileSync(funPath, "utf8");
    return r;
  }, "");

  let fictionStr = fictionsPath.reduce((r, fictionPath) => {
    r += fs.readFileSync(fictionPath, "utf8");
    return r;
  }, "");

  return [fictionStr, funStr];
}
