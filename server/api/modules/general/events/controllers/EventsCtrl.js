const EventsMdl = require(appRoot + '/server/api/modules/general/events/models/EventsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var operationsUtils = require(appRoot + '/utils/operations.utils');
/**************************************************************************************
* Controller     : get_StatusCtrl
* Parameters     : req,res()
* Description    : get details of all cities
* Change History :
* 17/02/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.get_EventsCtrl = function (req, res) {
    //console.log(req.body)
    enty_id = req.body.data.enty_id
    enty_ky = req.body.data.enty_ky
    l1 = (req.body.data.l1 === undefined) ? 0 : req.body.data.l1;
    l2 = (req.body.data.l2 === undefined) ? 100 : req.body.data.l2;
    EventsMdl.getEventsMdl(enty_id, enty_ky, req.user, l1, l2)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
