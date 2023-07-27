(() => {
  let flag: boolean = true;
  let num1: number = 1;
  let str1: string = '123'
  let und: undefined = undefined;
  console.log(str1 + num1)
  let nul: null = null;

  // 数组
  let list: Array<number> = [1, 2, 3]
  let list1: number[] = [1, 2, 3, 4]
  // 元组 Tuple 类型和数据个数已经确定好了
  let t1: [string, number] = ['1,', 2]
  // 枚举 enum
  enum Sex {
    girl,
    boy
  }
  let mySex: Sex = Sex.boy;
  enum Color {
    Red = 1,
    Green = 2,
    Blue = 4
  }
  let c: Color = Color.Green;
  let colorName: string = Color[2];
  console.log(c, colorName);
  // any
  let notSure: any = 4;
  notSure = 'maybe a string'
  // void
  // object 表示非原始类型， 更好的表示像 Object.create
  function fn2(obj: object): object {
    console.log('fn2()', obj)
    return {}
  }
  console.log(fn2(new String('abc')));
  console.log(fn2(String))
  // 联合类型
  function toString2(x: number | string): string {
    return x.toString();
  }
  // function getLength(x: number | string) {
  //   if (x.length) {
  //     return x.length;
  //   } else {
  //     return x.toString().length;
  //   }
  // }
  // 类型断言 
  // 方式一：<类型>值
  // 方式二：值 as 类型 tsx中只能用这种方式
  function getLength(x: number | string) {
    if ((<string>x).length) {
      return (x as string).length
    } else {
      return x.toString().length;
    }
  }
  console.log(getLength('abcd'), getLength(1234));
  // 类型推断
  // 没有明确的指定类型的时候
  let b9 = 123;
})()