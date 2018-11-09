const readline = require("readline");
const psychedelic = require("psychedelic");

const interval = 300;
const maxLine = 14;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = startIO;

startIO.rl = rl;

function startIO(q, cb) {
  printQ(q, cb);
}
function printQ(q, cb) {
  let i = 0;
  let cnt = 0;
  while ((i = q.indexOf("\n", ++i)) != -1) {
    cnt++;
    if (cnt === maxLine) {
      let str = q.substring(0, ++i);
      rl.question(str, userInput => {
        q = q.substring(i);
        printQ(q, cb);
      });
      return;
    }
  }

  rl.question(q, userInput => {
    userInput = userInput.trim();
    if (!userInput) {
      let invalidStr = "Please select, try again:";
      invalidStr = psychedelic(psychedelic(invalidStr, 93), 30);
      invalidStr += "\n";
      return printQ(invalidStr, cb);
    }

    writeN(5, cb.bind(null, null, userInput));
  });
}

let colorMap = {
  0: 47,
  1: 42,
  2: 43,
  3: 44,
  4: 45,
  5: 47
};

function writeN(num, done) {
  writeDot();
  function writeDot(next = writeDot) {
    if (num-- === 0) {
      return done();
    }

    setTimeout(() => {
      let str = psychedelic(".", colorMap[num]);
      process.stdout.write(str);
      next();
    }, interval);
  }
}
