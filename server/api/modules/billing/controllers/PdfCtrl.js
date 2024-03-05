const PdfMdl = require(appRoot + '/pdfNode/api/modules/pdf_generation/models/PdfMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var template = require(appRoot + '/utils/PdfGeneration');
var jsonUtils = require(appRoot + '/utils/json.utils');
var _ = require('lodash');
var request = require('request');

/**************************************************************************************
* Controller     : retryPdfsCtrl
* Parameters     : req,res()
* Description    : Generate PDF
* Change History :  Sravani M
*
***************************************************************************************/
exports.retryPdfsCtrl = function (req, res) {
    console.log('retryPdfsCtrl');
    var options = {
        uri: 'http://localhost:4902/pdf/retryPdfs',
        method: 'POST',
        json: { data: req.body.data, user: req.user }
    };
    request.post(options, function (error, response, body) {
        if (error) {
            return res.send(error);
        } else {
            return res.send(body);
        }
    });
}
/**************************************************************************************
* Controller     : generateCountPdf
* Parameters     : req,res()
* Description    : Generate PDF
* Change History :  Sravani M
*
***************************************************************************************/
exports.generateCountPdf = function (req, res) {
    var options = {
        uri: 'http://localhost:4902/pdf/generateCount',
        method: 'POST',
        json: { data: req.body.data, user: req.user }
    };
    request.post(options, function (error, response, body) {
        if (error) {
            console.log("in err",error)
            return res.send(error);
        } else {
            console.log("in success",body)
            return res.send(body);
        }
    });


}
/**************************************************************************************
* Controller     : generatePdf
* Parameters     : req,res()
* Description    : Generate PDF
* Change History :  Sravani M
*
***************************************************************************************/
exports.getgeneratePdfCstmrs = function (req, res) {
    console.log('getgeneratePdfCstmrs')
    var options = {
        uri: 'http://localhost:4902/pdf/getgeneratePdfCstmrs',
        method: 'POST',
        json: { data: req.body.data, user: req.user}
    };
    request.post(options, function (error, response, body) {
        if (error) {
            console.log("in error",error)
            return res.send(error);
        } else {
            console.log("in body",body)
            return res.send(body);
        }
    });

}
/**************************************************************************************
* Controller     : usrGnrtdPdfs
* Parameters     : req,res()
* Description    : Get payments of a agent
* Change History :
* 19/02/2020    -  Sony V  - Initial Function
*
***************************************************************************************/
exports.usrGnrtdPdfs = function (req, res) {
    var fnm = "usrGnrtdPdfsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    PdfMdl.usrGnrtdPdfsMdl(req.user)
        .then(function (results) {
            return df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : myGenrtPdfsCtrl
* Parameters     : req,res()
* Description    :
* Change History :
* 31/03//2020    -  Sravani M  - Initial Function
*
***************************************************************************************/
exports.myGenrtPdfsCtrl = function (req, res) {

    PdfMdl.myGenrtPdfsCtrlMdl(req.body.data, req.user)
        .then(function (results) {
            return df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : myRecntGenrtPdfsCtrl
* Parameters     : req,res()
* Description    :
* Change History :
* 31/03//2020    -  Sravani M  - Initial Function
*
***************************************************************************************/
exports.myRecntGenrtPdfsCtrl = function (req, res) {

    PdfMdl.myRecntGenrtPdfsCtrlMdl(req.body.data, req.user)
        .then(function (results) {
            return df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : refreshPdfdtaCtrl
* Parameters     : req,res()
* Description    :
* Change History :
* 31/03//2020    -  Sravani M  - Initial Function
*
***************************************************************************************/
exports.refreshPdfdtaCtrl = function (req, res) {

    PdfMdl.refreshPdfdtaMdl(req.params.id, req.user)
        .then(function (results) {
            return df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}