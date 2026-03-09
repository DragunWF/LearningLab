@EndUserText.label : 'Logs Database Table'
@AbapCatalog.enhancement.category : #NOT_EXTENSIBLE
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
@AbapCatalog.dataMaintenance : #RESTRICTED
define table ztb_392_log {

  key client : abap.clnt not null;
  key log_id : abap.int4 not null;
  @AbapCatalog.foreignKey.label : 'Habit Reference'
  @AbapCatalog.foreignKey.keyType : #NON_KEY
  @AbapCatalog.foreignKey.screenCheck : true
  habit_id   : zde_392_habit_id not null
    with foreign key ztb_392_habit
      where client = ztb_392_log.client
        and habit_key = ztb_392_log.habit_id;
  log_date   : abap.dats not null;
  notes      : abap.string(0);

}