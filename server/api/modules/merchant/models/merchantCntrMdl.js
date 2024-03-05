var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function      : getMrchntCntrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntCntrMdl = (id) => {
    var fnm = "getMrchntCntrMdl"
    var QRY_TO_EXEC = ` select * from cntr_lst_t where a_in = 1 order by cntr_id; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}



/*****************************************************************************
* Function      : insrtMrchntCntrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntCntrMdl = (data) => {
    var fnm = "insrtMrchntCntrMdl"
    var QRY_TO_EXEC = ` insert into cntr_lst_t values(cntr_nm, cntr_in, acs_pnt_in)
    values ('${data.cntr_nm}', ${data.cntr_in}, ${data.acs_pnt_in}); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : updateMrchntCntrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateMrchntCntrMdl = (data) => {
    var fnm = "updateMrchntCntrMdl"
    var QRY_TO_EXEC = ` update cntr_lst_t set cntr_nm = '${data.cntr_nm}', 
    cntr_in = ${data.cntr_in}, acs_pnt_in = ${data.acs_pnt_in} where cntr_id = ${data.cntr_id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}



/*****************************************************************************
* Function      : deltMrchntCntrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltMrchntCntrMdl = (id) => {
    var fnm = "deltMrchntCntrMdl"
    var QRY_TO_EXEC = ` update cntr_lst_t set d_ts = current_timestamp(), a_in = 0 where cntr_id = ${id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

