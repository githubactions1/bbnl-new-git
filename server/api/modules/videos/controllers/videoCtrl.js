var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
// Model Inclusions
const videoMdl = require(appRoot + '/server/api/modules/videos/models/videoMdl');
// var videoMdl = require('../models/videoMdl');
var dbutil = require(appRoot + '/utils/db.utils');
var request = require('request');



/**************************************************************************************
* Controller     : get_VideoCtrl
* Parameters     : None
* Description    : 
* Change History :
* 14/02/2020    - sattibabu - Initial Function
***************************************************************************************/
exports.get_VideoCtrl = (req, res) => {
    var fnm = "get_VideoCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    videoMdl.get_VideoCtrlMdl(req.params.agentID, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
