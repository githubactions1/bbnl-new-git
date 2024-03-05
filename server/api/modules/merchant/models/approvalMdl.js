var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);



/*****************************************************************************
* Function      : insrtMrchntApprvlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.insrtMrchntApprvlMdl = (data, callback) => {
    var fnm = "insrtMrchntApprvlMdl"
    console.log(data)
    var QRY_TO_EXEC = `insert into aprvl_lst_t (mnu_itm_id,grp_id,min_aprve_cnt,all_grp_aprve_in,create_usr_id,a_in) values (${data.mnu_itm_id},${data.grp_id},${data.min_aprvl_cnt},${data.all_grp_in},${data.mrchnt_usr_id},1)`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, (err, results) => {
        callback(err, results)
    });

}



/******************************************************************
    : getApprovalCntMdl
    : 
    : callback function
******************************************************************/
exports.getApprovalCntMdl = (data, callback) => {
    var fnm = "getApprovalCntMdl"
    var QRY_TO_EXEC = `SELECT count(*) as aprvl_cnt from aprvl_evnt_dtl_t where itm_id = ${data.ofr_id} and arvl_in = 1;`;
    
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, (err, results) => {
        console.log(results)
        callback(err, results)
    });
    }