var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
/*****************************************************************************
* Function      : insrtIndCstmrMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtIndCstmrMdl = (data,ctmr_id,user,callback) => {

    // var QRY_TO_EXEC = `INSERT INTO cstmr_dtl_t (frst_nm,lst_nm,adhr_nu,pan_nu,caf_type_id,custu_id,prnt_cstmr_id,bsns_type_id,
    //                     gndr_id,pymnt_lblty_in,instl_eml1_tx,blng_eml1_tx,regbal,chargedbal,depbal,nxt_invce_at,status,blckd_in,enty_sts_id,agnt_id)
    //                     VALUES ('${data.cstmr_fst_nm}','${data.cstmr_lst_nm}',${data.adhr_nu},'${data.pan_nu}',${data.custmrTyp},0,0,0,
    //                     ${data.gndr_id},0,'${data.cstmr_emle_tx}','${data.cstmr_emle_tx}',0,0,0,0,0,0,0,0);`;
    
    // console.log(QRY_TO_EXEC)
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    //     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
    return new Promise((resolve,reject) => {
        resolve(true)
    })
}
/*****************************************************************************
* Function      : get_cafdtlMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_cstmrdtlMdl = (data, user, callback) => {
    var fnm = "get_cstmrdtlMdl"
    var where = "1 = 1 "

    if (data.dstrc_id) {
        where += `and loc_dstrct_id=${data.dstrc_id} `
    }
    if (data.cstmr_id) {
        where += `and cstmr_id=${data.cstmr_id} `
    }
    if (data.mso_id) {
        where += `and agnt_id=${data.mso_id} `
    }
    if (data.mobileno) {
        where += `and mbl_nu=${data.mobileno} `
    }
    if (data.CAf) {
        where += `and caf_nu=${data.CAf} `
    } if (data.adhar) {
        where += `and adhr_nu=${data.adhar} `
    } if (data.str_dt && data.end_dt) {
        where += `(actvn_dt BETWEEN ${data.str_dt}AND ${data.str_dt})`
    } else if(data.str_dt) {
        where += `and actvn_dt=${data.str_dt} `
    } if (data.till_dt) {
        where += `and actvn_dt<CURDATE()
         `
    }

    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY cstmr_id) sno, * from cstmr_dtl_t where ${where} LIMIT 10;`;
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
* Function      : gtmsgCtgryMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.gtCstmrSrchMdl = (data, user, callback) => {
    var fnm = "gtCstmrSrchMdl"
    where='1=1 and '
    for(i=0;i<data.length;i++){
        where +=` ${data[i].key} like '%${data[i].value}%'`
        if(i!=data.length-1){
            where +=` or`
        }
    }


  
    var QRY_TO_EXEC = ` SELECT *,ROW_NUMBER() OVER ( ORDER BY cstmr_id) sno from cstmr_dtl_t where  ${where}
    `;
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
* Function      : getfngrcafdtMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getcustmrdtMdl = (skip,take,data, user, callback) => {
    var fnm = "getcustmrdtMdl"

    // var from=0
    // var to=10
    // if(data.pgIndex>=1){
    //     from=(data.pgIndex-1)*(data.pgsze)
    //     to=(data.pgsze)*(data.pgIndex)
    // }
      
    
    
        var QRY_TO_EXEC = `  SELECT *,ROW_NUMBER() OVER ( ORDER BY cstmr_id) sno from cstmr_dtl_t LIMIT   ${take} OFFSET ${skip}
        `;
        console.log(QRY_TO_EXEC)
    
        if (callback && typeof callback == "function")
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
                callback(err, results);
                return;
            });
        else
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    }