(() => {
  class Person {
    name
    static age
    #sex
    constructor(name, age, sex) {
      this.name = name
      Person.age = age
      this.#sex = sex
    }

    sayName () { console.log(this.name) }
    sayAge () { console.log(Person.age) }
    saySex () { console.log(this.#sex) }
  }
  var tom = new Person('tom', 12, '男')

  console.log(tom)
  console.log(Object.getOwnPropertySymbols(tom))
  console.log(Reflect.ownKeys(tom))
  console.log(Reflect.ownKeys(tom.__proto__))
  console.log(tom['__proto__'])
  console.log(Object.getOwnPropertyNames(tom['__proto__']))

  tom.sayName()
  tom.sayAge()
  tom.saySex()

  class Girl extends Person {
    constructor(name, age, sex) {
      super(name, age, sex)
      console.log(this.name)
      console.log(Girl.age)
    }
  }

  var xiaomei = new Girl('xiaomei', 16, '女')
  console.log(xiaomei)
  console.log(xiaomei['__proto__'])
  console.log(Object.getOwnPropertyNames(xiaomei['__proto__']))

  xiaomei.sayName()
  xiaomei.sayAge()
  xiaomei.saySex()
});


(() => {
  // 严格模式
  "use strict"

  var _createClass = (function () {
    function defineProperties (target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i]

        descriptor.configurable = true
        descriptor.enumerable = descriptor.enumerable || false
        if ('value' in descriptor) {
          descriptor.writable = true
        }

        Object.defineProperty(target, descriptor.key, descriptor)
      }

      return target
    }

    return function (Constructor, protoProps, staticProps, privateProps) {
      if (protoProps) {
        defineProperties(Constructor.prototype, protoProps)
      }
      if (staticProps) {
        defineProperties(Constructor, staticProps)
      }
      if (privateProps)
        defineProperties(this, privateProps)
    }
  })()

  function checkIsNew (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('must be new')
    }
  }

  var Person = (function () {
    // 保留一个私有作用域
    var _sex = Symbol('sex')

    function Person (name, age, sex) {
      // 只能new,
      checkIsNew(this, Person)

      this.name = name

      // prototype的值，不可枚举

      _createClass(Person, [{
        key: 'sayInfo',
        value: function () { console.log(this.name, Person.age, this[_sex]) }
      }], [
        {
          key: 'age',
          value: age
        }
      ], [
        {
          key: _sex,
          value: sex
        }
      ])
    }




    return Person
  })()


  var tom = new Person('tom', 12, '男')

  console.log(tom) // { name: 'tom', [Symbol(sex)]: '男' }
  console.log(tom['__proto__']) // {}
  console.log(Object.getOwnPropertyNames(tom['__proto__'])) // [ 'constructor', 'sayInfo' ]

  tom.sayInfo() // tom 12 男
});

(function () {
  "use strict"

  var _createClass = (function () {
    function defineProperties (target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i]
        descriptor.numerable = descriptor.numberable || false
        descriptor.configurable = true
        if ('value' in descriptor) {
          descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
      }
    }

    return function (Constructor, protoProps, staticProps, privateProps) {
      if (protoProps) {
        defineProperties(Constructor.prototype, protoProps)
      }

      if (staticProps) {
        defineProperties(Constructor, staticProps)
      }
      if (privateProps)
        defineProperties(this, privateProps)
    }
  })()

  function _checkClass (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('must be Class')
    }
  }

  var Person = (function () {
    var _sex = Symbol()
    function Person (name, age, sex) {
      _checkClass(this, Person)
      this.name = name
      _createClass.call(this, Person, [{
        key: 'sayInfo',
        value: function () {
          console.log(this.name, Person.age, this[_sex])
        }
      }], [{
        key: 'age',
        value: age
      }], [{
        key: _sex,
        value: sex
      }])
    }


    return Person
  })()



  var tom = new Person('tom', 12, '男')
  console.log(tom) // { name: 'tom' }
  console.log(tom['__proto__']) // {}
  console.log(Object.getOwnPropertyNames(tom['__proto__'])) // [ 'constructor', 'sayName', 'sayAge', 'saySex' ]
  tom.sayInfo() // 'tom'
});

(function () {
  "use strict"
  //  创建 class
  var _createClass = (function () {
    function defineProperties (target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i]
        descriptor.enumerable = descriptor.enumerable || false
        descriptor.configurable = true
        if ('value' in descriptor) {
          descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
      }
    }

    return function (Constructor, instanceProps, protoProps, staticProps, privateProps) {
      if (instanceProps)
        defineProperties(this, instanceProps)

      if (protoProps)
        defineProperties(Constructor.prototype, protoProps)


      if (staticProps)
        defineProperties(Constructor, staticProps)


      if (privateProps)
        defineProperties(this, privateProps)
    }
  })()
  // 判断是否是new创建
  function _checkNew (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('must be new')
    }
  }

  var Person = (function () {
    var _sex = Symbol()
    function Person (name, age, sex) {
      _checkNew(this, Person)
      _createClass.call(this, Person, [{
        key: 'name',
        value: name,
        enumerable: true
      }], [{
        key: 'sayInfo',
        value: function () {
          console.log(this.name, Person.age, this[_sex])
        }
      }], [{
        key: 'age',
        value: age
      }], [{
        key: _sex,
        value: sex
      }])
    }

    return Person
  })()


  var tom = new Person('tom', 12, '男')
  console.log(tom) // { name: 'tom' }
  console.log(tom['__proto__']) // {}
  console.log(Object.getOwnPropertyNames(tom['__proto__'])) // [ 'constructor', 'sayInfo']
  tom.sayInfo() // tom 12 男
});


