
const apiMstrMdl = require(appRoot + '/server/api/modules/externalApis/models/apiMstrMdl');
const request = require('request');


/**************************************************************************************
* Controller     : mdfySbscrbr
* Parameters     : subscriber Data
* Description    : Modify Subrscriber Data
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.mdfySbscrbr = function (req,res) {
    return new Promise((resolve,reject) => {
        apiMstrMdl.insrtReqMdl(enty_id, enty_ky, actn_id, 1,req.user).then((res) => {
            resolve(res.insertId);
        })
    })
  
}
