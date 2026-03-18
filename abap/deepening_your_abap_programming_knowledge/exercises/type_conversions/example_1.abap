CLASS z8141_pitfall_types DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS z8141_pitfall_types IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    TRY.
        DATA var_string TYPE string.
        DATA var_int TYPE i.
        DATA var_date TYPE d.
        DATA var_pack TYPE p LENGTH 3 DECIMALS 2.

        var_string = `12345`.
        var_int = var_string.


        out->write( 'Conversion successful' ).


        var_string = `20230101`.
        var_date = var_string.


        out->write( |String value: { var_string }| ).
        out->write( |Int value: { var_int }| ).
        out->write( |Date Value: { var_date DATE = USER }| ).

      CATCH cx_sy_conversion_no_number.
        out->write( `Invalid type conversion(s)!` ).
    ENDTRY.
  ENDMETHOD.
ENDCLASS.