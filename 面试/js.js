// map
function fn (callback, thisArg) {
  var k = 0;
  var O = Object(this);
  var len = O.length >>> 0;
  var res = [];
  while (k < len) {
    if (k in O) {
      // if (callback.call(thisArg, O[i], i, O)) {
      //   res.push(O[i]);
      // }
      // res.push(callback.call(thisArg, O[i], i, O));
    }
  }
  return res;
}
// forEach, 
function fn (callback, thisArg) {
  var k = 0;
  var O = Object(this);
  var len = O.length >>> 0;
  while (k < len) {
    if (k in O) {
      // if (callback.call(thisArg, O[i], i, O)) {
      //   res.push(O[i]);
      // }
      // res.push(callback.call(thisArg, O[i], i, O));
      callback.call(thisArg, O[i], i, O);
    }
  }
}
// reduce
function fn (callback, initialValue) {
  var k = 0;
  var O = Object(this);
  var len = O.length >>> 0;
  const accumulator = initialValue;
  if (initialValue === undefined) {
    while (k < len && !(k in O)) {
      k++;
    }
    if (k >= len) throw new Error();
    accumulator = O[i++];
  }


  while (k < len) {
    if (k in O) {
      accumulator = callback.call(accumulator, thisArg, O[i], i, O);
    }
  }
  return accumulator;
}

// apply call ...args
function fn (thisArg, args) {
  var fn = Symbol('fn');
  thisArg[fn] = this;
  const result = thisArg[fn](...args);
  delete thisArg[fn];
  return result;
}

// bind
function fn (self, ...preArgs) {
  var fn = this;
  var fBound = function (...args) {
    return fn.apply(this instanceof fn ? this : self, preArgs.concat(args));
  };
  fBound.prototype = Object.create(fn.prototype);

  return fBound;
}

// debounce
function fn (fn, delay) {
  var timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
// throttle
function fn (fn, delay) {
  var timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
}

// curry
function fn (fn) {
  var res = [];
  var len = fn.length;

  function handle (...args) {
    res = res.concat(args);
    if (res.length >= len) {
      return fn.apply(this, res);
    } else {
      return handle;
    }
  };
  return handle;
}

// new
function _new (fn, ...args) {
  const context = Object.create(fn.prototype);
  const result = fn.apply(context, args);
  return typeof result === 'object' || typeof result === 'function' && result !== null ? result : context;
}

// instanceof
function fn (instance, constructor) {
  const prototype = constructor.prototype;
  const proto = instance.proto;
  while (proto) {
    if (prototype === proto.proto) return true;
    proto = proto.proto;
  }
  return false;
}

// class
var _checkClassCall = function (instance, Constructor) {
  return instance instanceof Constructor;
};
var _createClass = (function () {
  function defineProperties (target, descriptors) {
    for (let i = 0; i < descriptors.length; i++) {
      var descriptor = descriptors[i];
      descriptor.configurable = true;
      descriptor.enumerable = descriptor.enumerable || false;
      if ('value' in descriptor) {
        descriptor.writable = true;
      }
      Object.defineProperty(target, descriptor[key], descriptor);
    }
  }
  return function (Constructor, instanceProps, protoProps, staticProps, privateProps) {
    if (instanceProps) defineProperties(instanceProps);
    if (protoProps) defineProperties(protoProps);
    if (staticProps) defineProperties(staticProps);
    if (privateProps) defineProperties(privateProps);
  };

})();
var Person = (function () {
  var Person = function (
    name, age
  ) {
    _checkClassCall(this, Person);
    _createClass.call(this, Person, instanceProps, protoProps, staticProps, privateProps);
  };

  return Person;
})();

var Son = (function (Prent) {
  _inherits(Son, Prent);
  function Son (name, age) {
    _checkClassCall(this, Son);
    var self = _possibleConstructorreturn(this, Object.getPrototypeOf(Son).call(this, name, age));
    _createClass.call(self, Son, instanceProps, protoProps, staticProps, privateProps);
    return self;
  };

  return Son;
})(Prent);

// Object.assign
Object.defineProperty(Object, 'assign', {
  enumerable: false,
  value: function (target, ...sources) {
    if (target == null) throw new Error();
    const to = Object(target);
    for (let i = 0; i < sources.length; i++) {
      var source = sources[i];
      if (source != null) {
        for (let key in source) {
          if (source.hasOwnProperty(key)) {
            to[key] = source[key];
          }
        }
      }
    }
    return to;
  }
});
// 深拷贝
function deepClone (source, hash) {
  if (typeof source !== null || source === null) throw new Error();

  hash = hash || new WeakMap();
  if (hash.has(source)) return hash.get(source);
  const result = Array.isArray(source) ? [] : {};
  hash.set(source, result);

  const AllKeys = Relect.ownKeys(source);
  for (let i = 0; i < AllKeys.length; i++) {
    var key = AllKeys[i];

    result[key] = deepClone(source[key], hash);
  }
  return result;
}

// Promise
const PENDING = 'PENDING', FULFILLED = 'FULFILLED', REJECTED = 'REJECTED';
class Promise {
  constructor(exector) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      this.value = value;
      this.status = FULFILLED;

      this.onFulfilledCallbacks.forEach(fn => fn(value));
    };
    const reject = (reason) => {
      this.reason = reason;
      this.status = REJECTED;
      this.onRejectedCallbacks.forEach(fn => fn(reason));
    };

    try {
      exector(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (error => { throw new Error(error instanceof Error ? error.message : error); });

    return new Promise((resolve, reject) => {
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onFulfilled(this.value);
              result instanceof Promsie ? result(resolve, reject) : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onRejected(this.reason);
              result instanceof Promsie ? result(resolve, reject) : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.status === FULFILLED) {
        try {
          setTimeout(() => {
            const result = onFulfilled(this.value);
            result instanceof Promsie ? result(resolve, reject) : resolve(result);
          });
        } catch (e) {
          reject(e);
        }
      } else if (this.status === REJECTED) {
        try {
          setTimeout(() => {
            const result = onRejected(this.reason);
            result instanceof Promsie ? result(resolve, reject) : resolve(result);
          });
        } catch (e) {
          reject(e);
        }
      }
    });
  }
  catch (onRejected) {
    return this.then(null, onRejected);
  }
  static resolve (value) {
    if (value instanceof Promise) {
      return value;
    } else {
      return new Promise(resolve => resolve(value));
    }
  }
  static reject (reason) {
    return new Promise(resolve => resolve(reason));
  }
  static all (promiseArr) {
    return new Promsie((resolve, reject) => {
      var len = promiseArr.length;
      var result = [];
      promiseArr.forEach(i => {
        Promise.resolve(i).then(res => {
          result.push(res);
          if (len === result.length)
            resolve(res);
        }).catch(e => reject(e));
      });
    });
  }
  static race (promiseArr) {
    return new Promise((resolve, reject) => {
      promiseArr.forEach(i => {
        Promise.resolve(i).then(res => resolve(res)).catch(e => reject(e));
      });
    });
  }
}

