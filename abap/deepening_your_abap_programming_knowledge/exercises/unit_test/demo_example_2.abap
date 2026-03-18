* ============================================================
* ==============================
* GLOBAL CLASSES
* ==============================
* ============================================================

CLASS z8141_unit_demo_2 DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS z8141_unit_demo_2 IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

*  constants c_carrier_id type /dmo/carrier_id value 'LH'.
    CONSTANTS c_carrier_id TYPE /dmo/carrier_id VALUE 'XX'.

    TRY.
        DATA(carrier) = new lcl_carrier( c_carrier_id ).

        out->write( | Carrier { carrier->get_name(  ) } has currency {  carrier->get_currency(  ) }| ).

      CATCH cx_abap_invalid_value.
        out->write( | Carrier {  c_carrier_id } does not exist | ).
    ENDTRY.

  ENDMETHOD.
ENDCLASS.

* ============================================================
* ==============================
* LOCAL CLASSES
* ==============================
* ============================================================

*"* use this source file for the definition and implementation of
*"* local helper classes, interface definitions and type
*"* declarations

CLASS lcl_carrier DEFINITION.

  PUBLIC SECTION.

    METHODS constructor
      IMPORTING i_carrier_id TYPE /dmo/carrier_id
      RAISING   cx_abap_invalid_value.

    METHODS get_name          RETURNING VALUE(r_result) TYPE /dmo/carrier_name.

    METHODS get_currency      RETURNING VALUE(r_result) TYPE /dmo/currency_code.

  PROTECTED SECTION.
  PRIVATE SECTION.

    DATA carrier_data TYPE /dmo/carrier.

ENDCLASS.

CLASS lcl_carrier IMPLEMENTATION.

  METHOD constructor.

    SELECT SINGLE *
      FROM /dmo/carrier
      WHERE carrier_id = @i_carrier_id
      INTO @me->carrier_data.

    IF sy-subrc <> 0.
      RAISE EXCEPTION TYPE cx_abap_invalid_value.
    ENDIF.

  ENDMETHOD.

  METHOD get_currency     .
*    r_result = me->carrier_data-currency_code.
  ENDMETHOD.

  METHOD get_name.
*    r_result = me->carrier_data-name.
  ENDMETHOD.

ENDCLASS.

* ============================================================
* ==============================
* TEST CLASSES
* ==============================
* ============================================================

*"* use this source file for your ABAP unit test classes

CLASS ltcl_test DEFINITION FOR TESTING
                          RISK LEVEL HARMLESS
                          DURATION SHORT.

  PRIVATE SECTION.

    METHODS setup.

    METHODS test_get_name     FOR TESTING.

    METHODS test_get_currency FOR TESTING.

    DATA carrier TYPE REF TO lcl_carrier.

ENDCLASS.

CLASS ltcl_test IMPLEMENTATION.

  METHOD setup.  " Executed before each test method

    " read arbitrary carrier_id from DB table
    SELECT SINGLE
        FROM /dmo/carrier
        FIELDS carrier_id
      INTO @DATA(carrier_id).

    IF sy-subrc <> 0.
      cl_abap_unit_assert=>skip(
        msg    = 'No data in /DMO/CARRIER'
        detail = 'Test requires at least one entry in DB table /DMO/CARRIER' ).

    ENDIF.

    " then create the instance to be tested

    TRY.
        me->carrier = NEW lcl_carrier( carrier_id ).

      CATCH cx_abap_invalid_value.

        cl_abap_unit_assert=>fail(
          msg    =  `Cannot create instance of lcl_carrier`
          detail = `Constructor of lcl_carrier raises an exception when it should not`
        ).

    ENDTRY.

    cl_abap_unit_assert=>assert_bound(
      EXPORTING
        act              = me->carrier
        msg              = `Cannot create instance of lcl_carrier`
    ).

  ENDMETHOD.


  METHOD test_get_name.

    DATA(name) = me->carrier->get_name(   ).

    cl_abap_unit_assert=>assert_not_initial(
        act  = name
        msg  = `Result of method get_name( )`
        quit = if_abap_unit_constant=>quit-no
    ).

* Compact alternative (no helper variable)
**********************************************************************
*    cl_abap_unit_assert=>assert_not_initial(
*        act =  me->carrier->get_name(   )
*        msg = `result of method get_name( )`
*        quit = if_abap_unit_constant=>quit-no
*    ).

  ENDMETHOD.

  METHOD test_get_currency.

    cl_abap_unit_assert=>assert_not_initial(
        act  =  me->carrier->get_currency(   )
        msg  = `Result of method get_currency( )`
        quit = if_abap_unit_constant=>quit-no
    ).

  ENDMETHOD.

ENDCLASS.