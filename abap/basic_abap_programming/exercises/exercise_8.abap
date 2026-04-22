CLASS zcl_2116_local_class DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_2116_local_class IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    DATA obj TYPE REF TO lcl_connection.

    obj = NEW #(  ).

    obj->carrier_id = 'LH'.
    obj->connection_id = '0400'.
    obj->conn_counter = 1.

    out->write( |Carrier ID: { obj->carrier_id }| ).
    out->write( |Connection ID: { obj->connection_id }| ).
    out->write( |Conn Counter: { lcl_connection=>conn_counter }| ).

  ENDMETHOD.
ENDCLASS.



*"* use this source file for the definition and implementation of
*"* local helper classes, interface definitions and type
*"* declarations

CLASS lcl_connection DEFINITION.

  PUBLIC SECTION.

    DATA: carrier_id    TYPE /dmo/carrier_id,
          connection_id TYPE /dmo/connection_id.

    CLASS-DATA conn_counter TYPE i.

  PROTECTED SECTION.

  PRIVATE SECTION.

ENDCLASS.

CLASS lcl_connection IMPLEMENTATION.

ENDCLASS.