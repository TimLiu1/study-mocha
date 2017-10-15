let should = require("chai").should();


// equal or no equal
let num = 4+5
num.should.equal(9);
num.should.not.equal(10);

//boolean
'ok'.should.to.be.ok;
false.should.to.not.be.ok;

//type
'test'.should.to.be.a('string');
({ foo: 'bar' }).should.to.be.an('object');