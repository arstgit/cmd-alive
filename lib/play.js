const io = require("./io");

const maxLabel = 10;

module.exports = play;

function play(fiction, fun, ctx) {
  let fictionVar = processFiction(fiction);

  eval(fictionVar + fun);

  let startPoint;
  if (ctx.getPos() === ctx.ROOT) {
    startPoint = "$start";
  } else {
    startPoint = ctx.getPos();
  }
  looop(startPoint);
  function looop(funName) {
    let contentName = "$" + funName;
    let content = eval("$" + funName);
    content += "\n";

    io(content, cb);

    function cb(e, userInput) {
      let pass = processInput(ctx, userInput);
      if (pass) {
        return io("\n", cb);
      }

      ctx.input(userInput);

      let fun = eval(funName);
      let nextFun = fun(ctx);
      if (!nextFun) {
        console.log("Reached the END!");
        console.log("cmd-alive is ending...");
        process.exit(0);
      }

      let nextFunName = nextFun.name;
      ctx.down(nextFunName);
      looop(nextFunName);
    }
  }
}

function processFiction(fiction) {
  let str = fiction;

  let i = 0;
  let j = 0;
  let k = 0;
  let output = "";
  while (true) {
    i = str.indexOf("$");
    j = str.indexOf(":", i);

    if (i === -1 || j === -1) {
      break;
    }
    if (j - i > maxLabel) {
      break;
    }

    let k = str.indexOf("$", j);

    if (k === -1) {
      k = str.length;
    }

    let labelName = str.substring(i, j);

    let content = str.substring(j + 1, k);
    content = content.trim();
    output += `var $${labelName} = \`${content}\`;`;

    str = str.substring(k);
  }
  return output;
}

function processInput(ctx, str) {
  if (str === "restart") {
    ctx.restart();
    return;
  } else if (str === "print") {
    console.dir(ctx);
    console.dir(ctx.toArray());
    return true;
  } else if (str === "save") {
    ctx.save();
    console.dir("Saved!");
    return true;
  } else if (str === "help") {
    console.log(`
command:
  restart:     delete your saved progress, and start over.
  print:       print your track. Used for debug.`);
    return true;
  }
  return false;
}
