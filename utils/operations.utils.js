const EventMdl = require(appRoot + '/server/api/modules/general/events/models/EventsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : addOperation
* Parameters     : req,res()
* Description    : To add Operation 
* Change History :
* 12/03/2020     -  BORIGARLA KOTESWARARAO - Initial Function
*
***************************************************************************************/

exports.record = function (operation_nm) {
    EventMdl.recordMdl(operation_nm)
        .then(function (results) {
            // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            // df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
