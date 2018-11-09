ctx.level = 5;
function $start() {
  if (ctx.cur === "b" || ctx.level !== 5) {
    ctx.level--;
    if (ctx.level === 0) {
      return $2a;
    }
    return $loop;
  }
  if (ctx.cur == "a") {
    ctx.level = 9;
    return $2a;
  }
  return $start;
}

function $2a() {
  return $end;
}

function $loop() {
  return $start;
}
function $end() {
  // dumb
}
