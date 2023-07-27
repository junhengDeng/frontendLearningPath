// iterator 迭代器
(() => {
  interface IteratorResult {
    done: Boolean;
    value: any;
  }
  interface Iterator {
    next(): IteratorResult;
  }
  interface Iteratable {
    [Symbol.iterator](): Iterator;
  }
  const items: number[] = [1, 2, 3, 4, 5, 6]
  const sequence = {
    [Symbol.iterator]<Iteratable>() {
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
  console.log(Array.from(sequence))


})();
