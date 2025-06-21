function fib(n) {
  if (n <= 0) return 0;
  return fib(n - 1) + fib(n - 2);
}

function test() {
  console.log(fib(2));
}

test();

// 0 1 1 2 3 5 8
