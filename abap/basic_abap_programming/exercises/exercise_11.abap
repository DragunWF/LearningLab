CLASS zcl_2116_cls_constructor DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_2116_cls_constructor IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    DATA: connection  TYPE REF TO lcl_connection,
          connection2 TYPE REF TO lcl_connection,
          connection3 TYPE REF TO lcl_connection,
          connections TYPE STANDARD TABLE OF REF TO lcl_connection.

    TRY.
        connection = NEW #(
                i_carrier_id = 'LH'
                i_connection_id = '0400'
        ).
        connection2 = NEW #(
                i_carrier_id = 'LH'
                i_connection_id = '0500'
        ).
        connection3 = NEW #(
                i_carrier_id = 'LH'
                i_connection_id = '0600'
        ).
      CATCH cx_abap_invalid_value INTO DATA(lv_err).
        out->write( |Error: { lv_err->get_text(  ) }| ).
    ENDTRY.

    APPEND connection TO connections.
    APPEND connection2 TO connections.
    APPEND connection3 TO connections.

    LOOP AT connections INTO DATA(lv_connection).
      out->write( lv_connection->get_output( ) ).
    ENDLOOP.

  ENDMETHOD.
ENDCLASS.


*"* use this source file for the definition and implementation of
*"* local helper classes, interface definitions and type
*"* declarations

CLASS lcl_connection DEFINITION.

  PUBLIC SECTION.

    CLASS-DATA conn_counter TYPE i VALUE 0.

    METHODS constructor
      IMPORTING
                i_carrier_id    TYPE /dmo/carrier_id
                i_connection_id TYPE /dmo/connection_id
      RAISING   cx_abap_invalid_value.

    METHODS get_output
      RETURNING
        VALUE(r_output) TYPE string_table.

    METHODS set_attributes
      IMPORTING
                i_carrier_id    TYPE /dmo/carrier_id
                i_connection_id TYPE /dmo/connection_id
      RAISING   cx_abap_invalid_value.

  PROTECTED SECTION.

  PRIVATE SECTION.

    DATA: carrier_id    TYPE /dmo/carrier_id,
          connection_id TYPE /dmo/connection_id.

ENDCLASS.

CLASS lcl_connection IMPLEMENTATION.

  METHOD constructor.
    me->set_attributes(
         i_carrier_id = i_carrier_id
         i_connection_id = i_connection_id
     ).
    lcl_connection=>conn_counter += 1.
  ENDMETHOD.

  METHOD get_output.
    APPEND |Carrier ID: { me->carrier_id }| TO r_output.
    APPEND |Connection ID: { me->connection_id }| TO r_output.
    APPEND |Connection Counter: { lcl_connection=>conn_counter }| TO r_output.
  ENDMETHOD.

  METHOD set_attributes.
    IF i_carrier_id IS INITIAL OR i_connection_id IS INITIAL.
      RAISE EXCEPTION TYPE cx_abap_invalid_value.
    ENDIF.

    me->carrier_id = i_carrier_id.
    me->connection_id = i_connection_id.
  ENDMETHOD.

ENDCLASS.