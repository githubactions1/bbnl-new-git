var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : merch_get_locM
* Description   : get merchant locations
******************************************************************************/
exports.merch_get_locM = () => {
    var fnm = "merch_get_locM"
    var QRY_TO_EXEC =  `select * 
                        from mrcht_lctns_lst_t ml 
                            join mrcht_lst_t as m on m.mrcht_id=ml.mrcht_id 
                            join mrcht_ctgry_lst_t as mc on mc.mrcht_ctgry_id=m.mrcht_ctgry_id
                        WHERE ml.a_in=1 order by ml.lctn_id ASC`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/*****************************************************************************
* Function      : merch_add_locM
* Description   : 
* Arguments     : 
******************************************************************************/
exports.merch_add_locM = (data) => {
    var fnm = "merch_add_locM"
    console.log(data)
    var QRY_TO_EXEC = `insert into mrcht_lctns_lst_t (lctn_nm,mrcht_id,a_in,i_ts) 
                        values ('${data.lctn_nm}',${data.mrcht_id},1,current_timestamp())`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/*****************************************************************************
* Function      : merch_updt_locM
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.merch_updt_locM = (data) => {
    var fnm = "merch_updt_locM"
    var QRY_TO_EXEC = `update mrcht_lctns_lst_t 
                        set lctn_nm = '${data.lctn_nm}',u_ts = current_timestamp() 
                        where lctn_id = ${data.lctn_id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : merch_del_locM
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.merch_del_locM = (id) => {
    var fnm = "merch_del_locM"
    var QRY_TO_EXEC = `update mrcht_lctns_lst_t 
                        set a_in = 0, d_ts = current_timestamp() 
                        where lctn_id = ${id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


