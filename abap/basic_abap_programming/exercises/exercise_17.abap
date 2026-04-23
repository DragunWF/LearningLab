CLASS zcl_2116_eml DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_2116_eml IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.
    CONSTANTS: lc_agencyid TYPE /dmo/i_agencytp-agencyid VALUE '070021',
               lc_new_name TYPE string VALUE 'Hallo there, M.P was here.'.

    DATA lt_agencies TYPE STANDARD TABLE OF /dmo/i_agencytp.

    DATA agencies_upd TYPE TABLE FOR UPDATE /dmo/i_agencytp.

    agencies_upd = VALUE #( ( agencyid = lc_agencyid name = lc_new_name ) ).

    MODIFY ENTITIES OF /dmo/i_agencytp
        ENTITY /dmo/agency
        UPDATE FIELDS ( name )
        WITH agencies_upd.

    COMMIT ENTITIES.

    out->write( |Program was successful. Name was changed to '{ lc_new_name }'| ).

  ENDMETHOD.
ENDCLASS.