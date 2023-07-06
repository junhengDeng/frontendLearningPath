function A () {
  this.x = 1
}

var B = function (_A) {
  _inherits(B, _A)

  function B () {
    _classCallCheck(this, B)

    var _this = _possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).call(this))

    _this.x = 2
    _set(B.prototype.__proto__ || Object.getPrototypeOf(B.prototype), 'x', 3, _this)
    console.log(_get(B.prototype.__proto__ || Object.getPrototypeOf(B.prototype), 'x', _this)) // undefined
    console.log(_this.x) // 3
    return _this
  }

  return B
}(A)

function _possibleConstructorReturn (self, call) {
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

function _classCallCheck (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('must be new')
  }
}


var _set = function set (object, property, value, receiver) {
  // var desc = Object.getOwnPropertyDescriptor(object, property)
  // if (desc === undefined) {
  //   console.log(111)
  //   var parent = Object.getPrototypeOf(object)
  //   if (parent !== null) {
  //     set(parent, property, value, receiver)
  //   }
  // } else if ('value' in desc && desc.writable) {
  //   console.log(222)
  //   desc.value = value
  // } else {
  //   var setter = desc.set
  //   console.log(setter, 'setter')
  //   if (setter !== undefined) {
  //     setter.call(receiver, value)
  //   }
  // }
  // return 
  Object.defineProperty(A.prototype, 'x', {
    set: function (value) {
      this._x = value
    }
  })
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


let b = new B()

// _set(Object.getPrototypeOf(B.prototype), 'x', 3, _this)


// var _set = function set (object, property, value, receiver) {
//   var desc = Object.getOwnPropertyDescriptor(object, property) // A.prototype x
//   if (desc === undefined) {
//   } else if ('value' in desc && desc.writable) { // 不在
//     desc.value = value
//   } else {
//     var setter = desc.set
//     if (setter !== undefined) {
//       setter.call(receiver, value)
//     }
//   }
//   return value
// }