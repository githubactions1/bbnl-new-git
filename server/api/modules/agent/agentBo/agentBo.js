var apiMstrCtrl = require(appRoot + '/server/api/modules/externalApis/controllers/apiMstrCtrl');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');
// const PckgePlnMdl = require(appRoot + 0'/server/api/modules/Agent/models/PckgePlnMdl');
var jsonUtils = require(appRoot + '/utils/json.utils');
var _ = require('lodash');
/**************************************************************************************
* method         : creation of new Agent
* Parameters     : 
* Description    : 
* Change History :
* 09/09/2019    -    - Initial Function
*
***************************************************************************************/
exports.addNewAgent = function (data) {
    let requestsJsonArray = [];
    let headerDtls = {
        "username": as.bssapi.mdle.un,
        "apikey": as.bssapi.mdle.apikey
    }
        requestsJsonArray.push({
            method: as.bssapi.mdle.Agent.create[0].method,
            url: as.bssapi.mdle.Agent.create[0].url,
            headerDtls: headerDtls,
            input: _.cloneDeep(jsonUtils.prcs_tmplte_get_json(as.bssapi.mdle.Agent.create[0].input, data)),
            sqnce_nu: as.bssapi.mdle.Agent.create[0].sqnce_nu,
            api_rqst_cl_type_id: as.bssapi.mdle.Agent.create[0].api_rqst_cl_type_id,
            aplcn_id:as.bssapi.mdle.Agent.create[0].aplcn_id,
			outpt_kys:1
        })
    
    return requestsJsonArray;

}


