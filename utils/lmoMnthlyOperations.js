const EventMdl = require(appRoot + '/server/api/modules/general/events/models/EventsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/**************************************************************************************
* Controller     : addOperation
* Parameters     : req,res()
* Description    : To add Operation 
* Change History :
* 30/04/2020     -  SRAVANI MACHINA - Initial Function
*
***************************************************************************************/

exports.lmooperation = function (lmo_id,mso_id,operation_nm) {
    EventMdl.lmoMnthlyOprton(lmo_id,mso_id,operation_nm)
        .then(function (results) {
            // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            // df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}