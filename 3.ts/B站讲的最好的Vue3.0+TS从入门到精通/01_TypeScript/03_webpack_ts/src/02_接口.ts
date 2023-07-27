// typescript的核心原则之一是对值所具有的结构进行类型检查。我们使用接口（Interface)来定义对象的类型

interface IPerson {
  readonly id: number,
  name: string,
  age: number,
  sex?: string
}

const Peson1: IPerson = {
  id: 1,
  name: 'tom',
  age: 20,
  sex: '男'
}

/**
 * 接口可以描述函数类型（参数的类型与返回的类型）
 */
interface SearchFunc {
  (source: string, substring: string): boolean
}
const mySearch: SearchFunc = function (source: string, sub: string): boolean {
  return source.search(sub) > -1
}

console.log(mySearch('abcd', 'cd'));


// 一个类实现多个接口
interface Alarm {
  alert(): any;
}
interface Light {
  lightOn(): void,
  lightOff(): void
}

class Car implements Alarm {
  alert() {
    console.log('Car alert')
  }
}

class Car2 implements Alarm, Light {
  alert() { }
  lightOn() { }
  lightOff() { }
}

interface LightableAlarm extends Alarm, Light {

}

class Car3 implements LightableAlarm {
  alert() { }
  lightOn() { }
  lightOff() { }
}