// 01 数组扁平化
(() => {
  // 数组扁平化是指将一个多维数组变为一个一维数组
  // 例子
  const arr = [1, [2, [3, [4, 5]]], 6];
  // => [1, 2, 3, 4, 5, 6]

  // 一：利用flat
  const res1 = arr.flat(Infinity);
  // 二：利用正则
  const res2 = JSON.parse("[" + JSON.stringify(arr).replace(/[\[\]]/g, '') + "]");
  // 三：利用reduce
  const flatten = arr => {
    return arr.reduce(
      (pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
      },
      []
    );
  };
  const res3 = flatten(arr);
  // 四：函数递归
  const res4 = [];
  const recursive = arr => {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        fn(arr[i]);
      } else {
        res4.push(arr[i]);
      }
    }
  };
  recursive(res4);
});

// 02 数组去重
(() => {
  const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
  // => [1, '1', 17, true, false, 'true', 'a', {}, {}]

  // 一：Set
  const res1 = Array.from(new Set(arr)) || [...new Set(arr)];
  // 二：indexOf includes filter find
  const unique = arr => {
    const res = [];
    arr.forEach(i => {
      !res.includes(i) && res.push(i);
    });
    return res;
  };
  const res2 = unique(arr);
});

// 03 类数组转换成数组
(() => {
  var div = document.querySelectorAll('div');

  // 一. Array.from
  const res1 = Array.from(div);
  // 二. slice
  const res2 = Array.prototype.call(div);
  // 三. ...
  const res3 = [...div];
  // 四. concat
  const res4 = [].concat(div);
});

