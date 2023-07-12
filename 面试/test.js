// flat
// 数组扁平化
arr.flat(Infinity);
JSON.parse('[' + JSON.stringify(arr).replace(/\[\]/g, '') + ']');
// 数组去重
[...new Set(arr)];
// 类数组转数组
Array.prototype.slice.call(arguments);
Array.from(arguments);
[...arguments];
// filter
function filter (callback, thisArg) {
  if (typeof callback !== 'function') { };

  var O = Object(this);
  var len = O.length >>> 0;
  var k = 0;
  var result = [];
  while (k < len) {
    if (k in O) {
      if (callback.call(thisArg, O[i], i, O)) {
        result.push(O[i]);
      }
    }
  }

  return result;
}
// map
function map (callback, thisArg) {
  // 判断

  var result = [];
  var O = Object(this);
  var len = O.length >>> 0;
  var k = 0;
  while (k < len) {
    if (k in O) {
      result.push(callback.call(thisArg,));
    }
  }

  return result;
}
// forEach
function forEach (callback, thisArg) {

  var O = Object(this);
  var len = O.length >>> 0;
  var k = 0;
  while (k < len) {
    if (k in O) {
      callback.call(thisArg,);
    }
  }
}
// reduce
function reduce (callback, initialValue) {
  var O = Object(this);
  var len = O.length >>> 0;
  var accumulator = initialValue;
  var k = 0;
  if (initialValue === undefined) {
    while (k < len && !(k in O)) {
      k++;
    }
    if (k >= len) throw new Error();
    accumulator = O[k++];
  }

  while (k < len) {
    if (k in O) {
      accumulator = callback.call(undefined, accumulator, O[i]);
    }
  }

  return accumulator;
}

// apply
function apply (thisArg, args) {
  var fn = Symbol('fn');
  thisArg[fn] = this;
  const result = thisArg[fn](...args);
  delete thisArg[fn];
  return result;
}

// call
function call (thisArg, ...args) {
  var fn = Symbol('fn');
  thisArg[fn] = this;
  const result = thisArg[fn](...args);
  delete thisArg[fn];
  return result;
}

// bind
function bind (thisArg, ...preArgs) {
  const fn = this;
  function fBound (...args) {
    return fn.apply(this instanceof fn ? this : thisArg, preArgs.concat(args));
  }
  fBound.prototype = Object.create(fn.prototype);
  return fBound;
}

// debounce
function debounce (fn, delay) {
  var timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// throttle
function throttle (fn, delay) {
  var timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

// curry
function curry (fn) {
  var len = fn.length;
  var arr = [];
  var handle = function (...args) {
    arr = arr.concat(args);
    if (len < arr.length) {
      return handle();
    } else {
      return fn(...arr);
    }
  };
  return handle;
}

function add () {
  var arr = [];
  function fn () {
    arr.push(...arguments);
  }
  fn.toString = function () {
    return arr.reduce((t, i) => t + i, 0);
  };
  return fn(...arguments);
}

// new
function _new (fn, ...args) {
  const context = Object.create(fn.prototype);
  const result = fn.apply(context, args);
  return typeof result === 'function' || (typeof result === 'object' && result !== null) ? result : context;
}

// instanceof
function instanceof1 (obj, Constructor) {
  if (typeof left !== 'object' || left === null) return false;
  var protoype = Constructor.prototype;
  var proto = obj.proto;
  while (true) {
    if (proto == null) return false;
    if (proto === protoype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
// class
function _checkClassCall (instance, Constructor) {
  if (!(instance instanceof Constructor)) throw new TypeError('must be new');
}

var _createClass = (function () {
  function defineProperties (target, descriptors) {
    for (let i in descriptors) {
      var descriptor = descriptors[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) {
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
});
var Person = (function () {

  function Person (name, age) {
    _checkClassCall(this, Person);
    _createClass.call(this, Person, [
      { key: 'name', value: name, enumerable: false }
    ], [
      {
        key: 'sayHi', value: function () { return this.name + Person.age + this._sex; }
      }
    ]);
  }
  return Person;
})();

// extends
function _inherits (subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) { throw new Error(); }

  subClass.prototype = Object.create(superClass.prototype);
  Object.setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn (self, call) {
  if (!self) throw new Error('super no be call');
  return call && (typeof call === 'function' || typeof call === 'object') ? call : self;
}
var Child = (function (Parent) {
  _inherits(Son, Parent);
  function Son (name, age) {
    _checkClassCall(this, Son);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Son).call(this, name, age));

    _createClass.call(_this, Son, [], []);

    return _this;
  }

  return Son;
})(_Parent);

// Object.is
function is1 (x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

// Object.assign 只复制自身 和 非枚举 字段
Object.defineProperty(Object, 'assign', {
  enumerable: false,
  value: function (target, ...sources) {
    if (target == null) throw new Error();
    const to = Object(target);
    sources.forEach(source => {
      if (source != null) {
        for (let key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            to[key] = source[key];
          }
        }

      }
    });
    return to;
  }
});

// 深拷贝
function deepClone (source, hash) {
  if (typeof source !== 'object' || source === null) { return source; }

  hash = hash || new WeakMap();
  if (hash.has(source)) return hash.get(source);

  var result = Array.isArray(source) ? [] : {};

  hash.set(source, result);
  var AllKeys = Reflect.ownKeys(source);
  AllKeys.forEach(key => {
    result[key] = (deepClone(source[key], hash));
  });
  return result;
}

// Promise
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = "REJECTED";
class Promise {
  constructor(exector) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;

        this.onFulfilledCallbacks.forEach(fn => fn(value));
      }
    };
    const reject = (reason) => {
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
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw new Error(reason instanceof Error ? reason.message : reason); };
    return new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
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
            const result = onFulfilled(this.reason);
            result instanceof Promise ? result(resolve, reject) : resolve(result);
          });
        } catch (e) {
          reject(e);
        }
      } else if (this.status === PENDING) {
        try {
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
                const result = onFulfilled(this.reason);
                result instanceof Promise ? result(resolve, reject) : resolve(result);
              });
            } catch (e) {
              reject(e);
            }
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
      return new Promise((resolve) => resolve(value));
    }
  }

  static reject (reason) {
    return new Promise((resolve, reject) => reject(reason));
  }
  static all (promiseArr) {
    var values = [];
    var count = 0;
    var k = 0;

    return new Promise((resolve, reject) => {
      while (k < promiseArr.length) {
        try {
          Promise.resolve(promiseArr[k]).then((res) => {
            values.push(res);
            count++;
            if (count === promiseArr.length) resolve(values);
          }).catch((err) => {
            reject(err);
          });
        } catch (e) {
          reject(e);
        }
        k++;
      }
    });
  }

  race (promiseArr) {
    var k = 0;
    return new Promise((resolve, reject) => {
      while (k < promiseArr.length) {
        promiseArr.forEach;
        try {
          Promise.resolve(promiseArr[k]).then((res) => {
            resolve(res);
          }).catch((err) => {
            reject(err);
          });
        } catch (e) {
          reject(e);
        }
        k++;
      }
    });
  }
}

