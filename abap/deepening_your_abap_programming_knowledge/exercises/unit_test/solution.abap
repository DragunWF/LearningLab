* ============================================================
* ==============================
* GLOBAL CLASSES
* ==============================
* ============================================================

CLASS zcl_8141_solution_2 DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_8141_solution_2 IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

  CONSTANTS c_carrier_id TYPE /dmo/carrier_id VALUE 'LH'.

    TRY.
        DATA(carrier) = NEW lcl_carrier(  i_carrier_id = c_carrier_id ).

        out->write(  name = `Carrier Overview`
                     data = carrier->get_output(  ) ).

      CATCH cx_abap_invalid_value.
        out->write( | Carrier { c_carrier_id } does not exist | ).
    ENDTRY.

    IF carrier IS BOUND.

      out->write(  `--------------------------------------------------` ).

* Find a passenger flight from Frankfurt to New York
* starting as soon as possible after tomorrow
* with at least 5 free seats

      DATA(today) = cl_abap_context_info=>get_system_date(  ).

      carrier->find_passenger_flight(
         EXPORTING
           i_airport_from_id = 'FRA'
           i_airport_to_id   = 'JFK'
           i_from_date       = today
           i_seats           = 5
         IMPORTING
           e_flight =     DATA(pass_flight)
           e_days_later = DATA(days_later)
                         ).

      IF pass_flight IS BOUND.
        out->write( name = |Found a suitable passenger flight in { days_later } days:|
                    data = pass_flight->get_description( ) ).
      ELSE.
        out->write( data = `No Passenger Flight found` ).
      ENDIF.

      out->write(  `--------------------------------------------------` ).

** Find a cargo flight from Frankfurt to New York
** starting as soon as possible but earliest in 7 days
** with at least 1200 KG free capacity
*
      carrier->find_cargo_flight(
         EXPORTING
           i_airport_from_id = 'FRA'
           i_airport_to_id   = 'JFK'
           i_from_date       = today
           i_cargo           = 1200
         IMPORTING
           e_flight =     DATA(cargo_flight)
           e_days_later = DATA(days_later2)
                         ).

      IF cargo_flight IS BOUND.
        out->write( name = |Found a suitable cargo flight in { days_later2 } days:|
                    data = cargo_flight->get_description( ) ).
      ELSE.
        out->write( data = `No cargo flight found` ).
      ENDIF.



    ENDIF.
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

CLASS lcl_passenger_flight DEFINITION .

  PUBLIC SECTION.

    DATA carrier_id    TYPE /dmo/carrier_id       READ-ONLY.
    DATA connection_id TYPE /dmo/connection_id    READ-ONLY.
    DATA flight_date   TYPE /dmo/flight_date      READ-ONLY.

    METHODS constructor
      IMPORTING
        i_carrier_id    TYPE /dmo/carrier_id
        i_connection_id TYPE /dmo/connection_id
        i_flight_date   TYPE /dmo/flight_date.

    TYPES:
      BEGIN OF st_connection_details,
        airport_from_id TYPE /dmo/airport_from_id,
        airport_to_id   TYPE /dmo/airport_to_id,
        departure_time  TYPE /dmo/flight_departure_time,
        arrival_time    TYPE /dmo/flight_departure_time,
        duration        TYPE i,
      END OF st_connection_details.

    TYPES
      tt_flights TYPE STANDARD TABLE OF REF TO lcl_passenger_flight WITH DEFAULT KEY.

    METHODS: get_connection_details
      RETURNING
        VALUE(r_result) TYPE st_connection_details.

    METHODS
      get_free_seats
        RETURNING
          VALUE(r_result) TYPE i.

    METHODS
      get_description RETURNING VALUE(r_result) TYPE string_table.

    CLASS-METHODS
      get_flights_by_carrier
        IMPORTING
          i_carrier_id    TYPE /dmo/carrier_id
        RETURNING
          VALUE(r_result) TYPE tt_flights.

  PROTECTED SECTION.
  PRIVATE SECTION.

    DATA planetype TYPE /dmo/plane_type_id.

    DATA seats_max  TYPE /dmo/plane_seats_max.
    DATA seats_occ  TYPE /dmo/plane_seats_occupied.
    DATA seats_free TYPE i.

    DATA price TYPE /dmo/flight_price.
    CONSTANTS currency TYPE /dmo/currency_code VALUE 'EUR'.


    DATA connection_details TYPE st_connection_details.

