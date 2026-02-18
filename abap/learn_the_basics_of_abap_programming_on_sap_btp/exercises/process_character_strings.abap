CLASS zcl_s4d100_01_char DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_s4d100_01_char IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.
    DATA: lv_full_name TYPE string VALUE 'Marc Plarisan',
          lv_first_name TYPE string,
          lv_last_name TYPE string.

  SPLIT lv_full_name AT ' ' INTO lv_first_name lv_last_name.
  out->write( |First Name: { lv_first_name }| ).
  out->write( |Last Name: { lv_last_name }| ).

  ENDMETHOD.
ENDCLASS.