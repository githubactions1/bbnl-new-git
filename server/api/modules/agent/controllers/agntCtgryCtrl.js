var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
// Model Inclusions
var agnt_CtgryMdl = require('../models/agntCtgryMdl');



/**************************************************************************************
* Controller     : agnt_ctgry_get
* Parameters     : None
* Description    : 
* Change History :
* 25/05/2016    - Sony Angel - Initial Function
***************************************************************************************/
exports.agnt_ctgry_get = (req, res) => {
    // console.log("allUsersList_get")
    // var clnt_id = req.user.clnt_id;
    // var tnt_id = jsonUtils.processData(req.user.tnts, 'tnt_id');
    // var ctgry_id=req.params.ctgry_id;
    // console.log(ctgry_id)
    var fnm = "agnt_ctgry_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    agnt_CtgryMdl.getagntCtgry(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