ENDCLASS.

CLASS lcl_passenger_flight IMPLEMENTATION.

  METHOD get_flights_by_carrier.

    SELECT
      FROM /lrn/passflight
    FIELDS carrier_id, connection_id, flight_date
     WHERE carrier_id    = @i_carrier_id
      INTO TABLE @DATA(keys).

    LOOP AT keys INTO DATA(key).
      APPEND NEW lcl_passenger_flight( i_carrier_id    = key-carrier_id
                                       i_connection_id = key-connection_id
                                       i_flight_date   = key-flight_date )
              TO r_result.
    ENDLOOP.

  ENDMETHOD.


  METHOD constructor.

    SELECT SINGLE
      FROM /lrn/passflight
    FIELDS plane_type_id, seats_max, seats_occupied, price, currency_code
     WHERE carrier_id    = @i_carrier_id
       AND connection_id = @i_connection_id
       AND flight_date   = @i_flight_date
      INTO @DATA(flight_raw).

    IF sy-subrc = 0.
      me->carrier_id    = i_carrier_id.
      me->connection_id = i_connection_id.
      me->flight_date   = i_flight_date.

      planetype  = flight_raw-plane_type_id.
      seats_max  = flight_raw-seats_max.
      seats_occ  = flight_raw-seats_occupied.
      seats_free = flight_raw-seats_max - flight_raw-seats_occupied.

* convert currencies
      TRY.
          cl_exchange_rates=>convert_to_local_currency(
            EXPORTING
              date              = me->flight_date
              foreign_amount    = flight_raw-price
              foreign_currency  = flight_raw-currency_code
              local_currency    = me->currency
            IMPORTING
              local_amount      = me->price
          ).
        CATCH cx_exchange_rates.
          price = flight_raw-price.
      ENDTRY.

* Set connection details
      SELECT SINGLE
        FROM /dmo/connection
      FIELDS airport_from_id, airport_to_id, departure_time, arrival_time
       WHERE carrier_id    = @carrier_id
         AND connection_id = @connection_id
        INTO @connection_details .

      connection_details-duration = connection_details-arrival_time
                                  - connection_details-departure_time.

    ENDIF.
  ENDMETHOD.

  METHOD get_connection_details.
    r_result = me->connection_details.
  ENDMETHOD.


  METHOD get_free_seats.
    r_result = me->seats_free.
  ENDMETHOD.

  METHOD get_description.

    APPEND |Flight { carrier_id } { connection_id } on { flight_date DATE = USER } | &&
           |from { connection_details-airport_from_id } to { connection_details-airport_to_id } |
           TO r_result.
    APPEND |Planetype:      { planetype  } | TO r_result.
    APPEND |Maximum Seats:  { seats_max  } | TO r_result.
    APPEND |Occupied Seats: { seats_occ  } | TO r_result.
    APPEND |Free Seats:     { seats_free } | TO r_result.
    APPEND |Ticket Price:   { price CURRENCY = currency } { currency } | TO r_result.

  ENDMETHOD.

ENDCLASS.

