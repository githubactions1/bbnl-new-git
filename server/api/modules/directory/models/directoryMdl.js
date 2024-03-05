// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');


/*****************************************************************************
* Function       : getDirectoryUsersMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getDirectoryUsersMdl = function (user, callback) {
    var fnm = "getDirectoryUsersMdl"
    var QRY_TO_EXEC = ` SELECT m.mrcht_id,u.mrcht_usr_id, u.mrcht_usr_nm, u.mrcht_usr_imge_url_tx,fst_nm,lst_nm,addrs_tx,u.dsgn_id,dsgn_nm,dpt.dprt_id,dprt_nm,mbl_nu,eml_tx
                        FROM
                        mrcht_usr_lst_t u
                        LEFT JOIN mrcht_usr_rel_t m ON u.mrcht_usr_id = m.mrcht_usr_id
                        LEFT JOIN mrcht_dsgn_lst_t d ON u.dsgn_id = d.dsgn_id
                        LEFT JOIN mrcht_dprts_lst_t dpt ON d.dprt_id = dpt.dprt_id
                        WHERE m.mrcht_id=${user.mrcht_id}
                        ORDER BY u.mrcht_usr_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};