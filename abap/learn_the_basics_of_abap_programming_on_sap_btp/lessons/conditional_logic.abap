DATA age TYPE i VALUE 18 .

IF age <= 12 .
    out->write(|You are { age } years old! A child.|) .
ELSEIF age <= 17 .
    out->write(|You are { age } years old! A teenager.|) . 
ELSE .
    out->write(|You are { age } years old! An adult.|) .
ENDIF .

DATA status TYPE i VALUE 3 .

CASE status .
    WHEN 1.
        out->write('You are a super admin!') .
    WHEN 2.
        out->write('You are an admin!') .
    WHEN 3.
        out->write('You are a moderator!') .
    WHEN OTHERS.
        out->write('You are a regular user!') .
ENDCASE .