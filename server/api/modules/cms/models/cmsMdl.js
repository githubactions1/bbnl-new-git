
var df = require(appRoot + '/utils/dflower.utils');

var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');
var dateFormat = require('dateformat');

/*****************************************************************************
* Function       : insert_reqCtrl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insert_reqCtrl = function (data) {
    var fnm = "insert_reqCtrl"
    var QRY_TO_EXEC = `insert into api_rqst_dtl_t(rqst_dscn_tx,enty_id,actn_id,enty_ky,api_sts_id,i_ts)values('Payments Verfiying LMO','2000000','2000000','${data.LMOcode}','1',current_timestamp())`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : get_verfyMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_verfyMdl = function (data, id, fullUrl, jsondata) {
    var fnm = "get_verfyMdl"
    var mobile;
 
    if(data.Mobilenumber){
            mobile = data.Mobilenumber
    }
    else if (data.MobileNumber){
          mobile = data.MobileNumber
    }

        var QRY_TO_EXEC = [
            `select count(agnt_cd) as count,agnt_id,agnt_nm,case when agnt_blnce_at is null then 0 else agnt_blnce_at end as agnt_blnce_at from agnt_lst_t where agnt_cd='${data.LMOcode}'`,
            `select count(agnt_cd) as count,agnt_id,agnt_nm,case when agnt_blnce_at is null then 0 else agnt_blnce_at end as agnt_blnce_at from agnt_lst_t where agnt_cd='${data.LMOcode}' and (ofce_mbl_nu ='${mobile}' or brnch_mbl_nu ='${mobile}')`,
            `insert into api_rqst_cl_dtl_t(mthd_id,api_rqst_id,api_rqst_cl_type_id,sqnce_nu,url_tx,url_dta_tx,api_sts_id,i_ts)values(3,'${id}',1,1,'${fullUrl}','${jsondata}',1,current_timestamp())`]
    
    console.log(QRY_TO_EXEC);
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function       : insert_reqCtrlCredit
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertApiReqCtrl = function (data) {
    var fnm = "insertApiReqCtrl"
    var QRY_TO_EXEC = `insert into api_rqst_dtl_t(rqst_dscn_tx,enty_id,actn_id,enty_ky,api_sts_id,i_ts)values('Payments Credits','2000001','2000003','${data.LMOcode}','1',current_timestamp())`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function       : get_verfyTransctnAndAmount
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_verfyTransctnAndAmount = function (pymnt_dtls, agntsData) {
    var fnm = "get_verfyTransctnAndAmount"
    
         var date = pymnt_dtls.Dateofpayment.split(" ");
         var dte = date[0].split("-").reverse().join("-");
    
    var QRY_TO_EXEC = [`select trns_ref_nu,trnsn_at,trsn_dt,count(trns_ref_nu) from agnt_trnsn_dtl_t where trns_ref_nu='${pymnt_dtls.Tranrefnumber}' and DATE_FORMAT(trsn_dt,'%Y-%m-%d') like '${dte}'`,
                        `select agnt_id,agnt_blnce_at, trsn_dt from agnt_trnsn_dtl_t where trnsn_id=(select max(trnsn_id) from agnt_trnsn_dtl_t
                         where agnt_id=${agntsData.agnt_id} and trsn_dt < DATE_FORMAT('${dte}','%Y-%m-%d'))`]

    console.log(QRY_TO_EXEC);
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/**************************************************************************************
* Function      : updatePreviousPymnts
* Description   : 
* Arguments     : callback function
* Change History :
* 13/05/2020    -   - Initial Function
*
***************************************************************************************/
exports.updatePreviousPymnts = function (pymnt_dtls, agntsData) {
    var fnm = "updatePreviousPymnts"
    var date = pymnt_dtls.Dateofpayment.split(" ");
    var dte = date[0].split("-").reverse().join("-");
    
    var QRY_TO_EXEC = `update agnt_trnsn_dtl_t set  agnt_blnce_at=agnt_blnce_at-'${pymnt_dtls.Amountpaid}' ,u_ts = CURRENT_TIMESTAMP()  where  agnt_id='${agntsData.agnt_id}' and DATE_FORMAT(trsn_dt,'%Y-%m-%d')>DATE_FORMAT('${dte}','%Y-%m-%d');`

     console.log(QRY_TO_EXEC);
     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);

}
/**************************************************************************************
* Function      : insrtPaymntDtlsMdl
* Description   : 
* Arguments     : callback function
* Change History :
* 13/05/2020    -   - Initial Function
*
***************************************************************************************/
exports.insrtPaymntDtlsMdl = function (pymnt_dtls, agntsData, befreTransData) {
    var fnm = "insrtPaymntDtlsMdl"
        var date = pymnt_dtls.Dateofpayment.split(" ");
        var dte = date[0].split("-").reverse().join("-");
        var remainingBlnceCnt = (agntsData.agnt_blnce_at - pymnt_dtls.Amountpaid);
        var prsntBlnceCnt = (befreTransData.agnt_blnce_at - pymnt_dtls.Amountpaid);

    var QRY_TO_EXEC = [` INSERT INTO agnt_pymnt_trnsn_ref_dtl_t(
        trns_ref_nu,
        agnt_id, 
        trnsn_at, 
        actl_trnsn_at, 
        pymnt_mde_id,
        trnsn_bnk_nm, 
        trnsn_type_id, 
        trns_ts, 
        a_in, 
        i_ts)
    VALUES(
        '${pymnt_dtls.Tranrefnumber}',
         ${agntsData.agnt_id},
         ${pymnt_dtls.Amountpaid},
         ${pymnt_dtls.Amountpaid}, 
        1, 'Andhra bank Billdesk', 6,'${dte}', 1, CURRENT_TIMESTAMP())`,
    ` INSERT INTO agnt_trnsn_dtl_t(
        agnt_id, 
        trnsn_at, 
        actl_trnsn_at, 
        agnt_blnce_at, 
        pymnt_mde_id,   
        trnsn_bnk_nm, 
        trnsn_type_id, 
        trsn_dt, 
        aprve_ts, 
        trns_ref_nu, 
        mnl_upld_in, 
        a_in, 
        i_ts)
    VALUES(
        ${agntsData.agnt_id},
        ${pymnt_dtls.Amountpaid},
        ${pymnt_dtls.Amountpaid}, 
        '${prsntBlnceCnt}', 
        1, 'Andhra bank Billdesk', 6,'${dte}', CURRENT_TIMESTAMP(), 
        '${pymnt_dtls.Tranrefnumber}',
        0, 1, CURRENT_TIMESTAMP())`,
    `UPDATE agnt_lst_t set agnt_blnce_at = ${remainingBlnceCnt},
    u_ts = CURRENT_TIMESTAMP() where agnt_id =  ${agntsData.agnt_id};`]
    console.log(QRY_TO_EXEC);
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};




