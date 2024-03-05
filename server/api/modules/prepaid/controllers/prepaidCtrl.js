
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
// Model Inclusions
var prpdMdl = require('../models/prepaidMdl');
var dbutil = require(appRoot + '/utils/db.utils');
var request = require('request');
var http = require("https");
const cPayEncDec = require("cpay-enc-dec");
var QRCode = require('qrcode');
var qr_opts = {
  errorCorrectionLevel: 'M',
  type: 'image/jpeg',
  quality: 1,
  margin: 1,
  color: {
    dark: "#000000",
    light: "#0000"
  }
}

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
  prpdMdl.get_onuCtrlMdl(req.params.caf_id, req.user)
    .then((results) => {
      console.log(results)
      if (results[0].olt_vndr_id == 3) {
        const agro_sts = {
          url: 'http://172.16.0.44:8080/agorang/rest/v1/eml/onu/' + results[0].aghra_cd + '-HSI/status',
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
            df.formatSucessRes(req, res, { "oltdata": results[0], "status": {}, "sensor": { 'temperature': 'N/A', 'alarms': 'N/A', 'rxPower1550nm': 'N/A', 'rxPower1490nm': 'N/A', 'txPower1310nm': 'N/A', 'distance': 'N/A' } }, cntxtDtls, fnm, {});
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
                  df.formatSucessRes(req, res, { "oltdata": results[0], "status": status_data, "sensor": { 'temperature': 'N/A', 'alarms': 'N/A', 'rxPower1550nm': 'N/A', 'rxPower1490nm': 'N/A', 'txPower1310nm': 'N/A', 'distance': 'N/A' } }, cntxtDtls, fnm, {});
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
      }
      else if (results[0].olt_vndr_id == 1) {
        const dasan_sts = {
          url: 'http://ina.apsfl.co.in:8090/nbi/managedelementmgr/' + results[0].olt_ip_addr_tx + '/ctp/' + results[0].olt_crd_nu + '/' + results[0].olt_prt_nm + '/' + results[0].olt_onu_id + '',
          headers: {
            "Authorization": "Basic Og==",
            "password": "1234",
            "username": "rest"
          }
        };
        request(dasan_sts, function callback(error, response2, ontBodyRes) {
          var ontBody = JSON.parse(ontBodyRes.replace('\\', ''));
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
      }

    }).catch((error) => {
      df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "220", err_message: "No ONT Details." });
      return;
    });
}


/**************************************************************************************
* Controller     : payment_initializeCntrl
* Parameters     : None
* Description    : 
* Change History :
* 14/05/2020    - Sunil Mulagada - Initial Function
***************************************************************************************/
exports.payment_initializeCntrl = (req, res) => {
  var fnm = "payment_initializeCntrl";
  log.info(`In ${fnm}`, 0, cntxtDtls);
  dbutil.getNxtKey('prpd_caf_invce_id').then((prpd_caf_invce_id) => {
    console.log("prpd_caf_invce_id generated .... ", prpd_caf_invce_id);
    console.log(req.body)
    prpdMdl.insert_PrpdInvc_LstMdl(req.body, prpd_caf_invce_id, req.user)
      .then(function (results) {
        console.log('insert_PrpdInvc_LstMdl results \n', results);
        prpdMdl.insert_PrpdInvc_DtlMdl(req.body, prpd_caf_invce_id, req.user, (err, results) => {

          if (err) {
            console.log("sr3", err)
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
          } else {
            prpdMdl.getTrnsRefNo(req.user)
              .then(function (trnscRefresults) {
                let pymntdtl = {
                  pymnt_at: req.body.ttl_amnt,
                  pymnt_mde_id: req.body.pymnt_mde_id,
                  pymnt_mthd_id: req.body.pymnt_mthd_id,
                  caf_id: req.body.caf_id,
                  lmo_agnt_id: req.body.lmo_agnt_id,
                  caf_invce_id: prpd_caf_invce_id,
                  cstmr_id: req.body.cstmr_id,
                  pymnt_prvdr_id: req.body.pymnt_prvdr_id,
                  pymnt_mthd_id: req.body.pymnt_mthd_id,
                  pymntSrc: req.body.pymntSrc
                }
                console.log(pymntdtl)
                prpdMdl.insrt_prpd_pymntDtlMdl(pymntdtl, req.user)
                  .then(function (pymntResults) {
                    let qrJson = {
                      pymnt_id: pymntResults.insertId,
                      mrcht_trnsn_ref_nu: trnscRefresults.insertId,
                      mrcht_clbk_url: 'http://bss.glits.info/apiv1/payment/confirm',
                      amount: req.body.ttl_amnt,
                      pymnt_req_src: req.body.pymntSrc,
                      pymnt_prvdr_id: req.body.pymnt_prvdr_id,
                      mrcht_bnk_acnt_ref_nm: "APSFL_ENTRPRSE",
                      crte_usr_id: req.user.usr_ctgry_ky,
                      clnt_id: 4
                    }
                    post_QrReq(qrJson, function (err, qrresults) {
                      console.log(qrresults)
                      if (!err) {
                        prpdMdl.UpdteCPTransNum(qrresults, pymntResults.insertId, req.user)
                          .then(function (results) {
                            df.formatSucessRes(req, res, qrresults, cntxtDtls, fnm, {});
                          }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                          });
                      }
                      else {
                        df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                      }

                    })

                  }).catch(function (error) {
                    console.log("sr1", error)
                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                  });
              }).catch(function (error) {
                console.log("sr2", error)
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
              });
          }
        })

      }).catch(function (error) {
        console.log("sr4", error)
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
      });
  })
}

var post_QrReq = (data, callback) => {
  console.log("post_QrReq _________________________________");
  console.log(data)
  cPayEncDec.cPayGetEncryptionDataFromKeyFile(data, appRoot + '/cpay_ssl/cpay/cpay_prepaid_pblc.key', (encrpt_err, enctpt_res) => {
    if (encrpt_err) {
      console.log(enctpt_res['msg']);
      callback(true, []);
    }
    else {
      const options = {
        url: 'https://collectandpay.com/apiv1/payments/icici/qr/initiate',
        body: enctpt_res,
        headers: {
          'content-type': 'text/plain',
          'hashKey': '7d8b8ae32622e7bab6b3bae0bf044b9de33665bb'
        },
        rejectUnauthorized: false
      };
      request.post(options, function (error, response, body) {
        if (error) {
          console.log(error);
          callback(true, [])
        }
        else {
          cPayEncDec.cPayGetDecryptionDataFromKeyFile(body, appRoot + '/cpay_ssl/apsfl/apsfl_prepaid_pvt.key', (dcrpt_err, dcrpt_res) => {
            if (dcrpt_err) {
              console.log(dcrpt_res['msg']);
              callback(dcrpt_err, []);
            }
            else {
              console.log(dcrpt_res)
              console.log(typeof dcrpt_res)
              if (typeof dcrpt_res == "object") {
                if (dcrpt_res['status'] == 200 && dcrpt_res['cpay_status'] == "success") {
                  QRCode.toDataURL(dcrpt_res['data']['upi_link'], qr_opts, function (err, url) {
                    if (err) {
                      console.log(err);
                      callback(true, []);
                    }
                    else {
                      dcrpt_res['data']['qr_code'] = url;
                      callback(false, dcrpt_res)
                    }
                  });
                }
                else {
                  callback(true, []);
                }
              }
              else {
                callback(true, []);
              }
            }
          });
        }
      });
    }
  })
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
exports.get_lmos = (req, res) => {

}
