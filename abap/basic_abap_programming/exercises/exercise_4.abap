CLASS zcl_2116_compute DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_2116_compute IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.
    DATA: number1 TYPE i VALUE 3,
          number2 TYPE i VALUE -8.

    DATA(result) = round( val = number2 / number1 dec = 2 mode = cl_abap_math=>round_half_up ).
    DATA(output) = |{ number2 } / { number1 } = { result }|.

    out->write( output ).
  ENDMETHOD.
ENDCLASS.