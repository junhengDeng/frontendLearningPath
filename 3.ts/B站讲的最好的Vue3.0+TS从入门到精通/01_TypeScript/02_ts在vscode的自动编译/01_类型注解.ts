// 类型注解
(() => {
  function showMsg(str: string): string {
    return '床前明月光,' + str
  }
  var msg = '疑是地上霜';
  console.log(showMsg(msg));

})()