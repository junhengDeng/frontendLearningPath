// 数组扁平化
arr.flat(Infinity);
// 数组去重
// [...new Set(arr)]
// 类数组转换成数组
Array.from(document.querySelectorAll('.d'));
// filter
Array.prototype.filter = function (callback, thisArg) {
  if (typeof callback ！== )
  var O = Object(this);
  var len = O.length >>> 0;
  var k = 0;
  var res = [];
  while (k < len) {
    if (k in O) {
      if (callback.call(thisArg, O[i], i, O)) {
        res.push(O[i]);
      }
    }
    k++;
  }

  return res;
};

// class
var _checkClassCall = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) { throw new TypeError(); }
};
var _createClass = (function () {
  var defineProperties = function (target, descriptors) {
    descriptors.forEach(descriptor => {
      descriptor.configurable = true;
      descriptor.enumerable = descriptor.enumerable || false;
      if ('value' in descriptor) {
        descriptor.writable = true;
      }
      Object.defineProperty(target, descriptor[key], descriptor);
    });
  };

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
})();
var Person = (function () {

  var Person = function (name, age) {
    _checkClassCall(this, Person);
    _createClass.call(this, Person, instanceProps, protoProps, staticProps, privateProps);
  };

  return Person;
})();

var _inherits = function (subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype, {
    enumerable: false
  });
  Object.setPrototypeOf(subClass, superClass);
};
var _possibleConstructorReturn = function (self, call) {
  if (!self) throw new TypeError();
  return typeof call === 'function' || typeof call === 'object' ? call : self;
};
var Son = (function (Parent) {
  _inherits(Son, Parent);
  function Son (name, age) {
    _checkClassCall(this, Son);
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Son).call(this, name, age));
    _createClass.call(_this, Son, instanceProps, protoProps, staticProps, privateProps);
    return _this;
  };
  return Son;
})(Parent);

Array.prototype.map = function (callback, thisArg) {
  var O = Object(this);
  var len = O.length >>> 0;
  var res = [];
  var k = 0;
  while (k < len) {
    if (k in O) {
      res.push(callback.call(thisArg, O[i], i, O));
    }
  }
  return res;
};

Array.prototype.forEach = function (callback, thisArg) {
  var O = Object(this);
  var len = O.length >>> 0;
  for (var i = 0; i < len; i++) {
    if (k in O) {
      callback.call(thisArg, O[i], i, O);
    }
  }
};

Array.prototype.reduce = function (callback, initialValue) {
  var O = this;
  var len = O.length >>> 0;
  var accumulator = initialValue;
  var k = 0;
  if (initialValue === undefined) {
    while (k < len && !(k in O)) {
      k++;
    }
    if (k >= len) throw new TypeError();
    accumulator = O[i++];
  }
  while (k < len) {
    if (k in O) {
      accumulator = callback.call(undefined, accumulator, O[i], i, O);
    }
  }

  return accumulator;
};

Function.prototype.apply = function (self, args) {
  var fn = Symbol('fn');
  var O = Object(this);
  O[fn] = this;
  var result = O[fn](...args);
  delete O[fn];
  return result;
};

Function.prototype.call = function (self, ...args) {
  var fn = Symbol('fn');
  var O = Object(this);
  O[fn] = this;
  var result = O[fn](...args);
  delete O[fn];
  return result;
};

Function.prototype.bind = function (self, ...preArgs) {
  var fn = this;
  var fBound = function (...args) {
    return fn.apply(this instanceof fn ? self : this, preArgs.concat(args));
  };
  fBound.prototype = Object.create(fn.prototype);
  return fBound;
};

function debounce (fn, delay) {
  var timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function throttle (fn, delay) {
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

function curry (fn, ...args) {
  var values = [...args];
  var len = fn.length;

  return function (...args) {
    values = values.concat(values, args);
    return values.length < len ? this
      : fn.apply(this, values);
  };
}

function _new (fn, ...args) {
  var context = Object.create(fn.prototype);
  var result = fn.apply(context, args);
  return typeof result === 'function' || typeof result === 'object' && result !== null ? result : context;
}

function instanceof1 (instance, Constructor) {
  var proto = instance.__proto__;
  while (proto) {
    if (Constructor.prototype === proto) return true;
    proto = proto.__proto__;
  }
  return false;
}

function is (x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

Object.defineProperty(Object, 'assign', {
  enumerable: false,
  value: function (target, sources) {
    if (target == null) throw new Error();
    var to = Object(target);
    sources.forEach(source => {
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          to[key] = source[key];
        }
      }
    });
    return to;
  }
});

function cloneDeep (source, hash) {
  if (source == null) return source;
  if (source instanceof Date) return new Date(source);
  if (source instanceof RegExp) return new RegExp(source);
  if (typeof source !== 'object') return source;

  hash = hash || new WeakMap();
  if (hash.has(source)) return hash.get(source);
  var result = Array.isArray(result) ? [] : {};
  hash.set(source, result);
  var allKeys = Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source));
  for (var key in allKeys) {
    Object.defineProperty(result, key, Object.assign({}, Object.getOwnPropertyDescriptor()), {
      value: deepClone(source)
    });
  }
  return result;
}

