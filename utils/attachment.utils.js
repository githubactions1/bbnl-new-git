// Standard Inclusions
var log = require(appRoot + '/utils/logmessages');
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var dbutil = require(appRoot + '/utils/db.utils');
var AWS = require('aws-sdk');
var _ = require('lodash');
var awsS3 = path.join(appRoot, '/config/aws-s3.config.json');
var attachmentUtils = require(__filename);
/**************************************************************************************
* Controller     : addAttachments
* Parameters     : Array OF attachmentOptions : [{attch_altrntv_ky, attch_ctgry_id, attch_pth,usr_id,attch_lat,attch_lng,asrt_id,clnt_id,tnt_id}]
* Description    : To Add Attachments
* Change History :
* 24/APR/2018    -Raju Dasari - Initial Function
*
***************************************************************************************/
exports.addAttachmentsToTable = function (attachmentOptions, callback) {
    let values = '';
    attachmentOptions.forEach(attach => {
        values += (values == '') ? `(${attach.attch_altrntv_ky},${attach.attch_ctgry_id},'${attach.attch_pth}',${attach.usr_id},${attach.asrt_id},${attach.attch_lat},${attach.attch_lng},${attach.clnt_id},${attach.tnt_id},CURRENT_TIMESTAMP())` : `,(${attach.attch_altrntv_ky},${attach.attch_ctgry_id},'${attach.attch_pth}',${attach.usr_id},${attach.asrt_id},${attach.attch_lat},${attach.attch_lng},${attach.clnt_id},${attach.tnt_id},CURRENT_TIMESTAMP())`
    });
    let QRY_TO_EXEC = `INSERT INTO attchmnt_dtls_t(attch_altrntv_ky,attch_ctgry_id,attch_pth_tx,usr_id,asrt_id,attch_lat,attch_lng,clnt_id,tnt_id,i_ts) VALUES ${values}`
    //EXECUTE QUERY
    console.log(QRY_TO_EXEC);
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, AttachResults) {
        callback(err, AttachResults);
        return;
    });

}

exports.addAttachments = function (attchArr, callback) {
    var attachmentOptions = [];
    var count = 0;
    attchArr.forEach(attch => {
        AWS.config.loadFromPath(awsS3);
        var s3 = new AWS.S3();
        var imageData = attch.attch_pth;
        var data = imageData.replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');
        var name = 'wto_log_' + Date.now();
        var imgNm = name + ".jpg";

        var params = {
            Bucket: 'wetrackon/image_upload',
            Key: imgNm,
            ACL: 'public-read',
            Body: buf
        };
        s3.upload(params, function (err, data) {
            if (!err || err == null) {
                attachmentOptions.push({ "attch_altrntv_ky": attch.attch_altrntv_ky, "attch_ctgry_id": attch.attch_ctgry_id, "attch_pth": data.Location, "usr_id": attch.usr_id, "attch_lat": attch.attch_lat, "attch_lng": attch.attch_lng, "asrt_id": attch.asrt_id, "clnt_id": attch.clnt_id, "tnt_id": attch.tnt_id })
                count++;

                if (count == attchArr.length) {
                    attachmentUtils.addAttachmentsToTable(attachmentOptions, function (err, attChres) {
                        if (err) { console.log(err); callback(true, err); return; }
                        callback(false, attChres)
                        // df.formatSucessRes(res, logbookDtls.trp_rn_id, cntxtDtls, logbookDtls.trp_rn_id, { "success_status": 200, "success_msg": 'Assigned' + logbookDtls.trp_rn_id + ' Created Successfully And  Log Book Entry Added With Attachments' });
                    })
                }
            }
            else {
                console.log(err);
                callback(true, err)
            }
        });
    });
}


