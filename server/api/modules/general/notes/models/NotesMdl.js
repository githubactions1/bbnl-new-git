var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getNotesMdl
* Description   : get notes for an entity
* Arguments     : callback function
* Change History :
* 17/02/2020    -  Sunil Mulagada  - Initial Function
* 
******************************************************************************/
exports.getNotesMdl = (enty_id,enty_ky,user,l1,l2,callback) => {
    var fnm = "getNotesMdl"
     var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY nte_id) as sno,nte_id,nte_ctgry_id,enty_id,enty_ky,nte_tx,DATE_FORMAT(i_ts,'%d-%m-%Y %H:%m') as i_ts
                        FROM aplcn_enty_nte_dtl_t
                        WHERE enty_id=${enty_id} AND enty_ky=${enty_ky} 
                        ORDER BY i_ts desc LIMIT ${l1},${l2}`;
                        console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getNxtKeyMdl
* Description   : get Next key value generated
* Arguments     : callback function
* Change History :
* 17/02/2020    -  Sunil Mulagada  - Initial Function
* 
******************************************************************************/
exports.getNxtKeyMdl = (ky_hndlr_tx,user,callback) => {
    var fnm = "getNxtKeyMdl"
     var QRY_TO_EXEC = [`SELECT ky_id from ky_sqnce_dtl_t WHERE  ky_hndlr_tx= '${ky_hndlr_tx}' FOR UPDATE`
                        ,`UPDATE ky_sqnce_dtl_t SET ky_id=ky_id+1 WHERE  ky_hndlr_tx= '${ky_hndlr_tx}'`];
     //console.log(QRY_TO_EXEC) 
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : insrtNoteMdl
* Description   : Add new  note
* Arguments     : callback function
* Change History :
* 17/02/2020    -  Sunil Mulagada  - Initial Function
*
******************************************************************************/
exports.insrtNotesMdl = (enty_cd,enty_ky,note_ctgry_cd,nte_tx,user,callback) => {
    var fnm = "insrtNotesMdl"
    var QRY_TO_EXEC = `INSERT INTO aplcn_enty_nte_dtl_t(nte_ctgry_id,enty_id,enty_ky,nte_tx,crte_usr_id)
                        SELECT  s.nte_ctgry_id,e.enty_id
                            ,${enty_ky} as enty_ky
                            ,"${nte_tx}" as nte_tx,${user.user_id} as crte_usr_id
                        FROM aplcn_enty_lst_t e 
                            JOIN aplcn_enty_nte_ctgry_lst_t s ON e.enty_id=s.enty_id
                                AND s.note_ctgry_cd='${note_ctgry_cd}'
                        WHERE enty_cd='${enty_cd}'`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}