// 质数 除了自身和1，不能被整除的数
// 合数 质数相反的数
// 斐波那契数列 1 1 2 3 5 8 13 21 
function Fibonacci (n) {
  if (n <= 1) return n;
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}