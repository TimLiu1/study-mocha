'use strict';
const fs = require('fs');
const fsu = require('./index.js');

let stream = fsu.createWriteStreamUnique('test{_stream###}.txt');

fsu.writeFileUnique('test/test{_file###}.txt', 'test', { force: true }, (err, path) => {
  if (err) {
  } else {
    fs.createReadStream('readme.md').pipe(stream);
  }
});
