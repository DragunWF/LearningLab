CLASS zcl_s4d100_xx_87_do_enddo DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_s4d100_xx_87_do_enddo IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.
       CONSTANTS: c_number0 TYPE i VALUE 3.
       DATA wall TYPE string VALUE '------------------------------'.

       out->write( |{ wall }| ).
       out->write( 'Example 1: DO...ENDO with TIMES' ).
       out->write( |{ wall }| ).

       DO c_number0 TIMES.
          out->write( |({ sy-index }). Hello DragunWF, you are now learning ABAP!| ).
       ENDDO.
  ENDMETHOD.
ENDCLASS.