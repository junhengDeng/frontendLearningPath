"use strict";
// iterator 迭代器
(() => {
    const items = [1, 2, 3, 4, 5, 6];
    const sequence = {
        [Symbol.iterator]() {
            let i = 0;
            return {
                next() {
                    const value = items[i];
                    i++;
                    const done = i > items.length;
                    return { value, done };
                }
            };
        }
    };
    for (let i of sequence) {
        console.log(i);
    }
    console.log([...sequence]);
    console.log(Array.from(sequence));
})();
