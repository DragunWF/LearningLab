@EndUserText.label : 'Player'
@AbapCatalog.enhancement.category : #NOT_EXTENSIBLE
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
@AbapCatalog.dataMaintenance : #RESTRICTED
define table zcl_392_player {

  key client        : abap.clnt not null;
  key player_id     : abap.int4 not null;
  key class_id      : abap.int4 not null;
  name              : abap.char(50) not null;
  weapon            : abap.char(50);
  armor             : abap.char(50);
  experience_points : abap.int4 not null;

}