/**************************************************************************************
* Controller     : uploadImgToS3
* Parameters     : [base64 Data Array], s3path
* Description    : upload image to S3
* Change History :
* 24/APR/2018    -Raju Dasari - Initial Function
*
***************************************************************************************/
exports.uploadToS3 = function (imageDataArr, s3path, callback) {
    var count = 0;
    var resArr = [];
    console.log("**************************************");
    imageDataArr.forEach(imageData => {
        AWS.config.loadFromPath(awsS3);
        var s3 = new AWS.S3();
        var ext = imageData.split(';')[0].match(/xlsx|png|jpeg|jpg|gif|mp4|wmv|webm|ogg|pdf|xls|doc|docx|sheet/)[0];
        var data = ''
        if (ext == 'mp4') {
            data = imageData.replace(/^data:video\/\w+;base64,/, "");
        }
        else if (ext == 'pdf') {
            data = imageData.replace(/^data:application\/\w+;base64,/, "");
        }
        else {
            data = imageData.replace(/^data:image\/\w+;base64,/, "");
        }

        var buf = new Buffer(data, 'base64');
        var name = 'offr_img_' + Date.now();
        var imgNm = name + "." + ext;

        var params = {
            Bucket: s3path,
            Key: imgNm,
            ACL: 'public-read',
            Body: buf
        };
        s3.upload(params, function (err, data) {
            if (!err || err == null) {
                resArr[count] = data;
                //callback(false, data);
            } else {
                resArr[count] = "null";
            }
            count++;
            if (count >= imageDataArr.length) {
                callback(false, resArr);
            }
        })
    });

}
/**************************************************************************************
* Controller     : deleteFromS3
* Parameters     : [object key], s3path
* Description    : delete object from S3
* Change History :
* 29/OCT/2018    -Vijaya Lakshmi - Initial Function
*
***************************************************************************************/
exports.deleteFromS3 = function (objectKeyArr, s3path, callback) {
    var count = 0;
    var resArr = [];
    objectKeyArr.forEach(objectKey => {
        AWS.config.loadFromPath(awsS3);
        var s3 = new AWS.S3();
        var params = {
            Bucket: s3path,
            Key: objectKey
        };
        s3.deleteObject(params, function (err, data) {
            if (!err || err == null) {
                resArr[count] = data;
            }
            else {
                resArr[count] = "null";
            }
            count++;
            if (count >= objectKeyArr.length) {
                callback(false, resArr);
            }
        })
    });
}



exports.fleUpld = (fileData, BucketPath, callback) => {
    var count = 0;
    var resArr = [];
    fileData.filter((k) => {

        AWS.config.loadFromPath(awsS3);
        var s3 = new AWS.S3();
        var data = k.fileContent.replace(/^data:.*;base64,/, "");
        var buf = new Buffer(data, 'base64');
        var name = "scard_" + Date.now();
        var imgNm = name + "." + k.extnsn;

        var params = {
            Bucket: BucketPath,
            Key: imgNm,
            ACL: 'public-read',
            Body: buf
        };
        s3.upload(params, function (err, data) {
            if (!err || err == null) {
                resArr[count] = data;
                //callback(false, data);
            } else {
                resArr[count] = "null";
            }
            count++;
            if (count >= fileData.length) {
                callback(false, resArr);
            }
        })
    });
}

exports.sveFileLocalSystm = function (fileData, callback) {
    var count = 0;
    var ext = fileData.split(';')[0].match(/xlsx|png|jpeg|jpg|gif|mp4|wmv|webm|ogg|pdf|xls|doc|docx|sheet/)[0];
  
    if (ext == 'mp4') {
        data = ImgUrl.replace(/^data:video\/\w+;base64,/, "");
    }
    else if (ext == 'pdf') {
        data = ImgUrl.replace(/^data:application\/\w+;base64,/, "");
    }
    else {
        data = ImgUrl.replace(/^data:image\/\w+;base64,/, "");
    }
    var name = 'apsfl_' + Date.now();
    var imgNm = name + "." + ext;
   
    if (imgNm != undefined || imgNm != null) {
        callback(false, imgNm);
    }
}   