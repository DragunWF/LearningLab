CLASS zcl_392_practice_4 DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_392_practice_4 IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    " 1. Define a local variable to use in the WHERE clause
    DATA(target_currency) = 'USD'.

    out->write( 'Fetching flight data from the database...' ).
    out->write( '----------------------------------------' ).

    " 2. The OpenSQL Query
    SELECT FROM /dmo/flight AS f
           JOIN /dmo/carrier AS c
             ON f~carrier_id = c~carrier_id
           FIELDS c~name AS airline_name,
                  f~price,
                  f~currency_code
           WHERE f~currency_code = @target_currency
           INTO TABLE @DATA(flight_data)
           UP TO 15 ROWS.

    " 3. Iterating through the result set
    LOOP AT flight_data INTO DATA(flight_row).

      " We use the dash (-) to access the fields of the structure
      out->write( |Airline: { flight_row-airline_name } | ).
      out->write( |Price: { flight_row-price } { flight_row-currency_code }| ).

    ENDLOOP.

    out->write( '----------------------------------------' ).
    out->write( |Total records found: { lines( flight_data ) }| ).

  ENDMETHOD.
ENDCLASS.