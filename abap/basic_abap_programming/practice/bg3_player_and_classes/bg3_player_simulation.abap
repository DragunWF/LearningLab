* ==============================================
* =======================
* GLOBAL CLASSES
* =======================
* ==============================================

CLASS zcl_392_practice_5 DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_392_practice_5 IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.
    " Formatting constants
    CONSTANTS wall TYPE string VALUE `-----------------------------------`.

    " Reset tables
    DELETE FROM zcl_392_class.
    DELETE FROM zcl_392_player.

    " Declare and insert tables
    DATA: new_classes TYPE TABLE OF zcl_392_class,
          new_players TYPE TABLE OF zcl_392_player.

    new_classes = VALUE #(
        ( class_id = 1 name = 'Cleric' description = 'A healer and buffer class' power_level = 1  )
        ( class_id = 2 name = 'Fighter' description = 'A frontline soldier with the action surge ability' power_level = 5 )
        ( class_id = 3 name = 'Rogue' description = 'A thief, assassin, and a duelist' power_level = 3 )
        ( class_id = 4 name = 'Monk' description = 'A specialist at unarmed combat' power_level = 4 )
        ( class_id = 5 name = 'Ranger' description = 'A master of the crossbow and bow.' power_level = 2 )
        ( class_id = 6 name = 'Wizard' description = 'A studious and curious scholar of magic' power_level = 7 )
    ).
    new_players = VALUE #(
        ( player_id = 1 class_id = 6 name = 'DragunWF' weapon = 'Staff' armor = 'Robes' experience_points = 500 )
        ( player_id = 2 class_id = 3 name = 'Jack' weapon = 'Daggers' armor = 'Leather' experience_points = 275 )
        ( player_id = 3 class_id = 5 name = 'Robin Hood' weapon = 'Bow' armor = 'Robes' experience_points = 325 )
        ( player_id = 4 class_id = 1 name = 'Shadowheart' weapon = 'Mace' armor = 'Steel Plates' experience_points = 450 )
        ( player_id = 5 class_id = 2 name = 'Laezel' weapon = 'Greatsword' armor = 'Gith Plates' experience_points = 475 )
    ).

    TRY.
        INSERT zcl_392_class FROM TABLE @new_classes.
        INSERT zcl_392_player FROM TABLE @new_players.

        " Check insert operation status
        out->write( wall ).
        IF sy-subrc = 0.
          out->write( |The new classes have been successfully added to the table! About { lines( new_classes ) } were added!| ).
          out->write( |The new players has been registered to the database table! About { lines( new_players ) } has been added!| ).
        ELSE.
          out->write( |The insert operations failed. The classes were not added to the database table!| ).
        ENDIF.
        out->write( wall ).

        SELECT FROM zcl_392_player AS p
               JOIN zcl_392_class AS c
               ON p~class_id = c~class_id
               FIELDS p~player_id AS player_id,
                      p~name AS player_name,
                      p~weapon AS player_weapon,
                      p~armor AS player_armor,
                      p~experience_points AS player_experience_points,
                      c~name AS class_name,
                      c~description AS class_description
               INTO TABLE @DATA(player_data).

        DATA: total_experience_points TYPE i,
              lt_weapons              TYPE REF TO table_set,
              lt_armor                TYPE REF TO table_set.

        CREATE OBJECT lt_weapons
          EXPORTING
            i_name = 'Weapon'.
        CREATE OBJECT lt_armor
          EXPORTING
            i_name = 'Armor'.

        LOOP AT player_data INTO DATA(individual_player).
          out->write( wall ).
          out->write( |Player { individual_player-player_id }| ).
          out->write( |Name: { individual_player-player_name }| ).
          out->write( |Weapon: { individual_player-player_weapon }| ).
          out->write( |Armor: { individual_player-player_armor }| ).
          out->write( |Class Name: { individual_player-class_name }| ).
          out->write( |Class Description: { individual_player-class_description }| ).
          out->write( |Experience Points: { individual_player-player_experience_points }| ).

          DATA: weapon_message TYPE string,
                armor_message  TYPE string.

          lt_weapons->add_item(
            EXPORTING i_item = CONV string( individual_player-player_weapon )
            IMPORTING e_message = weapon_message
          ).
          lt_armor->add_item(
            EXPORTING i_item = CONV string( individual_player-player_armor )
            IMPORTING e_message = armor_message
          ).

          out->write( wall ).
          out->write( weapon_message ).
          out->write( armor_message ).
          out->write( wall ).

          total_experience_points += individual_player-player_experience_points.
        ENDLOOP.

        out->write( |Total Accumulated Experience Points: { total_experience_points }| ).
        out->write( wall ).
        out->write( lt_weapons->display_table(  ) ).
        out->write( wall ).
        out->write( lt_armor->display_table( ) ).
        out->write( wall ).

        DATA armor_removal_message TYPE string.
        out->write( |Armor Item Removal and Adding Back Test| ).
        lt_armor->remove_item(
            EXPORTING i_item = `Robes`
            IMPORTING e_message = armor_removal_message
        ).
        out->write( armor_removal_message ).
        out->write( wall ).
        out->write( lt_armor->display_table(  ) ).
        out->write( wall ).

        DATA armor_add_message TYPE string.
        lt_armor->add_item(
            EXPORTING i_item = `Robes`
            IMPORTING e_message = armor_add_message
        ).
        out->write( armor_add_message ).
        out->write( lt_armor->display_table(  ) ).
        out->write( wall ).
        out->write( |Combined Table Length: { lt_armor->get_length(  ) + lt_weapons->get_length(  ) }| ).
      CATCH cx_sy_open_Sql_db INTO DATA(lx_db_error).
        out->write( |Database Error: { lx_db_error->get_text(  ) }| ).
      CATCH cx_root INTO DATA(lx_generic_error).
        out->write( |Root Error: { lx_generic_error->get_text(  ) }| ).
    ENDTRY.

  ENDMETHOD.
