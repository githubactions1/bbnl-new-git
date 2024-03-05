const alertsMdl = require(appRoot + '/server/api/modules/bbnl/models/alertsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');


/**************************************************************************************
* Controller     : getSlctdAlrmsDtaCtrl
* Parameters     : None
* Description    : 
* Change History :
* 01/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.getSlctdAlrmsDtaCtrl = (req, res) => {
    var fnm = "getSlctdAlrmsDtaCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    alertsMdl.getSlctdAlrmsDtaMdl(req.body,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}


/**************************************************************************************
* Controller     : Get alerts Count
* Parameters     : None
* Description    : 
* Change History :
* 01/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.get_AllalrtsCounts = (req, res) => {
    var fnm = "get_AllalrtsCounts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    alertsMdl.get_AllalrtsCountsMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : get_todayalrtsCounts
* Parameters     : None
* Description    : 
* Change History :
* 01/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.get_todayalrtsCounts = (req, res) => {
    var fnm = "get_todayalrtsCounts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    alertsMdl.get_todayalrtsCountsMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : get_AllOltCounts
* Parameters     : None
* Description    : 
* Change History :
* 01/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.get_AllOltCounts = (req, res) => {
    var fnm = "get_AllOltCounts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    alertsMdl.get_AllOltCountsMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : Get alerts Count
* Parameters     : None
* Description    : 
* Change History :
* 01/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.get_AllONUCounts = (req, res) => {
    var fnm = "get_AllONUCounts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    alertsMdl.get_AllONUCountsMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : 
* Parameters     : None
* Description    : 
* Change History :
* 01/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.get_elementTypes = (req, res) => {
    var fnm = "get_elementTypes";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    alertsMdl.get_elementTypesMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : 
* Parameters     : None
* Description    : 
* Change History :
* 01/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.get_districts = (req, res) => {
    var fnm = "get_districts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    alertsMdl.get_districtsMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : 
* Parameters     : None
* Description    : 
* Change History :
* 01/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.get_mandals = (req, res) => {
    var fnm = "get_mandals";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    alertsMdl.get_mandalsMdl(req.params,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}


/**************************************************************************************
* Controller     : 
* Parameters     : None
* Description    : 
* Change History :
* 01/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.get_gps = (req, res) => {
    var fnm = "get_gps";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    alertsMdl.get_gpsMdl(req.params,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}


/**************************************************************************************
* Controller     : 
* Parameters     : None
* Description    : 
* Change History :
* 01/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.get_tmeStmpRange = (req, res) => {
    var fnm = "get_tmeStmpRange";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    alertsMdl.get_tmeStmpRangeMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : 
* Parameters     : None
* Description    : 
* Change History :
* 01/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.get_alrtstatus = (req, res) => {
    var fnm = "get_alrtstatus";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    alertsMdl.get_alrtstatusMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}


/**************************************************************************************
* Controller     : Alerts
* Parameters     : None
* Description    : 
* Change History :
* 01/09/2020    - Sattibabu - Initial Function
***************************************************************************************/
exports.getAlertsTbleDta = (req, res) => {
    var fnm = "getAlertsTbleDta";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    alertsMdl.getAlertsTbleDtaMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}