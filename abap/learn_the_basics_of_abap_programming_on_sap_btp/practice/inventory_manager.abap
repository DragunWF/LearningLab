DATA: BEGIN OF gs_item,
    name TYPE string,
    price TYPE p DECIMALS 2,
    stock TYPE i,
    END OF gs_item .

gs_item-name = 'Laptop' .
gs_item-price = 1500.00 .
gs_item-stock = 5 .

DATA lv_total TYPE i .
lv_total = gs_item-price * gs_item-stock .

out->write(|Inventory: { gs_item-name }|) .
out->write(|Price: { gs_item-price }|) .
out->write(|Stock: { gs_item-stock }|) .
out->write(|Total Value: { lv_total }|) .