// 函数:封装了一些重复使用的代码，在需要的时候直接调用即可
(() => {
  // 函数声明，命名函数
  function add(x: string, y: string): string {
    return x + y
  }
  const result: string = add('11', '22')
  console.log(result);

  const add2 = function (x: number, y: number): number {
    return x + y;
  }
  const result2: number = add2(11, 22)
  console.log(result2);

  // 书写完整函数类型
  let myAdd2: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y
  }

  // 函数表达式，匿名函数

  // 可选参数和默认参数
  function buildName(firstName: string = 'A', lastName?: string) { }
  // 剩余参数
  function info(x: string, ...args: string[]) { }
  // 函数重载
  function add(x: string, y: string): string
  function add(x: number, y: number): number
  function add(x: string | number, y: string | number): string | number {
    if (typeof x === 'string' && typeof y === 'string') {
      return x + y;
    } else if (typeof x === 'number' && typeof y === 'number') {
      return x + y;
    }
  }

  console.log(add(1, 2))
  console.log(add('a', 'b'));

})()