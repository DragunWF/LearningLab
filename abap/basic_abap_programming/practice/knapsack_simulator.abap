* ====================================
* LOCAL CLASSES
* ====================================

* ====================================
* INVENTORY ITEM
* ====================================

CLASS item DEFINITION.
  PUBLIC SECTION.

    DATA: name   TYPE string,
          weight TYPE i.

    METHODS constructor
      IMPORTING
        i_name   TYPE string
        i_weight TYPE i.

  PROTECTED SECTION.

  PRIVATE SECTION.
ENDCLASS.

CLASS item IMPLEMENTATION.

  METHOD constructor.
    me->name = i_name.
    me->weight = i_weight.
  ENDMETHOD.

ENDCLASS.

* ====================================
* INVENTORY
* ====================================

CLASS inventory DEFINITION.
  PUBLIC SECTION.

    DATA items TYPE TABLE OF REF TO item.
    DATA: name                TYPE string,
          weight_capacity     TYPE p,
          item_count_capacity TYPE i.

    METHODS constructor
      IMPORTING
        i_name                TYPE string
        i_weight_capacity     TYPE p
        i_item_count_capacity TYPE i.

    METHODS add_item
      IMPORTING
        i_new_item TYPE REF TO item
      EXPORTING
        e_success  TYPE abap_bool
        e_message  TYPE string.

    METHODS get_weight
      EXPORTING
        e_weight TYPE p.

    METHODS get_item_count
      EXPORTING
        e_item_count TYPE i.

    METHODS display_status
      EXPORTING
        e_status TYPE string.

  PROTECTED SECTION.

  PRIVATE SECTION.

ENDCLASS.

CLASS inventory IMPLEMENTATION.

  METHOD constructor.
    me->name = i_name.
    me->item_count_capacity = i_item_count_capacity.
    me->weight_capacity = i_weight_capacity.
  ENDMETHOD.

  METHOD add_item.
    DATA current_weight TYPE p.
    DATA new_weight TYPE p.
    me->get_weight( IMPORTING e_weight = current_weight ).
    new_weight = current_weight + i_new_item->weight.
    IF new_weight > me->weight_capacity.
      e_message = `Weight capacity exceeded!`.
      e_success = abap_false.
      RETURN.
    ENDIF.

    DATA current_item_count TYPE i.
    me->get_item_count( IMPORTING e_item_count = current_item_count ).
    IF current_item_count + 1 > me->item_count_capacity.
      e_message = `Item count capacity exceeded!` .
      e_success = abap_false.
      RETURN.
    ENDIF.

    APPEND i_new_item TO items.
    e_message = |Item named "{ i_new_item->name }" has been added to { me->name } inventory! |.
    e_success = abap_true.

    RETURN.
  ENDMETHOD.

  METHOD get_weight.

    DATA total_weight TYPE p VALUE 0.
    LOOP AT me->items INTO DATA(single_item).
      total_weight += single_item->weight.
    ENDLOOP.
    e_weight = total_weight.
    RETURN.

  ENDMETHOD.

  METHOD get_item_count.
    e_item_count = lines( items ).
    RETURN.
  ENDMETHOD.

  METHOD display_status.
    DATA: header                     TYPE string,
          weight_status              TYPE string,
          item_count_status          TYPE string,
          weight_capacity_status     TYPE string,
          item_count_capacity_status TYPE string.

    DATA: current_weight     TYPE p,
          current_item_count TYPE i.
    me->get_weight( IMPORTING e_weight = current_weight ).
    me->get_item_count( IMPORTING e_item_count = current_item_count ).

    header = |{ me->name } Inventory Status:{ cl_abap_char_utilities=>newline }|.
    weight_status = |Current Weight: { current_weight }{ cl_abap_char_utilities=>newline }|.
    item_count_status = |Current Item Count: { current_item_count }{ cl_abap_char_utilities=>newline }|.
    weight_capacity_status = |Weight Capacity: { me->weight_capacity }{ cl_abap_char_utilities=>newline }|.
    item_count_capacity_status = |Item Count Capacity: { me->item_count_capacity }|.

    CONCATENATE header
                weight_status
                item_count_status
                weight_capacity_status
                item_count_capacity_status
    INTO e_status.

    RETURN.
  ENDMETHOD.

ENDCLASS.

* ====================================
* GLOBAL CLASSES
* ====================================

CLASS zcl_392_practice_2 DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.

CLASS zcl_392_practice_2 IMPLEMENTATION.

  METHOD if_oo_adt_classrun~main.

* =======================================
* DECLARATIONS
* =======================================

    CONSTANTS wall TYPE string VALUE `-------------------------------`.

    DATA dragun_inventory TYPE REF TO inventory.
    CREATE OBJECT dragun_inventory
      EXPORTING
        i_name                = 'Dragun'
        i_weight_capacity     = 225
        i_item_count_capacity = 10.
    DATA luq_inventory TYPE REF TO inventory.
    CREATE OBJECT luq_inventory
      EXPORTING
        i_name                = 'Luq'
        i_weight_capacity     = 3500
        i_item_count_capacity = 15.

    DATA sword TYPE REF TO item.
    CREATE OBJECT sword
      EXPORTING
        i_name   = 'Sword'
        i_weight = 50.
    DATA shield TYPE REF TO item.
    CREATE OBJECT shield
      EXPORTING
        i_name   = 'Shield'
        i_weight = 75.
    DATA armor TYPE REF TO item.
    CREATE OBJECT armor
      EXPORTING
        i_name   = 'Armor'
        i_weight = 65.
    DATA obsidian TYPE REF TO item.
    CREATE OBJECT obsidian
      EXPORTING
        i_name   = 'Obsidian'
        i_weight = 500.

* =======================================
* ADDING ITEMS
* =======================================

    DATA inventories TYPE TABLE OF REF TO inventory.
    APPEND dragun_inventory TO inventories.
    APPEND luq_inventory TO inventories.

    DATA items_to_add TYPE TABLE OF REF TO item.
    APPEND sword TO items_to_add.
    APPEND shield TO items_to_add.
    APPEND armor TO items_to_add.
    APPEND obsidian TO items_to_add.


    LOOP AT inventories INTO DATA(target_inventory).
      out->write( wall ).
      out->write( |Adding items to { target_inventory->name } Inventory...| ).

      LOOP AT items_to_add INTO DATA(target_item).
        DATA: message TYPE string,
              success TYPE abap_bool.

        target_inventory->add_item(
            EXPORTING
                i_new_item = target_item
            IMPORTING
                e_message = message
                e_success = success
        ).

        IF success = abap_true.
          out->write( |Operation Success: { message }| ).
        ELSE.
          out->write( |Operation Failed: { message }| ).
        ENDIF.

      ENDLOOP.
    ENDLOOP.

* =======================================
* SIMULATION
* =======================================

    LOOP AT inventories INTO DATA(target_inventory_display).
      DATA target_inventory_status TYPE string.
      target_inventory_display->display_status(
          IMPORTING e_status = target_inventory_status
      ).
      out->write( wall ).
      out->write( target_inventory_status ).

      out->write( wall ).
      out->write( |{ target_inventory_display->name } Inventory Items:| ).
      DATA current_count TYPE i VALUE 1.

      LOOP AT target_inventory_display->items INTO DATA(target_item_display).
        out->write( wall ).
        out->write( |Item #{ current_count }| ).
        out->write( |Item Name: { target_item_display->name }| ).
        out->write( |Item Weight: { target_item_display->weight }| ).
        current_count += 1.
      ENDLOOP.

      current_count = 1.

    ENDLOOP.

  ENDMETHOD.

ENDCLASS.