const FULFILLED = "FULFILLED";
const PENDING = "PENDING";
const REJECTED = "REJECTED";

class Promsie {
  constructor(exector) {
    this.status = PNEDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];


    const resolve = value => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
      }
    };

    const reject = reason => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
      }
    };

    exector(resolve, reject);
  }
  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => reason instanceof Error ? reason.message : reason;

    return new Promsie((resolve, reject) => {
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onFulfilled(this.value);
              result instanceof Promise ? result(resolve, reject) : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onRejected(this.reason);
              result instanceof Promise ? result(resolve, reject) : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.status === FULFILLED) {
        try {
          setTimeout(() => {
            const result = onFulfilled(this.value);
            result instanceof Promise ? result(resolve, reject) : resolve(result);
          });
        } catch (e) {
          reject(e);
        }
      } else if (this.status === REJECTED) {
        try {
          setTimeout(() => {
            const result = onRejected(this.reason);
            result instanceof Promise ? result(resolve, reject) : resolve(result);
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
    if (value instanceof Promise) {
      return value;
    } else {
      return new Promise((resolve, reject) => {
        try {
          resolve(value);
        } catch (e) {
          reject(e);
        }
      });
    }
  }
  static reject (reason) {
    return new Promise((resolve, reject) => reject(reason));
  }
  static all (promiseArr) {
    return new Promise((resolve, reject) => {
      var values = [];
      var len = promiseArr.length;
      promiseArr.forEach(promise => {
        Promise.resolve(promise).then((res) => {
          values.push(res);
          values.length === len && resolve(res);
        }, e => reject(e));
      });
    });
  }
  static race (promiseArr) {
    return new Promise((resolve, reject) => {

      promiseArr.forEach(promise => {
        Promise.resolve(promise).then((res) => resolve(res),
          e => reject(e));
      });
    });
  }
}

class Scheduler {
  constructor(maxCount) {
    this.waitingList = [];
    this.maxCount = maxCount;
  }
  add (promise) {
    this.waitingList.push(promise);
  }
  handle () {
    if (this.waitingList.length < this.maxCount) {
      this.waitingList.shift()().finally(() => {
        this.handle();
      });
    }
  }
}

var jsonp = ({ url, params, callbackName }) => {
  var str = '';
  for (let key in params) {
    str += `${key}=${params[key]}&`;
  }
  str += `callbackName=${callbackName}`;
  return new Promise((resolve, reject) => {
    var scriptEl = document.createElement('script');
    scriptEl.src = str;
    document.body.appendChild(scriptEl);
    window[callbackName] = function (res) {
      resolve(res);
      document.removeChild(scriptEl);
    };
  });
};

var ajax = function (url) {
  return new Promise((resolve, reject) => {
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Mscroft.XMLHTTP');
    xhr.open("GET", url, false);
    xhr.sendRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return;
      } else if (xhr.status === 200 || xhr.status === 302) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.responseText);
      }
    };
    xhr.send();
  });
};

class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  wrapCallback (fn, once = false) { return { callback: fn, once }; }
  addListener (type, listener, once = false) {
    const handler = this.events.get(type);
    if (!handler) {
      this.events.set(type, this.wrapCallback(listener));
    } else if (typeof handler === 'function') {
      this.events.set(type, [handler, this.wrapCallback(listener)]);
    } else {
      handler.push(this.wrapCallback(listener));
    }
  }
  removeListener (type, listener) { }
  removeListeners (type) { }
  once (type, listener) {
    this.addListener(type, listener, true);
  }
  emit (type, ...args) {
    const handler = this.events.get(type);
    if (!handler) return;
    if (!Array.isArray(handler)) {
      handler.callback.apply(this, args);
      if (handler.once) {
        this.events.remove(type);
      }
    } else {
      handler.forEach(i => {
        i.callback.apply(this, args);
        if (i.once) {
          this.removeListener(type, i);
        }
      });
    }
  }
}


// clientTop = 边框
// scrollTop = 隐藏的滚动条高度
// offsetTop = 与 offsetParent 的高度

// clientHeight = height + padding - 滚动条高度
// scrollHeight = 整个高度
// offsetHeight = clientHeight + 边框

// 渲染几万条数据不卡住页面
function render (data, container, size = 10) {
  function _render (data, container) {
    var fragment = document.createDocumentFragment();
    for (let i = 0; i < data.length; i++) {
      // fragment.appendChild()
    }
    container.appendChild(fragment);
  }
  var len = data.length;
  var total = Math.ceil(len / size);
  var curr = 0;
  while (curr < total) {
    _render(data[curr * size, (curr + 1) * size], container);

    curr++;
  }
}

function handleStr (str) {
  function match (str, obj) {
    var keys = str.split(',').slice(1);
    var k = 0;
    var O = obj;
    while (k < keys.length) {
      var key = keys[k];
      if (O[key]) { O = O[key]; k++; }
      else { return `{${str}}`; }
    }
    return O;
  }

  var res = '';
  var flag = false;
  var start = 0;

  for (var i = 0; i < str.length; i++) {
    var val = str[i];
    if (val === '{') {
      flag = true;
      start = i;
    } else if (val === '}') {
      res += match(str.slice(start, i), obj);
    } else {
      res += val;
    }
  }

  return res;
}