ENDCLASS.

* ==============================================
* =======================
* LOCAL CLASSES
* =======================
* ==============================================

CLASS table_set DEFINITION.

  PUBLIC SECTION.

    DATA name TYPE string.

    METHODS constructor
      IMPORTING
        i_name TYPE string.

    METHODS add_item
      IMPORTING
        i_item           TYPE string
      EXPORTING
        e_message        TYPE string
      RETURNING
        VALUE(r_success) TYPE abap_bool.

    METHODS remove_item
      IMPORTING
        i_item           TYPE string
      EXPORTING
        e_message        TYPE string
      RETURNING
        VALUE(r_success) TYPE abap_bool.

    METHODS get_length
      RETURNING
        VALUE(r_output) TYPE i.

    METHODS display_table
      RETURNING
        VALUE(r_output) TYPE string.

  PROTECTED SECTION.

  PRIVATE SECTION.

    DATA lt_unique_content TYPE TABLE OF string.

    METHODS get_message_template
      IMPORTING
        i_message       TYPE string
      RETURNING
        VALUE(r_output) TYPE string.

ENDCLASS.

CLASS table_set IMPLEMENTATION.

  METHOD constructor.
    me->name = i_name.
  ENDMETHOD.

  METHOD add_item.
    READ TABLE me->lt_unique_content WITH KEY table_line = i_item TRANSPORTING NO FIELDS.
    IF sy-subrc <> 0.
      r_success = abap_true.
      e_message = get_message_template( |Item "{ i_item }" has been added to the set table!| ).
      APPEND i_item TO me->lt_unique_content.
    ELSE.
      r_success = abap_false.
      e_message = get_message_template( |Item "{ i_item }" already exists in the set table!| ).
    ENDIF.
  ENDMETHOD.

  METHOD remove_item.
    DELETE me->lt_unique_content WHERE table_line = i_item.
    IF sy-subrc = 0.
      r_success = abap_true.
      e_message = |Item "{ i_item }" has been successfully removed!|.
    ELSE.
      r_success = abap_false.
    ENDIF.
  ENDMETHOD.

  METHOD get_length.
    r_output = lines( me->lt_unique_content ).
  ENDMETHOD.

  METHOD display_table.
    DATA: header TYPE string,
          count  TYPE i VALUE 1.
    header = |{ me->name } Table Items:{ cl_abap_char_utilities=>newline }|.
    LOOP AT me->lt_unique_content INTO DATA(table_element).
      r_output = |{ r_output }{ count }. { table_element }{ cl_abap_char_utilities=>newline }|.
      count += 1.
    ENDLOOP.
    r_output = |{ header }{ r_output }|.
  ENDMETHOD.

  METHOD get_message_template.
    r_output = |{ me->name } Table: { i_message }|.
  ENDMETHOD.

ENDCLASS.