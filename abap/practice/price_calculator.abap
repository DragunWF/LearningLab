DATA: lv_item_price TYPE p DECIMALS 2 VALUE 150.50,
      lv_quantity TYPE i VALUE 3,
      lv_tax_rate TYPE p DECIMALS 2 VALUE 0.12,
      subtotal TYPE p DECIMALS 2,
      tax_amount TYPE p DECIMALS 2,
      total_price TYPE i.

subtotal = lv_item_price * lv_quantity.
tax_amount = subtotal * lv_tax_rate.
total_price = subtotal + tax_amount.

out->write(|Subtotal: { subtotal }|).
out->write(|Tax Amount: { tax_amount }|).
out->write(|Total Price: { total_price }|).