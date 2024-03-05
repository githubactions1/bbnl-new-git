const keyValMdl = require(appRoot + '/server/api/modules/general/keys/models/kysMdl');
var df = require(appRoot + '/utils/dflower.utils');
/**************************************************************************************
* Controller     : get_keyValCtrl
* Parameters     : ky_hndlr_tx
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.get_keyValCtrl = function (ky_hndlr_tx,callback) {
    keyValMdl.getKeyValMdl(ky_hndlr_tx).then((res) => {
        callback(false,res)
       
    })


}


