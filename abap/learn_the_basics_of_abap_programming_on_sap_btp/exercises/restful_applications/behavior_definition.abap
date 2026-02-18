managed implementation in class ZBP_R_87_GROCERY unique;
strict ( 2 );
with draft;

define behavior for ZR_87_GROCERY alias Grocery
persistent table z87_grocery
draft table z87grocery_d
etag master LocalLastChanged
lock master total etag LastChangeDat
authorization master( global )

{
  field ( readonly )
  ID,
  CreatedAt,
  CreatedBy;


  field ( numbering : managed )
  ID;

  create;
  update;
  delete;

  draft action Edit;
  draft action Activate optimized;
  draft action Discard;
  draft action Resume;
  draft determine action Prepare;

  action checkExpirationDate result[1] $self;

  mapping for Z87_GROCERY
  {
    ID = id;
    Product = product;
    Category = category;
    Brand = brand;
    Price = price;
    Currency = currency;
    Quantity = quantity;
    PurchaseDate = purchasedate;
    ExpirationDate = expirationdate;
    Expired = expired;
    Rating = rating;
    Note = note;
    CreatedBy = createdby;
    CreatedAt = createdat;
    LastChangedBy = lastchangedby;
    LastChangeDat = lastchangedat;
    LocalLastChanged = locallastchanged;
  }
}