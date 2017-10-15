describe('hooks', function () {
    let i = 1
    let j = 1
    let m = 1
    let n = 1
    before(function () {
        console.log("the " + i++ + " start")
    });

    after(function () {
        console.log("the " + j++ + " end")
    });

    beforeEach(function () {
        console.log("the " + m++ + " start")
    });

    afterEach(function () {
        console.log("the " + n++ + " start")
    });

    it('one', function (done) {
        done()
    })
    it('two', function (done) {
        done()
    })
});