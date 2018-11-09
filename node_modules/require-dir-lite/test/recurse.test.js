let assert = require('assert');
let requireDir = require('..');

assert.deepEqual(requireDir('./recurse'), {
    a: 'a',
    b: {
        'b-1': {
            foo: 'foo',
            bar: 'bar',
        },
        'b-2': {}
    },
});

console.log('Recurse tests passed.');
