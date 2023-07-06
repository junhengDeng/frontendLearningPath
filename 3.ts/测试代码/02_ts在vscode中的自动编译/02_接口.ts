// 接口：是一种能力，一种约束而已

(() => {
  interface IPerson {
    firstName: string;
    lastName: string;
  }

  function allName(person: IPerson) {
    return person.firstName + person.lastName
  }

  const person = {
    firstName: '1',
    lastName: '2'
  }

  console.log(allName(person))

})();