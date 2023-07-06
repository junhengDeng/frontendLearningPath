(() => {
  // 面向对象的编程思想


  // class Greeter {
  //   message: string

  //   constructor(message: string) {
  //     this.message = message
  //   }

  //   greet(): string {
  //     return "hello" + this.message;
  //   }
  // }

  // const greeter = new Greeter('world')
  // console.log(greeter.greet())

  // class Animal {
  //   run(distance: number) {
  //     console.log(`Animal run ${distance}m`)
  //   }
  // }

  // class Dog extends Animal {
  //   cry() {
  //     console.log('wang wang')
  //   }
  // }
  // const dog = new Dog();
  // dog.cry()
  // dog.run(100)

  // class Animal {
  //   name: string
  //   constructor(name: string) {
  //     this.name = name;
  //   }

  //   run(distance: number = 0) {
  //     console.log(this.name + ' distance is ' + distance)
  //   }
  // }

  // class Snake extends Animal {
  //   constructor(name: string) {
  //     super(name)
  //   }

  //   run(distance: number = 5) {
  //     console.log('sliding...')
  //     super.run(distance)
  //   }
  // }

  // class Horse extends Animal {
  //   constructor(name: string) {
  //     super(name)
  //   }

  //   run(distance: number = 50) {
  //     console.log('dashing')
  //     super.run(distance)
  //   }

  //   xxx() {
  //     console.log('xxx()')
  //   }
  // }

  // const snake = new Snake('sn');
  // snake.run()

  // const horse = new Horse('ho');
  // horse.run();


  // // 父类的子类的关系：父子类型，此时，父类类型创建子类对象
  // const tom: Animal = new Horse('ho22');
  // tom.run()


  // function showRun(ani: Animal) {
  //   ani.run();
  // }

  // // Snake 和 Horse 都属于 Animal
  // showRun(snake)


  // class Person {
  //   // private name: string // 私有
  //   // private name: string // 私有
  //   // private name: string // 私有
  //   // private name: string // 私有
  //   public s1: string = 's1'
  //   static s2: string = 's2'
  //   private s3: string = 's3'
  //   // project s4: string = 's4'
  //   // constructor(name: string) {
  //   //   this.s1 = name;
  //   //   this.s2 = name;
  //   //   this.s3 = name;
  //   //   this.s4 = name;
  //   // }

  //   // eat() {
  //   //   console.log(this.name + '-----')
  //   // }
  // }
  // class P1 extends Person {
  //   constructor(name: string) {
  //   }
  // }

  // const per = new Person('大蛇丸')
  // const per1 = new P1('大蛇丸1')

  // public 构造函数的prototype
  // static 构造函数自身
  // private 只能在类的内部访问的方法和属性，外部不能访问


  // console.log(Person.s1) // error
  // console.log(Person.s2)
  // console.log(Person.s3) // error

  const Person1 = (function () {
    var _name = Symbol('name')
    class Person1 {
      [_name] = null;
      constructor() {
        this[_name] = 'haha'
      }

      get name () {
        return this[_name]
      }
    }
    return Person1
  })()
  var person = new Person1()

  console.log('person', person.name)

  console.log('person', Person1.name)
  console.log('person', Person1.name)

  console.log('person', Person1.prototype)
})()