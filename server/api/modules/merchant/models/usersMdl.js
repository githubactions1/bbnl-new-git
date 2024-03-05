var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function      : insrtMrchntUsrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntUsrMdl = (data) => {
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}





/*****************************************************************************
* Function      : updateMrchntUsrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateMrchntUsrMdl = (id, user) => {
    var fnm = "updateMrchntUsrMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : deltMrchntUsrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltMrchntUsrMdl = (id, data, user) => {
    var fnm = "deltMrchntUsrMdl"
    var QRY_TO_EXEC = `update mrcht_usr_lst_t set a_in=0, u_ts=current_timestamp() where mrcht_usr_id = ${id} `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : getMrchntUsrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntUsrMdl = (id, user) => {
    var fnm = "getMrchntUsrMdl"
    var QRY_TO_EXEC = `select * from mrcht_usr_lst_t u
    JOIN mrcht_rls_lstl_t r on r.rle_id = u.rle_id
    JOIN mrcht_emple_lst_t e on e.emple_id = u.emple_id
    where u.a_in=1
    ORDER BY u.i_ts DESC `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : insrt_mrchnt_usr_rel
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrt_mrchnt_usr_rel = (id,data,user,callback) => {
    var fnm = "insrt_mrchnt_usr_rel"
    console.log(user)
    console.log(data)
    var QRY_TO_EXEC = `insert into mrcht_usr_rel_t (mrcht_usr_id,mrcht_id,emp_id,a_in,i_ts) values (${id},${data.mrcht_id},${data.emple_id},1,current_timestamp())`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,(err,results)=>{
        if(err){
            callback(err,[])
        }
        else if(results){
            var QRY_TO_EXEC1 = `insert into mrcht_mnu_prfle_rel_t (mrcht_usr_id,mnu_prfle_id,app_id,clnt_id,tnt_id,a_in,i_ts) values (${id},${data.rle_id},'${data.app_id}',1,1,1,current_timestamp())`;
            console.log(QRY_TO_EXEC1)
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls, user,fnm,(err,results)=>{
                if(err){
                    callback(err,[])
                }
                else if(results){
                    callback(err,results)
                }
            })
        }
    });
}

/******************************************************************************/
exports.get_userdetailsMdl = (user) => {
    var fnm = "get_userdetailsMdl"
    
    var QRY_TO_EXEC = `select t.usr_id,t.usr_nm,m.mbrsp_id,b.mbrsp_nm from usr_lst_t AS t INNER JOIN usr_mbrsp_rel_t AS m on t.usr_id=m.usr_id INNER JOIN mbrsp_dtl_t AS b ON m.mbrsp_id=b.mbrsp_id;`;
    
    console.log("--------------------")
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm); 

}

