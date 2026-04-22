CLASS zcl_392_eml DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_392_eml IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    DATA agencies_upd TYPE TABLE FOR UPDATE /DMO/I_AgencyTP.

    agencies_upd = VALUE #( ( agencyid = '0700392' name = 'Some fancy new name' ) ).


    MODIFY ENTITIES OF /dmo/i_agencytp
       ENTITY /dmo/agency
       UPDATE FIELDS ( name )
         WITH agencies_upd.

    COMMIT ENTITIES.

    out->write( `Method execution finished!` ).

  ENDMETHOD.
ENDCLASS.