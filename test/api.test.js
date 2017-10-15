let expect = require("chai").expect;
let request = require('supertest');

describe("api", () => {
  it('get baidu information', function (done) {
    request('https://www.baidu.com')
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(function (err, res) {
        expect(res).to.be.an('object');
        done();
      });
  })
})



