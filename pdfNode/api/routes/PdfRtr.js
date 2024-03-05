var pdfRtr              = require('express').Router();
// var checkUser 			= require(appRoot +'/pdfNode/api/modules/general/auth/controllers/accessCtrl');

var PdfCtrl				= require(appRoot +'/pdfNode/api/modules/pdf_generation/controllers/PdfCtrl'); 


pdfRtr.post('/generateCount',PdfCtrl.generateCountPdf)
// pdfRtr.post('/getgeneratePdfCstmrs',PdfCtrl.getgeneratePdfCstmrs_Ctrl)
pdfRtr.post('/retryPdfs',PdfCtrl.retryPdfsCtrl)
pdfRtr.get('/user_generated_invoices',PdfCtrl.usrGnrtdPdfs)
pdfRtr.post('/mygenertdpdfs',PdfCtrl.myGenrtPdfsCtrl)
pdfRtr.post('/recntgenertdpdfs',PdfCtrl.myRecntGenrtPdfsCtrl)


pdfRtr.get('/file/download/glits/web/code/nodejs/APSFLWEB/server/pdf_invoice/:dt/:typ/:fnm', function (req, res) {
    console.log("in function")
    console.log(req.params,'1');
    filepath = path.join(appRoot + '/glits/web/code/nodejs/APSFLWEB/server/pdf_invoice') + '/' + req.params.dt + '/' + req.params.typ + '/' + req.params.fnm;
    console.log(filepath,'1');
    res.download(filepath);

})
/****************************************************************
					DB Routes End
*****************************************************************/

 module.exports = pdfRtr;