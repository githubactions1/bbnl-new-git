var express = require('express');
var comsRtr = express.Router();
var config = require(appRoot + '/config/bss.config.json');
var file_path = config.routescofig.routes.tms.path;
var modRoot = appRoot + '/server/api/modules/coms/'
const comsCtrl = require(modRoot + 'controllers/comsCtrl');


comsRtr.post('/activateAlaCartePackageapi',  comsCtrl.activateAlaCartePackage);

comsRtr.post('/deActivateAlaCartePackageapi',  comsCtrl.deActivateAlaCartePackage);

comsRtr.get('/unbilledinformation',  comsCtrl.unbilledinformation);

comsRtr.get('/getCustomerPreviousInvoiceDetailsByNWSubscriberCode', function (req, res) {
    res.send('hello world get')
    console.log(req.query);
    file_nm = Date.now()
     var query=JSON.stringify(req.query)
     var hrader=JSON.stringify(req.headers)
    fs.appendFile(`/glits/web/temp/customerinvoice.txt`, [query,hrader] + "\n", function (err, result) {
        if (err) {
            console.log("if")
            console.log(err)

        } else {
            console.log("else");
            console.log(result)

        }
    })
})
module.exports = comsRtr;
