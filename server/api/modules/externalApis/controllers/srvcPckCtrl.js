
const apiMstrMdl = require(appRoot + '/server/api/modules/externalApis/models/apiMstrMdl');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');


/**************************************************************************************
* Controller     : add_srvcPck
* Parameters     : subscriber Data
* Description    : Add Service Pack
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.add_srvcPck = function (req,res) {
    let extApiReq = {}
    extApiReq.url_tx = as.bssapi.mdle.caf.srvcPck.url;
    extApiReq.mthd_id=1;
    extApiReq.data = req.body;
    extApiCtrl.execRqst(extApiReq, "ADD SERVICE", "103923401", "20000000");

}
