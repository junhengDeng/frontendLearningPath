"use strict";
(() => {
    function* gen() {
        yield 'a';
        yield 'b';
        return 'c';
    }
    const charts = gen();
    console.log(typeof charts[Symbol.iterator] === 'function');
    console.log(typeof charts.next === 'function');
    console.log(charts[Symbol.iterator]() === charts); // ???? 生成器执行之后，迭代对象一直是本身?
    console.log(Array.from(charts));
    console.log([...charts]);
    console.log(charts[Symbol.iterator]()[Symbol.iterator]()[Symbol.iterator]() === charts); // 确实是的，这个迭代器永远是自己，应该是有个私有域
    const charts1 = gen();
    console.log(charts === charts1); // 再次执行另一个就不是了
    // 迭代这个生成器返回的序列值中不包含字符’c'
    // 返回done:false的值
});
(() => {
    // 生成器真正强大的地方，不仅每次迭代有返回值，而且还能接收返回值
    function* gen1(x) {
        console.log(1);
        const y = x * (yield);
        console.log(2);
        return y;
        console.log(3);
    }
    console.log(4);
    const it = gen1(6);
    console.log(5);
    // it.next();
    // console.log(6);
    // it.next(7)
    // console.log(7);
});
// 手写generator核心原理
(() => {
    function* foo() {
        yield 'result';
        yield 'result2';
        yield 'result3';
    }
    const gen = foo();
    console.log(gen.next()); //{value: "result1", done: false}
    console.log(gen.next()); //{value: "result2", done: false}
    console.log(gen.next()); //{value: "result3", done: false}
    console.log(gen.next()); //{value: undefined, done: true}
});
(() => {
    // 双指针？
    var context = {
        prev: 0,
        next: 0,
    };
    function gen$(context) {
        while (1) {
            switch (context.prev = context.next) {
                case 0:
                    context.next = 2;
                    return 'result1';
                case 2:
                    context.next = 4;
                    return 'result2';
                case 4:
                    context.next = 6;
                    return 'result3';
                case 6:
                    return undefined;
            }
        }
    }
    let foo = function () {
        return {
            next: function () {
                value = gen$(context);
                return {
                    value,
                    done
                };
            }
        };
    };
});
