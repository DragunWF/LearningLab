TYPES: BEGIN OF ty_student,
    name TYPE string,
    score TYPE i,
    END OF ty_student.

DATA lt_students TYPE TABLE OF ty_student.

DATA ls_student TYPE ty_student.

ls_student-name = 'Alice'.
ls_student-score = 85.
APPEND ls_student to lt_students.

CLEAR ls_student.

ls_student-name = 'Bob'.
ls_student-score = 90.
APPEND ls_student to lt_students.

CLEAR ls_student.

ls_student-name = 'Charlie'.
ls_student-score = 75.
APPEND ls_student to lt_students.

CLEAR ls_student.

DATA total_score TYPE i VALUE 0.

LOOP AT lt_students INTO ls_student.
    out->write(|Name: { ls_student-name }|).
    out->write(|Score: { ls_student-score }|).
    total_score = ls_student-score + total_score.
ENDLOOP.

out->write(|Total Score: { total_score }|).