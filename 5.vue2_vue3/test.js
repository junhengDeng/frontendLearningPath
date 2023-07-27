(() => {
  function renderer (vnode, container) {
    if (typeof vnode.tag === 'string') {
      mountElement(vnode, container);
    } else if (typeof vnode.tag === 'object') {
      mountComponent(vnode, container);
    }
  }

  function mountElement (vnode, container) {
    const el = document.createElement(vnode.tag);
    for (let key in vnode.props) {
      if (/^on/.test(key)) {
        el.addEventListener(key.substr(2).toLowerCase(), vnode.props[key]);
      }
    }

    container.appendChild(el);
  }
  function mountComponent (vnode, container) {
    const subtree = vnode.tag.render();
    renderer(subtree, container);
  }

});

(() => {
  const bucket = new WeakMap();
  let activeEffect;

  var data = { text: 'hello world' };

  var obj = new Proxy(data, {
    get (target, key) {
      track(target, key);
      return target[key];
    },
    set (target, key, newVal) {
      target[key] = newVal;
      trigger(target, key);
    }
  });
  /**
   * 追踪变化
   * @param {*} target 
   * @param {*} key 
   * @returns 
   */
  function track (target, key) {
    if (!activeEffect) return target[key];

    let depsMap = bucket.get(target);
    if (!depsMap) {
      bucket.set(target, (depsMap = new Map()));
    }
    let deps = depsMap.get(key);
    if (!deps) {
      depsMap.set(key, deps = new Set());
    }
    deps.add(activeEffect);
  }
  /**
   * 触发变化
   * @param {*} target 
   * @param {*} key 
   * @returns 
   */
  function trigger (target, key) {
    const depsMap = bucket.get(target);
    if (!depsMap) return;
    const effects = depsMap.get(key);
    effects && effects.forEach(fn => fn());
  }

  /**
   * 封装一下effect，让其匿名函数也能执行
   * @param {*} fn 
   */
  function effect (fn) {
    activeEffect = fn;
    fn();
  }
  // effect();
  effect(
    () => {
      console.log('effect run');
      document.body.innerText = obj.text;
    }
  );

  setTimeout(() => {
    obj.notExist = 'hello vue3';
  }, 1000);
});


(() => {
  bucket;
  activeEffect;
  effect;
  track;
  trigger;


  var bucket = new WeakMap();

  var activeEffect;

});