(() => {
  "use strict"
  var Person = (function () {
    const _sex = Symbol()

    var _checkNew = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('must be new')
      }
    }

    var _createClass = (function () {
      var defineProperties = function (target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i]
          descriptor.enumerable = descriptor.enumerable || false
          descriptor.configurable = true
          if ('value' in descriptor) {
            descriptor.writable = true
          }

          Object.defineProperty(target, descriptor.key, descriptor)
        }
      }

      return function (Constructor, instanceProps, protoProps, staticProps, privateProps) {
        if (instanceProps)
          defineProperties(this, instanceProps)
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps)
        if (staticProps)
          defineProperties(Constructor, staticProps)
        if (privateProps)
          defineProperties(this, privateProps)
      }
    })()

    function Person (name, age, sex) {
      _checkNew(this, Person)

      _createClass.call(this, Person, [{ key: 'name', value: name, enumerable: true }], [
        { key: 'sayInfo', value: function () { console.log(this.name, Person.age, this[_sex]) } }
      ], [{ key: 'age', value: age }], [{ key: _sex, value: sex }])
    }


    return Person
  })()
});

(() => {
  "use strict"

  var _checkNew = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError('must be new')
  }
  var _createClass = (function () {
    var defineProperties = function (target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i]
        descriptor.configurable = true
        descriptor.enumerable = descriptor.enumerable || false
        if ("value" in descriptor) {
          descriptor.writable = true
        }

        Object.defineProperty(target, descriptor.key, descriptor)
      }
    }

    return function (Constructor, instanceProps, protoProps, staticProps, privateProps) {
      if (instanceProps) defineProperties(this, instanceProps)
      if (protoProps) defineProperties(Constructor.prototype, protoProps)
      if (staticProps) defineProperties(Constructor, staticProps)
      if (privateProps) defineProperties(this, privateProps)
    }
  })()
  var Person = (function () {

    var Person = function (name) {
      _checkNew(this, Person)
      _createClass.call(this, Person, [{ key: 'name', value: name }])
    }

    return Person
  })()

  new Person('tom')

});

(() => {
  class Child extends Parent {
    constructor(name, age) {
      super(name, age)
      this.name = name
      this.age = age
    }

    getName () {
      return this.name
    }
  }


  class Parent {
    constructor(name, age) {
      this.name = name
      this.age = age
    }
    getName () {
      return this.name
    }
    getAge () {
      return this.age
    }
  }

  ///// 
  function _possibleConstructReturn (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return call && (typeof call === "object" || typeof call === 'function') ? call : self
  }

  function _inherits (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not" + typeof superClass)
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    })

    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass

  }

  var Child = function (_Parent) {
    _inherits(Child, _Parent)

    function Child (name, age) {
      _classCallCheck(this, Child)

      var _this = _possibleConstructReturn(this, Object.getPrototypeOf(Child).call(this, name, age))
      // 拿 父类 的 构造函数执行一遍，然后 返回的 this 拿给 子类用


      _this.name = name
      _this.age = age
      return _this
    }

    _createClass(Child, [{
      key: 'getName',
      value: function getName () {
        return this.name
      }
    }])

    return Child
  }(Parent)
});

(function () {
  var _inherits = function (subClass, superClass) {
    // 判断 sub 是否是 function
    if (typeof subClass !== 'function') throw new TypeError('subClass must be a function')
    // 判断 superClass 是否是 function 或者是 null()
    if (typeof superClass !== 'function' && superClass !== null) throw new TypeError('superClass must either be a function or null')

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        enumerable: false,
        configurable: true
      }
    })

    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass)

  }
  class Child extends Parent {
    constructor(name, age) {
      super(name, age)
      this.name = name
      this.age = age
    }
    getName () {
      return this.name
    }
  }

  class Parent {
    constructor(name, age) {
      this.name = name
      this.age = age
    }
    getName () {
      return this.name
    }
    getAge () {
      return this.age
    }
  }


  var _get = function get (object, property, receiver) {
    if (object === null) object = Function.prototype
    var desc = Object.getOwnPropertyDescriptor(object, property)
    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object)
      if (parent === null) {
        return undefined
      } else {
        return get(parent, property, receiver)
      }
    } else if ("value" in desc) {
      return desc.value
    } else {
      var getter = desc.get
      if (getter === undefined) {
        return undefined
      }
      return getter.call(receiver)
    }
  }


  var _set = function set (object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property)
    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object)
      if (parent !== null) {
        set(parent, property, value, receiver)
      }
    } else if ('value' in desc && desc.writable) {
      desc.value = value
    } else {
      var setter = desc.set
      if (setter !== undefined) {
        setter.call(receiver, value)
      }
    }
    return value
  }

})()