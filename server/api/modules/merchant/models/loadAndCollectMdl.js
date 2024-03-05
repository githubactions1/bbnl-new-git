var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);



/*****************************************************************************
* Function      : getMrchntLoadNCollectMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntLoadNCollectMdl = (mrchntID) => {
    var fnm = "getMrchntLoadNCollectMdl"
    var QRY_TO_EXEC = `SELECT d.*,count(u.ld_nd_clct_id) as 'users' FROM ld_nd_clct_dtl_t d LEFT JOIN ld_nd_clct_usr_lst_t u ON d.ld_nd_clct_id = u.ld_nd_clct_id WHERE d.mrcht_id =  ${mrchntID} GROUP BY d.ld_nd_clct_id;`
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/*****************************************************************************
* Function      : getMrchntLoadNCollectDtlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntLoadNCollectDtlMdl = (mrchntID, id) => {
    var fnm = "getMrchntLoadNCollectDtlMdl"
    var QRY_TO_EXEC = `SELECT u.*,d.mrcht_id,d.ld_nd_py_nm FROM ld_nd_clct_usr_lst_t u JOIN ld_nd_clct_dtl_t d On u.ld_nd_clct_id = d.ld_nd_clct_id where  u.ld_nd_clct_id = ${id} and d.mrcht_id = ${mrchntID}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}
/*****************************************************************************
* Function      : insrtMrchntLoadNCollectMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntLoadNCollectMdl = (data) => {
    var fnm = "insrtMrchntLoadNCollectMdl"
    console.log(data)
    var QRY_TO_EXEC = `INSERT INTO ld_nd_clct_dtl_t ( mrcht_id, ld_nd_py_nm, py_opn_dt, py_clse_dt, py_de_dt, ntfcn_dt, ld_nd_py_dsctx, py_msg_tx, py_de_msg_tx, rcre_in, py_due_chrge_at, crte_usr_id, a_in) VALUES ('${data.mrchntId}', '${data.ld_nd_py_nm}', '${data.py_opn_dt}', '${data.py_clse_dt}', '${data.py_de_dt}', '${data.ntfcn_dt}','${data.desc}', '${data.py_msg_tx}', 'payment due','0','${data.py_due_chrge_at}','${data.mrchntId}','${data.a_in}');`
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}
/*****************************************************************************
* Function      : insrtMrchntLoadNCollectUsrsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntLoadNCollectUsrsMdl = (data, id) => {
    var fnm = "insrtMrchntLoadNCollectUsrsMdl"
    var dlmtr = ', ';
    var valQru = ' values ';
    if (data && data.data.length > 0) {
        var counter = 0;
        data.data.filter((k) => {
            if (data.data.length == ++counter) {
                dlmtr = ' ; '
            }
            console.log(k.smartCardId)
            valQru += ` ( '${k.firstName}', '${k.lastName}','${k.mobileNumber}','${k.py_opn_dt}','${k.py_clse_dt}','${k.amount}','${k.py_de_dt}','${k.ntfcn_dt}','${k.py_msg_tx}' ,'${k.py_de_msg_tx}','1','${k.py_due_chrge_at}',${id},'${k.smartCardId}','${data.mrchntId}','1' ) ${dlmtr}`
        })
    }

    var QRY_TO_EXEC = `INSERT INTO ld_nd_clct_usr_lst_t (fst_nm, lst_nm, mble_ph, py_opn_dt, py_clse_dt, py_at, py_de_dt, ntfcn_dt, py_msg_tx, py_de_msg_tx, rcre_in, py_due_chrge_at, ld_nd_clct_id, smrt_crd_id, crte_usr_id, a_in) ${valQru}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm)

}