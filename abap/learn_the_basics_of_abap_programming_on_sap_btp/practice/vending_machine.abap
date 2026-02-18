CONSTANTS coin_value TYPE i VALUE 25.
DATA current_balance TYPE i VALUE 0.

WHILE current_balance < 100.
    current_balance = current_balance + coin_value.
    out->write(|Inserted coin. Balance { current_balance }|).
ENDWHILE.

out->write('Snack Dispensed! Enjoy!').