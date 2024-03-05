var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function      : getOutltMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getOutltMdl = (data) => {
    var fnm='getOutltMdl'
    if (data.outlt_ctgry_nm != ''){
        var condition = `AND c.otlt_ctgry_nm = '${data.outlt_ctgry_nm}'`;
    }else{
        var condition = ``;
    }
    var QRY_TO_EXEC = ` SELECT ot.otlt_id, ot.otlt_nm, ot.otlt_ctgry_id, c.otlt_ctgry_nm, m.mrcht_id, m.mrcht_nm FROM mrcht_otlt_lst_t ot 
                        JOIN mrcht_lst_t m on m.mrcht_id = ot.mrcht_id
                        JOIN mrcht_otlt_ctgry_lst_t c on c.otlt_ctgry_id = ot.otlt_ctgry_id 
                        WHERE ot.a_in = 1 AND m.mrcht_id=${data.mrcht_id} ${condition}
                        ORDER BY ot.otlt_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm);
}




/*****************************************************************************
* Function      : insrtOutltMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtOutltMdl = (data) => {
    var fnm='insrtOutltMdl'
    var QRY_TO_EXEC = ` insert into mrcht_otlt_lst_t (otlt_nm, otlt_ctgry_id, mrcht_id, a_in, i_ts)
    values ('${data.otlt_nm}', ${data.otlt_ctgry_id}, ${data.mrcht_id}, 1, current_timestamp())`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm);
}


/*****************************************************************************
* Function      : updateOutltMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateOutltMdl = (data) => {
    var fnm='updateOutltMdl'
    var QRY_TO_EXEC = `update mrcht_otlt_lst_t set otlt_nm = '${data.otlt_nm}', otlt_ctgry_id = ${data.otlt_ctgry_id}, 
    mrcht_id = ${data.mrcht_id} where otlt_id =  ${data.otlt_id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm);
}

/*****************************************************************************
* Function      : deltOutltMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltOutltMdl = (id) => {
    var fnm='deltOutltMdl'
    var QRY_TO_EXEC = `update mrcht_otlt_lst_t set d_ts = current_timestamp(), a_in = 0 where otlt_id =  ${id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm);
}





/*****************************************************************************
* Function      : get_outltCtgryMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.get_outltCtgryMdl = () => {
    var fnm='get_outltCtgryMdl'
    var QRY_TO_EXEC = ` SELECT * FROM mrcht_otlt_ctgry_lst_t
                        WHERE a_in=1
                        ORDER BY otlt_ctgry_id`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm);
}