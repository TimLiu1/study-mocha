let calcu = require('./calcu');
let should = require("should");

describe("add func test",() => {
    it('2 add 2 should equal 4',() => {
      calcu.add(2,2).should.equal(4)
    })
})
