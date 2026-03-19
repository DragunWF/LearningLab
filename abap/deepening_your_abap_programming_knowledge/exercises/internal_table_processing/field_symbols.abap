* ============================================================
* ==============================
* GLOBAL CLASSES
* ==============================
* ============================================================

CLASS z8141_field_symbols_table DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS z8141_field_symbols_table IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

* Execute this class using Profile As->ABAP Application
* In the analysis, look at the comparative runtimes of
* the methods loop_work_area( ) and loop_field_symbol( )


    DATA(flights) = NEW lcl_demo( ).


    flights->use_work_area( ).
    flights->use_field_symbol( ).
    out->write( 'Done' ).

  ENDMETHOD.
ENDCLASS.

* ============================================================
* ==============================
* LOCAL CLASSES
* ==============================
* ============================================================


CLASS lcl_demo DEFINITION.

  PUBLIC SECTION.

    METHODS use_work_area.
    METHODS use_field_symbol.

  PRIVATE SECTION.
    TYPES t_flights TYPE STANDARD TABLE OF /dmo/flight WITH NON-UNIQUE KEY carrier_id connection_id flight_date.

    METHODS loop_field_symbol CHANGING c_flights TYPE t_Flights.
    METHODS loop_Work_area CHANGING c_flights TYPE t_flights.

ENDCLASS.


CLASS lcl_demo IMPLEMENTATION.

  METHOD use_field_symbol.


    DATA flights TYPE t_flights.
    SELECT FROM /dmo/flight FIELDS * INTO TABLE @flights.
    loop_field_symbol( CHANGING c_flights = flights ).


  ENDMETHOD.


  METHOD use_work_area.
    DATA flights TYPE t_flights.
    SELECT FROM /dmo/flight FIELDS * INTO TABLE @flights.
    loop_work_area( CHANGING c_flights = flights ).
  ENDMETHOD.


  METHOD loop_field_symbol.


    LOOP AT c_flights ASSIGNING FIELD-SYMBOL(<flight>).
      <flight>-seats_occupied += 1.
    ENDLOOP.


  ENDMETHOD.


  METHOD loop_work_area.
    LOOP AT c_flights INTO DATA(flight).
      flight-seats_occupied += 1.
      MODIFY c_flights FROM flight.
    ENDLOOP.
  ENDMETHOD.


ENDCLASS.