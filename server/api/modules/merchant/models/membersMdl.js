var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);



/*****************************************************************************
* Function      : insrt_membr_Mdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrt_membr_Mdl = (data, callback) => {
    var fnm = "insrt_membr_Mdl"
    console.log(data)
    var QRY_TO_EXEC = `insert into mbrsp_dtl_t (mbrsp_nm,mbrsp_amt_ct,mbrsp_vldty_dy_ct,a_in,i_ts) values ('${data.mbrsp_nm}',${data.mbrsp_amt_ct},${data.mbrsp_vldty_dy_ct},1,current_timestamp())`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, (err, results) => {
        callback(err, results)
    });

}
/*****************************************************************************
* Function      : insrt_membr_Mdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.usr_mem_rel_Mdl = (id, data, callback) => {
    var fnm = "usr_mem_rel_Mdl"
    console.log(data)
    var QRY_TO_EXEC = `insert into usr_mbrsp_rel_t (mbrsp_id,usr_id) values (${id},${data.usr_id})`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, (err, results) => {
        callback(err, results)
    });
}