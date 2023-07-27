(() => {
  interface IPerson {
    firstName: string,
    lastName: string
  }

  class Person {
    firstName: string
    lastName: string
    fullName: string
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName
      this.lastName = lastName;
      this.fullName = firstName + '_' + lastName
    }

  }
  function showFullName(person: IPerson) {
    return person.firstName + '_' + person.lastName
  }

  const person = new Person('诸葛', '孔明')
  console.log(showFullName(person));
})()