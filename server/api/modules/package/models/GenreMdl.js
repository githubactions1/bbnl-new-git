var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getGenreMdl
* Description   : get details of all genrelst
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getGenreMdl = (user,callback) => {
    var fnm = "getGenreMdl"
    
    
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY g.genre_id) sno,g.genre_id,genre_nm,g.a_in,COUNT(*) as chnl_ct FROM genre_lst_t g 
                        JOIN  pckge_iptv_chnle_genre_rel_t r on g.genre_id=r.genre_id
                        join  pckge_iptv_chnle_lst_t c on r.chnle_id=c.chnle_id
                        WHERE g.a_in = 1 
                        GROUP BY g.genre_id
     `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchGenreMdl
* Description   : search details of all genrelst
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchGenreMdl = (data,user,callback) => {
    var fnm = "srchGenreMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('genre_nm')) {
                QRY_WHERE += ` AND genre_nm='${data.genre_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY genre_id) sno,
                                genre_id,genre_nm,a_in 
                        FROM genre_lst_t 
                        WHERE ${QRY_WHERE} AND genre_id= ${data.genre_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getGenreByIdMdl
* Description   : get details of single  genrelst
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getGenreByIdMdl = (id,user,callback) => {
    var fnm = "getGenreByIdMdl"
    var QRY_TO_EXEC = `SELECT genre_id,genre_nm,a_in 
                        FROM genre_lst_t 
                        WHERE a_in = 1 AND genre_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtGenreMdl
* Description   : Add new  genrelst
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtGenreMdl = (data,user,callback) => {
    var fnm = "insrtGenreMdl"
    var QRY_TO_EXEC = `INSERT INTO genre_lst_t(genre_nm,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.genre_nm}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteGenreMdl
* Description   : Update existing  genrelst
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteGenreMdl = (data,id,user,callback) => {
    var fnm = "updteGenreMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('genre_nm')) {
                QRY_SET += ` , genre_nm='${data.genre_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE genre_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE genre_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteGenreMdl
* Description   : Delete existing  genrelst
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteGenreMdl = (id,user,callback) => {
    var fnm = "dlteGenreMdl"
    var QRY_TO_EXEC = `UPDATE genre_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE genre_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



