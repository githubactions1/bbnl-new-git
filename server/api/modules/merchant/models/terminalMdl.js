var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);



/*****************************************************************************
* Function      : getTrmnlLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getTrmnlLstMdl = (id) => {
    var fnm='getTrmnlLstMdl'
    var QRY_TO_EXEC = ` select * From trmnl_lst_t where a_in = 1 and trmnl_id = ${id} `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}




/*****************************************************************************
* Function      : insrtTrmnlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtTrmnlMdl = (data) => {
    var fnm='insrtTrmnlMdl'
    var QRY_TO_EXEC = ` insert into trmnl_lst_t values(trmnl_nm, trmnl_prfle_id)
    values ('${data.trmnl_nm}', ${data.trmnl_prfle_id}); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}



/*****************************************************************************
* Function      : updateTrmnlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateTrmnlMdl = (data) => {
    var fnm='updateTrmnlMdl'
    var QRY_TO_EXEC = ` update  trmnl_lst_t set trmnl_nm = ${data.trmnl_nm} , trmnl_prfle_id = ${data.trmnl_prfle_id}) where trmnl_id = ${data.trmnl_id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}



/*****************************************************************************
* Function      : deltTrmnlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltTrmnlMdl = (id) => {
    var fnm='deltTrmnlMdl'
    var QRY_TO_EXEC = ` update  trmnl_lst_t set d_ts = current_timestamp(), a_in = 0 where trmnl_id = ${id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}
