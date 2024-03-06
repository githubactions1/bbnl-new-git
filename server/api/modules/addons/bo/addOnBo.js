/**************************************************************************************
* method         : Provision
* Parameters     : 
* Description    : Business logic for Provision request
* Change History :
* 09/09/2019    -    - Initial Function
*
***************************************************************************************/
exports.hsiAddOnCalls = function (data, crSrvcs) {
    
    let requestsJsonArray = [];
    let srvcs = []


    requestsJsonArray.push(
        
        {
            "method": 1,
            "aplcn_id": 20,
            //"url": "http://172.16.4.104:8080/radiusISU?code=Change-Filter-Request&Client="+data.aaa_cd+"&cisco-avpair=subscriber:sd="+data.sd+",subscriber:sa="+data.sa+"",
            "url": "http://202.53.92.35/apiv2/ext/wrapper/CiscoRadiusIsu",
            "headerDtls": "",
            "cre_srvce_id": 1,
            "input": {
				"aaa_cd": data.aaa_cd,
				"sd": data.sd,
				"sa": data.sa
			},
            "sqnce_nu":2,
            "api_rqst_cl_type_id": 1,
            "actn_id":2
        }
        ,{
            "method": 1,
            "aplcn_id": 1,
            //"url": "http://172.16.4.107/prov4serv/prov_if?oper=update&client=" + data.aaa_cd + "&avp=Filter-Id<>nonblock<>check&avp=accessId<>" + data.accessId + "<>reply&avp=Profile<>pV4<>reply&avp=cisco-avpair<>subscriber:sa=" + data.fup + "<>reply&avp=cisco-avpair<>subscriber:accounting-list=default<>reply",
            "url": "http://202.53.92.35/apiv1/caf_operations/ext/wrapper/updateAaaProfile",
            "headerDtls": "",
            "cre_srvce_id": 1,
            "input": {
				"aaa_cd":data.aaa_cd,
				"access_id":data.accessId,
				"profile_tx":data.fup
			},
            "sqnce_nu": 1,
            "api_rqst_cl_type_id": 1,
            "actn_id":3
        },
		{
            "method": 1,
            "aplcn_id": 1,
            //"url": "http://172.16.4.107/prov4serv/prov_if?oper=view&client=" + data.aaa_cd ,
            "url": "http://202.53.92.35/apiv2/ext/wrapper/getAaaProfile" ,
            "headerDtls": "",
            "cre_srvce_id": 1,
            "input": {
				"lagId" : data.aaa_cd
			},
            "sqnce_nu": 3,
            "api_rqst_cl_type_id": 1,
            "actn_id":1
        })
       
 
    return requestsJsonArray;
}

