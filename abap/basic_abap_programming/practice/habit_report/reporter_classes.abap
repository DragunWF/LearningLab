* ==============================================
* =======================
* GLOBAL CLASSES
* =======================
* ==============================================

CLASS zcl_392_practice_7 DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_392_practice_7 IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    " Formatting
    CONSTANTS wall TYPE string VALUE `-----------------------------`.

    " Declaration
    DATA consistency_report TYPE REF TO zcl_392_consistency.
    CREATE OBJECT consistency_report.

    " Class Actions
    consistency_report->setup_habits( ).
    consistency_report->log_completion(
        i_log_id = 1 i_habit_id = 1 i_notes = `I will code until the heavens themselves fall!`
    ).
    consistency_report->log_completion(
        i_log_id = 2 i_habit_id = 1 i_notes = `I WILL NEVER STOP PROGRAMMING!!!`
    ).
    consistency_report->log_completion(
        i_log_id = 3 i_habit_id = 2 i_notes = `Reading relaxes the brain and enriches the attention span.`
    ).
    consistency_report->log_completion(
        i_log_id = 4 i_habit_id = 3 i_notes = `To write is to think and the more you write, the better you think.`
    ).

    " Reporting
    out->write( wall ).
    out->write( `Consistency Report` ).
    out->write( wall ).
    out->write( consistency_report->display_consistency_report(  ) ).

    " Cleaning
    consistency_report->wipe_data(  ).

  ENDMETHOD.
ENDCLASS.

* ==============================================
* =======================
* LOCAL CLASSES
* =======================
* ==============================================

CLASS zcl_392_consistency DEFINITION.

  PUBLIC SECTION.

    METHODS setup_habits.

    METHODS log_completion
      IMPORTING
        i_log_id   TYPE int4
        i_habit_id TYPE int4
        i_notes    TYPE string OPTIONAL.

    METHODS wipe_data.

    METHODS display_consistency_report
      RETURNING
        VALUE(r_output) TYPE string.

  PROTECTED SECTION.

  PRIVATE SECTION.

    DATA lt_habits TYPE TABLE OF string.

ENDCLASS.

CLASS zcl_392_consistency IMPLEMENTATION.

  METHOD setup_habits.
    DATA lt_habits TYPE TABLE OF ztb_392_habit.

    lt_habits = VALUE #(
        ( habit_key = 1 habit_name = `Solve 3 Programming Problems` category = `Programming` )
        ( habit_key = 2 habit_name = `Read a book for 20 minutes` category = `Literacy`)
        ( habit_key = 3 habit_name = `Write your daily journal entry` category = `Writing` )
    ).

    INSERT ztb_392_habit FROM TABLE @lt_habits.
  ENDMETHOD.

  METHOD log_completion.
    DATA ls_log TYPE ztb_392_log.

    ls_log-log_id = i_log_id.
    ls_log-habit_id = i_habit_id.
    ls_log-log_date = cl_abap_context_info=>get_system_date(  ).
    ls_log-notes = i_notes.

    INSERT ztb_392_log FROM @ls_log.
  ENDMETHOD.

  METHOD wipe_data.
    DELETE FROM ztb_392_log.
    DELETE FROM ztb_392_habit.
  ENDMETHOD.

  METHOD display_consistency_report.
    SELECT FROM ztb_392_habit AS h
           LEFT OUTER JOIN ztb_392_log AS l
            ON h~habit_key = l~habit_id
           FIELDS h~habit_name,
                  COUNT( l~log_id ) AS completion_count
           GROUP BY h~habit_name
           ORDER BY completion_count DESCENDING
           INTO TABLE @DATA(lt_report).

    IF lines( lt_report ) = 0.
      r_output = `There are currently no habits in the database!`.
      RETURN.
    ENDIF.

    DATA count TYPE i VALUE 1.
    LOOP AT lt_report INTO DATA(ls_report).
      r_output = |{ r_output }{ count }. { ls_report-habit_name } ({ ls_report-completion_count }){ cl_abap_char_utilities=>newline }|.
      count += 1.
    ENDLOOP.
  ENDMETHOD.

ENDCLASS.