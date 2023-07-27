(() => {
  new Promise(resolve => {
    resolve();
    console.log(7);
  }).then(() => {
    console.log(8);
  });
  console.log(9);
  // 7 9 8
});

(() => {
  console.log(1);
  async function as1 () {
    await as2();
    console.log(2);
  }
  async function as2 () {
    console.log(3);
  }
  as1();
  // 1 3 2
});

(() => {
  console.log(1);
  async function as1 () {
    await as2();
    console.log(2);
    await as3();
    console.log(3);
  }
  async function as2 () {
    console.log(4);
  }
  async function as3 () {
    console.log(5);
  }
  as1();
  console.log(6);
  // 1 6 4 2 5 3 error
  // 1 4 6 2 5 3
});

(() => {
  console.log(1);
  setTimeout(function () {
    console.log(2);
    new Promise(function (resolve) {
      console.log(3);
      resolve();
    }).then(function () {
      console.log(4);
    });
  }, 0);
  new Promise(function (resolve) {
    console.log(5);
    resolve();
  }).then(function () {
    console.log(6);
  });
  console.log(7);
  // 1 5 7 6 2 3 4
});

(() => {
  console.log(1);
  async function async1 () {
    await async2();
    console.log(2);
    await async3();
    console.log(3);
  }
  async function async2 () {
    console.log(4);
  }
  async function async3 () {
    console.log(5);
  }
  async1();
  setTimeout(function () {
    console.log(6);
  }, 0);
  new Promise(resolve => {
    console.log(7);
    resolve();
  }).then(function () {
    console.log(8);
  }).then(function () {
    console.log(9);
  });
  // 1 4 7 8 6 2 5 9 3 error
  // 1 4 7 2 5 8 3 9 6
  // 微任务要执行完，才执行宏任务，setTimeout要一直等待
});

(() => {
  new Promise((resolve, reject) => {
    console.log(1);
    new Promise((resolve, reject) => {
      console.log(2);
      var set1 = setTimeout(() => {
        resolve(3);
        console.log(4);
      });
    }).then(data => {
      var set3 = setTimeout(() => {
        console.log(5);
      });
      console.log(data);
    });
    var set2 = setTimeout(() => {
      resolve(6);
      console.log(7);
    });
  }).then(data => {
    console.log(data);
    var set4 = setTimeout(() => {
      console.log(8);
    });
    console.log(9);
  });
  // 栈：1 2 set1 4 3 set2 7 6 9 set3 5 set4 8
  // 宏：set1 set2 set3 set4
  // 微：set1.resolve set2.resolve()
  // 1 2 4 3 7 6 9 5 8
  // 宏任务一定要等微任务执行完，才能执行
});

(() => {
  setTimeout(() => {
    console.log(1);
  }, 1000);
  new Promise(function (resolve) {
    console.log(2);
    for (var i = 0; i < 10000; i++) {
      i == 99 && resolve();
    }
  }).then(function () {
    console.log(3);
  });
  console.log(4);


  // 2 4  3 1
});

(() => {
  console.log('script start');

  setTimeout(() => {
    console.log('time1');
  }, 1 * 2000);

  Promise.resolve()
    .then(function () {
      console.log('promise1');
    }).then(function () {
      console.log('promise2');
    });


  async function foo () {
    await bar();
    console.log('async1 end');
  }
  foo();

  async function errorFunc () {
    try {
      await Promise.reject('error!!!');
    } catch (e) {
      console.log(e);
    }
    console.log('async1');
    return Promise.resolve('async1 success');
  }
  errorFunc().then(res => console.log(res));

  function bar () {
    console.log('async2 end');
  }

  console.log('script end');

  // script start
  // async2 end
  // script end
  // promise1
  // async1 end
  // error!!!
  // async1
  // promise2
  // async1 success
  // time1
});

(() => {
  setTimeout(() => {
    console.log(1);
  }, 0);

  const P = new Promise((resolve, reject) => {
    console.log(2);
    setTimeout(() => {
      resolve();
      console.log(3);
    }, 0);
  });

  P.then(() => {
    console.log(4);
  });
  console.log(5);

  // 2 5 1 3 4
});

(() => {
  var p1 = new Promise(function (resolve, reject) {
    resolve("2");
  });

  setTimeout(function () {
    console.log("1");
  }, 10);

  p1.then(function (value) {
    console.log(value);
  });

  setTimeout(function () {
    console.log("3");
  }, 0);

  // 2 3 1
})();


// 事件列表 事件队列