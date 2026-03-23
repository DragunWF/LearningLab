* ============================================================
* ==============================
* GLOBAL CLASSES
* ==============================
* ============================================================

CLASS z8141_factory_methods DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS z8141_factory_methods IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    DATA connection TYPE REF TO lcl_connection.


* Debug the method to show that the class returns objects, but that there are different
* objects for the same combination of airline and flight number


    connection = lcl_connection=>get_connection( airlineid = 'DE' connectionnumber = '0400' ).

    out->write( connection ).

    connection = lcl_connection=>get_connection( airlineid = 'LH' connectionnumber = '0400' ).

    out->write( connection ).

  ENDMETHOD.
ENDCLASS.

* ============================================================
* ==============================
* LOCAL CLASSES
* ==============================
* ============================================================

CLASS lcl_connection DEFINITION CREATE PRIVATE.
  PUBLIC SECTION.
    METHODS constructor
      IMPORTING
        airlineid        TYPE /dmo/carrier_id
        connectionnumber TYPE /dmo/connection_id
        fromAirport      TYPE /dmo/airport_from_id
        toAirport        TYPE /dmo/airport_to_id.


    CLASS-METHODS get_connection IMPORTING airlineId            TYPE /dmo/carrier_id
                                           connectionNumber     TYPE /dmo/connection_id
                                 RETURNING VALUE(ro_connection) TYPE REF TO lcl_Connection.

    DATA AirlineId TYPE /dmo/carrier_id.
    DATA ConnectionNumber TYPE /dmo/connection_id.
    DATA fromAirport TYPE /dmo/airport_from_id.
    DATA toAirport TYPE /dmo/airport_to_id.

  PRIVATE SECTION.

ENDCLASS.

CLASS lcl_connection IMPLEMENTATION.

  METHOD constructor.

    me->airlineid = airlineid.
    me->connectionnumber = connectionnumber.
    me->fromAirport = fromAirport.
    me->toAirport = toAirport.

  ENDMETHOD.


  METHOD get_connection.
    DATA fromAirport TYPE /dmo/airport_from_id.
    DATA toAirport TYPE /dmo/airport_to_id.


    SELECT SINGLE FROM /dmo/connection FIELDS airport_from_id, airport_to_id
    WHERE carrier_id = @airlineid
    AND connection_id = @connectionnumber
    INTO ( @fromAirport, @toAirport ).


    ro_connection = NEW #( airlineid = airlineid connectionnumber = connectionnumber fromairport = fromairport toairport = toairport ).


  ENDMETHOD.


ENDCLASS.