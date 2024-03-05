
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/*****************************************************************************
* Function       : get_onuCtrlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_onuCtrlMdl = function (caf_id, user) {
	var fnm = "get_onuCtrlMdl"
    var QRY_TO_EXEC = `select REPLACE(REPLACE(c.aghra_cd,'-HSI',""),'-VOIP','') as aghra_cd
                            ,CONCAT(REPLACE(REPLACE(c.aghra_cd,'-HSI',''),'-VOIP',''),"-1-",im.agro_cpe_prfle_id) as aghra_cd_sncr,o.olt_vndr_id,o.olt_ip_addr_tx,olt_crd_nu,olt_prt_nm,olt_onu_id	
                        from caf_dtl_t c 
                            join inv_stpbx_lst_t s on s.caf_id =c.caf_id
                            join inv_prdct_mdle_lst_t im on s.mdle_id =im.mdle_id 
                            JOIN olt_lst_t as o on o.olt_id=c.olt_id
                        where c.caf_id=${caf_id} and im.prdct_id=1`;
                        console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};