CLASS lcl_cargo_flight DEFINITION .

  PUBLIC SECTION.

    TYPES: BEGIN OF st_connection_details,
             airport_from_id TYPE /dmo/airport_from_id,
             airport_to_id   TYPE /dmo/airport_to_id,
             departure_time  TYPE /dmo/flight_departure_time,
             arrival_time    TYPE /dmo/flight_departure_time,
             duration        TYPE i,
           END OF st_connection_details.

    TYPES
       tt_flights TYPE STANDARD TABLE OF REF TO lcl_cargo_flight WITH DEFAULT KEY.

    DATA carrier_id    TYPE /dmo/connection_id    READ-ONLY.
    DATA connection_id TYPE /dmo/carrier_id       READ-ONLY.
    DATA flight_date   TYPE /dmo/flight_date      READ-ONLY.

    METHODS constructor
      IMPORTING
        i_carrier_id    TYPE /dmo/carrier_id
        i_connection_id TYPE /dmo/connection_id
        i_flight_date   TYPE /dmo/flight_date.

    METHODS get_connection_details
      RETURNING
        VALUE(r_result) TYPE st_connection_details.

    METHODS
      get_free_capacity
        RETURNING
          VALUE(r_result) TYPE /lrn/plane_actual_load.

    METHODS get_description
      RETURNING
        VALUE(r_result) TYPE string_table.

    CLASS-METHODS
      get_flights_by_carrier
        IMPORTING
          i_carrier_id    TYPE /dmo/carrier_id
        RETURNING
          VALUE(r_result) TYPE tt_flights.

  PROTECTED SECTION.
  PRIVATE SECTION.

    TYPES: BEGIN OF st_flights_buffer,
             carrier_id      TYPE /dmo/carrier_id,
             connection_id   TYPE /dmo/connection_id,
             flight_date     TYPE /dmo/flight_date,
             plane_type_id   TYPE /dmo/plane_type_id,
             maximum_load    TYPE /lrn/plane_maximum_load,
             actual_load     TYPE /lrn/plane_actual_load,
             load_unit       TYPE /lrn/plane_weight_unit,
             airport_from_id TYPE /dmo/airport_from_id,
             airport_to_id   TYPE /dmo/airport_to_id,
             departure_time  TYPE /dmo/flight_departure_time,
             arrival_time    TYPE /dmo/flight_arrival_time,
           END OF st_flights_buffer.

    TYPES tt_flights_buffer TYPE HASHED TABLE OF st_flights_buffer
                            WITH UNIQUE KEY carrier_id connection_id flight_date.

    DATA connection_details TYPE st_connection_details.

    DATA planetype TYPE /dmo/plane_type_id.

    DATA maximum_load TYPE /lrn/plane_maximum_load.
    DATA actual_load TYPE /lrn/plane_actual_load.
    DATA load_unit    TYPE /lrn/plane_weight_unit.

    CLASS-DATA flights_buffer TYPE tt_flights_buffer.

ENDCLASS.

CLASS lcl_cargo_flight IMPLEMENTATION.

  METHOD get_flights_by_carrier.

    SELECT
      FROM /lrn/cargoflight
    FIELDS carrier_id, connection_id, flight_date,
           plane_type_id, maximum_load, actual_load, load_unit,
           airport_from_id, airport_to_id, departure_time, arrival_time
     WHERE carrier_id    = @i_carrier_id
      INTO CORRESPONDING FIELDS OF TABLE @flights_buffer.

    LOOP AT flights_buffer INTO DATA(flight).
      APPEND NEW lcl_cargo_flight( i_carrier_id    = flight-carrier_id
                                   i_connection_id = flight-connection_id
                                   i_flight_date   = flight-flight_date )
              TO r_result.

    ENDLOOP.
  ENDMETHOD.

  METHOD constructor.

    " Read buffer
    TRY.
        DATA(flight_raw) = flights_buffer[ carrier_id    = i_carrier_id
                                           connection_id = i_connection_id
                                           flight_date   = i_flight_date ].

      CATCH cx_sy_itab_line_not_found.
        " Read from database if data not found in buffer
        SELECT SINGLE
          FROM /lrn/cargoflight
        FIELDS plane_type_id, maximum_load, actual_load, load_unit,
               airport_from_id, airport_to_id, departure_time, arrival_time
         WHERE carrier_id    = @i_carrier_id
           AND connection_id = @i_connection_id
           AND flight_date   = @i_flight_date
          INTO CORRESPONDING FIELDS OF @flight_raw.
    ENDTRY.

    carrier_id    = i_carrier_id.
    connection_id = i_connection_id.
    flight_date   = i_flight_date.

    planetype = flight_raw-plane_type_id.
    maximum_load = flight_raw-maximum_load.
    actual_load = flight_raw-actual_load.
    load_unit = flight_raw-load_unit.

    connection_details = CORRESPONDING #( flight_raw ).

    connection_details-duration = me->connection_details-arrival_time
                                    - me->connection_details-departure_time.

  ENDMETHOD.


  METHOD get_connection_details.
    r_result = me->connection_details.
  ENDMETHOD.


  METHOD get_free_capacity.
    r_result = maximum_load - actual_load.
  ENDMETHOD.

  METHOD get_description.

    APPEND |Flight { carrier_id } { connection_id } on { flight_date DATE = USER } | &&
           |from { connection_details-airport_from_id } to { connection_details-airport_to_id } |
           TO r_result.
    APPEND |Planetype:     { planetype } |                         TO r_result.
    APPEND |Maximum Load:  { maximum_load         } { load_unit }| TO r_result.
    APPEND |Free Capacity: { get_free_capacity( ) } { load_unit }| TO r_result.

  ENDMETHOD.

