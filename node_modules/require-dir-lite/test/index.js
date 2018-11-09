let obj = require('..')('.');

console.log('\nAll %d passed!', Object.keys(obj).filter(str => str.endsWith('.test')).length);