// 04 Array.prototype.filter()
(() => {
  // var newArray = arr.filter(callback(element, index, array), thisArg)
  // callback
  // thisArg
  // 抄写
  // O.length >>> 0 // 无符号右移
  // >> 有符号右移 右移所丢失的数，会插入到左边
  // >>> 无符号右移 右移丢失数，左边插入0
  // O.length >>> 0 // 保证为正数，且是有效数组范围内，让循环能够进行下去
  Array.prototype.filter = function (callback, thisArg) {
    if (this == undefined) {
      throw new TypeError('this is null or not undefined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + 'is not a function');
    }
    const res = [];
    // 让O成为回调函数的对象传递（强制转换对象）
    const O = Object(this);
    // >>> O 保证len 为number,且为正整数
    const len = O.length >>> 0;
    for (let i = 0; i < len; i++) {
      // 检查 i 是否在 O 的属性（会检查原型链）
      if (i in O) {
        // 回调函数调用传参
        if (callback.call(thisArg, O[i], i, O)) {
          res.push(O[i]);
        }
      }
    }

    return res;
  };

  var newArray = arr.filter((element, index, array) => { }, thisArg);

  Array.prototype.filter = function (callback, thisArg) {
    if (this == null) throw new Error();
    if (typeof callback !== 'function') throw new Error();

    var res = [];
    var O = Object(this);
    var len = O.length >>> 0;
    for (var i = 0; i < len; i++) {
      if (i in O) {
        if (callback(thisArg, O[i], i, O)) {
          res.push(O[i]);
        }
      }
    }
    return res;
  };
});

// 复习 new class extends super
(() => {
  // new
  // class
  // extends
  // super

  // new 
  // 1.创建空对象
  // 2.设置空对象的proto为构造函数的原型对象
  // 3.在空对象的上下文中执行构造函数
  // 4.如果执行结果为function 或 object,则返回，否则返回空对象
  function _new (...args) {
    const fn = args.shift();
    const context = Object.create(fn.prototype);
    const result = Object.prototype.apply(context, args);
    return typeof result === 'object' || typeof result === 'function' ? result : context;
  }
  // class
  // 1. 检查构造函数执行
  // 2. 生成class
  function _checkClassCall (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError();
    }
  }
  function _createClass () {
    function defineProperties (target, descriptors) {
      for (var i = 0; i < descriptors.length; i++) {
        var descriptor = descriptors[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) {
          descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, instanceProps, protoProps, staticProps, privateProps) {

      if (instanceProps)
        defineProperties(this, instanceProps);
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      if (privateProps)
        defineProperties(this, privateProps);
    };
  }
  var Person = (function () {
    function Person (name, age) {
      _checkClassCall(this, Person);
      _createClass.call(Person, [{ key: 'name', value: name, enumerable: true }, [], [], []]);
    }
    return Person;
  })();

  // extends
  // 1. 继承
  // 2. 生成Constructor
  // 3. 生成this
  function _inherits (subClass, superClass) {
    if (typeof subClass !== 'function') throw Error();
    if (typeof superClass !== 'function' && superClass != null) throw Error();

    // subClass.prototype 绑定
    // subClass 绑定
    subClass.prototype = Object.create(superClass.prototype, {
      constructor: {
        enumerable: false,
        value: subClass
      }
    });
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function _possibleConstructorReturn (self, call) {
    if (!self) throw new Error();

    return call && typeof call === 'object' || typeof call === 'function' ? call : self;
  }

  var Child = (function (_Parent) {
    _inherits(Child, _Parent);
    function Child (name, age) {
      _checkClassCall(this, Child);
      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Child).call(this, name, age));

      _createClass(Child, [{ key: 'name', value: name }]);
      return _this;
    }
    return Child;
  })(_Parent);


  // super
  // 为函数时，上面
  // 为对象时
  //      普通方法：取值，Parent.prototype.x 赋值，this.x = 'x'
  //      静态方法: 父类
});

// 05 Array.protoype.map()
(() => {
  // var newArray = arr.map((element, index, array) => {
  // }, thisArg)

  Array.prototype.myMap = function (callback, thisArg) {
    if (this == null) throw new Error();
    if (typeof callback !== 'function') throw new Error();

    var res = [];
    var O = Object(this);
    var len = O.length >>> 0;
    for (var i = 0; i < len; i++) {
      if (i in O) {
        res[i] = callback.call(thisArg, O[i], i, O);
      }
    }
    return res;
  };

  var arr = [1, 2, 3, 4, 5];
  console.log(arr.myMap(((i) => i * 2)));

});

// 06 forEach
(() => {
  // arr.forEach((element, index, array) => {}, thisArg)
  Array.prototype.myEach = function (callback, thisArg) {
    if (this == null) throw new TypeError('this is null or not defined');
    if (typeof callback !== 'function') throw TypeError('this is no a function');

    var O = Object(this);
    var len = O.length >>> 0;
    var k = 0;
    while (k < len) {
      if (k in O) {
        callback(thisArg, O[k], k, O);
      }
      k++;
    }
  };
});

// 07 reduce
(() => {
  // var result = arr.reduce((accumulator, element, index, array) => { }, initialValue)
  // accumulator 累加器，积聚者
  // 如果initial参数没值，会找到第一个初始值，返回


  // Array.prototype.reduce = function (callback, initialValue) {
  //   if (this == null) throw new TypeError('this is null or not defined')
  //   if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

  //   var O = Object(this)
  //   var len = O.length >>> 0
  //   var accumulator = initialValue
  //   var k = 0
  //   if (initialValue === undefined) {
  //     // 找第一个值
  //     while (k < len && !(k in O)) {
  //       k++
  //     }
  //     if (k >= len) {
  //       throw new TypeError('Reduce of empty array with not initial value')
  //     }
  //     accumulator = O[k++]
  //   }
  //   while (k < len) {
  //     if (k in O) {
  //       accumulator = callback.call(undefined, O[i], i, O)
  //     }
  //     k++
  //   }

  //   return accumulator
  // }


  Array.prototype.reduce = function (callback, initialValue) {
    if (this == null) { throw new TypeError('this is null or not defined'); }
    if (typeof callback !== 'function') throw new TypeError(callback + '  is not a function');
    var O = Object(this);
    var len = O.length >>> 0;
    var accumulator = initialValue;
    var k = 0;
    if (initialValue === undefined) {
      while (k < len && !(k in O)) {
        k++;
      }
      if (k >= len) { throw new TypeError('Reduce of empty array with no initial value'); }
      accumulator = O[k++];
    }
    while (k < len) {
      if (k in O) {
        accumulator = callback.call(undefined, O[k], k, O);
      }
      k++;
    }
    return accumulator;
  };

  Array.prototype.reduce = function (callback, initialValue) {
    var O = Object(this);
    var len = O.length >>> 0;
    var accumulator = initialValue;
    var k = 0;
    if (initialValue === undefined) {
      // 找第一个有效值当initialValue
      while (k < len && !(k in O)) {
        k++;
      }
      if (k >= len) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      accumulator = O[k++];
    }

    while (k < len) {
      if (k in O) {
        accumulator = callback(undefined, accumulator, O[k], k, O);
      }
      k++;
    }

    return accumulator;
  };
});


// map for res[i] = callback
// filter for if (callback) res.push()
// forEach while k; k++;
// reduce accumulator while if(initvalue undefined) accmulator = 第一个有效的值，k++ while k; k++;


// 08 Function.prototype.apply
(() => {
  // fn.apply(thisArg, argsArr)
  // Math.max.apply(null, [1,2,3,4])
  Math.max.apply(null, [1, 2, 3, 5]);

  Function.prototype.myApply = function (context = window, args) {
    if (typeof this !== 'function') {
      throw new TypeError('this is no a function');
    }
    // 利用对象的隐式this
    var fn = Symbol('fn');
    context[fn] = this;
    var result = context[fn](...args);
    delete context[fn];
    return result;
  };
});

// 09 call
(() => {
  Function.prototype.myCall = function (context = window, ...args) {
    if (typeof this !== 'function') {
      throw new TypeError('this is no a  function');
    }
    var fn = Symbol('fn');
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
  };
});

// 10 bind
(() => {
  // bind 有个问题，核心是apply的闭包，
  // 要考虑new的问题
  //   Function.prototype.bind = function (oThis) {
  //     if (typeof this !== 'function') {
  //       throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
  //     }

  //     var aArgs = Array.prototype.slice(arguments, 1)
  //     var fTobind = this
  //     var fNOP = function () { }
  //     var fBound = function () {

  //       return fTobind.apply(this instanceof fNOP ? this : oThis,
  //         aArgs.concat(Array.prototype.slice.call(arguments)))
  //     }

  //     if (this.prototype) {
  //       fNOP.prototype = this.prototype
  //     }
  //     fBound.prototype = new fNOP() // 防篡改，等同于Object.create()

  //     return fBound
  //   }
  Function.prototype.myBind = function (context, ...preArgs) {
    // 1.写个闭包
    // 2.用apply
    // 3.注意new
    // 4.防prototype被篡改（原生的bind，第一层是没有prototype的）
    var fn = this;

    var resFn = function (...args) {
      // 注意new
      return fn.apply(this instanceof resFn ? this : context, preArgs.concat(args));
    };
    resFn.prototype = Object.create(fn.prototype);

    return resFn;
  };
});

// 11 debounce  防抖 
(() => {
  // 在最后一次事件触发之后的一段时间再执行一次函数
  var debounce = function (fn, delay) {
    var timer = null;
    return function (...args) {
      clearTimeout(timer);
      const context = this;
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  };
});

// 12 throttle 节流
(() => {
  // 在规定事件内，执行一次函数
  var throttle = function (fn, delay) {
    var timer = null;
    return function (...args) {
      if (timer)
        return;
      const context = this;
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  };
});

// 13 函数柯里化
(() => {
  // 一个接收多个参数的函数变成多个一个参数的函数
  // 将参数一个个都接收了，达到函数所需参数的长度之后，再执行
  // 大多数情况下，用在前面的参数都一样，然后只用传一个不一样的参数的情况下
  // 延时执行 的 效果
  // 将add函数柯里化
  // 正常函数
  function sum (a, b, c, d, e) {
    console.log(a + b + c + d + e);
  }

  function curry (fn, args) {
    const argsLength = fn.length; // 所需参数长度
    args = args || [];
    return function () {
      const newArgs = args.concat(Array.prototype.slice(arguments));
      if (newArgs.length < argsLength) {
        return curry.call(this, fn, newArgs);
      } else {
        return fn.apply(this, newArgs);
      }
    };
  }
});

// 14 new
(() => {
  // 1.创建一个对象
  // 2.将构造函数的原型对象挂载对象的原型链上
  // 3.在对象的环境下执行构造函数
  // 4.执行结果如果是 对象或者更函数，则返回执行结果，否则返回上面的对象

  function myNew (fn, ...args) {
    if (typeof fn !== 'function') { throw new TypeError(); }
    const context = Object.create(fn.prototype);
    const result = fn.apply(context, args);
    return result && (typeof result === 'object' || typeof result === 'function') ? result : context;
  }
});

// 15 instanceof
(() => {
  function myInstanceof (Instance, Constructor) {
    if (typeof left !== 'function' || left === null) return false;
    let proto = Instance.prototype;

    while (true) {
      if (proto === null) return false;
      if (proto === Constructor.prototype) return true;
      proto = Object.getPrototypeOf(proto);
    }
  }
});

// 16 继承 _inherits
(() => {
  function _inherits (subClass, superClass) {
    if (typeof subClass !== 'function') throw new TypeError(); G;
    if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError(); }
    subClass.prototype = Object.create(superClass.prototype, {
      constructor: {
        enumerable: false,
        value: subClass
      }
    });
    Object.setPrototypeOf(subClass, superClass);
  }
});

// 17 Object.is
(() => {
  // +0 === -0 // true 希望返回false
  // NaN === NaN // false 希望返回true

  // +0 === -0 true
  // NaN === NaN false
  function is (left, right) {
    if (left === right) {
      return left !== 0 || right !== 0 || 1 / left === 1 / right;
    } else {
      return left !== left && right !== right;
    }
  }
});

// 18 Object.assign
(() => {
  Object.defineProperty(Obejct, 'assign', {
    enumable: false,
    value: function (target, ...args) {
      if (target == null) throw new TypeError('null 和 undefined');
      const to = Object(target);
      args.forEach(source => {
        if (source !== null) {
          for (let key in source) {
            if (source.hasOwnProperty(key)) {
              to[key] = source[key];
            }
          }
        }
      });

      return to;
    }
  });
});

// enumberable false   Object.assign, for..in , Object.keys(), JSON.stringify
// 对象遍历 for...in Object.keys getOwnPropertyNames getOwnPropertySymbols Reflect.ownKeys


// 19 深拷贝
(() => {
  function deepClone (source, sourceMap) {
    // 1.判断类型
    // 2. 递归
    // 3. array or object
    // 4. symbol 和 names Object.getOwnPropertyDescriptor()
    if (typeof source !== 'object' && source == null) {
      return source;
    }

    sourceMap = sourceMap || new WeakMap();

    if (sourceMap.has(source)) { return sourceMap.get(source); }

    const target = Array.isArray(source) ? [] : {};
    sourceMap.set(source, target);
    const AllKeys = Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source));
    for (let key in AllKeys) {
      Object.defineProperty(target, key, Object.assign({}, Object.getOwnPropertyDescriptor(source[key], {
        value: deepClone(source)
      })));
    }

    return source;
  }
});

