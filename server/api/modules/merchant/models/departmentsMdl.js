var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);



/*****************************************************************************
* Function      : getDprtmntLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getDprtmntLstMdl = (id) => {
    var fnm = "getDprtmntLstMdl"
    var QRY_TO_EXEC = ` select * From mrcht_dprnt_lst_t where mrcht_id = ${id} and a_in = 1; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}




/*****************************************************************************
* Function      : insrtDprtmntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtDprtmntMdl = (data) => {
    var fnm = "insrtDprtmntMdl"
    var QRY_TO_EXEC = `  insert into mrcht_dprnt_lst_t (dprnt_nm, mrcht_id)
    values ('${data.dprnt_nm}', ${data.mrcht_id}); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : updateDprtmntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateDprtmntMdl = (data) => {
    var fnm = "updateDprtmntMdl"
    var QRY_TO_EXEC = ` update mrcht_dprnt_lst_t set dprnt_nm = '${data.dprnt_nm}', mrcht_id =  ${data.mrcht_id} where dprnt_id = ${data.dprnt_id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}





/*****************************************************************************
* Function      : deltDprtmntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltDprtmntMdl = (id) => {
    var fnm = "deltDprtmntMdl"
    var QRY_TO_EXEC = ` update mrcht_dprnt_lst_t set d_ts = current_timestamp(), a_in = 0 where dprnt_id = ${id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

