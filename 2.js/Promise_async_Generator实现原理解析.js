// promise
(() => {
  //Promise/A+规范的三种状态
  const PENDING = 'pending';
  const FULFILLED = 'fulfilled';
  const REJECTED = 'rejected';
  class MyPromise {
    constructor(exector) {
      this._status = PENDING;
      this._value = undefined;    // 储存then回调return的值
      this._resolveQueue = [];
      this._rejectQueue = [];
      const _resolve = (val) => {
        if (this._status !== PENDING) return;
        this._status = FULFILLED;
        while (this._resolveQueue.length) {
          const callback = this._resolveQueue.shift();
          callback(val);
        }
      };
      const _reject = (val) => {
        if (this._status !== PENDING) return;
        this._status = REJECTED;

        while (this._rejectQueue.length) {
          const callback = this._rejectQueue.shift();
          callback(val);
        }
      };

      try {
        exector(_resolve, _reject);
      } catch (e) {
        _reject(e);
      }
    }

    then (resolveFn, rejectFn) {
      // 根据规范，如果then的参数不是function，则我们需要忽略它, 让链式调用继续往下执行
      typeof resolveFn !== 'function' ? resolveFn = value => value : null;
      typeof rejectFn !== 'function' ? rejectFn = error => error : null;

      return new Promise((resolve, reject) => {
        // 把resolveFn重新包装一下,再push进resolve执行队列,这是为了能够获取回调的返回值进行分类讨论
        const fulfilledFn = value => {
          try {
            // 执行第一个(当前的)Promise的成功回调,并获取返回值
            let x = resolveFn(value);
            // 分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
            x instanceof Promise ? x.then(resolve, reject) : resolve(x);
          } catch (error) {
            reject(error);
          }
        };

        // reject同理
        const rejectedFn = error => {
          try {
            let x = rejectFn(error);
            x instanceof Promise ? x.then(resolve, reject) : resolve(x);
          } catch (error) {
            reject(error);
          }
        };

        switch (this._status) {
          // 当状态为pending时,把then回调push进resolve/reject执行队列,等待执行
          case PENDING:
            this._resolveQueue.push(fulfilledFn);
            this._rejectQueue.push(rejectedFn);
            break;
          // 当状态已经变为resolve/reject时,直接执行then回调
          case FULFILLED:
            fulfilledFn(this._value);    // this._value是上一个then回调return的值(见完整版代码)
            break;
          case REJECTED:
            rejectedFn(this._value);
            break;
        }
      });
    }
    catch (rejectFn) {
      return this.then(undefined, rejectFn);
    }
    finally (callback) {
      return this.then(
        value => MyPromise.resolve(callback).then((() => value)),
        reason => MyPromise.resolve(callback).then(() => { throw reason; })
      );
    }

    static resolve (value) {
      if (value instanceof MyPromise) return value; // 根据规范, 如果参数是Promise实例, 直接return这个实例
      return new MyPromise(resolve => resolve(value));
    }
    static reject (reason) {
      return new MyPromise((resolve, reject) => reject(reason));
    }
    static all (promiseArr) {
      let index = 0;
      let result = [];
      return new MyPromise((resolve, reject) => {
        promiseArr.forEach((p, i) => {
          //Promise.resolve(p)用于处理传入值不为Promise的情况
          MyPromise.resolve(p).then(
            val => {
              index++;
              result[i] = val;
              //所有then执行后, resolve结果
              if (index === promiseArr.length) {
                resolve(result);
              }
            },
            err => {
              //有一个Promise被reject时，MyPromise的状态变为reject
              reject(err);
            }
          );
        });
      });
    }
    static race (promiseArr) {
      return new MyPromise((resolve, reject) => {
        //同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
        for (let p of promiseArr) {
          Promise.resolve(p).then(  //Promise.resolve(p)用于处理传入值不为Promise的情况
            value => {
              resolve(value);        //注意这个resolve是上边new MyPromise的
            },
            err => {
              reject(err);
            }
          );
        }
      });
    }
  }
});

