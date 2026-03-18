* ============================================================
* ==============================
* GLOBAL CLASSES
* ==============================
* ============================================================

CLASS z8141_atc_test DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS z8141_atc_test IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

*    DATA: connection_list TYPE TABLE OF /dmo/connection.

    SELECT FROM /dmo/connection
        FIELDS * ##pragma-comment-test
        INTO TABLE @DATA(connections). "#PSEUDO COMMENT TEST

*    connection_list = connection_list.

    out->write( connections ).

  ENDMETHOD.
ENDCLASS.