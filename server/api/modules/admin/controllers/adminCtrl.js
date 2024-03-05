// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var AWS = require('aws-sdk');
var awsS3 = 'config/aws-s3.config.json';
var secConfig = require(appRoot + '/config/sec.config');

// Model Inclusions
var usrmngtmdl = require(appRoot + '/server/api/modules/general/um/models/userMgtMdl');
var adminMdl = require('../models/adminMdl');
var adminVdl = require(appRoot + '/server/api/modules/admin/validators/adminVdl');


/**************************************************************************************
* Controller     : states_get
* Parameters     : req,res()
* Description    : To get all Organisational levels
* Change History :
* 25/05/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.states_get = function (req, res) {

    var fnm = "states_getMdl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    adminMdl.states_getMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : cities_get
* Parameters     : req,res()
* Description    : To get all Organisational levels
* Change History :
* 25/05/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.cities_get = function (req, res) {

    var fnm = "cities_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    adminMdl.cities_getMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : allOrgLvls_get
* Parameters     : req,res()
* Description    : To get all Organisational levels
* Change History :
* 25/05/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.allOrgLvls_get = function (req, res) {

    var fnm = "allOrgLvls_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    adminMdl.allOrgLvls_getMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : allClntOrgLvls_get
* Parameters     : req,res()
* Description    : To get all Organisational levels based on client id
* Change History :
* 25/05/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.allClntOrgLvls_get = function (req, res) {

    var fnm = "allClntOrgLvls_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    adminMdl.allClntOrgLvls_getMdl(req.user, req.params)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : tntOrgLvlsByClnt_get
* Parameters     : req,res()
* Description    : To get all Organisational levels based in client and tenant id
* Change History :
* 25/05/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.tntOrgLvlsByClnt_get = function (req, res) {

    var fnm = "tntOrgLvlsByClnt_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    adminMdl.tntOrgLvlsByClnt_getMdl(req.user, req.params)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : saveUserAlertId
* Parameters     : req,res()
* Description    : 
* Change History :
* 27/02/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.saveUserAlertId = function (req, res) {
    var fnm = "saveUserAlertId";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here 
    adminMdl.svUsrAlrtId(req.user, req.params, req.user.usr_id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : getClientProfile
* Parameters     : req,res()
* Description    : 
* Change History :
* 27/02/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.getClientProfile = function (req, res) {
    var fnm = "getClientProfile";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here 
    adminMdl.getClntPrflMdl(req.user, req.user.clnt_id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updtClientProfile
* Parameters     : req,res()
* Description    : 
* Change History :
* 27/02/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.updtClientProfile = function (req, res) {
    var fnm = "updtClientProfile";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    var payload = req.body;

    var imgDtls = function () {

        for (var ky in payload) {
            if (payload[ky])
                payload[ky] = "'" + payload[ky] + "'";
            else payload[ky] = null;
        }
        // console.log(payload)
        // Model gets called Here 
        adminMdl.updtClntPrflMdl(req.user, payload, req.user.clnt_id)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }
    if (payload.lgo_url_tx && payload.lgo_url_tx.startsWith('data:image')) {
        AWS.config.loadFromPath(awsS3);
        var s3 = new AWS.S3();
        var Dtls = payload;
        var imageData = payload.lgo_url_tx;

        var data = imageData.replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');
        var name = 'wto_clnt_' + req.user.clnt_id;

        var imgNm = name + ".png";
        var params = {
            Bucket: 'wetrackon/image_upload',
            Key: imgNm,
            ACL: 'public-read',
            Body: buf
        };
        s3.upload(params, function (err, data) {
            if (!err) {
                payload.lgo_url_tx = data.Location;
                // console.log(data.Location)
                imgDtls()
            };
        });

    }
    else {
        imgDtls();
    }
}

/**************************************************************************************
* Controller     : getClientReport
* Parameters     : req,res()
* Description    : 
* Change History :
* 27/02/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.getClientReport = function (req, res) {
    var fnm = "getClientReport";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here 
    adminMdl.getClntRprtMdl(req.user, req.user.clnt_id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updtClientReport
* Parameters     : req,res()
* Description    : 
* Change History :
* 27/02/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.updtClientReport = function (req, res) {
    var fnm = "updtClientReport";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    var payload = req.body;
    for (var ky in payload) {
        if (payload[ky])
            payload[ky] = "'" + payload[ky] + "'";
        else payload[ky] = null;
    }
    // Model gets called Here 
    adminMdl.updtClntRprtMdl(req.user, payload, req.user.clnt_id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : allClients_get
* Parameters     : req,res()
* Description    : 
* Change History :
* 20/05/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.allClients_get = function (req, res) {
    var fnm = "allClients_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here 
    adminMdl.get_allClntsMdl(req.user, req.params)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : allTntsByClnt_get
* Parameters     : req,res()
* Description    : 
* Change History :
* 20/05/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.allTntsByClnt_get = function (req, res) {
    var fnm = "allTntsByClnt_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    // var clnt_id = req.user.clnt_id;
    adminMdl.get_allTntsByClnt(req.user, req.params.clientid)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : userDirectory_get
* Parameters     : None
* Description    : 
* Change History :
* 25/05/2016    - Sony Angel - Initial Function
***************************************************************************************/

