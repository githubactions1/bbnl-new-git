var request = require('request');
var jsSHA = require('jssha');
var exec = require('child_process').exec;

/*****************************************************************************
* Function      : sendSMS
* Description   : sends an SMS to Indian Phone Number
* Arguments     : callback function
* History   
* 04/11/2016    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.sendSMS = function (phoneNo, smsMsg, callback) {
    console.log("smsMsg sendSMS");
    console.log(smsMsg, phoneNo);

    var postData = {
        "outboundSMSMessageRequest": {
            "address": ["tel:" + phoneNo],
            "senderAddress": "tel:DRMSTP",
            "outboundSMSTextMessage": { "message": smsMsg },
            "clientCorrelator": "",
            "messageType": "0",
            "receiptRequest": { "notifyURL": "", "callbackData": "" },
            "senderName": "", "category": ""
        }
    }
    var options = {
        method: 'post',
        body: postData, // Javascript object
        json: true, // Use,If you are sending JSON data
        url: 'http://api-openhouse.imimobile.com/smsmessaging/1/outbound/tel%3A%2BDRMSTP/requests',
        headers: {
            "Key": "4360645b-e9c4-49f7-b746-e045bacbb29b",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    var results = ''
    request(options, function (err, res, body) {
        if (err) { console.log('Error :', err); callback(err, results) ; return; }
        var resUID='';
        if (res.body.outboundSMSMessageRequest)
            resUID = (typeof res.body.outboundSMSMessageRequest.resourceURL !== 'undefined') ? res.body.outboundSMSMessageRequest.resourceURL.substring(res.body.outboundSMSMessageRequest.resourceURL.indexOf("uuid") + 6) : null;

        if (phoneNo && resUID) {
            results = { "usr_mbl": phoneNo, "uuid": (resUID) ? resUID : null, message: smsMsg, i_ts: new Date() };
        }
        callback(err, results) ;
    })
}

/**************************************************************************************
* Controller     : generateOTP
* Parameters     : req,res()
* Description    : To connet call
* Change History :
* 07/09/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.generateOTP = function () {
    var totpObj = new TOTP();
    var otp = totpObj.getOTP('onetimepassword');
    return otp;
}

function TOTP() {

    var dec2hex = function (s) {
        return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
    };

    var hex2dec = function (s) {
        return parseInt(s, 16);
    };

    var leftpad = function (s, l, p) {
        if (l + 1 >= s.length) {
            s = Array(l + 1 - s.length).join(p) + s;
        }
        return s;
    };

    var base32tohex = function (base32) {
        var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        var bits = "";
        var hex = "";
        for (var i = 0; i < base32.length; i++) {
            var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
            bits += leftpad(val.toString(2), 5, '0');
        }
        for (var i = 0; i + 4 <= bits.length; i += 4) {
            var chunk = bits.substr(i, 4);
            hex = hex + parseInt(chunk, 2).toString(16);
        }
        return hex;
    };

    this.getOTP = function (secret) {
        try {
            var epoch = Math.round(new Date().getTime() / 1000.0);
            var time = leftpad(dec2hex(Math.floor(epoch / 30)), 16, "0");
            var hmacObj = new jsSHA("SHA-1", "HEX");
            hmacObj.setHMACKey(base32tohex(secret), "HEX");
            hmacObj.update(time);
            var hmac = hmacObj.getHMAC("HEX");
            // var hmac = hmacObj.getHMAC(base32tohex(secret), "HEX", "SHA-1", "HEX");
            var offset = hex2dec(hmac.substring(hmac.length - 1));
            var otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec("7fffffff")) + "";
            otp = (otp).substr(otp.length - 6, 4);
            // console.log(otp)
        } catch (error) {
            throw error;
        }
        return otp;
    };

}

/*****************************************************************************
* Function      : sendApsflSMS
* Description   : send SMS through SMS gateway
* Arguments     : callback function
* History   
* 09/06/2020    ** Srujana Mulagada  ** Initial Code
******************************************************************************/
exports.sendApsflSMS = function (phoneNo, smsMsg, callback) {
    var url = `curl  -XGET -k https://smsgw.sms.gov.in/failsafe/HttpLink?username=fibernet.sms&pin=V@7e%233Ty&message=${smsMsg}&mnumber=${phoneNo}&signature=GOVTAP`;
    exec(url, function (error, stdout, stderr) {
        if (error) {
            console.log(error);
    }
    callback(error, stdout) ;
    })
}

/*****************************************************************************
* Function      : sendNotifySMS
* Description   : sends an SMS to Indian Phone Number
* Arguments     : callback function
* History   
* 10/06/2020    ** Srujana Mulagada  ** Initial Code
******************************************************************************/
exports.sendNotifySMS = function (phoneNo, smsMsg, ntfcn_cgry_id, callback, tmplt_id) {
    console.log("smsMsg sendSMS");
    console.log(smsMsg, phoneNo);

    var postData = {
        "alrt_aplcn_id":"1",
        "sms_msg_tx":smsMsg,
        "phne_nu":phoneNo,
        "enty_id":1,
        "enty_ky":10,
        "ntfcn_cgry_id":ntfcn_cgry_id,
        "tmplt_id":tmplt_id
    }
    var options = {
        method: 'post',
        body: postData, // Javascript object
        json: true, // Use,If you are sending JSON data
        url: 'http://bss.apsfl.co.in/apiv1/alerts/notifications/sms/send/simple'
    }
    var results = '';
    request(options, function (err, res, body) {
        if (err) { console.log('Error :', err); callback(err, results) ; return; }
        var resUID='';
        if (res.body.outboundSMSMessageRequest)
            resUID = (typeof res.body.outboundSMSMessageRequest.resourceURL !== 'undefined') ? res.body.outboundSMSMessageRequest.resourceURL.substring(res.body.outboundSMSMessageRequest.resourceURL.indexOf("uuid") + 6) : null;

        if (phoneNo) {
            results = { "usr_mbl": phoneNo, "uuid": (resUID) ? resUID : 0, message: smsMsg, i_ts: new Date() };
        }
        callback(err, results) ;
    })
}