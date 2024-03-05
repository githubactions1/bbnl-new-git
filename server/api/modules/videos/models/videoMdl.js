var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');



/*****************************************************************************
* Function       : get_VideoCtrlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_VideoCtrlMdl = function (agent_id, user) {
	var fnm = "get_VideoCtrlMdl"
    var QRY_TO_EXEC = `select av.vdeo_hdr_txt,av.vdeo_hdr_tel_txt,av.vdeo_bdy_txt, av.vdeo_bdy_tel_txt, av.vdeo_lnk_url  from  app_vdeo_lnk_dtl_t as av
    WHERE av.app_id = 2`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};

