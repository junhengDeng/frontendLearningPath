function* test () {
  console.log(102)
  yield 1
  return 2
}

const y = test()
console.log(y)
console.log(y.next())
console.log(y.next())
console.log(y.next())
console.log(y.next())
console.log(y.next())

console.log(11111)


async function test2 () {
  console.log(202)
  await 1
  return 2
}