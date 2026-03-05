* ==================================================================
* =================================
* LOCAL CLASSES
* =================================
* ==================================================================

* =================================
* PLAYER CLASS
* =================================

CLASS player DEFINITION.
  PUBLIC SECTION.

    DATA name TYPE string.

    METHODS constructor
      IMPORTING
        i_name              TYPE string
        i_experience_points TYPE i OPTIONAL.

    METHODS add_advantage
      IMPORTING
        i_advantage      TYPE string
      EXPORTING
        e_message        TYPE string
      RETURNING
        VALUE(r_success) TYPE abap_bool.

    METHODS add_disadvantage
      IMPORTING
        i_disadvantage   TYPE string
      EXPORTING
        e_message        TYPE string
      RETURNING
        VALUE(r_success) TYPE abap_bool.

    METHODS remove_advantage
      IMPORTING
        i_advantage TYPE string
      EXPORTING
        e_message   TYPE string.

    METHODS remove_disadvantage
      IMPORTING
        i_disadvantage TYPE string
      EXPORTING
        e_message      TYPE string.

    METHODS is_advantage
      IMPORTING
        i_advantage     TYPE string
      RETURNING
        VALUE(r_exists) TYPE abap_bool.

    METHODS is_disadvantage
      IMPORTING
        i_disadvantage  TYPE string
      RETURNING
        VALUE(r_exists) TYPE abap_bool.

    METHODS display_advantages
      RETURNING
        VALUE(r_output) TYPE string.

    METHODS display_disadvantages
      RETURNING
        VALUE(r_output) TYPE string.

  PROTECTED SECTION.

  PRIVATE SECTION.

    DATA: experience_points TYPE i,
          lt_advantages     TYPE TABLE OF string,
          lt_disadvantages  TYPE TABLE OF string.

    METHODS get_message_template
      IMPORTING
        i_message        TYPE string
      RETURNING
        VALUE(r_message) TYPE string.

    METHODS display_table
      IMPORTING
        i_table_type    TYPE string
      RETURNING
        VALUE(r_output) TYPE string.

ENDCLASS.