/**************************************************************************************
* Function      : upDatePaymntDtlsMdl
* Description   : 
* Arguments     : callback function
* Change History :
* 13/05/2020    -   - Initial Function
*
***************************************************************************************/
exports.upDatePaymntDtlsMdl = function (pymnt_dtls, agntsData) {
    var fnm = "upDatePaymntDtlsMdl"
        var date = pymnt_dtls.Dateofpayment.split(" ");
        var dte = date[0].split("-").reverse().join("-");
        var remainingBlnceCnt = (agntsData.agnt_blnce_at - pymnt_dtls.Amountpaid);

    var QRY_TO_EXEC = [` UPDATE agnt_pymnt_trnsn_ref_dtl_t  SET agnt_id='${agntsData.agnt_id}', trnsn_at='${pymnt_dtls.Amountpaid}',actl_trnsn_at='${pymnt_dtls.Amountpaid}',
                         pymnt_mde_id=1,trnsn_bnk_nm='Andhra bank Billdesk',trnsn_type_id=6,trns_ts='${dte}',a_in=1,u_ts=CURRENT_TIMESTAMP() where trns_ref_nu='${pymnt_dtls.Tranrefnumber}'`,
    ` UPDATE agnt_trnsn_dtl_t  SET agnt_id='${agntsData.agnt_id}', trnsn_at='${pymnt_dtls.Amountpaid}',actl_trnsn_at='${pymnt_dtls.Amountpaid}',agnt_blnce_at= '${remainingBlnceCnt}', 
                         pymnt_mde_id=1,trnsn_bnk_nm='Andhra bank Billdesk',trnsn_type_id=6,trsn_dt='${dte}',aprve_ts=CURRENT_TIMESTAMP(),mnl_upld_in=0,a_in=1,u_ts=CURRENT_TIMESTAMP() where trns_ref_nu='${pymnt_dtls.Tranrefnumber}'`,
    ` UPDATE agnt_lst_t set agnt_blnce_at = ${remainingBlnceCnt}, u_ts = CURRENT_TIMESTAMP() where agnt_id =  ${agntsData.agnt_id};`]
    console.log(QRY_TO_EXEC);
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};



