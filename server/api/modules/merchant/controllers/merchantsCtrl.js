const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')





/**************************************************************************************
* Controller     : getMrchntCntrl
* Parameters     : req,res()
* Description    : get merchant details
* Change History :
* 13/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntCntrl = function (req, res) {
    console.log("getMrchntCntrl")
    merchantMdl.getMrchntMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : insrtMrchntCtrl
* Parameters     : req,res()
* Description    : insert merchant details
* Change History :
* 13/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntCtrl = function (req, res) {
    console.log("insrtMrchntCtrl")
    merchantMdl.insrtMrchntMdl(req.body.data, req.user)
        .then(function (results) {
            if (results && results.insertId) {
                merchantMdl.updtMrchntQRCode(results.insertId, req.user)
                    .then((updtResult) => {
                        df.formatSucessRes(req, res, updtResult, cntxtDtls, '', {});
                    }).catch((err) => {

                        df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                    })
            }
            else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }

        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updateMrchntCtrl
* Parameters     : req,res()
* Description    : update merchant details
* Change History :
* 13/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateMrchntCtrl = function (req, res) {
    console.log("updateMrchntCtrl")
    merchantMdl.updateMrchntMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : deltMrchntCtrl
* Parameters     : req,res()
* Description    : delete merchant details
* Change History :
* 13/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltMrchntCtrl = function (req, res) {
    console.log("deltMrchntCtrl")
    merchantMdl.deltMrchntMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : upldMrchntDoc
* Parameters     : req,res()
* Description    : delete merchant user details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.upldMrchntDoc = function (req, res) {
    console.log("upldMrchntDoc")
    merchantMdl.upldMrchntDocMdl(req.body, req.user, (err, result) => {
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else {
            df.formatSucessRes(req, res, result, cntxtDtls, '', {});
        }
    })

}

exports.get_mrchntdetails = function (req, res) {
    console.log("getmerchant details Cntrl")
    merchantMdl.get_mrchntdetailsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : updateMrchntSetupCtrl
* Parameters     : req,res()
* Description    : To update setup
* Change History :
* 19/06/2019    - Seetharam - Initial Function
*
***************************************************************************************/
exports.updateMrchntSetupCtrl = function (req, res) {
    console.log("updateMrchntSetupCtrl")
    merchantMdl.updateMrchntSetupMdl(req.body.data, req.user, (err, results) => {
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else if (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }

    })
}
