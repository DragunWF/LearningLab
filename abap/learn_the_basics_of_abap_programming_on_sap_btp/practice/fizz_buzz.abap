* Solving Fizzbuzz with SAP ABAP code.

DO 100 TIMES .
    IF sy-index MOD 3 = 0 AND sy-index MOD 5 = 0 .
        out->write('FizzBuzz') .
    ELSEIF sy-index MOD 3 = 0 .
        out->write('Fizz') .
    ELSEIF sy-index MOD 5 = 0 .   
        out->write('Buzz') .
    ELSE .
        out->write(|{ sy-index }|) .
    ENDIF .
ENDDO .