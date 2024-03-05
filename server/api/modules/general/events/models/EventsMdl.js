var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getEventsMdl
* Description   : get events for an entity
* Arguments     : callback function
* Change History :
* 17/02/2020    -  Sunil Mulagada  - Initial Function
*
******************************************************************************/
exports.getEventsMdl = (enty_id, enty_ky, user, l1, l2, callback) => {
    var fnm = "getEventsMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY e.i_ts) as sno,e.evnt_id,e.evnt_sts_id,s.evnt_sts_nm,e.enty_id,e.enty_ky,e.evnt_tx,DATE_FORMAT(e.evnt_dt,'%d-%m-%Y') as evnt_dt ,DATE_FORMAT(e.i_ts,'%d-%m-%Y %H:%m') as i_ts
                        FROM evnt_dtl_t e
                            JOIN evnt_sts_lst_t s ON e.enty_id=s.enty_id
                        WHERE e.enty_id=${enty_id} AND e.enty_ky=${enty_ky} 
                        ORDER BY e.i_ts desc LIMIT ${l1},${l2}`;
    //console.log(QRY_TO_EXEC)                     
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtEventMdl
* Description   : Add new  event
* Arguments     : callback function
* Change History :
* 17/02/2020    -  Sunil Mulagada  - Initial Function
*
******************************************************************************/
exports.insrtEventMdl = (enty_cd, enty_ky, evnt_sts_cd, evnt_tx, user = { user_id: 10 }, callback) => {
    var fnm = "insrtEventMdl"
    var QRY_TO_EXEC = `INSERT INTO evnt_dtl_t(evnt_sts_id,enty_id,enty_ky,evnt_tx,crte_usr_id,evnt_dt)
                        SELECT  s.evnt_sts_id,e.enty_id
                            ,${enty_ky} as enty_ky
                            ,"${evnt_tx}" as evnt_tx,${user.user_id} as crte_usr_id
                            ,CURRENT_DATE as evnt_dt
                        FROM aplcn_enty_lst_t e 
                            JOIN evnt_sts_lst_t s ON e.enty_id=s.enty_id
                                AND s.evnt_sts_cd='${evnt_sts_cd}'
                        WHERE enty_cd='${enty_cd}'`;
    // console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : recordMdl
* Description   : Add new  Operation
* Arguments     : callback function
* Change History :
* 12/03/2020    -  BORIGARLA KOTESWARARAO  - Initial Function
*
******************************************************************************/
exports.recordMdl = (operation_nm, callback) => {
    var fnm = "recordMdl"
    var QRY_TO_EXEC = `INSERT INTO bss_oprtn_dly_dtl_t(oprn_dt , ${operation_nm}) VALUES(CURDATE(), 1) ON DUPLICATE KEY UPDATE ${operation_nm} = ${operation_nm} + 1`;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm);
}


/*****************************************************************************
* Function      : recordMdl
* Description   : Add new  Operation
* Arguments     : callback function
* Change History :
* 30/04/2020    -  Sravani machina  - Initial Function
*
******************************************************************************/
exports.lmoMnthlyOprton = (lmo_id,mso_id,operation_nm, callback) => {
    var fnm = "lmoMnthlyOprton"
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth()+1;
    var QRY_TO_EXEC = `INSERT INTO lmo_oprtn_mnthly_dtl_t(lmo_agnt_id,mso_agnt_id,oprtn_yr,oprtn_mm, ${operation_nm}) VALUES(${lmo_id},${mso_id},${year},${month}, 1) ON DUPLICATE KEY UPDATE ${operation_nm} = ${operation_nm} + 1`;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm);
}



/*****************************************************************************
* Function      : insrtCafIssues
* Description   : Add new  Operation
* Arguments     : callback function
* Change History :
* 27/05/2020    -  Sekhar - Initial Function
*
******************************************************************************/
exports.insrtCafIssues = (oprtn_typ_tx,oprtn_url_tx,bdy_jsn_tx,user, callback) => {
    var fnm = "insrtCafIssues"
    var QRY_TO_EXEC = `INSERT INTO oprtns_tmp_t(oprtn_typ_tx,oprtn_url_tx,bdy_jsn_tx,req_usr_id,i_ts) values ("${oprtn_typ_tx}","${oprtn_url_tx}",${sqldb.MySQLConPool.escape(JSON.stringify(bdy_jsn_tx))},"${user.mrcht_usr_id}",CURRENT_TIMESTAMP())`;
     console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


