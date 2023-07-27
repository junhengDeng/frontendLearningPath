// 泛型
// 指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定具体类型的一种特性

function createArray(value: any, count: number): any[] {
  const arr: any[] = [];
  for (let index = 0; index < count; index++) {
    arr.push(value)
  }
  return arr;
}

const arr1 = createArray(11, 3);
const arr2 = createArray('aa', 3)

console.log(arr1[0].toFixed(), arr2[0].split(''))

function createArray2<T>(value: T, count: number) {
  const arr: Array<T> = [];
  for (let index = 0; index < count; index++) {
    arr.push(value)
  }
  return arr;
}
const arr3 = createArray2<number>(11, 3);
const arr4 = createArray2<string>('aa', 3);
console.log(arr3[0].toFixed(), arr4[0].split(''))


function swap<K, V>(a: K, b: V): [K, V] {
  return [a, b]
}
const result = swap<string, number>('abc', 123);
console.log(result[0].length, result[1].toFixed());


// 在定义接口时，为接口中的属性或方法定义泛型类型
// 在使用接口时，再指定具体的泛型类型
interface IbaseCRUD<T> {
  data: T[]
  add: (t: T) => void,
  getById: (id: number) => T | undefined
}

class User {
  id?: number
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class UserCRUD implements IbaseCRUD<User> {
  data: User[] = []
  add(user: User): void {
    user = { ...user, id: Date.now() }
    this.data.push(user)
    console.log('保存user', user.id);
  }
  getById(id: number): User | undefined {
    return this.data.find(item => item.id === id)
  }
}

const userCRUD = new UserCRUD()
userCRUD.add(new User('tom', 12))
userCRUD.add(new User('tom2', 13))
console.log(userCRUD.data);

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T
}
let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
}

let myGenericString = new GenericNumber<string>()
myGenericString.zeroValue = 'abc';
myGenericString.add = function (x, y) {
  return x + y
}

// 泛型约束
function fn<T>(x: T): void {
  // console.log(x.length)
}

interface Lengthwise {
  length: number;
}
function fn2<T extends Lengthwise>(x: T): void {
  console.log(x.length)
}

fn2('abc');

(() => {
  function getArr(value: number, count: number): number[] {
    const arr: number[] = [];
    for (let index = 0; index < count; index++) {
      arr.push(value)
    }

    return arr
  }

  const arr1 = getArr(100, 2);
  // const arr2 = getArr('123', 2);

  function getArr1<T>(value: T, count: number): T[] {
    const arr: T[] = [];
    for (let index = 0; index < count; index++) {
      arr.push(value)
    }
    return arr;
  }


  const arr3 = getArr1<number>(12, 1)

  function getMsg<K, V>(value: K, value2: V): [K, V] {
    return [value, value2]
  }
  getMsg<string, number>('1', 2)

});