/**************************************************************************************
* Function      : insrtKotakPaymntDtlsMdl
* Description   : 
* Arguments     : callback function
* Change History :
* 13/05/2020    -   - Initial Function
*
***************************************************************************************/
exports.insrtKotakPaymntDtlsMdl = function (pymnt_dtls, agntsData) {
    var fnm = "insrtKotakPaymntDtlsMdl"
        var date = pymnt_dtls.Dateofpayment.split(" ");
        var dte = date[0].split("-").reverse().join("-");
        var remainingBlnceCnt = (agntsData.agnt_blnce_at - pymnt_dtls.Amountpaid);
    var QRY_TO_EXEC = [` INSERT INTO agnt_pymnt_trnsn_ref_dtl_t(
        trns_ref_nu,
        agnt_id, 
        trnsn_at, 
        actl_trnsn_at, 
        pymnt_mde_id,   
        trnsn_bnk_nm, 
        trnsn_type_id, 
        trns_ts, 
        a_in, 
        i_ts)
    VALUES(
        '${pymnt_dtls.Tranrefnumber}',
         ${agntsData.agnt_id},
         ${pymnt_dtls.AmountPaid},
         ${agntsData.agnt_blnce_at}, 
        ${pymnt_dtls.PaymentModeId}, '${pymnt_dtls.BankName}', ${pymnt_dtls.TranType},'${dte}', 1, CURRENT_TIMESTAMP())`,
    ` INSERT INTO agnt_trnsn_dtl_t(
        agnt_id, 
        trnsn_at, 
        actl_trnsn_at, 
        agnt_blnce_at, 
        pymnt_mde_id,   
        trnsn_bnk_nm, 
        trnsn_type_id, 
        trsn_dt, 
        aprve_ts, 
        trns_ref_nu, 
        mnl_upld_in, 
        a_in, 
        i_ts)
    VALUES(
        ${agntsData.agnt_id},
        ${pymnt_dtls.AmountPaid},
        ${agntsData.agnt_blnce_at}, 
        '${remainingBlnceCnt}', 
        ${pymnt_dtls.PaymentModeId},'${pymnt_dtls.BankName}', ${pymnt_dtls.TranType},'${dte}', CURRENT_TIMESTAMP(), 
        '${pymnt_dtls.Tranrefnumber}',
        0, 1, CURRENT_TIMESTAMP())`,
    `UPDATE agnt_lst_t set agnt_blnce_at = ${remainingBlnceCnt},
    u_ts = CURRENT_TIMESTAMP() where agnt_id =  ${agntsData.agnt_id};`]
    console.log(QRY_TO_EXEC);
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : CallFailOrSuccess
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.CallFailOrSuccess = function (id, sts, respnse) {
    var fnm = "CallFailOrSuccess"
    var QRY_TO_EXEC = `UPDATE api_rqst_cl_dtl_t  SET api_sts_id='${sts}', rspne_tx='${respnse}' where api_rqst_id=${id};`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};