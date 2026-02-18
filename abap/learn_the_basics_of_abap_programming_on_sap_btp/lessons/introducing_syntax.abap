* Comments start with * (column 1) or " (anywhere)

" Defining a Structure (Work Area) for Strings
DATA: BEGIN OF gs_user_info,
        greetings TYPE string VALUE 'Hallo',
        username  TYPE string VALUE 'dragunwf',
      END OF gs_user_info.

CLEAR gs_user_info-greetings.
gs_user_info-greetings = 'Hi, how are you doing?'.

" Defining a Structure for Integers
DATA: BEGIN OF gs_stats,
        level TYPE i VALUE 32,
        age   TYPE i VALUE 23,
      END OF gs_stats.

gs_stats-level = gs_stats-age + gs_stats-age * 2.

" Standalone Data Declarations
DATA gv_cluster_day TYPE d     VALUE '20250404'.
DATA gv_lunch_time  TYPE t     VALUE '120000'.
" Packed numbers (P) must specify decimals
DATA gv_packed_num  TYPE p DECIMALS 2 VALUE '312.12'.

" Custom Type Definition
TYPES: ty_my_type TYPE p LENGTH 3 DECIMALS 2.
DATA:  gv_my_var  TYPE ty_my_type.

out->write( |Username: { gs_user_info-username }| ).

DATA result TYPE string .
DATA firstPart TYPE string VALUE 'Java' .
DATA secondPart TYPE string VALUE 'Script' .

result = firstPart && secondPart .
result = firstPart && | | && secondPart .

DATA: lv_full_name TYPE string VALUE 'Marc Plarisan',
      lv_first_name TYPE string,
      lv_last_name TYPE string .

      SPLIT lv_full_name AT ' ' INTO lv_first_name lv_last_name .

      out->write( |User's First Name: { lv_first_name } | ) .
