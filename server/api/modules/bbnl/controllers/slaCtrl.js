const slaMdl = require(appRoot + '/server/api/modules/bbnl/models/slaMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');

/**************************************************************************************
* Controller     : Get onu Inactive Hourly Counts
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_hourlyCountsCtrl = (req, res) => {
    var fnm = "get_hourlyCountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    slaMdl.get_hourlyCountsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Olt Inactive Hourly Counts
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_OltHourlCountsCtrl = (req, res) => {
    var fnm = "get_OltHourlCountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    slaMdl.get_OltHourlCountsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get onu Inactive Hourly Counts
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_onuHourlDataCtrl = (req, res) => {
    var fnm = "get_onuHourlDataCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    slaMdl.get_onuHourlDataMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Olt Inactive Hourly Counts
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_OltHourlDataCtrl = (req, res) => {
    var fnm = "get_OltHourlDataCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    slaMdl.get_OltHourlDataMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}