const bndwidthMdl = require(appRoot + '/server/api/modules/bbnl/models/bndwidthMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');


/**************************************************************************************
* Controller     : get_HsiCrntMnthCntCtrl
* Parameters     : None
* Description    : 
* Change History :
* 04/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.get_HsiCrntMnthCntCtrl = (req, res) => {
    var fnm = "get_HsiCrntMnthCntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    bndwidthMdl.get_HsiCrntMnthCntMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Hsi Current Month Uasge
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_HsitdyprvsDayCntCtrl = (req, res) => {
    var fnm = "get_HsitdyprvsDayCntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    bndwidthMdl.get_HsitdyprvsDayCntMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : Bandwidth
* Parameters     : None
* Description    : 
* Change History :
* 04/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.get_AllbndwdthCounts = (req, res) => {
    var fnm = "get_AllbndwdthCounts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    bndwidthMdl.get_AllbndwdthCountsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Bandwidth
* Parameters     : None
* Description    : 
* Change History :
* 04/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.bandWidthChartCtrl = (req, res) => {
    var fnm = "get_HsidayWiseUsgeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    bndwidthMdl.bandWidthChartMdl(req.params.mnth, req.params.year, req.user)
        .then((results) => {
            let new_each_day = [];
            if (results && results.length) {
                for (let index = 1; index <= 31; index++) {
                    var type = index;
                    let d = {
                        "day": type,
                        "upload": results[0][`day_${index}_U`],
                        "download": results[0][`day_${index}_D`],
                    };
                    new_each_day.push(d)
                }
            }
            df.formatSucessRes(req, res, new_each_day, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Bandwidth
* Parameters     : None
* Description    : 
* Change History :
* 04/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.getbndwdthTbleDta = (req, res) => {
    var fnm = "getbndwdthTbleDta";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    bndwidthMdl.getbndwdthTbleDtaMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Inventory
* Parameters     : None
* Description    : 
* Change History :
* 02/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.getGPWsBndwdthTbleDta = (req, res) => {
    var fnm = "getGPWsBndwdthTbleDta";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    bndwidthMdl.getGPWsBndwdthTbleDtaMdl(req.params, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Inventory
* Parameters     : None
* Description    : 
* Change History :
* 02/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.getMndlWsBndwdthTbleDta = (req, res) => {
    var fnm = "getMndlWsBndwdthTbleDta";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    bndwidthMdl.getMndlWsBndwdthTbleDtaMdl(req.params, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}