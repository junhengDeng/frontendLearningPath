(() => {
  // console.log('1111')
  // 接口是对象的状态（属性）和行为（方法）的抽象（描述）

  interface IPerson {
    readonly id: number,
    name: string,
    age: number,
    sex?: string
  }

  const tom: IPerson = {
    id: 1,
    name: '下天天',
    age: 18,
    // sex: '男'
    // xxx: 12 // error 没有在接口定义，不能有
  }

  // 函数类型(参数的类型与返回的类型)
  interface SearchFunc {
    (source: string, subString: string): boolean
  }

  const mySearch: SearchFunc = function (source, sub) {
    return source.search(sub) > -1
  }

  console.log(mySearch('12321321', '4'))

  interface Alarm {
    alert(): any;
  }

  interface Light {
    lightOn(): void;
    lightOff(): void;
  }

  interface LightableAlarm extends Alarm, Light { // 继承

  }

  // implements 工具，执行，贯彻

  class Car implements Alarm {
    alert() {
      console.log()
    }
  }
  class Lights implements Alarm, Light {
    alert() { }
    lightOn() {

    }
    lightOff() {

    }
  }


  // 对象
  interface O {
    name?: string;
    readonly id: number;
  }

  const t: O = {
    name: 'sdd',
    id: 123
  }
  // 函数
  interface F {
    (x: string, y: string): void
  }
  // function fn:F(x, y) {}
  const fn: F = function () { }
  // 继承
  interface A extends O, F { }
  // 类
  interface C1 {
    alert(): void;
  }
  class C2 implements C1 {
    alert() { }
  }
})()