// 20 Promise
(() => {
  // new Promise((resolve, reject) => {
  //   // ...
  //   // 成功则执行resolve，否则指定reject
  // }).then(
  //   res => {
  //     console.log('resolve')
  //     // resolve对应触发函数的执行
  //   },
  //   err => {
  //     console.log('reject')
  //     // reject对应触发函数的执行
  //   }
  // ).catch(
  //   // 如果then用第二个参数，这里不会执行
  //   err => console.log(err, 'error')
  // )

  // Promise.resolve()
  // Promise.reject()
  // Promise.all([promise1, promise2, ...]).then()
  // Promise.race([promise1, promise2, ...]).then()

  // 大致结构
  // 1. Promise接收一个函数参数 exector， exector接收两个函数 resolve, reject，并且立即执行，通过resolve/reject改变状态
  // 2.状态改变之后，触发原型链上的then,catch
  // 3.有all,race,resolve, reject的静态方法
  () => {
    class MyPromise {
      constructor(exector) {
        const resolve = () => { };
        const reject = () => { };
        exector(resolve, reject);
      }
      then () { }
      catch () { }

      static all () { }
      static race () { }
      static resolve () { }
      static reject () { }
    }
  };
  // 初版
  // 1.引入三种状态 
  // 2.完善resolve， reject 函数
  // 3.exctor执行可能会报错，报错用reject接收；
  // 4.then接收两个函数，正确执行，错误执行, 注意then，catch是微任务，这里使用setTimeout 模拟
  (() => {
    const PENDING = 'PENDING';
    const FULFILLED = 'FULFILLED';
    const REJECTED = 'REJECTED';

    class MyPromise {
      constructor(exector) {
        // 初始化状态
        this.status = PENDING;

        // 将成功、失败结果放在this上，便于then、catch访问
        this.value = undefined;
        this.reason = undefined;

        const resolve = value => {
          // 执行这个，就改变status状态，并且将value赋值
          if (this.status === PENDING) {
            this.status = FULFILLED;
            this.value = value;
          }
        };
        const reject = (reason) => {
          // 执行这个，就改变status状态，并且将value赋值
          if (this.status === PENDING) {
            this.status = REJECTED;
            this.reason = reason;
          }
        };
        try {
          exector(resolve, reject);
        } catch (e) {
          // 执行错误，则用reject抛出
          reject(e);
        }
      }

      then (onFulfilled, onRejected) {
        setTimeout(() => {
          if (this.status === FULFILLED) {
            onFulfilled(this.value);
          } else if (this.status === REJECTED) {
            onRejected(this.reason);
          }
        });
      }
    }

    const promise = new MyPromise((resolve, reject) => {
      Math.random() < 0.5 ? resolve(1) : reject(-1);
    }).then(
      res => console.log(res),
      err => console.log(err),
    );
  });
  // 初版的问题
  // 1. Promise内部异步代码执行的问题
  // 2. Promise的链式调用
  // 3. 值传透

  // 解决内部异步代码执行
  (() => {
    const PENDING = 'PENDING';
    const FULFILLED = 'FULFILLED';
    const REJECTED = 'REJECTED';

    class MyPromise {
      constructor(exector) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];
        const resolve = value => {
          if (this.status === PENDING) {
            this.value = value;
            this.status = FULFILLED;
            this.onFulfilledCallback.forEach(fn => fn(this.value));
          }
        };
        const reject = reason => {
          if (this.status === PENDING) {
            this.reason = reason;
            this.status = REJECTED;
            this.onRejectedCallback.forEach(fn => fn(this.reason));
          }
        };

        try {
          exector(resolve, reject);
        } catch (e) {
          reject(e);
        }
      }

      then (onFulfilled, onRejected) {
        if (this.status === PENDING) {
          // 如果是pending，将成功和失败方法丢给resolve和reject自己去执行
          this.onFulfilledCallback.push(onFulfilled);
          this.onRejectedCallback.push(onRejected);
        } else if (this.status === FULFILLED) {
          onFulfilled(this.value);
        } else if (this.status === REJECTED) {
          onRejected(this.reason);
        }
      }
      catch () { }


      //... static
    }
  });

  // 实现链式调用
  // 1.then实际返回了一个Promise
  // 2.保存之前的promise实例的引用，即保存this
  // 3.根据 then 回调函数执行的返回值
  (() => {
    const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = "REJECTED";

    class MyPromise {
      constructor(exector) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];
        const resolve = (value) => { if (this.status === PENDING) { this.value = value; this.status = FULFILLED; this.onFulfilledCallback.forEach(fn => fn(this.value)); } };
        const reject = (reason) => {
          if (this.status === PENDING) { this.reason = reason; this.status = REJECTED; this.onRejectedCallback.forEach(fn => fn(this.reason)); }
        };
        try {
          exector(resolve, reject);
        } catch (e) {
          reject(e);
        }
      }

      then (onFulfilled, onRejected) {
        const self = this; // 实例
        return new Promise((resolve, reject) => {

          if (self.status === PENDING) {
            // pending 状态， 丢给resolve 和 reject自己处理
            // this.onFulfilledCallback.push(onFulfilled)
            // this.onRejectedCallback.push(onRejected)
            self.onFulfilledCallback.push(() => {
              try {
                setTimeout(() => {
                  const result = onFulfilled(self.value);
                  result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                });
              } catch (e) {
                reject(e);
              }
            });
            self.onRejectedCallback.push(() => {
              try {
                setTimeout(() => {
                  const result = onRejected(self.value);
                  result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                });
              } catch (e) {
                reject(e);
              }
            });

          } else if (self.status === FULFILLED) {
            // onFulfilled(this.value)
            // 模拟微任务
            try {
              setTimeout(() => {
                const result = onFulfilled(self.value);
                result instanceof Promise ? result.then(resolve, reject) : resolve(result);
              });
            } catch (e) {
              reject(e);
            }
          } else if (self.status === REJECTED) {
            // onRejected(this.reason)
            try {
              setTimeout(() => {
                // 如果是onRejected 接收，那 就不会 抛出错误，resolve
                const result = onRejected(self.value);
                result instanceof Promise ? result.then(resolve, reject) : resolve(result);
              });
            } catch (e) {
              reject(e);
            }
          }

        });

      }
    }
  });

  // 值穿透
  // 1.如果then里面传的不是函数的话，这个then是无效的
  (() => {
    const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = "REJECTED";

    class MyPromise {
      constructor(exector) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = value => {
          if (this.status === PENDING) {
            this.value = value;
            this.status = FULFILLED;

            this.onFulfilledCallbacks.forEach(fn => fn(value));
          }
        };
        const reject = reason => {
          if (this.status === PENDING) {
            this.reason = reason;
            this.status = FULFILLED;

            this.onRejectedCallbacks.forEach(fn => fn(reason));
          }
        };

        try {
          exector(resolve, reject);
        } catch (e) {
          reject(e);
        }
      }
      then (onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
          throw new Error(reason instanceof Error ? reason.message : reason);
        };

        const self = this;

        return new Promise((resolve, reject) => {

          if (self.status === PENDING) {
            self.onFulfilledCallbacks.push(() => {
              try {
                setTimeout(() => {
                  const result = onFulfilled(self.value);
                  result instanceof Promise ? result.then(resolve, reject) : resolve(self.value);
                });
              } catch (e) { reject(e); }
            });
            self.onRejectedCallbacks.push(() => {
              try {
                setTimeout(() => {
                  const result = onRejected(self.value);
                  result instanceof Promise ? result.then(resolve, reject) : resolve(self.value);
                });
              } catch (e) { reject(e); }
            });
          }
          else if (self.status === FULFILLED) {
            try {
              setTimeout(() => {
                const result = onFulfilled(self.value);
                result instanceof Promise ? result.then(resolve, reject) : resolve(self.value);
              });
            } catch (e) { reject(e); }
          }
          else if (self.status === REJECTED) {
            try {
              setTimeout(() => {
                const result = onRejected(self.value);
                result instanceof Promise ? result.then(resolve, reject) : resolve(self.value);
              });
            } catch (e) { reject(e); }
          }
        });

      }
      catch (onRejected) {
        return this.then(null, onRejected);
      }
    }
  });

  // catch
  (() => {
    function catch1 (onRejected) {
      return this.then(null, onRejected);
    }
  });
  // Promise.resolve
  // 1.不考虑参数是thenable对象了（带有then方法的对象）
  // 2.Promise实例
  // 3.不是Promise实例
  (() => {
    class MyPromise {
      static resolve (value) {
        if (value instanceof Promise) {
          return value;
        } else {
          return new Promise((resolve, reject) => resolve(value));
        }
      }
    }
  });

  // Promise.reject
  (() => {
    class MyPromise {
      static reject (onRejected) {
        return new Promise((resolve, reject) => reject(value));
      }
    }
  });

  // Promise.all
  (() => {
    class MyPromise {
      static all (promiseArr) {
        const len = promiseArr.length;
        const values = new Array(len);
        // 记录已经成功执行的promise个数
        let count = 0;
        return new Promise((resolve, reject) => {
          for (let i = 0; i < len; i++) {
            Promise.resolve(promiseArr[i]).then(val => {
              values[i] = val;
              count++;
              if (count === len) resolve(values); // 等于count之后，再resolve
            },
              err => reject(err));
          }
        });
      }
    }
  });

  // Promise.race
  (() => {
    class MyPromise {
      static race (promiseArr) {
        return new Promise((resolve, reject) => {
          promiseArr.forEach(p => {
            Promise.resolve(p).then(val => resolve(val), err => reject(err));
          });
        });
      }
    }
  });

  // 完整代码
  (() => {
    const PENDING = "PENDING";
    const FULFILLED = "FULFILLED";
    const REJECTED = "REJECTED";

    class Promise {
      constructor(exector) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = value => {
          if (this.status === PENDING) {
            this.value = value;
            this.status = FULFILLED;

            this.onFulfilledCallbacks.forEach(fn => fn(value));
          }
        };
        const reject = reason => {
          if (this.status === PENDING) {
            this.reason = reason;
            this.status = REJECTED;

            this.onRejectedCallbacks.forEach(fn => fn(reason));
          }
        };

        try {
          exector(resolve, reject);
        } catch (e) {
          reject(e);
        }
      }
      then (onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onFulfilled === 'function' ? onRejected : (reason => {
          throw new Error(reason instanceof Error ? reason.message : reason);
        });

        const self = this;
        return new Promise((resolve, reject) => {
          if (self.status === PENDING) {
            self.onFulfilledCallbacks.push(() => {
              try {
                setTimeout(() => {
                  const result = onFulfilled(self.value);
                  result instanceof Promise ? result.resolve(resolve, reject) : resolve(result);
                });
              } catch (e) {
                reject(e);
              }
            });
            self.onRejectedCallbacks.push(() => {
              try {
                setTimeout(() => {
                  const result = onRejected(self.reason);
                  result instanceof Promise ? result.resolve(resolve, reject) : resolve(result);
                });
              } catch (e) {
                reject(e);
              }
            });
          }
          else if (self.status === FULFILLED) {
            try {
              setTimeout(() => {
                const result = onFulfilled(self.value);
                result instanceof Promise ? result.resolve(resolve, reject) : resolve(result);
              });
            } catch (e) {
              reject(e);
            }
          }
          else if (self.status === REJECTED) {
            try {
              setTimeout(() => {
                const result = onRejected(self.reason);
                result instanceof Promise ? result.resolve(resolve, reject) : resolve(result);
              });
            } catch (e) {
              reject(e);
            }
          }
        });
      }
      catch (onRejected) {
        this.then(null, onRejected);
      }

      static resolve (value) {
        // 无视 thenable 对象
        if (value instanceof Promise) {
          return value;
        } else {
          return new Promise((resolve, reject) => resolve(value));
        }
      }
      static reject (value) {
        return new Promise((resolve, reject) => reject(value));
      }
      static all (promiseArr) {
        var len = promiseArr.length;
        var values = new Array(len);
        var count = 0;
        return new Promise((resolve, reject) => {
          for (let i = 0; i < len; i++) {
            Promise.resolve(promiseArr[i]).then((val) => {
              values[i] = val;
              count++;
              if (count === len) resolve(values);
            }).catch(e => {
              reject(e);
            });
          }
        });
      }
      static race (promiseArr) {
        return new Promise((resolve, reject) => {
          for (let i = 0; i < promiseArr.length; i++) {
            Promise.resolve(promiseArr[i])
              .then(val => resolve(val))
              .catch(err => reject(err));
          }
        });
      }
    }
  });


});

