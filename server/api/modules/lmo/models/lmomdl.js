var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

exports.get_lmosMdl = (data,user,callback) => {
 var fnm = "get_lmosMdl"

    console.log(data,'---------------------------------------------------------')
    // var QRY_TO_EXEC = `select   dstrct_id,s.sbstn_id,sbstn_nm, dstrt_nm,fst_nm, a.agnt_id,a.agnt_cd,c.caf_id,c.frst_nm from sbstn_lst_t  s
    // join dstrt_lst_t d on d.dstrt_id=s.dstrct_id
    // join agnt_sbstn_rel_t r on r.sbstn_id=s.sbstn_id
    // join agnt_lst_t a on r.agnt_id=a.agnt_id
    // join caf_dtl_t c on c.agnt_id=a.agnt_id
    // WHERE dstrct_id=${data.dstrct_id} `;
      var QRY_TO_EXEC = ` SELECT *,ROW_NUMBER() OVER ( ORDER BY agnt_id) sno from agnt_lst_t where a_in=1 AND onbrd_in=1 AND prnt_agnt_id IS NOT NULL`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


exports.get_trmsCndtnsMdl = (user,callback) => {
    var fnm = "get_trmsCndtnsMdl"


    console.log('-------------------------- get_trmsCndtnsMdl -------------------------------')

      var QRY_TO_EXEC = ` SELECT * FROM bss_trms_cndtn_t where a_in = 1`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getMrchtName
* Description   : get merchant roles
******************************************************************************/
exports.getMrchtName = (data,user,callback) => {
    var fnm = "getMrchtName"
    var QRY_TO_EXEC = `select * from agnt_lst_t WHERE agnt_id=${data.usr_ctgry_ky}`;
    console.log(QRY_TO_EXEC)
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,(err,results)=>{
        if(err){
            callback(err,[])
        } 
        else if(results){
            callback(err,results)
        }
     })
}

/*****************************************************************************
* Function      : insrtnew_mrchnt_rolesM
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtnew_mrchnt_rolesM = (data,lmoCode,user,callback) => {
    var fnm = "insrtnew_mrchnt_rolesM"
    console.log(data)
    var QRY_TO_EXEC = `insert into mrcht_usr_lst_t (balance,install_charges,caf_1_to_100,caf_100_to_250,caf_250_to_500,caf_500_to_1000,caf_above_1000,mrcht_usr_nm,usr_ctgry_ky,pswrd_encrd_tx,a_in,i_ts) values (0,60,2000,3000,5000,10000,15000,'${lmoCode}',${data.usr_ctgry_ky},sha1(${data.pwd_tx}),1,current_timestamp())`;
    console.log(QRY_TO_EXEC)
     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,(err,results)=>{
        if(err){
            callback(err,[])
        } 
        else if(results){
            callback(err,results)
        }
     });
}

/*****************************************************************************
* Function      : updateagnttable
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateagnttable = (data,lmoCode,user,callback) => {
    var fnm = "updateagnttable"
    console.log(data)
    var QRY_TO_EXEC = `update agnt_lst_t set agnt_cd='${lmoCode}' where agnt_id=${data.usr_ctgry_ky}`;
    console.log(QRY_TO_EXEC)
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
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm,(err,results)=>{
        if(err){
            callback(err,[])
        }
        else if(results){
            var QRY_TO_EXEC1 = `insert into mrcht_mnu_prfle_rel_t (mrcht_usr_id,mnu_prfle_id,app_id,a_in,i_ts) values (${id},${data.rle_id},${data.app_id},1,current_timestamp())`;
            console.log(QRY_TO_EXEC1)
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls,user,fnm,(err,results)=>{
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

/*****************************************************************************
* Function      : insrt_mrcht_usr_mnus
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrt_mrcht_usr_mnus = (id,data,user,callback) => {
    var fnm = "insrt_mrcht_usr_mnus"
    console.log(data)
    var QRY_TO_EXEC = `select mnu_itm_id from mnu_prfle_itm_rel_t where mnu_prfle_id = ${data.rle_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm,(err,results)=>{
        if(err){
            callback(err,[])
        }
        else if(results){
            var count = 1;
            var count1 = 0
            console.log(results)
            for(var i=0; i<results.length; i++){
                var QRY_TO_EXEC1 = `insert into mrcht_mnu_itm_rel_t (usr_id,mnu_itm_id,crte_usr_id,enble_in,dsble_in,sqnce_id,a_in,i_ts) values(${id},${results[i].mnu_itm_id},${data.mrcht_id},1,0,${count++},1,current_timestamp())`;

                console.log(QRY_TO_EXEC1)
                 dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls,user,fnm,(err,results)=>{
                    count1++
                    console.log(count1,i)
                    if(count1==i){
                        console.log("in last mnu")
                        callback(err,results)
                    }
                })
            }

        }
    });
}