// 接口：是一种能力，一种约束而已
(() => {
    function allName(person) {
        return person.firstName + person.lastName;
    }
    const person = {
        firstName: '1',
        lastName: '2'
    };
    console.log(allName(person));
})();
