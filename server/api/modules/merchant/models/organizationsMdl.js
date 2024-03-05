var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getOrgnztnCntrlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getOrgnztnCntrlMdl = () => {
    var fnm='getOrgnztnCntrlMdl'
    var QRY_TO_EXEC = ` select * from orgn_lst_t where a_in = 1 `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm);
}



/*****************************************************************************
* Function      : insrtOrgnztnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtOrgnztnMdl = (data) => {
    var fnm='insrtOrgnztnMdl'
    console.log(data)
    var QRY_TO_EXEC = ` insert into orgn_lst_t(orgn_nm) values('${data.orgn_nm}'); `;
    
console.log("sucessfully inserted")
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm);
}




/*****************************************************************************
* Function      : updateOrgnztnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateOrgnztnMdl = (data) => {
    var fnm='updateOrgnztnMdl'
    var QRY_TO_EXEC = ` update orgn_lst_t set orgn_nm = '${data.orgn_nm}' where orgn_id = ${data.orgn_id} `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm);
}




/*****************************************************************************
* Function      : deltOrgnztnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltOrgnztnMdl = (id) => {
    var fnm='deltOrgnztnMdl'
    var QRY_TO_EXEC = ` update orgn_lst_t set  d_ts = current_timestamp(), a_in = 0 where orgn_id = ${id} `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm);
}