exports.userDirectory_get = (req, res) => {
    var clnt_id = req.user.clnt_id;
    var tnt_id = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "userDirectory_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    adminMdl.getDirectoryUsers(req.user, clnt_id, tnt_id)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : allUsersList_get
* Parameters     : None
* Description    : 
* Change History :
* 25/05/2016    -  -
*
***************************************************************************************/
exports.userList_post = function (req, res) {
    var clnt_id = req.user.clnt_id;
    var tnt_id = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var data = req.body;
    var fnm = "allUsersList_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here 
    adminMdl.postUserDesigDprtIds(req.user, data)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}





/**************************************************************************************
* Controller     : totUsrsCnt_get
* Parameters     : None
* Description    : 
* Change History :
* 25/05/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.totUsrsCnt_get = function (req, res) {
    var clnt_id = req.user.clnt_id;
    var tnt_id = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "allUsersList_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here 
    adminMdl.getTotUsrsCnt(req.user, clnt_id, tnt_id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : tntAdminsLst_get
* Parameters     : req, res()
* Description    : To get all users by their client id
* Change History :
* 24/05/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.tntAdminsLst_get = function (req, res) {

    var fnm = "tntAdminsLst_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here 
    adminMdl.tntAdminsLst_getMdl(req.user, req.params)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : usersClntLst_get
* Parameters     : req, res()
* Description    : To get all users by their client id
* Change History :
* 24/05/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.usersClntLst_get = function (req, res) {

    var fnm = "usersClntLst_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here 
    adminMdl.usersByClnt_getMdl(req.user, req.params)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : usersTntLst_get
* Parameters     : req, res()
* Description    : To get all users by their client id and tenant id
* Change History :
* 24/05/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.usersTntLst_get = function (req, res) {

    var fnm = "usersTntLst_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    adminMdl.usersByTnt_getMdl(req.user, req.params)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : createClient_post
* Parameters     : req, res()
* Description    :Create a new client
* Change History :
* 17/01/2018    - V.S.Phanindra - Initial Function
*
***************************************************************************************/
exports.createClient_post = function (req, res) {

    var fnm = "createClient_post";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var payload = req.body;

    if (!payload.length) {
        payload.pwd = secConfig.pwdComplexity.auto_generated_pwd();
        if (!payload['tnt_nm']) payload['tnt_nm'] = payload['clnt_nm'];
        for (var ky in payload) {
            if (payload[ky])
                payload[ky] = "'" + payload[ky] + "'";
            else payload[ky] = null;
        }
        adminMdl.createClient(req.user, payload, function (error, clntResults) {
            if (error) {
                console.log('clnt error');
                return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            }
            if (clntResults && clntResults.insertId) {
                payload.clnt_id = clntResults.insertId;
                adminMdl.createTenant(req.user, payload)
                    .then(function (tntResults) {
                        if (payload.usr_nm) {
                            usrmngtmdl.createUsers(req.user, payload.clnt_id, [{ tnt_id: tntResults.insertId }], payload, function (error, results) {
                                if (error) {
                                    return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                }
                                return df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                            });
                        } else {
                            return df.formatSucessRes(req, res, results, tntResults, fnm, {});
                        }
                    }).catch(function (error) {
                        return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
        })
    } else {
        var count = 0;
        payload.forEach(obj => {
            obj.pwd = secConfig.pwdComplexity.auto_generated_pwd();
            if (!obj['tnt_nm']) obj['tnt_nm'] = obj['clnt_nm'];
            for (var ky in obj) {
                if (obj[ky])
                    obj[ky] = "'" + obj[ky] + "'";
                else obj[ky] = null;
            }
            adminMdl.createClient(req.user, obj, function (error, clntResults) {
                if (error) {
                    count++;
                    if (count == payload.length) {
                        return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    }
                }
                if (clntResults && clntResults.insertId) {
                    obj.clnt_id = clntResults.insertId;
                    adminMdl.createTenant(req.user, obj)
                        .then(function (tntResults) {
                            if (obj.usr_nm) {
                                usrmngtmdl.createUsers(req.user, obj.clnt_id, [{ tnt_id: tntResults.insertId }], obj, function (error, results) {
                                    count++;
                                    if (error) {
                                        if (count == payload.length) {
                                            return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                        }
                                    }
                                    if (count == payload.length) {
                                        return df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                    }
                                });
                            } else {
                                count++;
                                if (count == payload.length) {
                                    return df.formatSucessRes(req, res, results, tntResults, fnm, {});
                                }
                            }
                        }).catch(function (error) {
                            count++;
                            if (count == payload.length) {
                                return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            }
                        });
                }
            })
        })
    }
}

/**************************************************************************************
* Controller     : clientDtl_get
* Parameters     : req,res()
* Description    : Get particular client details
* Change History :
* 17/01/2018    - V.S.Phanindra - Initial Function
*
***************************************************************************************/
exports.clientDtl_get = function (req, res) {
    var fnm = "Clientdtl_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    //console.log(req.params);
    // Model gets called Here 
    adminMdl.getClientDtl(req.user, req.params)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updateClient_post
* Parameters     : req, res()
* Description    : Update existing client details
* Change History :
* 17/01/2018    - V.S.Phanindra - Initial Function
*
***************************************************************************************/
exports.updateClient_post = function (req, res) {

    var fnm = "updateClient_post";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    // console.log(req.body);
    adminMdl.updateClient(req.user, req.body)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : deleteClient_post
* Parameters     : req, res()
* Description    : To delete the existing client.
* Change History :
* 17/01/2018    - V.S.Phanindra - Initial Function
*
***************************************************************************************/
exports.deleteClient_post = function (req, res) {
    console.log("=========================req.body");

    console.log(req.body);
    var fnm = "updateClient_post";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    adminMdl.devareClient(req.user, req.body)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : createTenant_post
* Parameters     : req, res()
* Description    : To create a new tenant.
* Change History :
* 17/01/2018    - V.S.Phanindra - Initial Function
*
***************************************************************************************/
exports.createTenant_post = function (req, res) {

    var fnm = "createTenant_post";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    for (var ky in obj) {
        if (obj[ky])
            obj[ky] = "'" + obj[ky] + "'";
        else obj[ky] = null;
    }
    // Model gets called Here 
    adminMdl.createTenant(req.user, req.body)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : tenantDtls_get
* Parameters     : req,res()
* Description    : Get the particular tenant details
* Change History :
* 17/01/2018    - V.S.Phanindra - Initial Function
*
***************************************************************************************/
exports.tenantDtls_get = function (req, res) {
    var fnm = "tenantDtls_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here 
    adminMdl.getTenantDtls(req.user, req.params)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updateTenant_post
* Parameters     : req, res()
* Description    :Update existing tenant
* Change History :
* 17/01/2018    - V.S.Phanindra - Initial Function
*
***************************************************************************************/
exports.updateTenant_post = function (req, res) {

    var fnm = "updateTenant_post";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    adminMdl.updateTenant(req.user, req.body)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : deleteTenant_post
* Parameters     : req, res()
* Description    : Delete existing tenant
* Change History :
* 17/01/2018    - V.S.Phanindra - Initial Function
*
***************************************************************************************/
exports.deleteTenant_post = function (req, res) {

    var fnm = "deleteTenant_post";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    adminMdl.deleteTenant(req.user, req.body)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : allClntTnts_get
* Parameters     : req, res()
* Description    : Delete existing tenant
* Change History :
* 17/01/2018    - V.S.Phanindra - Initial Function
*
***************************************************************************************/
exports.allClntTnts_get = function (req, res) {

    var fnm = "deleteTenant_post";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    adminMdl.getAllClntTnts(req.user, req.body)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : lgdUsrDtls_get
* Parameters     : req, res()
* Description    : To get The logged in users Details
* Change History :
* 07/02/2018     - Koteswararao B - Initial Function
*
***************************************************************************************/
exports.lgdUsrDtls_get = function (req, res) {

    var fnm = "lgdUsrDtls_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    adminMdl.getlgdUsrDtls(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getLocations
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.getLocations = function (req, res) {
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "getLocations";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.getLocations(req.user, clntId, tntId)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}


/**************************************************************************************
* Controller     : updtLocation
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.updtLocation = function (req, res) {
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "updtLocation";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.updtLocation(req.user, req.params, req.body, clntId, tntId)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}

/**************************************************************************************
* Controller     : addLocation
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.addLocation = function (req, res) {
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "addLocation";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.addLocation(req.user, req.body, clntId, tntId)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}

/**************************************************************************************
* Controller     : deleteLocation
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.deleteLocation = function (req, res) {
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "deleteLocation";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.devareLocation(req.user, req.params, clntId, tntId)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}

/**************************************************************************************
* Controller     : getEmployees
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.getEmployees = function (req, res) {
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "getEmployees";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.getEmployees(req.user, clntId, tntId)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}


/**************************************************************************************
* Controller     : updtEmployee
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.updtEmployee = function (req, res) {
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "updtEmployee";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            var payload = req.body;
            if (!payload.lst_nm) {
                payload.lst_nm = '';
            }
            payload.emply_nm = payload.frst_nm + ' ' + payload.lst_nm;
            for (var ky in payload) {
                if (payload[ky])
                    payload[ky] = "'" + payload[ky] + "'";
                else payload[ky] = null;
            }
            adminMdl.updtEmployee(req.user, req.params, req.body, clntId, tntId)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}

/**************************************************************************************
* Controller     : addEmployee
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.addEmployee = function (req, res) {
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "addEmployee";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            var payload = req.body;
            if (!payload.lst_nm) {
                payload.lst_nm = '';
            }
            payload.emply_nm = payload.frst_nm + ' ' + payload.lst_nm;

            for (var ky in payload) {
                if (payload[ky])
                    payload[ky] = "'" + payload[ky] + "'";
                else payload[ky] = null;
            }
            adminMdl.addEmployee(req.user, payload, clntId, tntId)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}

/**************************************************************************************
* Controller     : deleteEmployee
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.deleteEmployee = function (req, res) {
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "deleteEmployee";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.devareEmployee(req.user, req.params, clntId, tntId)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}

/**************************************************************************************
* Controller     : getDesignationsByClnt
* Parameters     : None
* Description    : 
* Change History :
* 25/01/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.getDesignationsByClnt = function (req, res) {

    var fnm = "designation_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    adminMdl.getDesignationsByClnt_Mdl(req.user, req.params)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : designation_get
* Parameters     : None
* Description    : 
* Change History :
* 05/03/2017    - Vijaya Lakshmi - Initial Function
*
***************************************************************************************/
exports.designation_get = (req, res) => {
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "designation_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.getDsgns(req.user, clntId, tntId)
                .then((results) => {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}

/**************************************************************************************
* Controller     : organization_get
* Parameters     : None
* Description    : 
* Change History :
* 17/01/2018    - Srujana - Initial Function
*
***************************************************************************************/
exports.organization_get = function (req, res) {
    var fnm = "organization_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.getOrgns(req.user, req.params, req.user.clnt_id, jsonUtils.processData(req.user.tnts, 'tnt_id'))
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}

/**************************************************************************************
* Controller     : departments_get
* Parameters     : None
* Description    : 
* Change History :
* 17/01/2018    - Srujana - Initial Function
*
***************************************************************************************/
exports.departments_get = function (req, res) {
    var fnm = "departments_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.getDprt(req.user, req.params, req.user.clnt_id, jsonUtils.processData(req.user.tnts, 'tnt_id'))
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}

/**************************************************************************************
* Controller     : usrsHirchy_get
* Parameters     : None
* Description    : 
* Change History :
* 05/06/2017    - Vijaya Lakshmi - Initial Function
*
***************************************************************************************/
exports.usrsHirchy_get = function (req, res) {

    var fnm = "usrsHirchy_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.usrsHirchy_getMdl(req.user, req.params)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}

/**************************************************************************************
* Controller     : updHirchy_post
* Parameters     : req,res()
* Description    : to update heirarchy level of the org user
* Change History :
* 25/05/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.updHirchy_post = function (req, res) {

    var fnm = "updHirchy_post";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.updHirchy_postMdl(req.user, req.body)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}

/**************************************************************************************
* Controller     : Designation_Update
* Parameters     : None
* Description    : 
* Change History :
* 05/08/2017    - Vijaya Lakshmi - Initial Function
*
***************************************************************************************/
exports.dsgn_update = function (req, res) {
    var fnm = "dsgn_update";
    var dtls = req.body;
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');

    // Model gets called Here 
    adminMdl.updateDsgn(req.user, dtls, req.params, clntId, tntId)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : Departments_Update
* Parameters     : None
* Description    : 
* Change History :
* 05/08/2017    - Vijaya Lakshmi - Initial Function
*
***************************************************************************************/
exports.dprt_update = function (req, res) {
    var fnm = "dprt_update";
    var dtls = req.body;
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');

    // Model gets called Here 
    adminMdl.updateDprt(req.user, dtls, req.params, clntId, tntId)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : Organization_Update
* Parameters     : None
* Description    : 
* Change History :
* 05/08/2017    - Vijaya Lakshmi - Initial Function
*
***************************************************************************************/
exports.orgn_update = function (req, res) {
    var fnm = "orgn_update";
    var dtls = req.body;

    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    // Model gets called Here 
    adminMdl.updateOrgn(req.user, dtls, req.params, clntId, tntId)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : Designation_Add
* Parameters     : None
* Description    : 
* Change History :
* 17/01/2018    - Srujana - Initial Function
*
***************************************************************************************/
exports.dsgn_add = function (req, res) {
    var fnm = "dsgn_add";
    var usrDsgnDtls = req.body;
    // Model gets called Here 
    adminMdl.addDsgn(req.user, usrDsgnDtls, req.user.clnt_id, jsonUtils.processData(req.user.tnts, 'tnt_id'))
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : Department_Add
* Parameters     : None
* Description    : 
* Change History :
* 17/01/2018    - Srujana - Initial Function
*
***************************************************************************************/
exports.dprt_add = function (req, res) {
    var fnm = "dprt_add";
    var usrDprtDtls = req.body;
    // Model gets called Here 
    adminMdl.addDprt(req.user, usrDprtDtls, req.user.clnt_id, jsonUtils.processData(req.user.tnts, 'tnt_id'))
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : Orgnization_Add
* Parameters     : None
* Description    : 
* Change History :
* 17/01/2018    - Srujana - Initial Function
*
***************************************************************************************/
exports.orgn_add = function (req, res) {
    var fnm = "orgn_add";
    var usrOrgnDtls = req.body;

    // Model gets called Here 
    adminMdl.addOrgn(req.user, usrOrgnDtls, req.user.clnt_id, jsonUtils.processData(req.user.tnts, 'tnt_id'))
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/***************************************************************************************************************
* Controller     : deleteDesgn_post
* Parameters     : req, res ()
* Description    : To delete a existent desinations and delete indicator will be changed to 1 in our DB
*
****************************************************************************************************************/
exports.dsgn_delete = function (req, res) {
    var fnm = "deleteUser_post";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    // Model gets called Here 
    adminMdl.deleteDesgns(req.user, req.params, clntId, tntId)
        .then(function (results) {
            log.info("INFO", cntxtDtls, 100, "local datbase insert success");
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            log.info("ERROR", cntxtDtls, 100, "local datbase insert failure");
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/***************************************************************************************************************
* Controller     : deleteDprt_post
* Parameters     : req, res ()
* Description    : To delete a existent desinations and delete indicator will be changed to 1 in our DB
*
****************************************************************************************************************/
exports.dprt_delete = function (req, res) {
    var fnm = "dprt_delete";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    // Model gets called Here 
    adminMdl.deleteDprts(req.user, req.params, clntId, tntId)
        .then(function (results) {
            log.info("INFO", cntxtDtls, 100, "local datbase insert success");
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            log.info("ERROR", cntxtDtls, 100, "local datbase insert failure");
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/***************************************************************************************************************
* Controller     : deleteDprt_post
* Parameters     : req, res ()
* Description    : To delete a existent desinations and delete indicator will be changed to 1 in our DB
*
****************************************************************************************************************/
exports.orgn_delete = function (req, res) {
    var fnm = "orgn_delete";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    // Model gets called Here 
    adminMdl.deleteOrgn(req.user, req.params, clntId, tntId)
        .then(function (results) {
            log.info("INFO", cntxtDtls, 100, "local datbase insert success");
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            log.info("ERROR", cntxtDtls, 100, "local datbase insert failure");
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getAdtTableLst_C
* Parameters     : req,res()
* Description    : Get audit table list
* Change History :
* 18/10/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.getAdtTableLst_C = function (req, res) {
    var fnm = "getAdtTableLst_C";
    log.info("INFO", cntxtDtls, 100, `In ${fnm}`);
    // console.log(audit_table_lst);
    adminMdl.getAdtTableLst_M(req.user)
        .then(function (results) {
            audit_table_lst = results;
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        })
        .catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getAdtDtls_C
* Parameters     : req,res()
* Description    : get Audit details based on date
* Change History :
* 25/10/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.getAdtDtls_C = function (req, res) {

    var fnm = "getAdtDtls_C";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.params)
    // Model gets called Here 
    adminMdl.getAdtDtls_M(req.user, req.params)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : get_holidays
* Parameters     : None
* Description    : Get Holidays List
* Change History :
* 08/11/2018    - Ramya Machana - Initial Function
*
***************************************************************************************/
exports.getHolidays = function (req, res) {
    var fnm = "getHolidays";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    adminMdl.getHolidays_M(req.user, req.params)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : addHoliday
* Parameters     : None
* Description    : Add New Holiday
* Change History :
* 08/11/2018    - Ramya Machana - Initial Function
*
***************************************************************************************/
exports.addHoliday = function (req, res) {
    var fnm = "addHoliday";
    var hldyDtls = req.body;
    var data = []
    for (var i = 0; i < hldyDtls.length; i++) {
        data.push(hldyDtls[i]);
        var title = data[i].title;
        var date = data[i].date;
    }

    // Model gets called Here 
    adminMdl.addHoliday_M(req.user, title, date, req.user.clnt_id, jsonUtils.processData(req.user.tnts, 'tnt_id'))
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : deleteHoliday
* Parameters     : None
* Description    : Delete existing Holiday
* Change History :
* 08/11/2018    - Ramya Machana - Initial Function
*
***************************************************************************************/
exports.deleteHoliday = function (req, res) {
    var fnm = "deleteHoliday";
    var hldy_id = req.params;
    var del_id = hldy_id.id;
    // Model gets called Here 
    adminMdl.deleteHoliday_M(req.user, del_id, req.user.clnt_id, jsonUtils.processData(req.user.tnts, 'tnt_id'))
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getUserGroups
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.getUserGroups = function (req, res) {
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "getUserGroups";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.getUserGroups(req.user, clntId, tntId)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}


/**************************************************************************************
* Controller     : updtUserGroup
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.updtUserGroup = function (req, res) {
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "updtUserGroup";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.updtUserGroup(req.user, req.params, req.body, clntId, tntId)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}

/**************************************************************************************
* Controller     : addUserGroup
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.addUserGroup = function (req, res) {
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "addUserGroup";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.addUserGroup(req.user, req.body, clntId, tntId)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}

/**************************************************************************************
* Controller     : deleteUserGroup
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.deleteUserGroup = function (req, res) {
    var clntId = req.user.clnt_id;
    var tntId = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "deleteUserGroup";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.devareUserGroup(req.user, req.params, clntId, tntId)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}
/**************************************************************************************
* Controller     : getUserRoles
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.getUserRoles = function (req, res) {

    var fnm = "getUserRoles";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.getUserRoles(req.user)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}


/**************************************************************************************
* Controller     : updtUserRole
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.updtUserRole = function (req, res) {
    var fnm = "updtUserRole";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.updtUserRole(req.user, req.params, req.body)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}

/**************************************************************************************
* Controller     : addUserRole
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.addUserRole = function (req, res) {
    var fnm = "addUserRole";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.addUserRole(req.user, req.body)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}

/**************************************************************************************
* Controller     : deleteUserRole
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.deleteUserRole = function (req, res) {
    var fnm = "deleteUserRole";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.devareUserRole(req.user, req.params)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}
/**************************************************************************************
* Controller     : getPermissions
* Parameters     : None
* Description    : 
* Change History :
* 24/04/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.getPermissions = function (req, res) {
    var fnm = "getPermissions";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            adminMdl.getPermissions(req.user, req.params)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}
/**************************************************************************************
* Controller     : appUpdtDtl
* Parameters     : None
* Description    : 
* Change History :
* 
*
***************************************************************************************/
exports.appUpdtDtl = function (req, res) {
log.info("ctrl")
var fnm = "appUpdtDtl";
adminMdl.appUpdtDtlMdl(req.params.app_id, req.params.vrsn_nu)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {
                error_status : "400",
                err_message : "Sorry, unable to find current app version details."
            });
        });
}
/**************************************************************************************
* Controller     : lclstrgdta
* Parameters     : None
* Description    : 
* Change History :
* 
*
***************************************************************************************/
exports.lclstrgdta = function (req, res) {
    log.info("ctl")
    var fnm = "lclstrgdta";
    adminMdl.lclstrgdtaMDL(function (err, results) {
                if (err) {
                    df.formatErrorRes(req,res, err, cntxtDtls, fnm, {});
                } else {
                    df.formatSucessRes(req,res, results, cntxtDtls, fnm, {});
                }
            })
    }
    // exports.Gettrntotl = function (req, res) {
//     var fnm = '';
//     commonMdl.GettrntotlMDL(function (err, results) {
//         if (err) {
//             df.formatSucessRes(res, err, cntxtDtls, fnm, {});
//         } else {
//             df.formatSucessRes(res, results, cntxtDtls, fnm, {});
//         }
//     })

// }