// 21 Promise并行限制
// 实现有并行限制的Promise调度器
(() => {
  // JS实现一个带并发限制的异步调度器Scheduler,保证同时运行的任务最多有两个

  /*
  class Scheduler {
    add (promiseCreator) { ... }
  }

  const timeout = time => new Promise(resolve =>
    setTimeout(resolve, time)
  )

  const scheduler = new Scheduler()

  const addTask = (time, order) => {
    scheduler.add(() => timeout(time).then(() => console.log(order)))
  }

  addTask(1000, '1')
  addTask(500, '2')
  addTask(300, '3')
  addTask(400, '4')


  // output: 2 3 1 4
  */

  // 自己写
  class Scheduler {
    constructor() {
      this.waitingList = [];
      // this.exectorList = []
      this.exectorCount = 0;
    }
    add (promiseCreater) {
      this.waitingList.push(promiseCreater);
      this.then();
    }
    then () {
      if (this.exectorCount < 2 && this.waitingList.length) {
        const promiseCreater = this.waitingList.shift();
        this.exectorCount++;
        promiseCreater().then(() => {
          this.exectorCount--;
          this.then();
        });
      }
    }
  }
});

// 复习
// map,filter,forEach,reduce,call,apply,bind,debounce,throttle,.is,assign,深拷贝,inherits，promise,promise并行限制