ENDCLASS.

CLASS lcl_carrier DEFINITION .

  PUBLIC SECTION.

    TYPES t_output TYPE c LENGTH 25.
    TYPES tt_output TYPE STANDARD TABLE OF t_output
                    WITH NON-UNIQUE DEFAULT KEY.

    DATA carrier_id TYPE /dmo/carrier_id READ-ONLY.

    METHODS constructor
      IMPORTING
                i_carrier_id TYPE /dmo/carrier_id
      RAISING   cx_abap_invalid_value.

    METHODS get_output RETURNING VALUE(r_result) TYPE tt_output.

    METHODS find_passenger_flight
      IMPORTING
        i_airport_from_id TYPE /dmo/airport_from_id
        i_airport_to_id   TYPE /dmo/airport_to_id
        i_from_date       TYPE /dmo/flight_date
        i_seats           TYPE i
      EXPORTING
        e_flight          TYPE REF TO lcl_passenger_flight
        e_days_later      TYPE i.

    METHODS find_cargo_flight
      IMPORTING
        i_airport_from_id TYPE /dmo/airport_from_id
        i_airport_to_id   TYPE /dmo/airport_to_id
        i_from_date       TYPE /dmo/flight_date
        i_cargo           TYPE /lrn/plane_actual_load
      EXPORTING
        e_flight          TYPE REF TO lcl_cargo_flight
        e_days_later      TYPE i.

  PROTECTED SECTION.
  PRIVATE SECTION.

    DATA name          TYPE /dmo/carrier_name .
    DATA currency_code TYPE /dmo/currency_code ##NEEDED.

    DATA passenger_flights TYPE lcl_passenger_flight=>tt_flights.

    DATA cargo_flights TYPE lcl_cargo_flight=>tt_flights.

    METHODS get_average_free_seats
      RETURNING VALUE(r_result) TYPE i.

ENDCLASS.

CLASS lcl_carrier IMPLEMENTATION.

  METHOD constructor.

    me->carrier_id = i_carrier_id.

    SELECT SINGLE
      FROM /dmo/carrier
    FIELDS name, currency_code
     WHERE carrier_id = @i_carrier_id
     INTO ( @me->name, @me->currency_code ).

    IF sy-subrc <> 0.
      RAISE EXCEPTION TYPE cx_abap_invalid_value.
    ENDIF.

    name = carrier_id && ` ` && name.

    me->passenger_flights =
        lcl_passenger_flight=>get_flights_by_carrier(
              i_carrier_id    = i_carrier_id ).

    me->cargo_flights =
        lcl_cargo_flight=>get_flights_by_carrier(
              i_carrier_id    = i_carrier_id ).

  ENDMETHOD.

  METHOD get_output.

    APPEND |Carrier { me->name } | TO r_result.
    APPEND |Passenger Flights:  { lines( passenger_flights ) } | TO r_result.
    APPEND |Average free seats: { get_average_free_seats(  ) } | TO r_result.
    APPEND |Cargo Flights:      { lines( cargo_flights     ) } | TO r_result.

  ENDMETHOD.

  METHOD find_cargo_flight.

    e_days_later = 99999999.

    LOOP AT me->cargo_flights INTO DATA(flight)
        WHERE table_line->flight_date >= i_from_date.

      DATA(connection_details) = flight->get_connection_details(  ).

      IF connection_details-airport_from_id = i_airport_from_id
       AND connection_details-airport_to_id = i_airport_to_id
       AND flight->get_free_capacity(  ) >= i_cargo.

