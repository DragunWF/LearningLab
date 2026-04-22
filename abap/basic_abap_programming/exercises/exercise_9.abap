CLASS zcl_2116_cls_instances DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_2116_cls_instances IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    DATA: connection  TYPE REF TO lcl_connection,
          connection2 TYPE REF TO lcl_connection,
          connection3 TYPE REF TO lcl_connection,
          connections TYPE STANDARD TABLE OF REF TO lcl_connection.

    connection = NEW #(  ).
    connection2 = NEW #(  ).
    connection3 = NEW #(  ).

    connection->carrier_id = 'LH'.
    connection->connection_id = '0400'.
    lcl_connection=>conn_counter = 1.

    connection2->carrier_id = 'LH'.
    connection2->connection_id = '0500'.
    lcl_connection=>conn_counter = 2.

    connection3->carrier_id = 'LH'.
    connection3->connection_id = '0600'.
    lcl_connection=>conn_counter = 3.

    APPEND connection TO connections.
    APPEND connection2 TO connections.
    APPEND connection3 TO connections.

    LOOP AT connections INTO DATA(lv_connection).
      out->write( |Carrier ID: { lv_connection->carrier_id }| ).
      out->write( |Connection ID: { lv_connection->connection_id }| ).
      out->write( |Conn Counter: { lcl_connection=>conn_counter }| ).
    ENDLOOP.

  ENDMETHOD.
ENDCLASS.

*"* use this source file for the definition and implementation of
*"* local helper classes, interface definitions and type
*"* declarations

CLASS lcl_connection DEFINITION.

  PUBLIC SECTION.

    CLASS-DATA conn_counter TYPE i.

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