CLASS player IMPLEMENTATION.

  METHOD constructor.
    me->name = i_name.
    me->experience_points = i_experience_points.
  ENDMETHOD.

  METHOD add_advantage.
    r_success = abap_false.

    IF i_advantage IS INITIAL.
      e_message = me->get_message_template(  |Name of the advantage cannot be empty!| ).
      RETURN.
    ENDIF.

    IF me->is_disadvantage( i_advantage ).
      e_message = me->get_message_template( |{ i_advantage } cannot be an advantage if it is already a disadvantage| ).
      RETURN.
    ENDIF.

    IF me->is_advantage( i_advantage ).
      e_message = me->get_message_template( |{ i_advantage } already exists as an advantage!| ).
      RETURN.
    ELSE.
      APPEND i_advantage TO me->lt_advantages.
    ENDIF.

    r_success = abap_true.
    e_message = me->get_message_template( |{ i_advantage } has been successfully added as an advantage!| ).
    RETURN.
  ENDMETHOD.

  METHOD add_disadvantage.
    r_success = abap_false.

    IF i_disadvantage IS INITIAL.
      e_message = me->get_message_template( |Name of the disadvantage cannot be empty!| ).
      RETURN.
    ENDIF.

    IF me->is_advantage( i_disadvantage ).
      e_message = me->get_message_template( |{ i_disadvantage } already exists as an advantage!| ).
      RETURN.
    ENDIF.

    IF me->is_disadvantage( i_disadvantage ).
      e_message = me->get_message_template( |{ i_disadvantage } already exists as a disadvantage!| ).
      RETURN.
    ELSE.
      APPEND i_disadvantage TO lt_disadvantages.
    ENDIF.

    r_success = abap_true.
    e_message = me->get_message_template( |{ i_disadvantage } has been successfully added as a disadvantage!| ).
    RETURN.
  ENDMETHOD.

  METHOD remove_advantage.
    IF NOT me->is_advantage( i_advantage ).
      e_message = me->get_message_template( |{ i_advantage } cannot be deleted because it does not exist!| ).
      RETURN.
    ENDIF.

    DELETE lt_advantages WHERE table_line = i_advantage.
    e_message = me->get_message_template( |{ i_advantage } has been deleted from the advantages| ).
  ENDMETHOD.

  METHOD remove_disadvantage.
    IF NOT me->is_disadvantage( i_disadvantage ).
      e_message = me->get_message_template( |{ i_disadvantage } cannot be deleted because it does not exist!| ).
    ENDIF.

    DELETE lt_disadvantages WHERE table_line = i_disadvantage.
    e_message = me->get_message_template( |{ i_disadvantage } has been deleted from the disadvantages| ).
  ENDMETHOD.

  METHOD get_message_template.
    r_message = |{ me->name }: { i_message }|.
  ENDMETHOD.

  METHOD is_advantage.
    READ TABLE me->lt_advantages WITH KEY table_line = i_advantage TRANSPORTING NO FIELDS.
    r_exists = xsdbool( sy-subrc = 0 ).
  ENDMETHOD.

  METHOD is_disadvantage.
    READ TABLE me->lt_disadvantages WITH KEY table_line = i_disadvantage TRANSPORTING NO FIELDS.
    r_exists = xsdbool( sy-subrc = 0 ).
  ENDMETHOD.

  METHOD display_table.
    DATA: lt_target_table TYPE TABLE OF string,
          table_header    TYPE string.
    CASE i_table_type.
      WHEN `advantage`.
        lt_target_table = me->lt_advantages.
        table_header = `Advantages`.
      WHEN `disadvantage`.
        lt_target_table = me->lt_disadvantages.
        table_header = `Disadvantages`.
      WHEN OTHERS.
        r_output = `Table not found!`.
        RETURN.
    ENDCASE.

    DATA display TYPE string.
    display = |{ me->name }'s { table_header } ({ lines( lt_target_table ) }):|.
    LOOP AT lt_target_table INTO DATA(table_element).
      DATA formatted_element TYPE string.
      formatted_element = |'{ table_element }'|.
      CONCATENATE display formatted_element INTO display SEPARATED BY space.
    ENDLOOP.

    r_output = display.
  ENDMETHOD.

  METHOD display_advantages.
    r_output = me->display_table( `advantage` ).
  ENDMETHOD.

  METHOD display_disadvantages.
    r_output = me->display_table( `disadvantage` ).
  ENDMETHOD.

ENDCLASS.

* =================================
* SITUATION CLASS (Where you can perform the rolls)
* =================================

CLASS situation DEFINITION.
  PUBLIC SECTION.

    CLASS-DATA: min_roll TYPE i VALUE 1,
                max_roll TYPE i VALUE 20.

    DATA: name          TYPE string,
          required_roll TYPE i,
          advantage     TYPE string,
          disadvantage  TYPE string.


    METHODS constructor
      IMPORTING
        i_name          TYPE string
        i_required_roll TYPE i
        i_advantage     TYPE string OPTIONAL
        i_disadvantage  TYPE string OPTIONAL.

  PROTECTED SECTION.

  PRIVATE SECTION.

ENDCLASS.

CLASS situation IMPLEMENTATION.
  METHOD constructor.
    me->name = i_name.
    me->required_roll = i_required_roll.
    me->advantage = i_advantage.
    me->disadvantage = i_disadvantage.
  ENDMETHOD.
ENDCLASS.

CLASS zcl_392_practice_3 DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .

  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.

* ==================================================================
* =================================
* GLOBAL CLASSES CLASS
* =================================
* ==================================================================