*        DATA(days_later) =  i_from_date - flight->flight_date.
        DATA(days_later) = flight->flight_date - i_from_date.

        IF days_later < e_days_later. "earlier than previous one?
          e_flight = flight.
          e_days_later = days_later.
        ENDIF.
      ENDIF.

    ENDLOOP.
  ENDMETHOD.

  METHOD find_passenger_flight.

    e_days_later = 99999999.

    LOOP AT me->passenger_flights INTO DATA(flight)
         WHERE table_line->flight_date >= i_from_date.

      DATA(connection_details) = flight->get_connection_details(  ).

      IF connection_details-airport_from_id = i_airport_from_id
       AND connection_details-airport_to_id = i_airport_to_id
       AND flight->get_free_seats( ) >= i_seats.
        DATA(days_later) = flight->flight_date - i_from_date.

        IF days_later < e_days_later. "earlier than previous one?
          e_flight = flight.
          e_days_later = days_later.
        ENDIF.
      ENDIF.

    ENDLOOP.

  ENDMETHOD.

  METHOD get_average_free_seats.

    DATA total TYPE i.

    LOOP AT passenger_flights INTO DATA(flight).

      total = total + flight->get_free_seats( ).

    ENDLOOP.

    r_result = total / lines( passenger_flights ).

  ENDMETHOD.

ENDCLASS.

* ============================================================
* ==============================
* TEST CLASSES
* ==============================
* ============================================================

*"* use this source file for your ABAP unit test classes
CLASS ltcl_find_flights DEFINITION FOR TESTING
                        RISK LEVEL HARMLESS
                        DURATION LONG.

  PRIVATE SECTION.
    METHODS test_find_cargo_flight FOR TESTING.

ENDCLASS.

CLASS ltcl_find_flights IMPLEMENTATION.

  METHOD test_find_cargo_flight.
    SELECT SINGLE
        FROM /lrn/cargoflight
     FIELDS carrier_id, connection_id, flight_date,
            airport_from_id, airport_to_id
        INTO @DATA(some_flight_data).

    IF sy-subrc <> 0.
      cl_abap_unit_assert=>fail( `No data found in table /LRN?CARGOFLIGHT` ).
    ENDIF.

    TRY.
        DATA(the_carrier) = NEW lcl_carrier(  i_carrier_id = some_flight_data-carrier_id ).
      CATCH cx_abap_invalid_value.
        cl_abap_unit_assert=>fail( `Unable to instantiate lcl_carrier` ).
    ENDTRY.

    the_carrier->find_cargo_flight(
        EXPORTING
            i_airport_from_id = some_flight_data-airport_from_id
            i_airport_to_id = some_flight_data-airport_to_id
            i_from_date = some_flight_data-flight_date
            i_cargo = 1
        IMPORTING
            e_flight = DATA(flight)
            e_days_later = DATA(days_later)
    ).

    cl_abap_unit_assert=>assert_bound(
        act = flight
        msg = `Method find_cargo_flight does not return a result`
    ).
    cl_abap_unit_assert=>assert_equals(
        act = days_later
        exp = 0
        msg = `Method find_cargo_flight reeturns wrong result`
    ).

  ENDMETHOD.

ENDCLASS.