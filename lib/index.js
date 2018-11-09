const psychedelic = require("psychedelic");
const play = require("./play");
const load = require("./load");
const Context = require("./context");

module.exports = main;

// Change terminal information color.
console.log = str => {
  process.stdout.write(psychedelic(psychedelic(str, 90), 104) + "\n");
};

function main(fictionPath) {
  let [fiction, fun] = load(fictionPath);

  let ctx = new Context({ path: fictionPath, recovered: false });

  play(fiction, fun, ctx);
}
