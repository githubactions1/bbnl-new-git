const EventMdl = require(appRoot + '/server/api/modules/general/events/models/EventsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : record
* Parameters     : req,res()
* Description    : Inserts the event data 
* Change History :
* 18/02/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/

exports.record = function (enty_cd, enty_ky, evnt_sts_cd, evnt_tx, user) {

    EventMdl.insrtEventMdl(enty_cd, enty_ky, evnt_sts_cd, evnt_tx, user)
        .then(function (results) {
            void (0);
        }).catch(function (error) {
            log.err(error)
        });
}

/**************************************************************************************
* Controller     : get
* Parameters     : req,res()
* Description    : search details of all cities
* Change History :
* 18/02/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.get = function (enty_id, enty_ky, l1 = 0, l2 = 100) {

    EventMdl.getEventsMdl(enty_id, enty_ky, l1, l2)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : post
* Parameters     : req,res()
* Description    : Caf Operation Issues
* Change History :
* 
*
***************************************************************************************/
exports.insertReqData = function (oprtn_typ_tx, oprtn_url_tx, bdy_jsn_tx, user) {
    EventMdl.insrtCafIssues(oprtn_typ_tx, oprtn_url_tx, bdy_jsn_tx, user)
        .then(function (results) {
            void (0);
        }).catch(function (error) {
            log.err(error)
        });
}
