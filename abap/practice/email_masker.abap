DATA: email TYPE string VALUE 'dragun231@gmail.com',
      username TYPE string,
      domain TYPE string.

SPLIT email AT '@' INTO username domain.

DATA star_count TYPE i.
star_count = strlen( username ) - 2.
DATA masked_user TYPE string.
masked_user = |{ username(2) }{ repeat(val = '*' occ = star_count) }|.

out->write(|Masked Email: { masked_user }@{ domain }|).