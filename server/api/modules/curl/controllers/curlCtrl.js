const curlMdl = require(appRoot + '/server/api/modules/curl/models/curlMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var parseCurl = require(appRoot + '/utils/parsecurl');
var exec = require('child_process').exec;

/**************************************************************************************
* Controller     : Function to process curl commands
* Parameters     : req.body.data
* Description    : 
* Change History :
* 09/JUN/2020    - Sony Angel - Initial Function
***************************************************************************************/
exports.exeCurlCtrl = (req, res) => {
    var fnm = "exeCurlCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    var reqData = [];
    var r_ct = 0;
    var err_ct = 0;
    let body = req.body.data;
	console.log("body 23",body);
    body.commands = body.commands.trim().split('curl ');
    var reqsArray = jsonUtils.rejectArr(body.commands);
	console.log("reqsArray 26",reqsArray);
    delete body.commands;
    body.clJsn = [];

    let err = false;
    for (i = 0; i < reqsArray.length; i++) {
        reqsArray[i] = 'curl ' + reqsArray[i].trim();
		console.log("reqsArray of i 33",reqsArray[i]);
        let json = parseCurl(`${reqsArray[i]}`);
		console.log("json 35",json)
        json.curl = reqsArray[i];
        if (json.header) json.header = JSON.stringify(json.header); else json.header = ''
        if (json.body) json.body = JSON.stringify(json.body); else json.body = '';

        if (json.method == 'POST') json.mthd_id = 1;
        if (json.method == 'PUT') json.mthd_id = 2;
        if (json.method == 'GET') json.mthd_id = 3;
        if (json.method == 'DELETE') json.mthd_id = 4;

        if (!json.url || json.url == '') {
            err = true;
        }
        body.clJsn.push(json);
    }
    // console.log(body);
    if (err) {
		console.log("err 52",err);
        return df.formatErrorRes(req, res, { error: 'INVALID_COMMAND' }, cntxtDtls, fnm, {});
    }

    //Function to update response of API calls
    var saveRqstDtMdl = () => {
        curlMdl.saveRqstDtMdl(body, req.user)
            .then((results) => {
                body.api_rqst_id = results.insertId
                saveClDtMdl();
            }).catch((error) => {
				console.log("error 63 ",error);
                return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }
    //Function to update response of API calls
    var saveClDtMdl = () => {
        curlMdl.saveClDtMdl(body, body.clJsn[r_ct], req.user)
            .then((results) => {
                body.rest_cl_id = results.insertId;
                execEachRequest(body.clJsn[r_ct]);
            }).catch((error) => {
                console.log("error 74 ",error);
                return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }

    //Function to update response of API calls
    var updateResponse = (rest_cl_id, stdout, sqnce_nu, error, sts_id) => {
        curlMdl.updateClResponse(rest_cl_id, stdout, sqnce_nu, JSON.stringify(error), sts_id, req.user)
    }

    saveRqstDtMdl();

    //Recursive function to process each request
    function execEachRequest(reqe) {
        // console.log(reqe);
        var rest_cl_id = body.rest_cl_id;

        exec(reqe.curl, function (error, stdout, stderr) {

            console.log("startexeCurl");
            console.log(stdout, stderr, error);

            reqData.push({
                url: reqe.url,
                results: stdout,
                error: error
            })

            r_ct++;

            if (error) {
                err_ct++;
                updateResponse(rest_cl_id, stdout, r_ct, error, 2);
            } else {
                try {
                    if (JSON.parse(stdout) && JSON.parse(stdout).errorCode != 4116) {
                        console.log("First call success");
                        updateResponse(rest_cl_id, stdout, r_ct, null, 3);
                    }
                    else {
                        err_ct++;
                        updateResponse(rest_cl_id, null, r_ct, stdout, 2);
                    }
                } catch (e) {
                    err_ct++;
                    updateResponse(rest_cl_id, null, r_ct, stdout, 2);
                }

            }

            //Recursive function exit check
            if (r_ct < body.clJsn.length) {
                saveClDtMdl(body.clJsn[r_ct]);
            } else {
                return df.formatSucessRes(req, res, reqData, cntxtDtls, fnm, {});
            }

        })
    }
}