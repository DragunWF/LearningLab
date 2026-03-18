* ============================================================
* ==============================
* GLOBAL CLASSES
* ==============================
* ============================================================

CLASS z8141_profiling_demo DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS z8141_profiling_demo IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    DATA(flights) = lcl_data=>get_flights( ).

    SORT flights BY flight_date DESCENDING.

    out->write(  name = `List of all Flights`
                 data = flights ).


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

CLASS lcl_data DEFINITION .

  PUBLIC SECTION.

    TYPES tt_flights TYPE STANDARD TABLE OF /dmo/flight
                     WITH NON-UNIQUE KEY carrier_id connection_id flight_date.



    CLASS-METHODS get_flights
      RETURNING VALUE(r_result) TYPE tt_flights.


  PROTECTED SECTION.
  PRIVATE SECTION.

ENDCLASS.

CLASS lcl_data IMPLEMENTATION.


  METHOD get_flights.

    SELECT *
      FROM /dmo/flight
      INTO TABLE @r_result.

  ENDMETHOD.

ENDCLASS.