@EndUserText.label : 'Habits Database Table'
@AbapCatalog.enhancement.category : #NOT_EXTENSIBLE
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
@AbapCatalog.dataMaintenance : #RESTRICTED
define table ztb_392_habit {

  key client    : abap.clnt not null;
  key habit_key : zde_392_habit_id not null;
  habit_name    : abap.char(50) not null;
  category      : abap.char(50) not null;

}