const inventoryMdl = require(appRoot + '/server/api/modules/bbnl/models/inventoryMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');

/**************************************************************************************
* Controller     : getOltTbleDta
* Parameters     : None
* Description    : 
* Change History :
* 02/09/2020    - Sony Angel - Initial Function
***************************************************************************************/
exports.getOltTbleDta = (req, res) => {
    var fnm = "getOltTbleDta";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getOltTbleDtaMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : getOnuTbleDta
* Parameters     : None
* Description    : 
* Change History :
* 02/09/2020    - Sony Angel - Initial Function
***************************************************************************************/
exports.getOnuTbleDta = (req, res) => {
    var fnm = "getOnuTbleDta";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getOnuTbleDtaMdl(req.body.data,req.user)
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
* 02/09/2020    - Sony Angel - Initial Function
***************************************************************************************/
exports.getinvtryTbleDta = (req, res) => {
    var fnm = "getinvtryTbleDta";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getinvtryTbleDtaMdl(req.body.data,req.user)
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
* 02/09/2020    - Sony Angel - Initial Function
***************************************************************************************/
exports.getGPWsInvntryTbleDta = (req, res) => {
    var fnm = "getGPWsInvntryTbleDta";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getGPWsInvntryTbleDtaMdl(req.params,req.user)
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
* 02/09/2020    - Sony Angel - Initial Function
***************************************************************************************/
exports.getMndlWsInvntryTbleDta = (req, res) => {
    var fnm = "getMndlWsInvntryTbleDta";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getMndlWsInvntryTbleDtaMdl(req.params,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : get_inventoryDt
* Parameters     : None
* Description    : 
* Change History :
* 04/01/2021    - Sony Angel - Initial Function
***************************************************************************************/
exports.get_inventoryDt = (req, res) => {
    var fnm = "get_inventoryDt";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.get_inventoryDt(req.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : get_alarmsDt
* Parameters     : None
* Description    : 
* Change History :
* 04/01/2021    - Sony - Initial Function
***************************************************************************************/
exports.get_alarmsDt = (req, res) => {
    var fnm = "get_alarmsDt";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.get_alarmsDt(req.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : get_serviceInventoryDt
* Parameters     : None
* Description    : 
* Change History :
* 04/01/2021    - Sony - Initial Function
***************************************************************************************/
exports.get_serviceInventoryDt = (req, res) => {
    var fnm = "get_serviceInventoryDt";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.get_serviceInventoryDt(req.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : get_slaDt
* Parameters     : None
* Description    : 
* Change History :
* 04/01/2021    - Sony - Initial Function
***************************************************************************************/
exports.get_slaDt = (req, res) => {
    var fnm = "get_slaDt";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.get_slaDt(req.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}