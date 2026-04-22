CLASS zcl_2116_iterate DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_2116_iterate IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    CONSTANTS: max_count TYPE i VALUE 20.

    DATA: numbers TYPE STANDARD TABLE OF i WITH EMPTY KEY,
          output  TYPE STANDARD TABLE OF string WITH EMPTY KEY.

    DO max_count TIMES.
      CASE sy-index.
        WHEN 1.
          APPEND 0 TO numbers.
        WHEN 2.
          APPEND 1 TO numbers.
        WHEN OTHERS.
          DATA(fib_num) = numbers[ sy-index - 2 ] + numbers[ sy-index - 1 ].
          APPEND fib_num TO numbers.
      ENDCASE.
    ENDDO.

    DATA counter TYPE i VALUE 0.
    LOOP AT numbers INTO DATA(number).
      counter += 1.
      APPEND |{ counter WIDTH = 4 ALIGN = LEFT }:{ number WIDTH = 10 ALIGN = RIGHT }| TO output.
    ENDLOOP.

    out->write(
        data = output
        name = |The first { max_count } fibonacci numbers:|
    ).

  ENDMETHOD.
ENDCLASS.