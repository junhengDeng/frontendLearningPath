(function () {
  function cloneDeep (origin, hash = new WeakMap()) {
    if (typeof origin !== 'object' || origin === null) return origin

    if (hash.has(origin)) return hash.get(origin)

    let target = Array.isArray(origin) ? [] : {}
    const AllKeys = Object.getOwnPropertyNames(origin).concat(Object.getOwnPropertySymbols(origin))

    for (let key in Object.keys(AllKeys)) {
      target[key] = cloneDeep(origin[key], hash)
    }
    hash.set(origin, target)

    return target
  }


  function cloneDeep (origin, hash = new WeakMap()) {
    // 判断类型
    // 所有键名
    // 解决无限循环
    if (typeof origin !== 'object' || origin === null) return origin

    if (hash.has(origin)) return hash.get(origin)

    const target = Array.isArray(target) ? [] : {}
    const AllKeys = Object.getOwnPropertyNames(origin).concat(Object.getOwnPropertySymbols(origin))

    for (let key in AllKeys) {
      target[key] = cloneDeep(origin[key])
    }

    hash.set(origin, target)

    return target
  }
})()


