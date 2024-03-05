// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');


/*****************************************************************************
* Function       : getagntCtgry
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getagntCtgry = function (user) {
    var fnm = "getagntCtgry"
    
    // let dtls = data.data
    var QRY_TO_EXEC = `SELECT prtnr_id, prtnr_nm from prtnrs_lst_t ORDER BY prtnr_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};