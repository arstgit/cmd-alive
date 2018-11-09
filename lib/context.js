const fs = require("fs");
const join = require("path").join;

module.exports = Context;

const ROOT = Symbol("root");

function Context(opt = {}) {
  if (!(this instanceof Context)) {
    return new Context();
  }
  this.path = opt.path;

  this.S = Object.create({ position: ROOT });
  this.S.position = "$start";
  //this.S.userInput = undefined;
  this.recovered = opt.recovered !== false;

  // Try to recover user's prograss from .cache file
  if (!this.recovered) {
    this.recover();
  }

  if (process.env.NODE_ENV !== "test") {
    const rl = require("./io").rl;
    let me = this;
    function handle() {
      me.save();
      console.log("Your progress is saved!");
      rl.on("SIGINT", handle);
      process.exit(0);
    }

    rl.on("SIGINT", handle);
  }
}

Context.prototype.ROOT = ROOT;
Context.prototype.setPos = function(pos) {
  this.S.position = pos;
  return this;
};
Context.prototype.setInput = function(input) {
  this.S.userInput = input;
  return this;
};

Context.prototype.getPos = function() {
  if (!Object.prototype.hasOwnProperty.call(this.S, "position")) {
    return undefined;
  }
  return this.S.position;
};

Object.defineProperty(Context.prototype, "cur", {
  get() {
    return this.getInput();
  }
});

Context.prototype.getInput = function() {
  if (!Object.prototype.hasOwnProperty.call(this.S, "userInput")) {
    return undefined;
  }
  return this.S.userInput;
};

Context.prototype.save = function() {
  if (!this.path) return;
  let str = JSON.stringify(this.toArray());
  console.dir(str);
  let fileName = join(this.path, "/.cache");
  fs.writeFileSync(fileName, str);
};

// ATTENTION: return a new ctx.
Context.prototype.down = function(name) {
  this.S = Object.create(this.S);
  this.setPos(name);
  return this;
};

Context.prototype.input = function(input) {
  this.setInput(input);
  return this;
};

Context.prototype.getUpS = function(n = 1, s = this.S) {
  if (s.position === ROOT || n < 1) return s;
  s = Object.getPrototypeOf(s);
  return this.getUpS.call(this, --n, s);
};

Context.prototype.up = function(n = 1) {
  if (this.getPos() === ROOT || n < 1) return this;
  this.S = Object.getPrototypeOf(this.S);
  return this.up.call(this, --n);
};

Context.prototype.toArray = function() {
  let arr = [];

  let cur = this.S;
  while (cur.position !== ROOT) {
    arr.unshift(cur);
    cur = Object.getPrototypeOf(cur);
  }
  return arr;
};

Context.prototype.reset = function() {
  Context.call(this, { path: this.path });
  return this;
};

Context.prototype.restart = function() {
  path = join(this.path, "/.cache");
  let str;
  try {
    str = fs.unlinkSync(path);
    console.log("Cached profile file deleted.");
  } catch (e) {
    console.log("No cached profile");
  } finally {
    console.log("CLOSING. Please restart...");
    process.exit(0);
  }
};

Context.prototype.recover = function() {
  path = join(this.path, "/.cache");
  let str;
  try {
    str = fs.readFileSync(path, "utf8");
  } catch (e) {
    console.log("starting new profile!");
    return;
  }
  console.log("Starting from saved point...");

  let arr = JSON.parse(str);
  return this.recoverHelper(arr);
};

Context.prototype.recoverHelper = function(arr) {
  Context.call(this, { path: this.path });

  let i = 0;
  while (i < arr.length - 1) {
    this.input(arr[i].userInput);
    i++;
    this.down(arr[i].position);
  }

  return this;
};
