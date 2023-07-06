// 基础类型
(() => {
  // boolean
  let isDone: boolean = true;
  isDone = false;
  // 数字
  let a1: number = 1;
  let a2: number = 0b1010;

  // 字符串
  let name: string = 'tom';

  // undefined 和 null// 用处不大
  let u: undefined = undefined;
  let n: null = null;
  // undefined 和 null 可以复制给其他类型的变量，例如number的变量
  // let n2: number = null; // 要将 tsconfig.json 的 strictly: false

  // 数组
  let list1: number[] = [1, 2, 3]
  let list2: Array<number> = [1, 2, 3] // 泛型的写法

  // 元组 已知数量和类型的 数组
  let t1: [string, number]
  t1 = ['hello', 10];
  // t1 = [10, 'hello'];

  // 枚举
  // 有些数据非常常用，且个数是固定的
  // 枚举类型，枚举里面的每个数据值都可以叫元素，每个元素都有自己的编号，编号是从0开始的，依次的增加1
  enum Color {
    red = 1,
    green,
    blue
  }
  // 定义一个Color的枚举类型的变量来接受枚举的值
  let color: Color = Color.red;
  console.log(color) // 1
  console.log(Color.red, Color.green, Color.blue) // 1 2 3
  console.log(Color[3])// blue
  // 小例子
  enum Gender {
    女,
    男
  }
  console.log(Gender.男) // 1
  // any
  // 不清楚类型的变量指定一个类型
  // any[] Array<any>
  let list3: any[] = [1, true, 'free']

  // void
  // 表示没有任何类型
  function fn(): void {
    console.log('11')
  }

  // object
  // object 表示 非原始类型，就是除 Number,String,boolean之外的类型
  function fn2(obj: object): object {
    return {}
  }

  // 联合类型
  function toString2(x: number | string): string {
    return x.toString()
  }
  // function getLength(x: number | string) {
  //   if (x.length) { // error;
  //     return x.length;
  //   } else {
  //     return x.toString();
  //   }
  // }

  // 类型断言
  // 相信我，我知道自己在干什么
  // 可以用来手动指定一个值的类型
  // 1.<类型>值
  // 2.值 as 类型
  function getLength(x: number | string) {
    if ((<string>x).length) {
      return (x as string).length
    } else {
      return x.toString().length
    }
  }

  // 类型推断
  let b9 = 123; // 推断出 number
  // b9 = 'abc' // error

  let b10; // 推断出 any
  b10 = '123';
  b10 = 123;



  // 1.string: let s: string = '1'
  // 2.number: let n: number = 1
  // 3.boolean: let b: boolean = true
  // 4.array: let a1:number[] = []; let a1:Array<number> = [] let a1:any[] = []
  // 5.null 和 undefined let n1: null = null; let n1:undefined = undefined
  // 6.any let a2:any = 1
  // 7.Turple let y1:[string,number,boolean]
  //   枚举 enum Person { 女,男}
  // 8.object let o1: object = {}
  // 9.void function toString():void{}
  // 10. 联合类型 function getLength(x:string|number) {}
  // 11. 类型断言 function getLength(x:string|number) {if ((<string>x).length) {return (x as string).length} else { return x.toString() }}
  // 12. 类型推断 let x = 1; // number let x; // any
})()