// async/await
(() => {
  // generator + 自动执行器;

  function* myGenerator () {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
  }

  // 手动执行器
  var gen = myGenerator();
  gen.next().value.then((val) => {
    console.log(val);
    gen.next().value.then((val) => {
      console.log(val);
      gen.next().value.then((val) => {
        console.log(val);
      });
    });
  });

  async function myGenerator1 () {
    const a = await Promise.resolve(1);
    const b = await Promise.resolve(2);
    const c = await Promise.resolve(3);
  }
  // 发现的点
  // 1. await 之后的返回值，跟后面的await没有任何关系
  // 2. 后面的 await 要等前面的 await 执行完，才会执行
  // 3. await 返回的都是 Promise
  // 4. async 返回的也是 Promise

  // babel
  function _asyncToGenerator (fn) {
    return function () {
      var self = this;
      var args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next (value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
        }
        function _throw (err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
        }
        _next(undefined);
      });
    };

  }
  function asyncGeneratorStep (gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (err) {
      reject(err);
      return;
    }
    if (info.done) {
      resolve(value); // 这里是最后
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  const foo = _asyncToGenerator(function* () {
    try {
      console.log(yield Promise.resolve(1));   //1
      console.log(yield 2);                    //2
      return '3';
    } catch (error) {
      console.log(error);
    }
  });
  foo().then(res => {
    console.log(res);
  });
});

