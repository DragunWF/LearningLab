@EndUserText.label : 'Player classes'
@AbapCatalog.enhancement.category : #NOT_EXTENSIBLE
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
@AbapCatalog.dataMaintenance : #RESTRICTED
define table zcl_392_class {

  key client   : abap.clnt not null;
  key class_id : abap.int4 not null;
  name         : abap.char(50) not null;
  description  : abap.char(50) not null;
  power_level  : abap.int2 not null;

}