// 22 JSONP
(() => {
  // script 标签不循循同源协议，可以用来进行跨域请求，有点就是兼容性好，但仅限于GET请求
  const jsonp = ({ url, params, callbackName }) => {
    const generatorUrl = () => {
      var dataUrl = '';
      for (let key in params) {
        if (Object.prototype.getOwnProperty.call(params, key)) {
          dataUrl += `${key}=${params[key]}&`;
        }
      }
      dataUrl += `callbackName=${callbackName}`;
      return `${url}?${dataUrl}`;
    };
    return new Promise((resolve, reject) => {
      var ScriptEL = document.createElement('script');
      ScriptEL.src = generatorUrl();
      document.body.appendChild(ScriptEL);
      window[callbackName] = function (data) {
        resolve(data);
        document.body.removeChild(ScriptEL);
      };
    });
  };
});

// 23 AJAX
(() => {
  // const getJSON = function (url) {
  //   return new Promise((resolve, reject) => {
  //     const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Mscrosoft.XMLHTTP');
  //     xhr.open('GET', url, false);
  //     xhr.setRequestHeader('Accept', 'application/json');
  //     xhr.onreadystatechange = function () {
  //       if (xhr.readyState !== 4) return;
  //       if (xhr.status === 200 || xhr.status === 304) {
  //         resolve(xhr.responseText);
  //       } else {
  //         reject(new Error(xhr.responseText));
  //       }
  //     };
  //     xhr.send();
  //   });
  // };



  // 1.xhr
  // 2.xhr.open
  // 3.xhr.setRequestHeader
  // 4.xhr.onreadystatechange
  // 5.xhr.send
  const getJSON = function (url) {
    return new Promise((resolve, reject) => {
      const xhr = XMLHttpRequest ? new XMLHttpRequset() : new ActiveXObject('Mscrosoft.XMLHTTP');
      xhr.open("GET", url, false);
      xhr.sendRequestHeader('Accept', 'application/json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        else if (xhr.status === 200 || xhr.status === 302) resolve(xhr.responseText);
        else {
          reject(new Error(xhr.responseText));
        }
      };
      xhr.send();
    });
  };
});

