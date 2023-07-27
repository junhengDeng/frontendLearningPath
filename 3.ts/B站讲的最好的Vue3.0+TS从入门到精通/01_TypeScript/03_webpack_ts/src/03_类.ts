// 对于传统的javascript程序我们会使用函数和基于原型的继承来创建可重用的组件，单对于熟悉使用面向对象方式的程序员使用这些语法就有些几首，因为他们用的是基于类的继承并且对象是由类构建出来的。

class Greeter {
  message: string
  constructor(message: string) {
    this.message = message;
  }

  greet(): string {
    return 'Hello ' + this.message
  }
}

const greeter = new Greeter('world')
console.log(greeter.greet())

// class Animal {
//   run(distance: number) {
//     console.log(`animal run ${distance} m`)
//   }
// }

// class Dog extends Animal {
//   cry() {
//     console.log('wang! wang!')
//   }
// }

// const dog = new Dog();
// dog.cry();
// dog.run(100)


class Animal {
  name: string
  constructor(name: string) {
    this.name = name;
  }

  run(distance: number = 0) {
    console.log(`${this.name} run ${distance}m`)
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name)
  }

  run(distance: number = 5) {
    console.log('sliding...')
    super.run(distance)
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name)
  }
  run(distance: number = 5) {
    console.log('dashing...')
    super.run(distance)
  }

  xxx() {
    console.log('xxx()')
  }
}

const snake = new Snake('sn');
snake.run()

const horse = new Horse('ho');
horse.run()

// 父类型的引用指向子类型的实例 ===》 多态
const tom: Animal = new Horse('ho22');
tom.run()

// 子类型的引用指向父类型的实例
const tom3: Snake = new Animal('tom3');
tom3.run();

// 子类型有扩展的方法，所以不能指向夫类型的实例
// const tom2: Horse = new Animal('tom2');
// tom2.run();

// public: 默认值，公开的外部也可以访问
// private: 只能类内部可以访问
// protected: 类内部和子类可以访问
// static: 

class Animal1 {
  public name: string

  public constructor(name: string) {
    this.name = name;
  }
  public run(distance: number = 0) {
    console.log(`${this.name} run ${distance}m`)
  }
}

class Person extends Animal1 {
  private age: number = 18
  protected sex: string = '男'

  run(distance: number = 5) {
    console.log('Person jumping...')
    super.run(distance)
  }
}

class Student extends Person {
  run(distance: number = 6) {
    console.log('Student jumping...');
    console.log(this.sex);
    // console。log(this.age)
    super.run(distance)
  }
}

console.log(new Person('abc').name)
// console.log(new Person('abc').sex)
// console.log(new Person('abc').age)

// readonly
class Person1 {
  constructor(readonly name: string) {
    this.name = name;
  }
}
let john = new Person1('John');
// john.name = 'peter' 

// 存取器
class Person2 {
  firstName: string = 'A'
  lastName: string = 'B'

  get fullName() {
    return this.firstName + '-' + this.lastName
  }
  set fullName(value) {
    const names = value.split('-');
    this.firstName = names[0];
    this.lastName = names[1];

  }
}

const p = new Person2();
console.log(p.fullName);

p.firstName = 'C';
p.lastName = 'D';
console.log(p.fullName);

p.fullName = 'E-F';
console.log(p.firstName, p.lastName);

// 静态属性
class Person3 {
  name1: string = 'A'
  static name2: string = 'B'
}
console.log(Person3.name2);
console.log(new Person3().name1);

// 抽象类
// 不能被实例化，不同于接口，可以包含成员的实现细节。用于定义抽象类和在抽象类内部定义抽象方法
abstract class Animal2 {
  abstract cry(): void;

  run() {
    console.log('run()')
  }
}

class Dog extends Animal2 {
  // 重新实现抽象类的方法
  cry() {
    console.log('Dog cry()');
  }
}

const dog = new Dog();
dog.cry();
dog.run();

// var Parent: any = (function () {
//   var Perent = function (name: string) {
//     _checkClassCall(this, Parent);
//     _createClass.call(this, Person,)
//   }
//   return Parent();
// })()

// var Son = (function (Parent) {
//   _inherits(Son, Parent)
//   function Son(name: string) {
//     _checkClassCall(this, Parent);
//     var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Son).call(this, name))
//     _createClass.call(_this, Person,)
//     return _this;
//   }
// })(Parent)