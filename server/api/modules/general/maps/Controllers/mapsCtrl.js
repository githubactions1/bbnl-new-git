var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
// Model Inclusions
var mapsMdl = require('../Models/mapsMdls');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);



/**************************************************************************************
* Controller     : get_groupsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 29/06/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_groupsCtrl = (req, res) => {
    var fnm = "get_groupsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    mapsMdl.get_groupsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : get_categoryCtrl
* Parameters     : None
* Description    : 
* Change History :
* 29/06/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_categoryCtrl = (req, res) => {
    var fnm = "get_categoryCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    mapsMdl.get_categoryMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : get_statusCtrl
* Parameters     : None
* Description    : 
* Change History :
* 29/06/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_statusCtrl = (req, res) => {
    var fnm = "get_statusCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    mapsMdl.get_statusMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : get_typeCtrl
* Parameters     : None
* Description    : 
* Change History :
* 03/07/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_typeCtrl = (req, res) => {
    var fnm = "get_typeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    mapsMdl.get_typeMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : get_oltCtrl
* Parameters     : None
* Description    : 
* Change History :
* 01/07/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_oltCtrl = (req, res) => {
    var fnm = "get_oltCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log("resultssssssssssssssssssssssssssssssss");
    mapsMdl.get_oltMdl(req.user)
        .then((results) => {
            console.log("resultsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
            console.log(results);
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : get_olt_grpCtgCtrl
* Parameters     : None
* Description    : 
* Change History :
* 01/07/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_olt_grpCtgCtrl = (req, res) => {
    var fnm = "get_olt_grpCtgCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    mapsMdl.get_olt_grpCtgMdl(req.params.grpId,req.params.ctgId,req.params.dstId,req.params.typId,req.params.mndlId, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : get_olt_stsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 02/07/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_olt_stsCtrl = (req, res) => {
    var fnm = "get_olt_stsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    mapsMdl.get_olt_stsMdl(req.params.stsId, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : get_olt_latlngCtrl
* Parameters     : None
* Description    : 
* Change History :
* 03/07/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_olt_latlngCtrl = (req, res) => {
    var fnm = "get_olt_latlngCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    mapsMdl.get_olt_latlngMdl(req.params.lat,req.params.lng, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}