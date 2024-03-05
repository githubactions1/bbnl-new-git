var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function      : getMrchntAccntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntAccntMdl = (id, user) => {
    var fnm = "getMrchntAccntMdl"
    var QRY_TO_EXEC = ` select * 
                        from mrchnt_acnt_lst_t
                         where  mrcht_acnt_id = ${id} and a_in = 1`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : insrtMrchntAccntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntAccntMdl = (data, user) => {
    var fnm = "insrtMrchntAccntMdl"
    var QRY_TO_EXEC = ` insert into mrchnt_acnt_lst_t(mrcht_acnt_nu, mrcht_id, otlt_id, bnk_id)
                        values (${data.mrcht_acnt_nu}, ${data.mrcht_id}, ${data.otlt_id}, ${data.bnk_id});`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : updateMrchntAccntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateMrchntAccntMdl = (data, user) => {
    var fnm = "updateMrchntAccntMdl"
    var QRY_TO_EXEC = ` update mrchnt_acnt_lst_t 
                        set mrcht_acnt_nu = ${data.mrcht_acnt_nu}, mrcht_id = ${data.mrcht_id}, 
                            otlt_id = ${data.otlt_id}, bnk_id = ${data.bnk_id} 
                        where mrcht_acnt_id = ${data.mrcht_acnt_id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : deltMrchntAccntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltMrchntAccntMdl = (id, user) => {
    var fnm = "deltMrchntAccntMdl"
    var QRY_TO_EXEC = ` update mrchnt_acnt_lst_t set d_ts = current_timestamp() , a_in = 0 where mrcht_acnt_id = ${id} `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

