var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function      : getDsgntnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getDsgntnMdl = () => {
    var fnm = "getDsgntnMdl"
    var QRY_TO_EXEC = ` select * from mrcht_dsgn_lst_t where a_in = 1 order by dsgn_id; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}



/*****************************************************************************
* Function      : insrtDsgntnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtDsgntnMdl = (data) => {
    var fnm = "insrtDsgntnMdl"
    var QRY_TO_EXEC = `  insert into mrcht_dsgn_lst_t (dsgn_nm, mrcht_id) values ('${data.dsgn_nm}', ${data.mrcht_id}); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}



/*****************************************************************************
* Function      : updateDsgntnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateDsgntnMdl = (data) => {
    var fnm = "updateDsgntnMdl"
    var QRY_TO_EXEC = ` update mrcht_dsgn_lst_t set dsgn_nm = '${data.dsgn_nm}', mrcht_id =  ${data.mrcht_id} where dsgn_id = ${data.dsgn_id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}





/*****************************************************************************
* Function      : deltDsgntnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltDsgntnMdl = (id) => {
    var fnm = "deltDsgntnMdl"
    var QRY_TO_EXEC = ` update mrcht_dsgn_lst_t set d_ts = current_timestamp(), a_in = 0 where dsgn_id = ${id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}



