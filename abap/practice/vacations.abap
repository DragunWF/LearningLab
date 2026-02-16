DATA yearsTaken TYPE i VALUE 4 .

DATA monthsTaken TYPE i VALUE yearsTaken * 12 .

* This uses the approximate time
DATA daysTaken TYPE i VALUE monthsTaken * 30 .

out->write(|Years Taken: { yearsTaken }|) .
out->write(|Months Taken: { monthsTaken } |) .
out->write(|Days Taken: { daysTaken } |) .