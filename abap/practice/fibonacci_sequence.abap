DATA: num1 TYPE i VALUE 0,
      num2 TYPE i VALUE 1,
      next_num TYPE i,
      sequence_count TYPE i VALUE 1.

out->write('Fibonacci Sequence:').
out->write(|n = { sequence_count }, fib = { num1 }|).
sequence_count = sequence_count + 1.
out->write(|n = 2, fib = { num2 }|).

DO sequence_count TIMES.
    sequence_count = sequence_count + 1.
    next_num = num1 + num2.
    out->write(|n = { sequence_count }, fib = { next_num }|).
    num1 = num2.
    num2 = next_num.
ENDDO.

out->write('Finished...').