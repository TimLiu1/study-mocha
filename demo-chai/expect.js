let expect = require("chai").expect;


// equal or no equal
let num = 4+5
expect(num).equal(9);
expect(num).not.equal(10);

//boolean
expect('ok').to.be.ok;
expect(false).to.not.be.ok;

//type
expect('test').to.be.a('string');
expect({ foo: 'bar' }).to.be.an('object');