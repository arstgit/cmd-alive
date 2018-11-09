const assert = require("assert");
let Context = require("../lib/context");

let ctx = new Context();

ctx.input("p1");
ctx.down("1");

ctx.input("p2");
ctx.down("2");

let arr = ctx.toArray();
assert(arr.length === 3);

let recovered = new Context().recoverHelper(arr);
assert(recovered.getPos() === "2");
assert(recovered.getInput() === undefined);

recovered.up(2);
assert(recovered.getInput() === "p1");

console.log("context passed!");
