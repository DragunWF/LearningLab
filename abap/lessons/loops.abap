DATA iterations TYPE i VALUE 1 .

DO 100 TIMES.
    out->write(|Iteration: { iterations }|) .
    iterations = iterations + 1 .
ENDDO.

DATA damage TYPE i VALUE 5.

DO.
    damage = damage * 2 .
    out->write(|Current Damage: { damage }|) .
    IF damage >= 10000 . 
        EXIT . 
    ENDIF .
ENDDO.
