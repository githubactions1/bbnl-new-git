var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function      : updt_mrchnt_rolesM
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updt_mrchnt_rolesM = (data) => {
    var fnm='updt_mrchnt_rolesM'
    console.log(data)
    var QRY_TO_EXEC = `update mrcht_usr_lst_t set emple_id=${data.emple_id},rle_id=${data.rle_id},u_ts = current_timestamp() where mrcht_usr_id = ${data.mrcht_usr_id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : get_mrchnt_rolesM
* Description   : get merchant roles
******************************************************************************/
exports.get_mrchnt_rolesM = () => {
    var fnm='get_mrchnt_rolesM'
    var QRY_TO_EXEC = `select * from mrcht_rls_lstl_t WHERE a_in = 1 ORDER BY i_ts ASC`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : insrt_mrchnt_rolesM
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrt_mrchnt_rolesM = (data,callback) => {
    var fnm='insrt_mrchnt_rolesM'
    console.log(data)
    var QRY_TO_EXEC = `insert into mrcht_usr_lst_t (mrcht_usr_nm,pswrd_encrd_tx,rle_id,a_in,i_ts) values ('${data.mrcht_usr_nm}',sha1('${data.pwd_tx}'),${data.rle_id},1,current_timestamp())`;
    
     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm,(err,results)=>{
        if(err){
            callback(err,[])
        } 
        else if(results){
            callback(err,results)
        }
     });
}
