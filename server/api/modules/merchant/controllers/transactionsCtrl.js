const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')




/**************************************************************************************
* Controller     : getTrmnlLstCntrl
* Parameters     : req,res()
* Description    : get terminal list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getTrmnlLstCntrl = function (req, res) {
    console.log("getTrmnlLstCntrl")
    merchantMdl.getTrmnlLstMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : insrtTrmnlCtrl
* Parameters     : req,res()
* Description    : get terminal list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtTrmnlCtrl = function (req, res) {
    console.log("insrtTrmnlCtrl")
    merchantMdl.insrtTrmnlMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : updateTrmnlCtrl
* Parameters     : req,res()
* Description    : get terminal list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateTrmnlCtrl = function (req, res) {
    console.log("updateTrmnlCtrl")
    merchantMdl.updateTrmnlMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : deltTrmnlCtrl
* Parameters     : req,res()
* Description    : get terminal list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltTrmnlCtrl = function (req, res) {
    console.log("deltTrmnlCtrl")
    merchantMdl.deltTrmnlMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getMrchntTrnscCntrl
* Parameters     : req,res()
* Description    : get transaction data
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntTrnscCntrl = function (req, res) {
    console.log("getMrchntTrnscCntrl")
    merchantMdl.getMrchntTrnscMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : getMrchntTrnscDtlsCntrl
* Parameters     : req,res()
* Description    : get transaction detials data
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntTrnscDtlsCntrl = function (req, res) {
    console.log("getMrchntTrnscDtlsCntrl")
    merchantMdl.getMrchntTrnscDtlsMdl(req.params.id, req.params.trnscId, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : getMrchntTrnscDateFltrCntrl
* Parameters     : req,res()
* Description    : get transaction detials data wtih date filter
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntTrnscDateFltrCntrl = function (req, res) {
    console.log("getMrchntTrnscDateFltrCntrl")
    merchantMdl.getMrchntTrnscDateFltrMdl(req.params.id, req.params.frmdt, req.params.todt, req,user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : getMrchntStmntCntrl
* Parameters     : req,res()
* Description    : get statement details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntStmntCntrl = function (req, res) {
    console.log("getMrchntStmntCntrl")
    merchantMdl.getMrchntStmntMdl(req.params.id, req.params.frmdt, req.params.todt, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


