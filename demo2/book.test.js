let book = require('./book');
let expect = require("chai").expect;

describe("async", () => {
  it('read book async', function (done) {
    book.read((err, result) => {
      expect(err).equal(null);
      expect(result).to.be.a('string');
      done();
    })
  })
})



