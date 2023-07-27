(() => {
  function sayHi(str: string) {
    return '您好啊' + str;
  }
  let text = '小甜甜';
  console.log(sayHi(text))
})()

// 总结：ts文件如果直接书写js语法的代码，那么在html文件中引入ts文件，在谷歌的浏览器中是可以直接使用的
