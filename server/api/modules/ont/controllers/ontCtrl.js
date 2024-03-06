
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
// Model Inclusions
var ontmdl = require('../models/ontMdl');
var dbutil = require(appRoot + '/utils/db.utils');
var request = require('request');

/**************************************************************************************
* Controller     : get_onuCtrl
* Parameters     : None
* Description    : 
* Change History :
* 14/05/2020    - Sunil Mulagada - Initial Function
***************************************************************************************/
exports.get_onuCtrl = (req, res) => {
  var fnm = "get_onuCtrl";
  log.info(`In ${fnm}`, 0, cntxtDtls);
  ontmdl.get_onuCtrlMdl(req.params.caf_id, req.user)
    .then((results) => {
      console.log(results)
      if (results[0].olt_vndr_id == 3 ) {
        const agro_sts = {
          url: 'http://172.16.0.44:8080/agorang/rest/v1/eml/onu/' + results[0].aghra_cd + '/status',
          headers: {
            'Authorization': 'Basic YnNzOkJzc0AxMjM=',
            'Content-type': 'application/json'
          }
        };
        const agro_scncr = {
          url: 'http://172.16.0.44:8080/agorang/rest/v1/eml/tpgpon/' + results[0].aghra_cd_sncr + '/status',
          headers: {
            'Authorization': 'Basic YnNzOkJzc0AxMjM=',
            'Content-type': 'application/json'
          }
        };

        lst_dwn_reason = ["None", "Dying gasp", "Reboot", "Administratively Down", "SW Update", "MIB re-sync", "Disable SN", "General LOS", "Board Down", "PON Admin Down"];
        lst_sts = ["In service", "Blocked", "Reserved", "Maintenance"]
        lst_oprtn_ste = ["Operational", "Nonoperational", "Degraded", "Unknown", "Operational recognized", "Nonoperationalrecognized", "Degraded recognized", "Unknown recognized"]
        onuStatus = [" ", " ", "Operational", " ", " ", "Absent"]
        request(agro_sts, function callback(error, response, body) {
          let aghoraErrCodes = as.bssapi.agora.errCodes;
          if (error || response.body.statusCode == 422 || aghoraErrCodes.includes(JSON.parse(body)['errorCode']) || JSON.parse(body)['message']) {
            log.err("Unable to get data from Agira|url:" + agro_sts.url)
            df.formatSucessRes(req, res, { "oltdata": results[0], "status": {}, "sensor": { 'temperature': 'N/A', 'alarms': [], 'rxPower1550nm': 'N/A', 'rxPower1490nm': 'N/A', 'txPower1310nm': 'N/A', 'distance': 'N/A' } }, cntxtDtls, fnm, {});
            return;
          } else if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            const status_data = {
              'id': info.id,
              'ip': info.aid.ipAddress,
              'onuId': info.aid.onuId,
              'card': info.aid.card,
              'tps': info.aid.tps,
              'operationalState': (info.operationalState === undefined) ? 'Blocked' : lst_oprtn_ste[info.operationalState - 1],
              'onuStatus': onuStatus[info.onuStatus - 1],
              'alarms': info.alarms,
              'lastDownCause': lst_dwn_reason[info.lastDownCause - 1],
              "lastUpTime": (info.lastUpTime === undefined) ? 'Not Available' : timeConverter(info.lastUpTime),
              "lastDownTime": timeConverter(info.lastDownTime),
              "onlineDuration": (info.onuStatus == 6) ? 'N/A - Device Absent' : secondsToHms(info.onlineDuration),
              "lastDyingGaspTime": timeConverter(info.lastDyingGaspTime)

            }
            if (info.onuStatus == 6) {
              df.formatSucessRes(req, res, { "oltdata": results[0], "status": status_data, "sensor": { 'temperature': 'N/A - Device Absent', 'alarms': 'N/A - Device Absent', 'rxPower1550nm': 'N/A - Device Absent', 'rxPower1490nm': 'N/A - Device Absent', 'txPower1310nm': 'N/A - Device Absent', 'distance': 'N/A - Device Absent' } }, cntxtDtls, fnm, {});
            } else
              request(agro_scncr, function callback(error, response2, body2) {
                console.log(response2.body)
                Object.keys(JSON.parse(body2)).forEach(function (k) {
                  console.log(k + ' - ' + JSON.parse(body2)['errorCode']);
                });
                if (error || response2.body.statusCode == 422 || JSON.parse(body2)['errorCode'] == 10 || JSON.parse(body2)['errorCode'] == 3456) {
                  log.err("Unable to get data from Agira|url:" + agro_scncr.url)
                  df.formatSucessRes(req, res, { "oltdata": results[0], "status": status_data, "sensor": { 'temperature': 'N/A', 'alarms': [], 'rxPower1550nm': 'N/A', 'rxPower1490nm': 'N/A', 'txPower1310nm': 'N/A', 'distance': 'N/A' } }, cntxtDtls, fnm, {});
                  return;
                }
                else if (!error && response2.statusCode == 200) {
                  const info = JSON.parse(body2);
                  const sensor_data = {
                    'temperature': info.temperature,
                    'alarms': info.alarms,
                    'rxPower1550nm': (info.rxPower1550nm == "---") ? info.rxPower1550nm : info.rxPower1550nm / 100,
                    'rxPower1490nm': (info.rxPower1490nm == "---") ? info.rxPower1490nm : info.rxPower1490nm / 100,
                    'txPower1310nm': (info.txPower1310nm == "---") ? info.txPower1310nm : info.txPower1310nm / 100,
                    'distance': info.distance
                  }
                  df.formatSucessRes(req, res, { "oltdata": results[0], "status": status_data, "sensor": sensor_data }, cntxtDtls, fnm, {});
                  return;
                }
              });
          }
        });
      } else if (results[0].olt_vndr_id == 1) {
		  var olt_ip_addr = results[0].olt_ip_addr_tx.trim();
		  var olt_crd_nu=1;
		  if(results[0].olt_crd_nu){
			  olt_crd_nu=1
		  }
        const dasan_sts = {
          //url: 'http://172.16.14.11:8090/nbi/managedelementmgr/' + olt_ip_addr + '/ctp/' + olt_crd_nu + '/' + results[0].olt_prt_nm + '/' + results[0].olt_onu_id + '',
          //url: 'http://172.16.14.11:8090/nbi/managedelementmgr/172.16.195.191/ctp/1/4/112',
		  url: 'http://202.53.92.35/apiv2/ext/wrapper/onurefresh',
          headers: {
            "Authorization": "Basic Og==",
            "password": "1234",
            "username": "rest"
          },
          method :"post",
          json : true,
          body : {
            ip : olt_ip_addr,
            card : results[0].olt_crd_nu,
            port_no : results[0].olt_prt_nm,
            onu_id : results[0].olt_onu_id
          }
        };
		console.log("results", results);
		console.log("dasan_sts", dasan_sts);
        request(dasan_sts, function callback(error, response2, ontBodyRes) {
          
          console.log("dasan error", error);
          //console.log("dasan response2", response2); 
          console.log("dasan ontBodyRes", ontBodyRes);
		  let chckbody = JSON.stringify(ontBodyRes)
		  if(chckbody && (chckbody.includes('EXCPT_INTERNAL_ERROR') || chckbody.includes('EXCPT_INVALID_INPUT') || chckbody.includes('EXCPT_ENTITY_NOT_FOUND')
                                             || chckbody.includes("DBA Profile")
                                             || chckbody.includes("SNMP request is time-out")
                                             || chckbody.includes("SNMP Command")
                                             || chckbody.includes("EXCPT_OBJECT_IN_USE")
                                             || chckbody.includes("Session capacity is exceeded. Max Session count")
											 )
											 ){
			 log.err("Unable to get data from Dasan|url:" + dasan_sts.url)
				df.formatSucessRes(req, res, { "oltdata": results[0], "status": {}, "sensor": { 'temperature': 'N/A', 'alarms': [], 'rxPower1550nm': 'N/A', 'rxPower1490nm': 'N/A', 'txPower1310nm': 'N/A', 'distance': 'N/A' } }, cntxtDtls, fnm, {});
				return; 
		  }else {
			  var ontBody = JSON.parse(ontBodyRes.data.replace('\\', ''));
			  //var ontBody = JSON.parse(ontBodyRes);
			  //var ontBody = ontBodyRes;
			  if (error || (ontBody.status && ontBody.status == 'EXCPT_INVALID_INPUT') || (ontBody.status && ontBody.status == 'EXCPT_INTERNAL_ERROR') || (ontBody.ctpList && ontBody.ctpList.length == 0)) {
				log.err("Unable to get data from Dasan|url:" + dasan_sts.url)
				df.formatSucessRes(req, res, { "oltdata": results[0], "status": {}, "sensor": { 'temperature': 'N/A', 'alarms': [], 'rxPower1550nm': 'N/A', 'rxPower1490nm': 'N/A', 'txPower1310nm': 'N/A', 'distance': 'N/A' } }, cntxtDtls, fnm, {});
				return;
			  } else {
				  console.log("ontBody",ontBody)
				let info = ontBody.ctpList[0];
				console.log("info", info)
				const status_data = {
				  'id': info.neIPAddress + '-' + info.slotIndex + '-' + info.portIndex + '-' + info.onuId,
				  'ip': info.neIPAddress,
				  'onuId': info.onuId,
				  'card': info.slotIndex,
				  'tps': info.portIndex,
				  'operationalState': (info.status == 'active') ? 'Operational' : 'Nonoperational',
				  //'operationalState': info.status,
				  'onuStatus': info.status,
				  'alarms': [],
				  'lastDownCause': info.deactiveReason,
				  "lastUpTime": info.sysUpTime,
				  "lastDownTime": 'NA',
				  "onlineDuration": info.linkupTime,
				  "lastDyingGaspTime": 'NA'
				}

				const sensor_data = {
				  'temperature': info.opticTemper,
				  'alarms': [],
				  'rxPower1550nm': info.oltUpstreamPower,
				  'rxPower1490nm': info.upstreamPower,
				  'txPower1310nm': info.downstreamPower,
				  'distance': info.distance
				}
				df.formatSucessRes(req, res, { "oltdata": results[0], "status": status_data, "sensor": sensor_data }, cntxtDtls, fnm, {});
				return;
			  }
		  }

        })
      }
      /*else if (results[0].olt_vndr_id == 1) {
        const dasan_sts = {
          url: 'http://ina.apsfl.co.in:8090/nbi/managedelementmgr/' + results[0].olt_ip_addr_tx + '/ctp/' + results[0].olt_crd_nu + '/' + results[0].olt_prt_nm + '/' + results[0].olt_onu_id + '',
          headers: {
            "Authorization": "Basic Og==",
            "password": "1234",
            "username": "rest"
          }
        };
        request(dasan_sts, function callback(error, response2, ontBodyRes) {
          var ontBody = JSON.parse(ontBodyRes.replace('\\',''));
          if (error || (ontBody.status && ontBody.status == 'EXCPT_INVALID_INPUT') || (ontBody.ctpList && ontBody.ctpList.length == 0)) {
            log.err("Unable to get data from Dasan|url:" + dasan_sts.url)
            df.formatSucessRes(req, res, { "oltdata": results[0], "status": {}, "sensor": { 'temperature': 'N/A', 'alarms': 'N/A', 'rxPower1550nm': 'N/A', 'rxPower1490nm': 'N/A', 'txPower1310nm': 'N/A', 'distance': 'N/A' } }, cntxtDtls, fnm, {});
            return;
          } else {
            let info = ontBody.ctpList[0];

            const status_data = {
              'id': info.neIPAddress + '-' + info.slotIndex + '-' + info.portIndex + '-' + info.onuId,
              'ip': info.neIPAddress,
              'onuId': info.onuId,
              'card': info.slotIndex,
              'tps': info.portIndex,
              'operationalState': (info.status == 'active') ? 'Operational' : 'Nonoperational',
              'onuStatus': info.blockStatus,
              'alarms': 'NA',
              'lastDownCause': info.deactiveReason,
              "lastUpTime": 'NA',
              "lastDownTime": 'NA',
              "onlineDuration": info.linkupTime,
              "lastDyingGaspTime": 'NA'
            }

            const sensor_data = {
              'temperature': 'NA',
              'alarms': 'NA',
              'rxPower1550nm': 'NA',
              'rxPower1490nm': 'NA',
              'txPower1310nm': 'NA',
              'distance': info.distance
            }
            df.formatSucessRes(req, res, { "oltdata": results[0], "status": status_data, "sensor": sensor_data }, cntxtDtls, fnm, {});
            return;
          }

        })
      }*/

    }).catch((error) => {
      df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "220", err_message: "No ONT Details." });
      return;
    });
}
function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}
function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}
