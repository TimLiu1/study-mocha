作为一个项目而言，单元测试应该是必备的一部分，也是最容易被大家忽略的一部分，这篇文章就介绍一下mocha这个测试框架的用法。

###### 一、环境搭建
首先先全局安装mocha

    npm i mocha -g
		
###### 二、 简单测试脚本书写

1、新建  calcu.js
```
//add
exports.add = (a,b) => {
	return a + b
}
```
2、新建测试脚本 calcu.test.js，一般命名规则测试脚本和原脚本同名，但是后缀名为.test.js
```
let calcu = require('./calcu');
let should = require("should");

describe("add func test",() => {
    it('2 add 2 should equal 4',() => {
      calcu.add(2,2).should.equal(4)
    })
})
```
这一段代码就是测试脚本，可以独立运行，使用命令
```
mocha demo1/mocha demo1/calcu.test.js
```
describe 表示测试套件，是一序列相关程序的测试

it表示单元测试(unit test)，也就是测试的最小单位。

###### 三、断言库简介

断言库可以理解为比较函数，也就是断言函数是否和预期一致，如果一致则表示测试通过，如果不一致表示测试黑失败，一个unit test里面可以包含多个断言语句。

本身mocha是不包含断言库的，所以必须引入第三方断言库，目前比较受欢迎的断言库  有 should.js、expect.js 、chai，具体的语法规则需要大家去查阅相关文档。

因为chai既包含should、expect和assert三种风格，可扩展性比较强。
下面简单的介绍一下这是那种风格

should
```
let num = 4+5
num.should.equal(9);
num.should.not.equal(10);

//boolean
'ok'.should.to.be.ok;
false.should.to.not.be.ok;

//type
'test'.should.to.be.a('string');
({ foo: 'bar' }).should.to.be.an('object');
```

expect
```
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
```
assert
```
let assert = require("chai").assert;


// equal or no equal
let num = 4+5
assert.equal(num,9);

//type
assert.typeOf('test', 'string', 'test is a string');
```

###### 四、mocha用法详解

平时长写的测试类型一共三种
- 常规函数测试
- 异步函数测试
- api测试

4.1、常规函数
***

测试就如我们上面写的第一个测试用例

4.2 异步函数测试
***
新建文件book.js
```
let fs = require('fs');

exports.read = (cb) => {
        fs.readFile('./book.txt', 'utf-8', (err, result) => {
            if (err) return cb(err);
            console.log("result",result);
            cb(null, result);
        }) 
}


```

新建文件book.test.js
```
let book = require('./book');
let expect = require("chai").expect;

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

```
运行mocha book.test.js,我们会发现成功了，但是如果我们把book.js增加一个定时函数，改为如下例子
```
let fs = require('fs');

exports.read = (cb) => {
    setTimeout(function() {
        fs.readFile('./book.txt', 'utf-8', (err, result) => {
            if (err) return cb(err);
            console.log("result",result);
            cb(null, result);
        }) 
    }, 3000);
}

```
会发现报如下错误

    Timeout of 2000ms exceeded.

这是因为mocha默认每个测试用例最多执行2000毫秒，如果到时没有得到结果，就报错。所以我们在进行异步操作的时候，需要额外指定timeout时间
    
	mocha --timeout 5000 book.test.js
这样就保证测试用例成功

4.3、api测试
***
api测试需要用到一个的是模块 supertest，安装这个模块。

    npm i supertest --save-dev
		
新建文件api.test.js
```
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

```

###### 五、命令行参数详解

5.1、--reporter :用来指定报告的格式
***
    mocha --reporter spec
默认报告格式spec,我个人比较喜欢的网页格式是
[mochawesome](http://adamgruber.github.io/mochawesome/),
需要手动安装 

    npm i mochawesome --save-dev
    ./node_modules/.bin/mocha ./demo*/*.test.js -t 5000 --reporter mochawesome
	 
-t 5000是因为我们测试用例中有一个异步执行过程，需要调高mocha的单元测试时间

5.2、--watch :参数用来监视指定的测试脚本。只要测试脚本有变化

5.3、--bail：参数指定只要有一个测试用例没有通过，就停止执行后面的测试用例

5.4、--grep：参数用来搜索单元测试用例的名称,然后运行符合搜索条件的测试用例,支持正则表达
***
    mocha --grep /2/   ./demo*/*.test.js
5.5、--invert：参数表示只运行不符合条件的测试脚本，必须与--grep参数配合使用。
5.6 --recursive
***
一般如果运行mocha，会执行当前目录下的test目录的一级层级的所有js文件，但是test下的更多层级却没办法运行，这时就需要参数--recursive，这时test子目录下面所有的测试用例----不管在哪一层----都会执行。

###### 六、配置文件mocha.opts的配置
***
每次我们运行测试用例的时候都需要写很长一段命令行，每次都一样，这样是不可取的，所以我们可以把这些配置维护到配置文件里面。

Mocha允许在test目录下面，放置配置文件mocha.opts，新建test文件夹，放置以下文件
api.test.js
```
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

```

运行

     mocha --reporter tap 

然后在test下建mocha.opts

	 // mocha.opts
	 ```
	 --reporter tap 
	 ```
	 
运行mocha，得到和上面一样的结果
	 

  

###### 七、mocha的生命钩子
***
mocha一共四个生命钩子
before()：在该区块的所有测试用例之前执行
after()：在该区块的所有测试用例之后执行
beforeEach()：在每个单元测试前执行
和afterEach()：在每个单元测试后执行

```
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
```

		








