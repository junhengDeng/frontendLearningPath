const user = {
  name: '佐助',
  age: 20,
  wife: {
    name: '小樱',
    age: 19
  },
  sayHi () {
    return 'haha';
  }
};


const proxyUser = new Proxy(user, {
  apply: function (target, thisArg, argumentsList) {
    // 适用范围
    // 1. proxy(...args) // 当前生成的代理对象的调用
    // 2. Function.prototype.apply 和 call 和 bind的对象
    // 3. Reflect.apply()
    // 参数
    // target 为当前代理对象（只适用于对象，对象里面的属性不会有反应），target必须是可以调用的，必须是个函数对象
    // new 不会有反应
    console.log('apply', target, thisArg, argumentsList);

    // return target.apply(thisArg, argumentsList);
    return Reflect.apply(target, thisArg, argumentsList);
  },
  construct (target, argumentsList, newTarget) {
    // 参数
    // target, 目标对象
    // argumentsList， 参数列表
    // newTarget, 最初被调用的构造函数，就上面的里例子而言，就是p（不懂，target和newTarget有什么不同）
    // 适用范围
    // new proxy(...args) // 当前代理对象被new
    // Reflect.construct() 
    // 约束
    // 必须返回一个对象
    // return new target(...argumentsList);
    return Reflect(target, argumentsList, newTarget);
  },
  defineProperty: function (target, property, descriptor) {
    // 参数
    // target, // 目标对象
    // property, // 待检索其描述的属性名
    // descriptor // 描述符
    // 适用范围
    // Object.defineProperty()
    // Reflect.defineProperty()
    return Reflect.defineProperty(target, property, descriptor);
  },
  deleteProperty: function (target, property) {
    // 适用范围
    // 删除属性 delete proxy[foo] 和 delete proxy.foo
    return Reflect.deleteProperty(target, property);
  },
  get (target, property, receiver) {
    // 参数
    // target 目标对象
    // property 被获取的属性名
    // receiver Proxy或者继承Proxy的对象
    // 适用范围
    // 访问属性： proxy[foo] 和 proxy.bar
    // 访问原型链上的属性： Object.create(proxy)[foo]
    // 不是深层的，只会到浅一层，如果该属性解构出来，不经过 proxy，调用里层属性，就不会触发拦截
    return Reflect.get(target, property, receiver);
  },
  getOwnPropertyDescriptor (target, prop) {
    // 适用范围
    // Object.getOwnPropertyDescriptor()
    // Reflect.getOwnPropertyDescriptor()

    return Reflect(target, prop);
  },
  getPrototypeOf (target) {
    // 适用范围
    // Object.getPrototypeOf()
    // Reflect.getPrototypeOf()
    // Object.prototype.__proto__
    // Object.prototype.isPrototypeOf() 原理还是调用了 getPrototypeOf/__proto__
    // instanceof
    console.log('called Proxy getPrototypeOf');
    return Reflect.getPrototypeOf(target);
  },
  has (target, prop) {
    // 适用范围
    // 属性查询： foo in proxy
    // 继承属性查询： foo in Object.create(proxy)
    // with 检查： with(proxy) {(foo)} 没用过
    // Reflect.has()
    return Reflect.has(target, prop);
  },
  isExtensible (target) {
    // 适用范围
    // Object.isExtensible() isSealed() isForzen()
    // Reflect.isExtensible()
    console.log('isExtensible is called');
    return Reflect.isExtensible(target);
  },
  ownKeys (target) {
    // 适用范围
    // Object.getOwnPropertyNames
    // Object.getOwnPropertySymbols
    // Object.keys
    // Reflect.ownKeys
    return Reflect.ownKeys(target);
  },
  preventExtensions (target) {
    // 适用范围
    // Object.preventExtensions seal freeze
    // Reflect.preventExtensions

    return Reflect.preventExtensions(target);
  },
  set (target, property, value, receiver) {
    // 适用范围
    // 指定属性值：proxy[foo].bar 和 proxy.foo = bar
    // 指定继承者的属性值：Object.create(proxy)[foo] = bar
    // Reflect.set()

    return Reflect.set(target, property, value, receiver);
  },
  setPrototypeOf (target, prototype) {
    // 适用范围
    // Object.setPrototypeOf __proto__ 被调用
    // Reflect.setPrototypeOf

    console.log('setPrototypeOf is called');

    return Reflect.setPrototypeOf(target, prototype);
  }

});

// console.log(
//   proxyUser.sayHi.apply('w112'));

// console.log(proxyUser.sayHi());


// const p = new Proxy(function () { console.log(arguments, 'arguments'); }, {
//   apply: function (target, thisArg, argumentsList) {
//     console.log('apply called：');

//     console.log(target,);
//     console.log(thisArg,);
//     console.log(argumentsList);

//     return target.apply(thisArg, argumentsList);
//   }
// });
// console.log(new p());

// // console.log(p(1, 2, 3));
// var b = p.bind(proxyUser, 1, 2);
// console.log(b(3));
// console.log(p.call(proxyUser, 1, 2, 3));

// var p = new Proxy(function d () { }, {
//   construct: function (target, argumentsList, newTarget) {
//     console.log(target.name, argumentsList, newTarget.name);
//     console.log('called: ' + argumentsList.join(', '));
//     return new target(...argumentsList);
//   }
// });

// console.log(new p(1)); // "called: 1"
//                              // 10


// console.log(proxyUser.isPrototypeOf({})); // 没调用
// 看了一下 isPrototypeOf 实现，
// 它是对括号里面的原型链进行扩展
// 所以反过来
// console.log((proxyUser).isPrototypeOf(Object.create(Object.create(proxyUser)))); // 没有拦截到，是因为还没到调取（Object.getPrototypeOf(proxyUser) 就返回了，所以isPrototypeOf的拦截的原理，还是因为getPrototypeOf）


// console.log(Object.isFrozen(proxyUser));

// console.log(Object.setPrototypeOf(proxyUser, {})); 
console.log(proxyUser.__proto__ = {});
