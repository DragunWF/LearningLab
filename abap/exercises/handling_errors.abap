CLASS zcl_87_dump DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_87_dump IMPLEMENTATION.

  METHOD if_oo_adt_classrun~main.
    DATA: lv_mths TYPE i VALUE 0,
          lv_hols TYPE i VALUE 20,
          lv_avg_hols TYPE i.
    IF lv_mths <> 0.
        lv_avg_hols = lv_hols / lv_mths.
        out->write( |Average vacation days per month: { lv_avg_hols }| ).
    ELSE.
        out->write( |Please ask to roll over remaining vacation!| ).
    ENDIF.
  ENDMETHOD.

ENDCLASS.