(() => {
  // 单个对象
  (() => {
    const depsMap = new Map();
    const person = { name: '林三心', age: 22 };
    function track (key) {
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = new Set());
      }
      // 这里先暂且写死
      if (key === 'name') {
        dep.add(effectNameStr1);
        dep.add(effectNameStr2);
      } else {
        dep.add(effectAgeStr1);
        dep.add(effectAgeStr2);
      }

    }
    function trigger (key) {
      const dep = depsMap.get(key);
      if (dep) {
        dep.forEach(effect => effect());
      }
    }
  });

  // 多个对象
  (() => {

    const animal = { type: 'dog', height: 50 };

    const targetMap = new WeakMap();
    function track (target, key) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = new Set());
      }
      // 这里先暂且写死
      if (target === person) {
        if (key === 'name') {
          dep.add(effectNameStr1);
          dep.add(effectNameStr2);
        } else {
          dep.add(effectAgeStr1);
          dep.add(effectAgeStr2);
        }
      } else if (target === animal) {
        if (key === 'type') {
          dep.add(effectTypeStr1);
          dep.add(effectTypeStr2);
        } else {
          dep.add(effectHeightStr1);
          dep.add(effectHeightStr2);
        }
      }
    }
    function trigger (target, key) {
      let depsMap = targetMap.get(target);
      if (depsMap) {
        let dep = depsMap.get(key);
        dep.forEach(effect => effect());
      }
    }
  });
  // 手动触发变成Proxy
  // 写个reactive函数
  (() => {
    function reactive (target) {
      const handler = {
        get (target, key, recevier) {
          track(target, key);
          // return target[key];
          return Reflect.get(target, key, recevier);
        },
        set (target, key, newVal, recevier) {
          Reflect.set(target, key, newVal, recevier);
          trigger(target, key);
        }
      };

      return new Proxy(target, handler);
    }
  });
  // activeEffect
  (() => {
    let activeEffect = null;
    function effect (fn) {
      activeEffect = fn;
      fn();
      activeEffect = null;
    }
    let targetMap = new WeakMap();
    function track (target, key) {
      if (!activeEffect) return;
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = new Set());
      }
      dep.add(activeEffect);
    }
  });
  // ref
  (() => {
    let num = ref(5);
    console.log(num.value); // 5
    // ref 将某个数据变成响应式
    function ref (initValue) {
      return reactive({
        value: initValue
      });
    }
  });
  // computed
  (() => {
    function computed (fn) {
      const result = ref();
      effect(() => result.value = fn());
      return result;
    }
  });
  // 最终代码
  (() => {
    const bucket = new WeakMap();
    let activeEffect = null;

    function effect (fn) {
      activeEffect = fn;
      fn();
      activeEffect = null;
    }
    function track (target, key) {
      let depsMap = bucket.get(target);
      if (!depsMap) {
        bucket.set(target, depsMap = new Map());
      }
      let deps = depsMap.get(key);
      if (!deps) {
        depsMap.set(key, deps = new Set());
      }

      deps.add(activeEffect);
    }
    function trigger (target, key) {
      const depsMap = bucket.get(target);
      if (depsMap) {
        const deps = depsMap.get(key);
        if (deps) {
          deps.forEach(effect => effect());
        }
      }
    }
    function reactive (target) {
      const handler = {
        get (target, key, recevier) {
          track(target, key);
          return Reflect.get(target, key, recevier);
        },
        set (target, key, value, recevier) {
          Reflect.set(target, key, value, recevier);
          trigger(target, key);
        }
      };

      return new Proxy(target, handler);
    }
    function ref (initValue) {
      return reactive({
        value: initValue
      });
    }

    function computed (fn) {
      const result = ref();
      effect(() => result.value = fn());
      return result;
    }
  });
  // Reflect
  (() => {
    // get(target, key, recevier)   访问target的key属性，但是this是recevier 注意不是receiver[key]
    // set也一样，set(target, key, value, receiver) 设置的是target的key属性为value，但是this指向receiver
  });
});

(() => {
  function sor (arr) {
    let res = [];

    for (let i = 0; i < arr.length; i++) {
      let max = arr[i];
      for (let j = i + 1; j < arr.length; j++) {
        max = Math.max(max, arr[j]);
      }
      res.push(max);
    }
    return res;
  }
});


(() => {
  const bucket = new WeakMap();
  let activeEffect = null;
  function effect (fn) {
    activeEffect = fn;
    fn();
    activeEffect = null;
  }
  function track (target, key) {
    let depsMap = bucket.get(target);
    if (!depsMap) bucket.set(target, depsMap = new Map());
    let deps = depsMap.get(key);
    if (!deps) depsMap.set(key, deps = new Set());
    deps.add(effect);
  }
  function trigger (target, key) {
    const depsMap = bucket.get(target);
    if (depsMap) {
      const deps = depsMap.get(key);
      if (deps) {
        deps.forEach(effect => effect());
      }
    }
  }
  function reactive (target) {
    const handler = {
      get (target, key, receiver) {
        track(target, key);
        return Reflect.get(target, key, receiver);
      },
      set (target, key, value, receiver) {
        Reflect.set(target, key, value, receiver);
        trigger(target, key);
      }
    };
    return new Proxy(target, handler);
  }
  function ref (initValue) {
    return reactive({
      value: initValue
    });
  }
  function computed (fn) {
    var result = ref();
    effect(() => {
      result.value = fn();
    });
    return result;
  }
});