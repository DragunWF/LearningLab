CLASS zcl_2116_branch DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_2116_branch IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    DATA: number1 TYPE i VALUE -8,
          number2 TYPE i VALUE 3,
          result  TYPE p LENGTH 8 DECIMALS 2,
          op      TYPE string VALUE '%'.

    TRY.
        CASE op.
          WHEN '+'.
            result = number1 + number2.
          WHEN '-'.
            result = number1 - number2.
          WHEN '*'.
            result = number1 * number2.
          WHEN '/'.
            result = number1 / number2.
          WHEN '%'.
            result = number1 MOD number2.
          WHEN OTHERS.
            out->write( 'Error! Invalid operation!' ).
            RETURN.
        ENDCASE.

        DATA(output) = |{ number2 } { op } { number1 } = { result }|.

        out->write( output ).
      CATCH cx_sy_zerodivide INTO DATA(error).
        out->write( |Error: { error->get_text(  ) }| ).
    ENDTRY.

  ENDMETHOD.
ENDCLASS.