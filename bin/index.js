#!/usr/bin/env node

let join = require("path").join;
let fs = require("fs");

let fictionPath = process.argv[2];
if (!fictionPath) {
  fictionPath = join(__dirname, "../example", "/shelter");
}

require("../lib")(fictionPath);
