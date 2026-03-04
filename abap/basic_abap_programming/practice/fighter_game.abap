CLASS zcl_392_practice_1 DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.
    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.

CLASS zcl_392_practice_1 IMPLEMENTATION.

  METHOD if_oo_adt_classrun~main.
    " This will serve as your inputs
    CONSTANTS: rounds_per_fight  TYPE i VALUE 10,
               matches TYPE i VALUE 5.

    " Initial health of the fighters
    CONSTANTS: initial_dragun_health TYPE i VALUE 150,
               initial_luq_health    TYPE i VALUE 155.

    " Do not touch
    CONSTANTS wall TYPE string VALUE `---------------------------------`.

    " Fighters Section
    TYPES: BEGIN OF fighter,
             name   TYPE string,
             health TYPE i,
             damage TYPE i,
             wins TYPE i,
           END OF fighter.

    DATA dragunwf TYPE fighter.
    DATA luq TYPE fighter.

    dragunwf = VALUE #(
        name = 'dragunwf'
        health = initial_dragun_health
        damage = 50
        wins = 0
    ).
    luq = VALUE #(
        name = `luq`
        health = initial_luq_health
        damage = 50
        wins = 0
    ).

    DATA(dragunwf_dice_roller) = cl_abap_random_int=>create(
        seed = cl_abap_random=>seed( )
        min  = 1
        max  = dragunwf-damage
    ).
    DATA(luq_dice_roller) = cl_abap_random_int=>create(
        seed = cl_abap_random=>seed( )
        min = 1
        max = luq-damage
    ).

    DATA current_match_count TYPE i VALUE 1.
    DO matches TIMES.
      " Battle Section
      DATA is_dragun_turn TYPE abap_bool VALUE abap_true.
      out->write( wall ).
      out->write( |Starting Match { current_match_count }| ).
      out->write( |DragunWF's Health: { dragunwf-health }| ).
      out->write( |Luq's Health: { luq-health }| ).

      DO rounds_per_fight TIMES.
        DATA: attacker_name TYPE string,
              defender_name TYPE string.
        attacker_name = COND string(
            WHEN is_dragun_turn = abap_true THEN dragunwf-name ELSE luq-name
        ).
        defender_name = COND string(
            WHEN is_dragun_turn = abap_true THEN luq-name ELSE dragunwf-name
        ).

        DATA damage TYPE i.
        damage = COND i(
            WHEN is_dragun_turn = abap_true THEN dragunwf_dice_roller->get_next( )
            ELSE luq_dice_roller->get_next( )
        ).

        IF is_dragun_turn = abap_true.
          luq-health -= damage.
        ELSE.
          dragunwf-health -= damage.
        ENDIF.

        out->write( wall ).
        out->write( |Round { sy-index } - { attacker_name }'s turn!| ).
        out->write( |{ attacker_name } has hit { defender_name } for { damage } points!| ).
        out->write( |DragunWF's Health: { dragunwf-health }| ).
        out->write( |Luq's Health: { luq-health }| ).

        is_dragun_turn = COND abap_bool(
            WHEN is_dragun_turn = abap_true THEN abap_false ELSE abap_true
        ).

        IF dragunwf-health <= 0 OR luq-health <= 0.
          out->write( wall ).
          IF dragunwf-health <= 0.
            luq-wins += 1.
            out->write( |Match { current_match_count }: Luq has won the fight!| ).
            EXIT.
          ELSEIF luq-health <= 0.
            dragunwf-wins += 1.
            out->write( |Match { current_match_count }: DragunWF has won the fight!| ).
            EXIT.
          ENDIF.
        ENDIF.
      ENDDO.

      IF dragunwf-health > 0 AND luq-health > 0.
        out->write( wall ).
        out->write( |Match { current_match_count }: Draw!| ).
      ENDIF.

      " Reset fighter health
      dragunwf-health = initial_dragun_health.
      luq-health = initial_luq_health.

      current_match_count += 1.

    ENDDO.

    out->write( wall ).
    out->write( `Game Results:` ).
    out->write( |DragunWF Wins: { dragunwf-wins }| ).
    out->write( |Luq Wins: { luq-wins }| ).
    out->write( |Draws: { matches - ( dragunwf-wins + luq-wins ) }| ).

  ENDMETHOD.

ENDCLASS.