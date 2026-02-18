CLASS zcl_s4d100_87_exit DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_s4d100_87_exit IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.
       CONSTANTS: c_number0 TYPE i VALUE 3.
       DATA: lv_number0 TYPE i,
             wall TYPE string VALUE '-------------------------------------'.

       lv_number0 = c_number0 * c_number0.
       out->write( |{ wall }| ).
       out->write( 'Example 1: With Abort Condition: EXIT' ).
       out->write( |{ wall }| ).

       " Count backwards from lv_number0 to c_number0
       DO.
        out->write( |{ sy-index }: Value of lv_number0: { lv_number0 }| ).
        lv_number0 = lv_number0 - 1.
        IF lv_number0 <= c_number0.
            EXIT.
        ENDIF.
       ENDDO.
  ENDMETHOD.
ENDCLASS.