CLASS zcl_392_practice_3 IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

    " For output formatting
    CONSTANTS wall TYPE string VALUE `--------------------------------`.

    " Dice and Roll Settings (Mimics Baldur's Gate 3)
    CONSTANTS rolls TYPE i VALUE 25.

    DATA(dice_roller) = cl_abap_random_int=>create(
            seed = cl_abap_random=>seed( )
            min  = situation=>min_roll
            max  = situation=>max_roll
    ).

    " Player Settings
    DATA dragunwf TYPE REF TO player.
    CREATE OBJECT dragunwf
      EXPORTING
        i_name              = 'DragunWF'
        i_experience_points = 100.

    " Adding advantages and disadvantages to player DragunWf
    DATA: advantages_to_add    TYPE TABLE OF string,
          disadvantages_to_add TYPE TABLE OF string.
    APPEND `intelligence` TO advantages_to_add.
    APPEND `dexterity` TO advantages_to_add.
    APPEND `wisdom` TO advantages_to_add.
    APPEND `strength` TO disadvantages_to_add.
    APPEND `constitution` TO disadvantages_to_add.

    out->write( wall ).
    LOOP AT advantages_to_add INTO DATA(advantage).
      DATA: advantage_add_message TYPE string,
            advantage_add_success TYPE abap_bool.
      advantage_add_success = dragunwf->add_advantage(
        EXPORTING
            i_advantage = advantage
        IMPORTING
            e_message = advantage_add_message
      ).

      out->write( advantage_add_message ).
    ENDLOOP.
    out->write( wall ).
    LOOP AT disadvantages_to_add INTO DATA(disadvantage).
      DATA: disadvantage_add_message TYPE string,
            disadvantage_add_success TYPE abap_bool.
      disadvantage_add_success = dragunwf->add_disadvantage(
          EXPORTING
              i_disadvantage = disadvantage
          IMPORTING
              e_message = disadvantage_add_message
      ).

      out->write( disadvantage_add_message ).
    ENDLOOP.

    " Checking advantages and disadvantages of the player DragunWF
    out->write( wall ).
    out->write( dragunwf->display_advantages(  ) ).
    out->write( dragunwf->display_disadvantages(  ) ).
    out->write( wall ).

    " Declaring situations for rolling dice
    DATA decryption_situation TYPE REF TO situation.
    CREATE OBJECT decryption_situation
      EXPORTING
        i_name          = 'Decrypt Ciphertext'
        i_required_roll = 10
        i_advantage     = `intelligence`
        i_disadvantage  = `intelligence`.

    " Simulating Rolls
    DATA successful_decryption_rolls TYPE i VALUE 0.
    DO rolls TIMES.
      DATA: first_decryption_roll  TYPE i,
            second_decryption_roll TYPE i,
            final_decryption_roll  TYPE i.
      first_decryption_roll = dice_roller->get_next(  ).
      second_decryption_roll = dice_roller->get_next(  ).

      IF dragunwf->is_advantage( decryption_situation->advantage ).
        IF first_decryption_roll > second_decryption_roll.
          final_decryption_roll = first_decryption_roll.
        ELSE.
          final_decryption_roll = second_decryption_roll.
        ENDIF.
      ELSEIF dragunwf->is_disadvantage( decryption_situation->disadvantage ).
        IF first_decryption_roll < second_decryption_roll.
          final_decryption_roll = first_decryption_roll.
        ELSE.
          final_decryption_roll = second_decryption_roll.
        ENDIF.
      ELSE.
        final_decryption_roll = first_decryption_roll.
      ENDIF.

      IF final_decryption_roll >= decryption_situation->required_roll.
        successful_decryption_rolls += 1.
      ENDIF.

      out->write( wall ).
      out->write( |Roll { sy-index }:| ).
      IF dragunwf->is_advantage( decryption_situation->advantage ).
        out->write( |First Roll: { first_decryption_roll }| ).
        out->write( |Second Roll: { second_decryption_roll }| ).
        out->write( |Final Roll (Advantage): { final_decryption_roll }| ).
      ELSEIF dragunwf->is_disadvantage( decryption_situation->disadvantage ).
        out->write( |First Roll: { first_decryption_roll }| ).
        out->write( |Second Roll: { second_decryption_roll }| ).
        out->write( |Final Roll (Disadvantage): { final_decryption_roll }| ).
      ELSE.
        out->write( |Roll: { final_decryption_roll }| ).
      ENDIF.
      out->write( wall ).
    ENDDO.

    " Game Statistics
    out->write( wall ).
    out->write( |{ dragunwf->name } has successfully decrypted { successful_decryption_rolls } of the { rolls } ciphertexts| ).
    out->write( wall ).
  ENDMETHOD.
ENDCLASS.