// 没看懂，是不是因为generator没看懂
// Generator
(() => {
  // function* foo() {
  //   yield 'result1'
  //   yield 'result2'
  //   yield 'result3'
  // }

  // const gen = foo()
  // console.log(gen.next().value)
  // console.log(gen.next().value)
  // console.log(gen.next().value)

  var _marked = regeneratorRuntime.mark(foo);
  function foo () {
    return regeneratorRuntime.wrap(function foo$ (_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return 'result1';
          case 2:
            _context.text = 4;
            return 'result2';
          case 4:
            _context.text = 6;
            return 'result3';
          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked);
  }
  // 两个不认识的东西 regeneratorRuntime.mark 和 regeneratorRuntime.wrap 
  // regenerator-runtime 模块的东西，完整代码在runtime.js。这个runtime有700多行，因此不能全讲，只讲重要的
  // regeneratorRuntime.mark();
  // 第一行被调用，我们先看一下runtime里mark()方法的定义;

  // 为生成器函数绑定了一系列原型
  runtime.mark = function (genFun) {
    genFun.__proto__ = GeneratorFunctionPrototype;
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  function wrap (innerFn, outerFn, self) {
    var generator = Object.create(outerFn.prototype);
    var context = new Context([]);
    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  // innerFn => foo$
  // outerFn.prototype => genFun.prototype
  // Context => 全局对象,用于储存各种状态和上下文
  // makeInvokeMethod => return 一个 invoke方法,
  var ContinueSentienel = {};

  var context = {
    done: false,
    method: 'next',
    next: 0,
    prev: 0,
    abrupt: function (type, arg) {
      var record = {};
      record.type = type;
      record.arg = arg;

      return this.complete(record);
    },
    complete: function (record, afterLoc) {
      if (record.type === 'return') {
        this.rval = this.arg = record.arg;
        this.method = 'return';
        this.next = 'end';
      }
      return ContinueSentienel;
    },
    stop: function () {
      this.done = true;
      return this.rval;
    }
  };

  function makeInvokeMethod (innerFn, context) {
    // 将状态置为start
    var state = 'start';
    return function invoke (method, arg) {
      if (state === 'completed') {
        return { value: undefined, done: true };
      }
      context.method = method;
      context.arg = arg;

      while (true) {
        state = 'executing';
        var record = {
          type: 'normal',
          arg: innerFn.call(self, context)
        };

        if (record.type === 'normal') {
          state = context.done ? 'completed' : 'yield';
        }

        if (record.arg === ContinueSentienel) {
          continue;
        }

        return {
          value: record.arg,
          done: context.done
        };
      }
    };
  }

});

(() => {
  // 实现一个简单的Generator

  // 生成器函数根据yield语句将代码分割为switch-case块,后续通过切换_context.prev和_context.next来分别执行各个case
  function gen$ (_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'result1';
        case 2:
          _context.next = 4;
          return 'result2';
        case 4:
          _context.next = 6;
          return 'result3';
        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }
  // 低配版context
  var context = {
    next: 0,
    prev: 0,
    done: false,
    stop: function stop () {
      this.done = true;
    }
  };
  // 低配版invoke
  let gen = function () {
    return {
      next: function () {
        value = context.done ? undefined : gen$(context);
        done = context.done;
        return {
          value,
          done
        };
      }
    };
  };
  // 测试使用
  var g = gen();
  g.next();  // {value: "result1", done: false}
  g.next();  // {value: "result2", done: false}
  g.next();  // {value: "result3", done: false}
  g.next();  // {value: undefined, done: true}

});

(() => {
  // function* foo() {
  //   yield 'result1'
  //   yield 'result2'
  //   yield 'result3'
  // }

  // const gen = foo()
  // console.log(gen.next().value)
  // console.log(gen.next().value)
  // console.log(gen.next().value)

  function gen$ (_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'result1';
        case 2:
          _context.next = 4;
          return 'result2';
        case 4:
          _context.next = 6;
          return 'result3';
        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }
  var context = {
    prev: 0,
    next: 0,
    done: false,
    stop: function () {
      this.done = true;
    }
  };
  function gen () {
    return {
      next: function () {
        var value = context.done ? undefined : gen$(context);
        var done = context.done;
        return {
          done,
          value
        };
      }
    };
  }

  var g = gen();
  g.next(); // {done:false,value:'result1'}
  g.next(); // {done:false,value:'result2'}
  g.next(); // {done:false,value:'result3'}
  g.next(); // {done:true,value:undefined}
});

// async
(() => {
  // function* foo() {
  //   yield 'result1'
  //   yield 'result2'
  //   yield 'result3'
  // }

  // const gen = foo()
  // console.log(gen.next().value)
  // console.log(gen.next().value)
  // console.log(gen.next().value)

  function gen$ (_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'result1';
        case 2:
          _context.next = 4;
          return 'result2';
        case 4:
          _context.next = 6;
          return 'result3';
        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }
  var context = {
    prev: 0,
    next: 0,
    done: false,
    stop () {
      this.done = true;
    }
  };

  function gen () {
    return {
      next () {
        var value = context.done ? undefined : gen$(context);
        var done = context.done;
        return {
          done,
          value
        };
      }
    };
  }

  var g = gen();
  g.next(); // {done:false,value:'result1'}
  g.next(); // {done:false,value:'result2'}
  g.next(); // {done:false,value:'result3'}
  g.next(); // {done:true,value:undefined}

  //////////////////////////////////////

  // async function gen1 () {
  //   await Promise.resolve('result1');
  //   await Promise.resolve('result2');
  //   await Promise.resolve('result3');
  // }



  function gen1$ (_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Promise.resolve('result1');
        case 2:
          _context.next = 4;
          return Promise.resolve('result2');
        case 4:
          _context.next = 6;
          return Promise.resolve('result3');
        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }
  var context = {
    prev: 0,
    next: 0,
    done: false,
    stop () {
      this.done = true;
    }
  };
  function gen1 () {
    return {
      next () {
        var done = context.done;
        var value = done ? undefined : gen1$(context);
        return {
          done,
          value
        };
      },
      throw (e) {

      }
    };
  }
  // function run (gen) {
  //   // 如果是我做的话,加个标识符,then之后再执行
  //   var g = gen();
  // }

  function run (gen) {
    return new Promise((resolve, reject) => {
      var g = gen();

      function step (val) {
        try {
          var res = g.next(val);
        } catch (err) {
          return reject(err);
        }
        if (res.done) {
          return resolve(res.value);
        }

        Promise.resolve(res.value).then(
          val => step(val),
          err => g.throw(err)
        );
      }

      step();
    });
  }



  function run (gen) {
    return new Promise((resolve, reject) => {
      var g = gen();

      function step (val) {
        try {
          var res = g.next(val);
        } catch (e) {
          reject(e);
        }
        if (res.done) {
          return resolve(res.value);
        }
        Promise.resolve(res.value).then(
          val => step(val),
          err => g.throw(err)
        );
      }

      step();
    });
  }
});

// 重写一下 generator async
(() => {
  // async function gen() {
  //   await 'result1';
  //   await 'result2';
  //   await 'result3';
  // }

  function gen$ (_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'result1';
        case 2:
          _context.next = 4;
          return 'result2';
        case 4:
          _context.next = 6;
          return 'result3';
        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }
  var context = {
    prev: 0,
    next: 0,
    done: false,
    stop () {
      this.done = true;
    }
  };
  function gen () {
    return {
      next (val) {
        const done = context.done;
        const value = done ? undefined : gen$(context);
        return {
          done,
          value
        };
      },
      throw () { }
    };
  }

  function run (gen) {
    return new Promise((resolve, reject) => {
      var g = gen();

      function step (val) {
        try {
          var res = g.next(val);
        } catch (e) {
          reject(e);
          return;
        }
        if (res.done) return resolve(res.value);

        Promise.resolve(res.value).then(
          val => step(val),
          err => g.throw(err)
        );
      }

      step();
    });
  }

  run(gen);
});