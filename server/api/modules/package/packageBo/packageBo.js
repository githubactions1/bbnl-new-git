var apiMstrCtrl = require(appRoot + '/server/api/modules/externalApis/controllers/apiMstrCtrl');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');
const PckgePlnMdl = require(appRoot + '/server/api/modules/package/models/PckgePlnMdl');
var jsonUtils = require(appRoot + '/utils/json.utils');
var _ = require('lodash');
/**************************************************************************************
* method         : creation of new package
* Parameters     : 
* Description    : Business logic for fingerPrint request
* Change History :
* 09/09/2019    -    - Initial Function
*
***************************************************************************************/
exports.addNewpckge = function (data) {
    let requestsJsonArray = [];
    let headerDtls = {
        "username": as.bssapi.mdle.un,
        "apikey": as.bssapi.mdle.apikey
    }
    for (let i = 0; i < data.length; i++) {
        requestsJsonArray.push({
            method: as.bssapi.mdle.package.create[0].method,
            url: as.bssapi.mdle.package.create[0].url,
            headerDtls: headerDtls,
            cre_srvce_id:as.bssapi.mdle.package.create[0].cre_srvce_id,
            input: _.cloneDeep(jsonUtils.prcs_tmplte_get_json(as.bssapi.mdle.package.create[0].input, data[i])),
            sqnce_nu: as.bssapi.mdle.package.create[0].sqnce_nu,
            api_rqst_cl_type_id: as.bssapi.mdle.package.create[0].api_rqst_cl_type_id,
            aplcn_id:as.bssapi.mdle.package.create[0].aplcn_id,
			outpt_kys : 1
        })
    }
    return requestsJsonArray;

}

/**************************************************************************************
* method         : Modify Service Pack
* Parameters     : 
* Description    : Business logic for fingerPrint request
* Change History :
* 09/09/2019    -    - Initial Function
*
***************************************************************************************/
exports.mdfySrvcpck = function (data) {
    console.log(data)
    let requestsJsonArray = [];
    let headerDtls = {
        "username": as.bssapi.mdle.un,
        "apikey": as.bssapi.mdle.apikey
    }
    for (let i = 0; i < data.length; i++) {
        requestsJsonArray.push({
            method: as.bssapi.mdle.package.modify[0].method,
            url: as.bssapi.mdle.package.modify[0].url,
            headerDtls: headerDtls,
            cre_srvce_id:as.bssapi.mdle.package.modify[0].cre_srvce_id,
            input: _.cloneDeep(jsonUtils.prcs_tmplte_get_json(as.bssapi.mdle.package.modify[0].input, data[i])),
            sqnce_nu: as.bssapi.mdle.package.modify[0].sqnce_nu,
            api_rqst_cl_type_id: as.bssapi.mdle.package.modify[0].api_rqst_cl_type_id,
            aplcn_id:as.bssapi.mdle.package.create[0].aplcn_id,
			outpt_kys : 1
            //   'inputarray':data[i]
        });
    }

    return requestsJsonArray;
}

/**************************************************************************************
* method         : Adding New Channels From BSS
* Parameters     : 
* Description    : Business logic for fingerPrint request
* Change History :
* 09/09/2019    -    - Initial Function
*
***************************************************************************************/
exports.addNwChnles = function () {
    let requestsJsonArray = [];
    let aplcn_id =  as.bssapi.mdle.aplcn_id;
    let headerDtls = {
        "username": as.bssapi.mdle.un,
        "apikey": as.bssapi.mdle.apikey
    }
        requestsJsonArray.push({
            method: as.bssapi.mdle.channels.getchnls[0].method,
            url: as.bssapi.mdle.channels.getchnls[0].url,
            input:'',
            headerDtls: headerDtls,
            aplcn_id:aplcn_id,
			cre_srvce_id:as.bssapi.mdle.channels.getchnls[0].cre_srvce_id,
            sqnce_nu: as.bssapi.mdle.channels.getchnls[0].sqnce_nu,
            api_rqst_cl_type_id: as.bssapi.mdle.channels.getchnls[0].api_rqst_cl_type_id,
            aplcn_id:as.bssapi.mdle.channels.getchnls[0].aplcn_id,
            mthd_id:as.bssapi.mdle.channels.getchnls[0].mthd_id,
			outpt_kys : 1
            //   'inputarray':data[i]
        });
    return requestsJsonArray;
}
