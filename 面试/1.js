
(function () {

  function isFunction (val) {
    return Object.prototype.toString.call(val) === '[object Function]'
  }
  function isObject (val) {
    return Object.prototype.toString.call(val) === '[object Object]'
  }
  function isArray (val) {
    return Object.prototype.toString.call(val) === '[object Array]'
  }
  function isSet (val) {
    return Object.prototype.toString.call(val) === '[object Set]'
  }
  function isMap (val) {
    return Object.prototype.toString.call(val) === '[object Map]'
  }
  function isSymbol (val) {
    return Object.prototype.toString.call(val) === '[object Symbol]'
  }
  function isDate (val) {
    return Object.prototype.toString.call(val) === '[object Date]'
  }

  function ArrayBuffer (val) {
    return Object.prototype.toString.call(val) === '[object ArrayBuffer]'
  }

  const forEachValue = (obj, fn) => Object.keys(obj).forEach(key => fn(obj[key], key))


  function eq (a, b, aStack, bStack) {

    // === 结果为 true 的区别出 +0 和 -0
    if (a === b) return a !== 0 || 1 / a === 1 / b

    // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
    if (a == null || b == null) return false

    // 判断 NaN
    if (a !== a) return b !== b

    // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
    var type = typeof a
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false

    // 更复杂的对象使用 deepEq 函数进行深度比较
    return deepEq(a, b, aStack, bStack)
  };

  function deepEq (a, b, aStack, bStack) {

    // a 和 b 的内部属性 [[class]] 相同时 返回 true
    var className = toString.call(a)
    if (className !== toString.call(b)) return false

    switch (className) {
      case '[object RegExp]':
      case '[object String]':
        return '' + a === '' + b
      case '[object Number]':
        if (+a !== +a) return +b !== +b
        return +a === 0 ? 1 / +a === 1 / b : +a === +b
      case '[object Date]':
      case '[object Boolean]':
        return +a === +b
    }

    var areArrays = className === '[object Array]'
    // 不是数组
    if (!areArrays) {
      // 过滤掉两个函数的情况
      if (typeof a != 'object' || typeof b != 'object') return false

      var aCtor = a.constructor,
        bCtor = b.constructor
      // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
      if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
        return false
      }
    }


    aStack = aStack || []
    bStack = bStack || []
    var length = aStack.length

    // 检查是否有循环引用的部分
    while (length--) {
      if (aStack[length] === a) {
        return bStack[length] === b
      }
    }

    aStack.push(a)
    bStack.push(b)

    // 数组判断
    if (areArrays) {

      length = a.length
      if (length !== b.length) return false

      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false
      }
    }
    // 对象判断
    else {

      var keys = Object.keys(a),
        key
      length = keys.length

      if (Object.keys(b).length !== length) return false
      while (length--) {

        key = keys[length]
        if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) return false
      }
    }

    aStack.pop()
    bStack.pop()
    return true

  }

  function deepClone (val, weakMap = new WeakMap()) {

    if (isDate(val)) return new Date(+val)

    if (isMap(val)) {
      const map = new Map()
      for (const item of val) map.set(deepClone(item[0], weakMap), deepClone(item[1], weakMap))
      return map
    }

    if (isSet(val)) {
      const set = new Set()
      val.forEach(item => set.add(deepClone(item), weakMap))
      return set
    }

    if (isSymbol(val)) return Symbol(val.description)

    if (isFunction(val)) {
      if (/^function|^\(\)/.test(val.toString())) {
        return new Function(`return ${val.toString()}`)()
      } else {
        return new Function(`return function ${val.toString()}`)()
      }
    }

    if (typeof val !== 'object' || val == null) return val

    const obj = isArray(val) ? [] : {}

    if (weakMap.has(val)) return weakMap.get(val)

    weakMap.set(val, obj)
    forEachValue(val, (val, key) => obj[key] = deepClone(val, weakMap))

    const symbols = Object.getOwnPropertySymbols(val)
    forEachValue(symbols, key => obj[Symbol(key.description)] = deepClone(symbols[key], weakMap))

    return obj
  }


  function mergeArrays (array1, array2, attr) {
    const result = []

    let arr1 = deepClone(array1)
    let arr2 = deepClone(array2)


    let arr1Length = arr1.length
    let arr2Length = arr2.length

    while (arr1Length > 0 || arr2Length > 0) {
      if (arr1Length < 1) {
        // 说明 arr1 已经遍历完了，arr2 还有剩余
        result.push([null, arr2.shift()])
        arr2Length--
      } else if (arr2Length < 1) {
        // 说明 arr2 已经遍历完了，arr1 还有剩余
        result.push([arr1.shift(), null])
        arr1Length--
      } else {
        const a1 = arr1.shift()
        arr1Length--

        const a2Index = arr2.findIndex(a2 => eq(
          (attr ? a1[attr] : a1),
          (attr ? a2[attr] : a2)
        ))
        let a2 = null
        if (a2Index > -1) {
          a2 = arr2.splice(a2Index, 1)[0]
          arr2Length--
        }
        result.push([a1, a2])

      }
    }

    return result
  }


  const arr1 = [1, 1, 2, 3, 3, 4]
  const arr2 = [1, 2, 3, 4, 4, 5]

  const result1 = mergeArrays(arr1, arr2)

  console.log(result1)


  const arr3 = [1, 1, 2, 3, 3, 4]
  const arr4 = [2, 1, 3, 4, 4, 5]

  const result2 = mergeArrays(arr3, arr4)

  console.log(result2)

  const arr5 = [{ a: 1, b: 2 }, { a: 2, b: 2, c: 3 }, { a: 3 }]
  const arr6 = [{ a: 1 }, { a: 3, b: 4 }, { a: 4 }]
  const result3 = mergeArrays(arr5, arr6, 'a')

  console.log(result3)
  console.log(arr6)

})()