CLASS zcl_392_complex_tables DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_392_complex_tables IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    TYPES: BEGIN OF st_connection,
             carrier_id      TYPE /dmo/carrier_id,
             connection_id   TYPE /dmo/connection_id,
             airport_from_id TYPE /dmo/airport_from_id,
             airport_to_id   TYPE /dmo/airport_to_id,
             carrier_name    TYPE /dmo/carrier_name,
           END OF st_connection.


* Example 1 : Simple and Complex Internal Table
**********************************************************************

    " simple table (scalar row type)
    DATA numbers TYPE TABLE OF i.
    " complex table (structured row type)
    DATA connections TYPE TABLE OF st_connection.

    out->write(  `--------------------------------------------` ).
    out->write(  `Example 1: Simple and Complex Internal Table` ).
    out->write( data = numbers
                name = `Simple Table NUMBERS:`).
    out->write( data = connections
                name = `Complex Table CONNECTIONS:`).

* Example 2 : Complex Internal Tables
**********************************************************************

    " standard table with non-unique standard key (short form)
    DATA connections_1 TYPE TABLE OF st_connection.

    " standard table with non-unique standard key (explicit form)
    DATA connections_2 TYPE STANDARD TABLE OF st_connection
                            WITH NON-UNIQUE DEFAULT KEY.

    " sorted table with non-unique explicit key
    DATA connections_3  TYPE SORTED TABLE OF st_connection
                             WITH NON-UNIQUE KEY airport_from_id
                                                 airport_to_id.

    " sorted hashed with unique explicit key
    DATA connections_4  TYPE HASHED TABLE OF st_connection
                             WITH UNIQUE KEY carrier_id
                                             connection_id.

* Example 3 : Local Table Type
**********************************************************************

    TYPES tt_connections TYPE SORTED TABLE OF st_connection
                              WITH UNIQUE KEY carrier_id
                                              connection_id.

    DATA connections_5 TYPE tt_connections.

* Example 4 : Global Table Type
**********************************************************************

    DATA flights  TYPE /dmo/t_flight.

    out->write(  `------------------------------------------` ).
    out->write(  `Example 4: Global Table TYpe /DMO/T_FLIGHT` ).
    out->write(  data = flights
                 name = `Internal Table FLIGHTS:` ).

* Example 5 : My own example for practice
*********************************************************************

    TYPES: BEGIN OF knight,
           first_name TYPE string,
           last_name TYPE string,
           armor TYPE string,
           sword TYPE string,
           health TYPE i,
           END OF knight.

    DATA knights_of_the_north TYPE SORTED TABLE OF knight
                              WITH UNIQUE KEY first_name.
    DATA knights_of_the_south TYPE STANDARD TABLE OF knight
                              WITH NON-UNIQUE KEY first_name.
    DATA: arthur TYPE knight,
          jack TYPE knight,
          gabimaru TYPE knight,
          angelina TYPE knight.

    arthur = VALUE #(
        first_name = 'King'
        last_name = 'Arthur'
        armor = 'steel'
        sword = 'excalibur'
        health = 100
    ).
    jack = VALUE #(
        first_name = 'Jack'
        last_name = 'Sparrow'
        armor = 'leather'
        sword = 'scimitar'
        health = 75
    ).
    gabimaru = VALUE #(
        first_name = 'Gab'
        last_name = 'Xi'
        armor = 'gold'
        sword = 'katana'
        health = 150
    ).
    angelina = VALUE #(
        first_name = 'Angelina'
        last_name = 'Max'
        armor = 'silver'
        sword = 'rapier'
        health = 225
    ).

    APPEND arthur TO knights_of_the_north.
    APPEND gabimaru TO knights_of_the_south.
    APPEND jack TO knights_of_the_south.
    APPEND angelina TO knights_of_the_south.

    out->write(  `------------------------------------------` ).
    out->write(  `My own example for practice` ).
    out->write( arthur ).

    out->write( knights_of_the_north ).
    out->write( knights_of_the_south ).

  ENDMETHOD.
ENDCLASS.