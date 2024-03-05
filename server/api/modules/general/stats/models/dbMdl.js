// Standard Inclusions
var log         = require(appRoot+'/utils/logmessages');
var std         = require(appRoot+'/utils/standardMessages');
var df          = require(appRoot+'/utils/dflower.utils');
var sqldb       = require(appRoot+'/config/db.config');
var cntxtDtls   = df.getModuleMetaData(__dirname,__filename);

var dbutil      = require(appRoot+'/utils/db.utils');




/*****************************************************************************
* Function      : getdbConnectionsCt
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getdbConnectionsCt = function(user,status_id,callback) {
    var fnm = "getdbConnectionsCt"

   var QRY_TO_EXEC =  `select t.tkt_id,t.tkt_sbjct_tx,s.tckt_sts_nm,g.tkt_ctlg_grp_nm,tp.tkt_ctlg_type_nm,c.tkt_ctlg_ctgry_nm 
                        from tkct_dtl_t t join tckt_sts_lst_t s on s.tckt_sts_id=t.tckt_sts_id 
                                join tckt_ctlg_itm_lst_t i on i.tckt_ctlg_itm_id=t.tckt_ctlg_itm_id 
                                join tkt_ctlg_grp_lst_t g on g.tkt_ctlg_grp_id=i.ctlg_grp_id 
                                join tkt_ctlg_type_lst_t tp on tp.tkt_ctlg_type_id=i.tkt_ctlg_type_id 
                                join tkt_ctlg_ctgry_lst_t c on c.tkt_ctlg_ctgry_id=i.tkt_ctlg_ctgry_id 
                        where t.crt_usr_id=12 AND  t.tckt_sts_id=?`;

    if(callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool,QRY_TO_EXEC,cntxtDtls,user,fnm,function(err,results){
            callback(err,results);
            return;
        });
    else
       return dbutil.execQuery(sqldb.MySQLConPool,QRY_TO_EXEC,cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function      : getAllZonesLst
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.submitNewTkt = function(user,tkt_ctlg_typ_id,callback) {
    var fnm = "submitNewTkt"
      var QRY_TO_EXEC = ``;
    if(callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool,QRY_TO_EXEC,cntxtDtls,user,fnm,function(err,results){
            callback(err,results);
            return;
        });
    else
       return dbutil.execQuery(sqldb.MySQLConPool,QRY_TO_EXEC,cntxtDtls, user,fnm);
};