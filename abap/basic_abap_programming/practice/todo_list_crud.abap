* ==============================================
* =======================
* GLOBAL CLASSES
* =======================
* ==============================================

CLASS zcl_392_practice_6 DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS ZCL_392_PRACTICE_6 IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    " CRUD Operations of a TODO List.
    " In each section, there is a READ operation to demonstrate the changes.

    " Formatting
    CONSTANTS wall TYPE string VALUE `--------------------------------------`.

    " Declarations
    DATA dragunwf_todo_list TYPE REF TO todo_list.
    CREATE OBJECT dragunwf_todo_list
      EXPORTING
        i_name = `DragunWF`.

    " Display without any items
    out->write( wall ).
    out->write( dragunwf_todo_list->display_tasks(  ) ).

    " Adding
    dragunwf_todo_list->add_task( `Read a book for 30 minutes` ).
    dragunwf_todo_list->add_task( `Solve 3 Programming Problems` ).
    dragunwf_todo_list->add_task( `Write your daily journal entry` ).
    dragunwf_todo_list->add_task( `Take a Shower` ).
    dragunwf_todo_list->add_task( `Take your daily Enervon vitamins` ).
    dragunwf_todo_list->add_task( `Check your phone` ).

    out->write( wall ).
    out->write( dragunwf_todo_list->get_tasks(  ) ).

    " Deleting
    dragunwf_todo_list->delete_task( `Check your phone` ).
    dragunwf_todo_list->delete_task( `Take your daily Enervon vitamins` ).

    out->write( wall ).
    out->write( dragunwf_todo_list->get_tasks(  ) ).

    " Updating
    dragunwf_todo_list->update_task(
        EXPORTING
            i_task = `Solve 3 Programming Problems`
            i_new_task = `Solve 10 Programming Problems on CodeWars`
    ).

    out->write( wall ).
    out->write( dragunwf_todo_list->get_tasks(  ) ).

    " Final Display
    out->write( wall ).
    out->write( |Total Length of the List: { dragunwf_todo_list->get_tasks_length(  ) }| ).
    out->write( dragunwf_todo_list->display_tasks(  ) ).

  ENDMETHOD.
ENDCLASS.

* ==============================================
* =======================
* LOCAL CLASSES
* =======================
* ==============================================

CLASS todo_list DEFINITION.

  PUBLIC SECTION.

    DATA name TYPE string.

    METHODS constructor
      IMPORTING
        i_name TYPE string.

    METHODS get_tasks
      RETURNING
        VALUE(r_output) TYPE string_table.

    METHODS add_task
      IMPORTING
        i_task TYPE string.

    METHODS delete_task
      IMPORTING
        i_task           TYPE string
      RETURNING
        VALUE(r_success) TYPE abap_bool.

    METHODS update_task
      IMPORTING
        i_task           TYPE string
        i_new_task       TYPE string
      RETURNING
        VALUE(r_success) TYPE abap_bool.

    METHODS display_tasks
      RETURNING
        VALUE(r_output) TYPE string.

    METHODS get_tasks_length
      RETURNING
        VALUE(r_length) TYPE i.

  PROTECTED SECTION.

  PRIVATE SECTION.

    DATA list TYPE TABLE OF string.

ENDCLASS.

CLASS todo_list IMPLEMENTATION.

  METHOD constructor.
    me->name = i_name.
  ENDMETHOD.

  METHOD get_tasks.
    r_output = me->list.
  ENDMETHOD.

  METHOD add_task.
    APPEND i_task TO me->list.
  ENDMETHOD.

  METHOD delete_task.
    DELETE me->list WHERE table_line = i_task.
    IF sy-subrc <> 0.
      r_success = abap_false.
      RETURN.
    ENDIF.
    r_success = abap_true.
  ENDMETHOD.

  METHOD update_task.
    DATA target_task_index TYPE i.
    target_task_index = line_index( me->list[ table_line = i_task ] ).
    IF target_task_index = 0.
      r_success = abap_false.
      RETURN.
    ENDIF.
    me->list[ target_task_index ] = i_new_task.
    r_success = abap_true.
  ENDMETHOD.

  METHOD display_tasks.
    DATA header TYPE string.
    header = |{ me->name } Todo List ({ lines( me->list ) }):|.
    IF lines( me->list ) = 0.
      r_output = |{ header }{ cl_abap_char_utilities=>newline }- Empty List!|.
      RETURN.
    ENDIF.
    r_output = header.
    DATA task_count TYPE i VALUE 1.
    LOOP AT me->list INTO DATA(task_element).
      r_output = |{ r_output }{ cl_abap_char_utilities=>newline }{ task_count }. { task_element }|.
      task_count += 1.
    ENDLOOP.
  ENDMETHOD.

  METHOD get_tasks_length.
    r_length = lines( me->list ).
  ENDMETHOD.

ENDCLASS.