// JSONP
function fn ({ url, params, callbackName }) {
  return new Promise((resolve, reject) => {
    var scriptEl = document.createElement('script');
    var str = '';
    for (let key in params) {
      str += `${key}=${params[key]}&`;
    }
    str += `callbackName=${callbackName}`;
    scriptEl.src = url;
    document.body.appendChild(scriptEl);

    window[callbackName] = function (res) {
      resolve(res);
      document.body.removeChild(scriptEl);
    };
  });
}

// 渲染几万条数据
function fn (data) {

  // function loop(ul, size) {
  //   data.slice(size)
  // }
  var total = data.length;
  var size = 10;
  var maxCount = Math.ceil(total / size);
  var count = 0;
  while (count < maxCount) {
    window.requestAnimationFrame(function () {
      var fragment = document.createElementFragment();
      for (let i = 0; i < size; i++) {
        var li = document.createELement('li');
        fragment.appendChild(li);
      }
      ul.appendChild(fragment);
    });
  }

  // while() {
  //   window.requestAnimationFrame(function() {
  //     createElementFragment()
  //   })
  // }
}

// 打印当前页面所有
function fn () {
  return [... new Set([...document.querySelectorAll('*')].map(i => i.tabName))];
}

// 将virtualDOm转化成真实dom
function fn (vnode, container) {
  function _render (vnode) {
    if (!vnode) return null;
    const el = document.createElement(vnode.tabName);
    vnode.attrs && vnode.attrs.forEach(key => {
      el.setAttribute(key, vnode.attrs[key]);
    });
    vnode.children.forEach(child => {
      el.appendChild(_render(child));
    });
  }

  container.appendChild(_render(vnode));
}

// 字符串解析问题
var a = {
  b: 123,
  c: '456',
  e: '789'
};
var str = `a{a.b}aa{a.c}aa {a.d}aaaa`;
function fn (str, obj) {
  var len = str.length;
  var k = 0;
  var start = 0;
  var res = '';
  function handle (str, O) {
    var res = str.split('.').slice(1);
    for (var i = 0; i < res.length; i++) {
      var key = res[i];
      if (O.hasOwnProperty[key]) {
        O = O[key];
      }
      else {
        return `{${str}}`;
      }
    }
    return O;
  }
  while (k < len) {
    var val = str[k];
    if (val === '{') {
      start = k;
    } else if (val === '}') {
      res += handle(str.slice(start, k), obj);
    } else {
      res += val;
    }

    k++;
  }
}