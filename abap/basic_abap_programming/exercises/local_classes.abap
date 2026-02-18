* ====================================
* +++++ LOCAL CLASS
* ====================================

*"* use this source file for the definition and implementation of
*"* local helper classes, interface definitions and type
*"* declarations

class lcl_connection definition.

    public section.

    DATA: carrier_id TYPE /dmo/carrier_id,
          connection_id TYPE /dmo/connection_id.
    CLASS-DATA conn_counter TYPE i.

    protected section.
    private section.

endclass.

class lcl_connection implementation.

endclass.

* ====================================
* +++++ GLOBAL CLASS
* ====================================

CLASS zs4d400_02_local_classes DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zs4d400_02_local_classes IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.
       CONSTANTS wall TYPE string VALUE '---------------------------------------------------------------------------'.
       DATA connectionTable TYPE TABLE OF REF TO lcl_connection.

       DATA connection TYPE REF TO lcl_connection.
       connection = new #(  ).
       connection->carrier_id = 'LH'.
       connection->connection_id = '0400'.

       out->write( |First Connection (Append to connectio table):| ).
       out->write( |Carrier ID of First Connection: {  connection->carrier_id }| ).
       out->write( |Connection ID of First Connection: { connection->connection_id }| ).
       out->write( wall ).

       APPEND connection TO connectionTable.

       DATA secondConnection TYPE REF TO lcl_connection.
       secondConnection = new #(  ).
       secondConnection->carrier_id = 'PH'.
       secondConnection->connection_id = '0500'.

       out->write( |Second Connection (Append to connection table):| ).
       out->write( |Carrier ID of Second Connection: { secondConnection->carrier_id }| ).
       out->write( |Connection ID of Second Connection: { secondConnection->connection_id }| ).
       out->write( wall ).

       APPEND connection TO connectionTable.

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
  ENDMETHOD.
ENDCLASS..