// 24 event 模块
// 实现node中回调函数的机制，node中回调函数其实是内部使用了观察者模式
// 观察者模式：定义了对象间一种一对多的依赖关系，当目标对象Subject的发生改变时，所有依赖它的对象Observer 都会对得到通知

(() => {
  // 要实现的方法
  // addListener,removeListener,once,removeAllListeners,emit
  // addListener 



  // 很简单，
  // 数据：一个记录的
  // 方法：一个添加（事件名，相关事件），一个删除（事件名，相关事件），删除所有（事件名），触发（事件名）



  class EventEmitter {
    constructor() {
      this.events = new Map();
    }
    wrapCallback (fn, once = false) { return { callback: fn, once }; };
    addListener (type, fn, once = false) {
      const handler = this.events.get(type);
      if (!handler) {
        this.events.set(type, this.wrapCallback(fn, once));
      } else if (handler && typeof handler === 'function') {
        this.events.set(type, [handler, this.wrapCallback(fn, once)]);
      } else {
        handler.push(this.wrapCallback(fn, once));
      }
    }
    removeListener (type, listener) {
      // 三种情况
      const handler = this.events.get(type);

      if (!handler) return;
      if (handler && typeof handler === 'function') {
        if (handler.callback === listener.callback)
          this.events.delete(type);
        return;
      }
      for (let i = 0; i < handler.length; i++) {
        const item = handler[i];
        if (item.callback === listener.callback) {
          handler.splice(i, 1);
          i--;
          if (handler.length === 1) {
            this.events.set(type, handler[0]);
          }
        }
      }
    }
    once (type, listner) {
      this.addListener(type, listner, true);
    }
    emit (type, ...args) {
      const handler = this.events.get(type);
      // 三种情况
      if (!handler) return;
      if (handler && typeof handler === 'function') {
        handler.callback.apply(this, args);
        if (handler.once) {
          this.events.delete(type);
        }
      } else {
        handler.forEach((item) => {
          item.callback.apply(this, args);
          if (item.once) {
            this.removeListener(type, item);
          }
        });
      }

      return true;
    }
    removeListeners (type) {
      if (this.events.has(type)) this.events.delete(type);
    }
  }
});

