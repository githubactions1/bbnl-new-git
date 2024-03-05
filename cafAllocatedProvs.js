// Standard Inclusions
appRoot = __dirname
as = require(appRoot + '/utils/settings.utils').getSettings();
var std = require(appRoot + '/utils/standardMessages');
//var df = require(nappRoot + '/utils/dflower.utils');
var sqldb = require(appRoot + '/config/db.config');
//var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var auditRequest = require(appRoot + '/utils/audit.requests');
var dbutil = require(appRoot + '/utils/db.utils');
var cafBO = require(appRoot + '/server/api/modules/caf/cafBO/cafBo')
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');
var oltmdl = require(appRoot + '/server/api/modules/olt/models/oltMdl');
var request = require('request');
//var unirest = require("unirest");

/*****************************************************************************
* Function      : getRqstDtls
* Description   : get external API request details
* Arguments     : callback function
* Change History :
* 02/04/2020    -  Sunil Mulagada  - Initial Function
*
******************************************************************************/
var getRqstDtls = function () {
    var QRY_TO_EXEC = `SELECT c.caf_id,CONCAT(REPLACE(SUBSTR(cs.cstmr_nm,1,10)," ",""),c.caf_id) as 'name',
    c.olt_ip_addr_tx as 'ipAddress',c.olt_crd_nu as 'card',c.olt_prt_nm as 'tp',c.olt_onu_id as 'onuId',
    REPLACE(c.onu_srl_nu,SUBSTR(c.onu_srl_nu,1,4),"44534E57") as 'serialNumber',
    p.mdle_cd as 'profileName',c.aghra_cd as 'aghra_cd_nw',c.aaa_cd as 'aaa_cd_nw',
    LOWER(CONCAT(SUBSTR(REPLACE(c.onu_mac_addr_tx,":",""),1,4),".",SUBSTR(REPLACE(c.onu_mac_addr_tx,":",""),5,4),".",SUBSTR(REPLACE(c.onu_mac_addr_tx,":",""),9,4))) as 'accessId'
     from caf_dtl_t c
    JOIN cstmr_dtl_t cs on c.cstmr_id = cs.cstmr_id
    JOIN inv_stpbx_lst_t s on c.onu_srl_nu = s.srl_nu
    JOIN inv_prdct_mdle_lst_t p on s.mdle_id = p.mdle_id
    WHERE c.enty_sts_id = 11 limit 5;`

    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, {}, {})
        .then(function (results) {

            let doProvision = function (index) {
                let data = results[index];
                reqObj = {}
                reqObj["url"] = "http://172.17.4.181:4302/operations/validate/all/" + data.caf_id
                reqObj["method"] = "GET"
                request(reqObj, function (err, res, body) {
                    try {

                        let cafData = JSON.parse(body).data;
                        let doApiCalls = function (data) {
                            let apiCalls = cafBO.allocatedCafs(data);
                           // console.log(JSON.stringify(apiCalls))
                            //console.log("CAF----------------------- " + data.caf_id)
                            extApiCtrl.callApi("ponchange", 1, 1000001, data.caf_id, apiCalls, user = {
                                user_id: 0,
                                mrcht_usr_id: 0,
                                usr_ctgry_ky: 0
                            }).then(() => {
                                console.log("COMPLETED "+data.caf_id)
                                oltmdl.updateCafStsMdl({ enty_sts_id: 6 }, data, user = {
                                    user_id: 0,
                                    mrcht_usr_id: 0,
                                    usr_ctgry_ky: 0
                                }).then(() => {
                                    if (index == results.length - 1) {
                                        console.log("ALL DONE")
                                    } else {
                                        doProvision(index + 1)
                                    }
                                    //doProvision(index + 1 )
                                }).catch((err) => { console.log(err) })
                                //  oltmdl.updtPonChngDtlMdl(ponChngRes.insertId, 3, req.user);
                            }).catch((error) => {
                                // df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            });
                        }

                        if (cafData.agora_data.hasOwnProperty('aghra_cd') && cafData.agora_data.aghra_cd == data.aghra_cd_nw.replace('-HSI', '')) {
                           // console.log("PROVISION DONE BUT FEW CALLS FAILED FOR " + data.caf_id)
                            doApiCalls(data)
                        } else if (cafData.agora_data.hasOwnProperty('aghra_cd') && cafData.agora_data.aghra_cd != data.aghra_cd_nw.replace('-HSI', '')) {
                           // console.log("DO TERMINATION FOR " + data.caf_id)
                            if (index == results.length - 1) {
                                console.log("ALL DONE")
                            } else {
                                doProvision(index + 1)
                            }
                        } else if (!cafData.agora_data.hasOwnProperty('aghra_cd')) {
                          //  console.log("TERMINATION DONE FOR " + data.caf_id)
                            doApiCalls(data)
                        } else if (cafData.agora_data.hasOwnProperty('aghra_cd')) {
                           // console.log("DO PROVISION FOR " + data.caf_id)
                            doApiCalls(data)
                        }

                    } catch (error) {
                        // console.log(err)
                        // console.log(res)
                        // console.log(body)
                        // console.log(error)
                        if (index == results.length - 1) {
                            console.log("ALL DONE")
                        } else {
                            doProvision(index + 1)
                        }
                    }
                });
            }
            doProvision(0)
        }).catch(function (error) {
            console.log(error)
            // df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

getRqstDtls();

/*****************************************************************************
* Function      : getRqstDtls
* Description   : get external API request details
* Arguments     : callback function
* Change History :
* 02/04/2020    -  Sunil Mulagada  - Initial Function
*
******************************************************************************/
// var exAPICall = function(apiJson) {
//     console.log("In exAPICall")
//     var req = unirest(apiJson.mthd_nm, apiJson.url_tx); 
//     req.query(apiJson.url_dta_tx);



//     req.end(function (res) {
//             if (res.error) {
//                 console.log(" When res.error")
//                 console.log(res)
//             } else {
//                 console.log(" when not res.error")
//                 console.log(res);
//             }

//     });

// }