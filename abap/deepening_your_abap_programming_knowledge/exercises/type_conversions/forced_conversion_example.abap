CLASS z8141_forced_conversion DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS z8141_forced_conversion IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    TRY.
* result has type C.
* and is displayed unformatted in the console

        DATA(result1) = '20230101'.
        out->write( result1 ).

* result2 is forced to have type D
* and is displayed with date formatting in the console

        DATA(result2) = CONV d( '20230101' ).
        out->write( result2 ).

        DATA(result3) = CONV i( |{ result1 }.2311asda| ).
        out->write( result3 ).


* The method do_something( ) has an importing parameter of type string.
* Attempting to pass var results in a syntax error
* The CONV #( ) expression converts var into the expected type
* Note that CONV #( ) can lead to conversion exceptions


* lcl_class=>do_something( var ).

      CATCH cx_sy_conversion_error.
        out->write( `Invalid type conversions!` ).
    ENDTRY.
  ENDMETHOD.
ENDCLASS.