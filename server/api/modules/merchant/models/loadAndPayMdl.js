var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);



/*****************************************************************************
* Function      : getMrchntLoadNPayMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntLoadNPayMdl = (mrchntID) => {
    var fnm = "getMrchntLoadNPayMdl"
    var QRY_TO_EXEC = `SELECT d.*,count(u.ld_nd_py_id) as 'users' FROM ld_nd_py_dtl_t d LEFT JOIN ld_nd_py_usr_lst_t u ON d.ld_nd_py_id = u.ld_nd_py_id WHERE d.mrcht_id = ${mrchntID} GROUP BY d.ld_nd_py_id; ;`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/*****************************************************************************
* Function      : getMrchntLoadNPayDtlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntLoadNPayDtlMdl = (mrchntID, id) => {
    var fnm = "getMrchntLoadNPayDtlMdl"
    var QRY_TO_EXEC = `SELECT u.*,d.mrcht_id,d.ld_nd_py_nm,d.py_dt as 'ld_py_dt',SUM(d.py_at) lp_ttl  FROM ld_nd_py_usr_lst_t u JOIN ld_nd_py_dtl_t d On u.ld_nd_py_id = d.ld_nd_py_id where  u.ld_nd_py_id = ${id} and d.mrcht_id = ${mrchntID} GROUP BY u.ld_nd_py_usr_id;`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/*****************************************************************************
* Function      : insrtMrchntLoadNPayMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntLoadNPayMdl = (data) => {
    var fnm = "insrtMrchntLoadNPayMdl"
    console.log(data)
    var QRY_TO_EXEC = `INSERT INTO ld_nd_py_dtl_t ( mrcht_id, ld_nd_py_nm, py_dt, py_msg_tx,ld_nd_py_dsc, py_at, rcre_in, crte_usr_id, a_in) VALUES ('${data.mrchntId}', '${data.ld_nd_py_nm}', '${data.py_dt}', '${data.py_msg_tx}','${data.ld_nd_py_dsc}', '${data.py_at}', '0', '${data.mrchntId}', '${data.a_in}'); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : insrtMrchntLoadNPayMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntLoadNPayUsrsMdl = (data, id) => {
    var fnm = "insrtMrchntLoadNPayUsrsMdl"
    var dlmtr = ', ';
    var valQru = ' values ';
    if (data && data.data.length > 0) {
        var counter = 0;
        data.data.filter((k) => {

            if (data.data.length == ++counter) {
                dlmtr = ' ; '
            }

            valQru += ` ( '${k.firstName}', '${k.lastName}','${k.mobileNumber}',${k.py_dt},'${k.py_msg_tx}',${k.amount}, ${0}, ${id},${k.smartCardId},${data.mrchntId},${1} ) ${dlmtr}`
        })
    }

    var QRY_TO_EXEC = ` INSERT INTO ld_nd_py_usr_lst_t (fst_nm, lst_nm, mble_ph, py_dt, py_msg_tx, py_at, rcre_in, ld_nd_py_id, smrt_crd_id, crte_usr_id,  a_in) ${valQru}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm)

}
