CLASS zcl_02_string_processing DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_02_string_processing IMPLEMENTATION.



 METHOD if_oo_adt_classrun~main.

* Declarations
**********************************************************************
    TYPES t_amount TYPE  p LENGTH 8 DECIMALS 2.

    DATA amount   TYPE t_amount VALUE '3.30'.
    DATA amount1  TYPE t_amount VALUE '1.20'.
    DATA amount2  TYPE t_amount VALUE '2.10'.

    DATA the_date  TYPE d                     VALUE '19891109'.
    DATA my_number TYPE p LENGTH 3 DECIMALS 2 VALUE '-273.15'.

    DATA part1 TYPE string VALUE `Hello`.
    DATA part2 TYPE string VALUE `World`.

* String Templates
**********************************************************************

    " comment/uncomment the following lines for different examples
*    DATA(text) = |Hello World|.
*    DATA(text) = |Total: { amount } EUR|.
*    DATA(text) = |Total: { amount1 + amount2 } EUR|.

* Format Options
**********************************************************************

    "Date
    DATA(text) = |Raw Date: { the_date             }|.
    out->write( |{ text }| ).
    text = |ISO Date: { the_date Date = ISO  }|.
    out->write( |{ text }| ).
    text = |USER Date:{ the_date Date = USER }|.
    out->write( |{ text }| ).

    "Number
    text = |Raw Number { my_number                    }|.
    out->write( |{ text }| ).
    text = |User Format{ my_number NUMBER = USER      }|.
    out->write( |{ text }| ).
    text = |Sign Right { my_number SIGN = RIGHT       }|.
    out->write( |{ text }| ).
    text = |Scientific { my_number STYLE = SCIENTIFIC }|.
    out->write( |{ text }| ).

* String expression (concatenation Operator)
**********************************************************************

    text = part1 && part2.
    out->write( |{ text }| ).
    text = part1 && | | && part2.
    out->write( |{ text }| ).
    text = |{ amount1 } + { amount2 }| &&
                 | = | &&
                 |{ amount1 + amount2 }|.


* Output
**********************************************************************

    out->write( text ).


  ENDMETHOD.
ENDCLASS.