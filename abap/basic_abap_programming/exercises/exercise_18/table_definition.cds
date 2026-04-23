@EndUserText.label : 'Database table for exercise 18'
@AbapCatalog.enhancement.category : #NOT_EXTENSIBLE
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
@AbapCatalog.dataMaintenance : #RESTRICTED
define table z2116flight {

  key client            : abap.clnt not null;
  key carrier_id        : /dmo/carrier_id not null;
  key connection_id     : /dmo/connection_id not null;
  key flight_date       : /dmo/flight_date not null;
  @Semantics.amount.currencyCode : '/lrn/s4d400_apt.currency_code'
  price                 : /dmo/flight_price;
  currency_code         : /dmo/currency_code;
  plane_type_id         : /dmo/plane_type_id;
  local_created_by      : abp_creation_user;
  local_created_at      : abp_creation_tstmpl;
  local_last_changed_by : abp_locinst_lastchange_user;
  local_last_changed_at : abp_locinst_lastchange_tstmpl;
  last_changed_at       : abp_lastchange_tstmpl;

}