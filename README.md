# cmd-alive

[![Build Status](https://travis-ci.org/derekchuank/cmd-alive.svg?branch=master)](https://travis-ci.org/derekchuank/cmd-alive)
[![npm version](https://badge.fury.io/js/cmd-alive.svg)](http://badge.fury.io/js/cmd-alive)

## For Reader

Install.

```
npm install -g cmd-alive
```

There is a demo in the package, you can try it.

```
alive
```
Sure, if you want to read other ficitions.

```
alive [path to fiction directory]
```

### Command

While reading you can type these commands.

* `help` - Show help information.
* `save` - Save your progress. Besides, `Ctrl-C` can also trigger it automatically. Progerss file is in your fiction directory with name `.cache`.
* `restart` - Deleted your saved profile, and start over.
* `print` - Print your track, used for debug.

## For Writer

Demo file is in `/example/shelter`. Every fiction contain two types of files.

`.ca` - Files extension with `.ca` is fiction script.Every fiction contain servel sections, each begain with a label name having the form `$...:`. Section must ending with choices would be selectd by reader. Two special label is indispensable: `start` and `end`.

`js` - Files extension with `.js` is control flow script. Every function name must be a label identity, so too return value. These is a global object `ctx` you can access in this file freely.

## Example

`.ca`:

```
$start: 
A nice day.

choices:

a. go to 2a.
b. go to A LOOP.


$2a: 
Then?
No choice.

$loop: 
You can't excape.

$end: 
Think you.
```

`.js`

```
function $start() {
  if (ctx.cur === "b") {
    return $loop;
  }
  if (ctx.cur == "a") {
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
```