// 25 图片懒加载
// 可以给img标签统一自定义属性 data-src="default.png", 当检测到图片出现在窗口之后再补充src属性，此时才会进行图片资源加载。
(() => {
  function lazyload () {
    const imgs = document.getElementsByTagName('img');
    const len = imgs.length;

    const viewHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
    for (let i = 0; i < len; i++) {
      const offsetHeight = imgs[i].offsetTop; // 这个节点距离offsetParent的高度
      if (offsetHeight < viewHeight + scrollHeight) {
        const src = imgs[i].dataset.src;
        imgs[i].src = src;
      }
    }
  }


  window.addEventListener('srcoll', lazyload);
});

// 26 滚动加载
// clientHeight, scrollTop, scrollHeight的属性关系
(() => {
  // clientHeight: height + padding - 滚动条高度;
  // scrollHeight: 整个高度 （包含padding）
  // offsetHeight: clientHeight + 边框;
  // clientTop: borderHeight;
  // scrollTop: 隐藏的滚动条高度;
  // offsetTop:  与 offsetParent 的 顶部高度;
});

// 27 渲染几万条数据不卡住页面
(() => {
  setTimeout(() => {
    // const total = 10000;
    // const once = 20;
    // const loopCount = Math.ceil(total / once);
    // let countOfRender = 0;
    // const ul = document.querySelector('ul');

    // function add () {
    //   const fragment = document.createDocumentFragment();
    //   for (let i = 0; i < once; i++) {
    //     const li = document.createElement('li');
    //     li.innerText = '...';
    //     fragment.appendChild(li);
    //   }
    //   ul.appendChild(fragment);
    //   countOfRender += 1;
    //   loop();
    // }

    // function loop () {
    //   if (countOfRender < loopCount) {
    //     window.requestAnimationFrame(add);
    //   }
    // }
    // loop();

    let loopCount = 100;
    let k = 0;
    while (k < loopCount) {
      window.requestAnimationFrame(function () {
        const fragment = document.createElementFragment();
        let li = document.createElement('li');
        // li * 10
        fragment.appendChild(li);
        ul.appendChild(fragment);
      });
    }

    // 0.setTimeout
    // 1.window.requestAnimationFrame(add)
    // 2.add = function() {
    //   var fragment = document.createElementFragment();
    //   fragment.appendChild(li);
    //   ul.appendChild(fragment)
    // }
  });
});

