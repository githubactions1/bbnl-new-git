
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/*****************************************************************************
* Function       : getCstWltBlnceMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 07/12/2020    -  Sunil Mulagada   - Initial Function
******************************************************************************/
exports.getCstWltBlnceMdl = function (cstmr_id, user) {
    var fnm = "getCstWltBlnceMdl"
    var QRY_TO_EXEC = `select w.prpd_wlt_id,w.prpd_wlt_at 
                        from erp_prpd_wlt_lst_t w 
                        where w.wlt_usr_id = ${cstmr_id} and w.prtnr_id=6`;                     
                       console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insCstWltNewMdl
* Description    : Insert new record for customer wallet
* Arguments      : callback function
* Change History :
* 07/12/2020    -  Sunil Mulagada   - Initial Function
******************************************************************************/
exports.insCstWltNewMdl = function (caf_id, user) {
    var fnm = "insCstWltNewMdl"
    var QRY_TO_EXEC = `insert into erp_prpd_wlt_lst_t(wlt_usr_id,prtnr_id)
                        values(${caf_id},6)`;                     
                      //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getCstWltTransHstMdl
* Description    : Get customer Wallet transaction history (latest 50 records)
* Arguments      : callback function
* Change History :
* 07/12/2020    -  Sunil Mulagada   - Initial Function
******************************************************************************/
exports.getCstWltTransHstMdl = function (caf_id, user) {
    var fnm= "getCstWltTransHstMdl"
    var QRY_TO_EXEC = `select wtt.trnsn_type_nm,wt.wlt_trnsn_id,wt.trnsn_at,wt.trnsn_dt,wt.trnsn_ts,wt.wlt_blnce_at,cmnt_tx
                        from erp_prpd_wlt_lst_t w 
                            join caf_dtl_t c on c.cstmr_id=w.wlt_usr_id 
                                and w.prtnr_id=6
                                and c.caf_id=${caf_id}
                            join erp_prpd_wlt_trnsn_dtl_t wt on w.prpd_wlt_id=wt.prpd_wlt_id
                            join erp_trnsn_type_lst_t wtt on wt.trnsn_type_id=wtt.trnsn_type_id
                        order by wt.trnsn_ts LIMIT 0,50`;                     
                      //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getLMOWltBlnceMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 07/12/2020    -  Sunil Mulagada   - Initial Function
******************************************************************************/
exports.getLMOWltBlnceMdl = function (lmo_agnt_id, user) {
    var fnm = "getLMOWltBlnceMdl"
    var QRY_TO_EXEC = ` select prpd_wlt_id,w.prpd_wlt_at 
                                from erp_prpd_wlt_lst_t w 
                                join agnt_lst_t a   on w.wlt_usr_id=a.agnt_id 
                                where prtnr_id=1 
                                    AND wlt_usr_id=${lmo_agnt_id}`;                     
                      //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : insLMOWltNewMdl
* Description    : Insert new record for LMO wallet
* Arguments      : callback function
* Change History :
* 07/12/2020    -  Sunil Mulagada   - Initial Function
******************************************************************************/
exports.insLMOWltNewMdl = function (lmo_agnt_id, user) {
    var fnm = "insLMOWltNewMdl"
    var QRY_TO_EXEC = `insert into erp_prpd_wlt_lst_t(wlt_usr_id,prtnr_id)
                        values(${lmo_agnt_id},1)`;                     
                      //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getLMOWltTransHstMdl
* Description    : Get customer Wallet transaction history (latest 50 records)
* Arguments      : callback function
* Change History :
* 07/12/2020    -  Sunil Mulagada   - Initial Function
******************************************************************************/
exports.getLMOWltTransHstMdl = function (lmo_agnt_id, user) {
    var fnm = "getLMOWltTransHstMdl"
    var QRY_TO_EXEC = `select wtt.trnsn_type_nm,wt.wlt_trnsn_id,wt.trnsn_at,wt.trnsn_dt,wt.trnsn_ts,wt.wlt_blnce_at,cmnt_tx
                        from erp_prpd_wlt_lst_t w 
                            join erp_prpd_wlt_trnsn_dtl_t wt on w.prpd_wlt_id=wt.prpd_wlt_id
                            and w.prtnr_id=1
                                and w.wlt_usr_id=${lmo_agnt_id}
                            join erp_trnsn_type_lst_t wtt on wt.trnsn_type_id=wtt.trnsn_type_id
                        order by wt.trnsn_ts LIMIT 0,50`;                     
                      //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};