// promise 并行限制
class Scheduler {
  constructor(max) {
    this.waitingList = [];
    this.count = 0;
    this.maxCount = max || 2;
  }
  add (promiseCreator) {
    this.waitingList.push(promiseCreator);
  }
  handle () {
    if (this.count < this.maxCount && this.waitingList.length) {
      this.count++;
      this.waitingList.shift()().finally(() => {
        this.count--;
      });
    }
  }
  taskStart () {
    while (this.count < this.max) {
      this.handle();
    }
  }
}

// JSONP // get url, params, callbackName， promise
function JOSNP ({ url, params, callbackName }) {
  function generatorUrl () {
    var res = '';
    for (let key in params) {
      res += `${key}=${params[key]}&`;
    }
    res += `callbackName=${callbackName}`;
  }

  return new Promise((resolve, reject) => {
    var scriptEl = document.createElement('script');
    scriptEl.src = generatorUrl();
    document.body.appendChild(scriptEl);
    window[callbackName] = function (res) {
      resolve(res);
      document.removeChild(scriptEl);
    };
  });
}

// AJAX
function AJAX (url) {
  return new Promise((resolve, reject) => {
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Mscroft.XMLHTTP");
    xhr.open("GET", url, false);
    xhr.sendRequestHeader("Active", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 302) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
  });
}

// event模块
class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  add (type, listener) {
    const handler = this.events.get(type);
    if (!handler) { this.events.set(type, listener); }
    if (handler && typeof handler === 'function') {
      this.events.set(type, [handler, listener]);
    } else {
      handler.push(listener);
    }
  }
  remove (type, listener) { }
  clear (type, listner) { }
  emit (type) {

  }
}
// 图片懒加载
function lazyload () {
  // 窗口到了位置，才触发
  var imgs = document.getElementsByTagName('img');
  var viewHeight = document.documentElement.clientHeight;
  var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
  imgs.forEach(img => {
    if (viewHeight + scrollHeight > img.offsetTop) {
      var url = imgs[i].dataset.url;
      img.src = url;
    }
  });
}

window.addEventListener('scroll', lazyload);

// 滚动加载
function loadMore () {
  // if (scrollTop+ ClientHeight >= offsetTop)
}

// 渲染几万条数据不卡住页面
function renderData (data, size) {
  size = size || 10;
  let total = data.length;
  let maxCount = Math.ceil(total / size);
  let k = 0;

  function _render () {
    var fragment = document.createElementFragment();
    for (let i = 0; i < size; i++) {
      var li = document.createElement('li');
      fragment.appendChild(li);
    }
    var ul = document.querySelector('ul');
    ul.appendChild(fragment);
  }

  while (k < maxCount) {
    _render();
    k++;
  }
}

// 打印出当前页面的所有tag
const fn1 = () => {
  return [...new Set([...document.querySelectorAll('*')].map(i => i.tagName))];
};

// 将virtualDom转换为dom
// {  tag, attrs, children }
function render (vnode, container) {
  container.appendChild(_render(vnode));
}
function _render (vnode) {
  var dom = document.createElement(vnode.tag);
  dom.attrs && Object.keys(dom.attrs).forEach(key => {
    dom.setAttribute(key, dom.attrs[key]);
  });
  dom.children.forEach(child => {
    render(child, dom);
  });
  return dom;
}

// 字符串解析
// function 
var a = {
  b: 123,
  c: '456',
  e: '789'
};
var str = `a{a.b}aa{a.c}aa {a.d}aaaa`;
const fn2 = (str, obj) => {
  var res = '';
  var len = str.length;
  var k = 0;
  var flag = false;
  var start = 0;

  while (k < len) {
    var val = str[k];
    if (val === '{') {
      start = k++;
      flag = true;
    } else if (val === '}') {
      flag = false;
      res += match(str.slice(start, k));
    } else if (!flag) {
      res += val;
    }
  }
  return res;
};
const match = (str, obj) => {
  var keys = str.split('.').slice(1);
  var O = obj;
  for (let i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (O.hasOwnProperty(key)) {
      O = O[key];
    } else {
      return '{' + str + '}';
    }
  }
  return O;
};