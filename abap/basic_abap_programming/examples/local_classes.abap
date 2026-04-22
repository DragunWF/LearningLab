* ====================================
* +++++ LOCAL CLASS
* ====================================

*"* use this source file for the definition and implementation of
*"* local helper classes, interface definitions and type
*"* declarations

CLASS lcl_connection DEFINITION.

  PUBLIC SECTION.

* Notes: You can add READ-ONLY after the data type to make it unsettable externally
    DATA: carrier_id    TYPE /dmo/carrier_id READ-ONLY,
          connection_id TYPE /dmo/connection_id READ-ONLY.
    CLASS-DATA conn_counter TYPE i.

    METHODS constructor
        IMPORTING
            i_carrier_id TYPE /dmo/carrier_id OPTIONAL
            i_connection_id TYPE /dmo/connection_id OPTIONAL.

    METHODS set_attributes
      IMPORTING
        i_carrier_id    TYPE /dmo/carrier_id OPTIONAL
        i_connection_id TYPE /dmo/connection_id
      RAISING
        cx_abap_invalid_value.

    METHODS get_attributes
      EXPORTING
        e_carrier_id    TYPE /dmo/carrier_id
        e_connection_id TYPE /dmo/connection_id.

    METHODS get_output
      RETURNING VALUE(r_output) TYPE string_table.

    CLASS-METHODS increment_counter.

  PROTECTED SECTION.
  PRIVATE SECTION.

ENDCLASS.

CLASS lcl_connection IMPLEMENTATION.

  METHOD constructor.
    me->carrier_id = i_carrier_id.
    me->connection_id = i_connection_id.
  ENDMETHOD.

  METHOD set_attributes.
    IF carrier_id IS INITIAL OR connection_id IS INITIAL.
      RAISE EXCEPTION TYPE cx_abap_invalid_value.
    ENDIF.

    me->carrier_id = i_carrier_id.
    me->connection_id = i_connection_id.
  ENDMETHOD.

  METHOD get_attributes.
    e_carrier_id = carrier_id.
    e_connection_id = connection_id.
  ENDMETHOD.

  METHOD get_output.
    APPEND |------------------------------| TO r_output.
    APPEND |Carrier:     { carrier_id    }| TO r_output.
    APPEND |Connection:  { connection_id }| TO r_output.
  ENDMETHOD.

  METHOD increment_counter.
    conn_counter += 1.
  ENDMETHOD.
ENDCLASS.

* ====================================
* +++++ GLOBAL CLASS
* ====================================

CLASS zcl_392_local_classes DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_392_local_classes IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    CONSTANTS wall TYPE string VALUE '---------------------------------------------------------------------------'.
    DATA connectionTable TYPE TABLE OF REF TO lcl_connection.

    DATA connection TYPE REF TO lcl_connection.
    connection = NEW #(
        i_carrier_id = 'BB'
        i_connection_id = '0018'
    ).


    out->write( |First Connection (Append to connectio table):| ).
    out->write( |Carrier ID of First Connection: {  connection->carrier_id }| ).
    out->write( |Connection ID of First Connection: { connection->connection_id }| ).
    out->write( wall ).

    connection->set_attributes(
       i_carrier_id = 'AA'
       i_connection_id = '0017'
    ).

    APPEND connection TO connectionTable.

    DATA secondConnection TYPE REF TO lcl_connection.
    secondConnection = NEW #(
        i_carrier_id = 'PH'
        i_connection_id = '0500'
    ).
    " Note: Setting values this way cannot be done if the fields are READ-ONLY
    " secondConnection->carrier_id = 'PH'.
    " secondConnection->connection_id = '0500'.

    out->write( |Second Connection (Append to connection table):| ).
    out->write( |Carrier ID of Second Connection: { secondConnection->carrier_id }| ).
    out->write( |Connection ID of Second Connection: { secondConnection->connection_id }| ).
    out->write( wall ).

    APPEND connection TO connectionTable.

    TRY.
        CONSTANTS c_carrier_id TYPE /dmo/carrier_id VALUE 'LH'.
        CONSTANTS c_connection_id TYPE /dmo/connection_id VALUE '0400'.
        DATA thirdConnection TYPE REF TO lcl_connection.

        thirdConnection = NEW #( ).

        out->write( 'Third Connection:' ).
        out->write( |Carrier ID of Third Connection: { c_carrier_id }| ).
        out->write( |Connection ID of Third Connection: { c_connection_id }| ).
        thirdConnection->set_attributes(
            i_carrier_id = c_carrier_id
            i_connection_id = c_connection_id
        ).

        APPEND thirdConnection TO connectionTable.

        out->write( `Third connection has been successfully added to the connections table!` ).
      CATCH cx_abap_invalid_value.
        out->write( `Third connection was not added to the connections table due to invalid values!` ).
    ENDTRY.

    out->write( wall ).
    out->write( 'Looping of connection table' ).
    out->write( '<->' ).

    DATA count TYPE i VALUE 1.
    LOOP AT connectionTable INTO DATA(element).
      DATA ordinal TYPE string.
      CASE count.
        WHEN 1.
          ordinal = 'First'.
        WHEN 2.
          ordinal = 'Second'.
        WHEN 3.
          ordinal = 'Third'.
        WHEN 4.
          ordinal = 'Fourth'.
        WHEN 5.
          ordinal = 'Fifth'.
        WHEN OTHERS.
          ordinal = |({ ordinal })|.
      ENDCASE.

      out->write( |{ ordinal }Connection:| ).
      out->write( |Carrier ID: { element->carrier_id }| ).
      out->write( |Connection ID: { element->connection_id }| ).
      out->write( '<->' ).

      count += 1.
    ENDLOOP.

    out->write( wall ).
    out->write( 'Looping with the output method of the lcl_connections class' ).

    LOOP AT connectionTable INTO DATA(elementWithTable).
        out->write( elementWithTable->get_output(  ) ).
    ENDLOOP.

    DO 5 TIMES.
        lcl_connection=>increment_counter(  ).
    ENDDO.

    out->write( |Connection Counter: { lcl_connection=>conn_counter }| ).
  ENDMETHOD.
ENDCLASS.
