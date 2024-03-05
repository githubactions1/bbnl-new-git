var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getSbstnMdl
* Description   : get details of all subStn
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSbstnMdl = (user,callback) => {
    var fnm ="getSbstnMdl"
     var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY sbstn_lst_t.sbstn_id) sno, sbstn_type_lst_t.sbstn_type_nm, 
     dstrt_lst_t.dstrt_nm,sbstn_lst_t.* FROM sbstn_lst_t 
      JOIN sbstn_type_lst_t On sbstn_type_lst_t.sbstn_type_id = sbstn_lst_t.sbstn_type_id 
      JOIN dstrt_lst_t On dstrt_lst_t.dstrt_id = sbstn_lst_t.dstrct_id 
      where sbstn_lst_t.a_in = 1 ORDER BY sbstn_lst_t.sbstn_id ASC limit 100;` 
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchSbstnMdl
* Description   : search details of all subStn
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchSbstnMdl = (data,user,callback) => {
    var fnm ="srchSbstnMdl"
    var QRY_WHERE = ``;

    if(data.data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.data.a_in}`  } else { QRY_WHERE += `a_in=1` }
    if(data.data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
            if(data.data.hasOwnProperty('sbstn_nm')) {
                QRY_WHERE += ` AND sbstn_nm='${data.sbstn_nm}'`
            }  
            if(data.data.hasOwnProperty('sbstn_unq_cd')) {
                QRY_WHERE += ` AND sbstn_unq_cd='${data.data.sbstn_unq_cd}'`
            }    
            if(data.data.hasOwnProperty('sbstn_type_id')) {
                QRY_WHERE += ` AND sbstn_type_id=${data.data.sbstn_type_id}`
            }     
            if(data.data.hasOwnProperty('dstrct_id')) {
				if(data.data.dstrct_id != ''){
					QRY_WHERE += ` AND dstrct_id=${data.data.dstrct_id}`
				}
            }     
            if(data.data.hasOwnProperty('mndl_id')) {
				if(data.data.mndl_id != ''){
					QRY_WHERE += ` AND mndl_id=${data.data.mndl_id}`
				}
            }     
            if(data.data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.data.crte_usr_id}`
            }     
            if(data.data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.data.updte_usr_id}`
            } 
            if(data.data.hasOwnProperty('sbstn_id')) {
                QRY_WHERE += `  AND sbstn_id= ${data.data.sbstn_id}`
            } 
			/*if(data.data.hasOwnProperty('dstrct_id') || data.data.hasOwnProperty('mndl_id')) {
				if(data.data.dstrct_id == '' && data.data.mndl_id == '' ){
					console.log(data.data.hasOwnProperty('d_ts') )
					console.log(data.data.hasOwnProperty('a_in'))
					if(data.data.hasOwnProperty('d_ts') || data.data.hasOwnProperty('a_in')){
						console.log("in if")
					} else {
						QRY_WHERE += ` a_in=1 `
					}
				}
			}*/
       
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY sbstn_id) sno,
                                sbstn_id,sbstn_nm,sbstn_unq_cd,sbstn_type_id,dstrct_id,mndl_id,a_in 
                        FROM sbstn_lst_t 
                        WHERE ${QRY_WHERE}; `;
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getSbstnByIdMdl
* Description   : get details of single  subStn
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSbstnByIdMdl = (id,user,callback) => {
    var fnm = "getSbstnByIdMdl"
    var QRY_TO_EXEC = `SELECT sbstn_id,sbstn_nm,sbstn_unq_cd,sbstn_type_id,dstrct_id,mndl_id,a_in 
                        FROM sbstn_lst_t 
                        WHERE a_in = 1 AND sbstn_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtSbstnMdl
* Description   : Add new  subStn
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtSbstnMdl = (data,user,callback) => {
    var fnm = "insrtSbstnMdl"
    var QRY_TO_EXEC = `INSERT INTO sbstn_lst_t(sbstn_nm,sbstn_unq_cd,sbstn_type_id,dstrct_id,mndl_id,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.sbstn_nm}','${data.sbstn_unq_cd}',${data.sbstn_type_id},${data.dstrct_id},${data.mndl_id},1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteSbstnMdl
* Description   : Update existing  subStn
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteSbstnMdl = (data,id,user,callback) => {
    var fnm = "updteSbstnMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('sbstn_nm')) {
                QRY_SET += ` , sbstn_nm='${data.sbstn_nm}'`
            }  
            if(data.hasOwnProperty('sbstn_unq_cd')) {
                QRY_SET += ` , sbstn_unq_cd='${data.sbstn_unq_cd}'`
            }    
            if(data.hasOwnProperty('sbstn_type_id')) {
                QRY_SET += ` , sbstn_type_id=${data.sbstn_type_id}`
            }     
            if(data.hasOwnProperty('dstrct_id')) {
                QRY_SET += ` , dstrct_id=${data.dstrct_id}`
            }     
            if(data.hasOwnProperty('mndl_id')) {
                QRY_SET += ` , mndl_id=${data.mndl_id}`
            }     
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE sbstn_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE sbstn_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteSbstnMdl
* Description   : Delete existing  subStn
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteSbstnMdl = (id,user,callback) => {
    var fnm = "dlteSbstnMdl"
    var QRY_TO_EXEC = `UPDATE sbstn_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE sbstn_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



