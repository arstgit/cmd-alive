let assert = require('assert');
let requireDir = require('..');

assert.deepEqual(requireDir('./basic'), {
    a: 'a',
    b: 'b',
});

console.log('Basic tests passed.');