// 28 打印出当前所有类型的HTML元素
(() => {
  const fn = () => {
    return [...new Set([...document.querySelectorAll('*')].map(i => i.tagName))];
  };
});

// 29 将 virtualDom 转化为真实DOM结构;
(() => {
  // vnode 结构
  // {
  //   tag,
  //   attrs,
  //   children
  // }
  function render (vnode, container) {
    container.appendChild(_render(vnode));
  }
  function _render (vnode) {
    if (typeof vnode === 'number') {
      vnode = String(vnode);
    }
    if (typeof vnode === 'string') {
      return document.createTextNode(vnode);
    }
    var dom = document.createElement(vnode.tag);
    vnode.attrs && Object.keys(vnode.attrs).forEach(key => {
      dom.setAttribute(key, vnode.attrs[key]);
    });

    vnode.children.forEach(child => {
      render(child, dom);
    });
  }
});

// 30 字符串解析问题
(() => {
  var a = {
    b: 123,
    c: '456',
    e: '789'
  };
  var str = `a{a.b}aa{a.c}aa {a.d}aaaa`;

  // replace，做不到动态
  // matchAll + 下标，插入时，下标会变动，而且matchAll只记录起点位置
  // 1. for循环str,
  // 2. 不符合开始的，插入
  // 3. 符合开始符，一直到结束符，的值记录下来
  // 4. 替换
  // 5. 继续

  function fn1 (str, obj) {
    var res = '';
    var flag = false;
    var start;

    for (let i = 0; i < str.length; i++) {
      var val = str[i];
      if (val === '{') {
        flag = true;
        start = i + 1;
      } else if (val === '}') {
        flag = false;
        res += match(str.slice(start, i), obj);
      } else if (!flag) {
        res += val;
      }
    }
    return res;
  }


  function match (str, obj) {
    var keys = str.split('.').slice(1);

    var k = 0;
    var O = obj;
    while (k < keys.length) {
      var key = keys[k];
      if (O[key]) { O = O[key]; } else {
        return `{${str}}`;
      }
      k++;
    }

    return O;
  }
});

