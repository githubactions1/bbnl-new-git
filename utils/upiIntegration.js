var request = require("request");
const { base64encode, base64decode } = require('nodejs-base64');
var crypto = require('crypto');


// exports.checkPhonepeActivity = function (reqData) {
// console.log(reqData.data);
// var id = reqData.data

// // var objJsonStr = base64encode(`{
// // 	"merchantId": "M2306160483220675579140",
// // 	"transactionId": ${id},
// // 	"merchantOrderId": "M123456789",
// // 	"amount": 100,
// // 	"instrumentType": "MOBILE",
// // 	"instrumentReference": "8074012241",
// // 	"message": "collect for XXX order",
// // 	"email": "machina.ramyachowdary@gmail.com",
// // 	"expiresIn": 180,
// // 	"shortName": "DemoCustomer",
// // 	"subMerchant": "DemoMerchant",
// // 	"storeId": "store1",
// // 	"terminalId": "terminal1"
// // }`)


// var objJsonStr = `{
// 	"merchantId": "M2306160483220675579140",
// 	"transactionId": "${id}",
// 	"merchantOrderId": "M123456789",
// 	"amount": 100,
// 	"instrumentType": "MOBILE",
// 	"instrumentReference": "8074012241",
// 	"message": "collect for XXX order",
// 	"email": "machina.ramyachowdary@gmail.com",
// 	"expiresIn": 180,
// 	"shortName": "DemoCustomer",
// 	"subMerchant": "DemoMerchant",
// 	"storeId": "store1",
// 	"terminalId": "terminal1"
// }`

//   let objJsonB64 = base64encode(objJsonStr)

//   // console.log('objJsonStr ---------------------------------');
//   // console.log(objJsonStr);
//   // let objJsonB64 = Buffer.from(objJsonStr).toString("base64");


//   console.log('base64encode ---------------------------------');
//   console.log(objJsonB64);

//   let saltKey = '8289e078-be0b-484d-ae60-052f117f8deb';

//   var sha256Ky = crypto.createHash('sha256').update(`${objJsonB64}/v3/debit${saltKey}`).digest('hex');
//   // console.log('sha256Ky ---------------------------------');
//   // console.log(sha256Ky);
//   var SHA256ky = sha256Ky.toUpperCase()

//   console.log('SHA256ky ---------------------------------');
//   console.log(SHA256ky);


//   // var Xverify = SHA256ky+'###1'

//   // console.log('Xverify ---------------------------------');
//   // console.log(Xverify);

//   var options = {
//     method: 'post',
//     json: true,
//     url: 'https://mercury-uat.phonepe.com/v3/debit',
//     headers: {
//       // 'x-callback-url':'https://www.demoMerchant.com/callback',
//       'x-verify': SHA256ky+'###1',
//       'content-type': 'application/json'
//     },
//     body: {request: objJsonB64},

//   }
//   console.log('options ---------------------------------');
//   console.log(options);


//   return new Promise((resolve, reject) => {
//     request(options, function (err, res, body) {
//       if (res) {
//         resolve(res);
//         // var decodeRes = base64decode(`${res}`)
//         // console.log('decodeRes--------------------------------------------------------');
//         // console.log(decodeRes);

//       }
//       else{
//         console.log('Error :', err);
//         console.log('err--------------------------------------------------------');
//         reject(err);
//       }
//     })
//   })
// }




exports.checkPhonepeActivity = function (reqData) {
  console.log(reqData.data);
  var transactionId = reqData.data.transactionId
  var merchantUserId = reqData.data.merchantUserId
  var merchantOrderId = reqData.data.merchantOrderId


  var objJsonStr = `{
    "merchantId": "M2306160483220675579140",
    "transactionId": "${transactionId}",
    "amount": 1,
    "merchantUserId": "${merchantUserId}",
    "merchantOrderId": "${merchantOrderId}",
    "message": "Payment for order placed ${merchantOrderId}",
    "mobileNumber": "9010583587",
    "email": "ramya@gmail.com",
    "shortName": "Ramya",
    "paymentScope": "ALL_UPI_APPS"
  }`

  let objJsonB64 = base64encode(objJsonStr)

  console.log('objJsonStr ****** ---------------------------------');
  console.log(objJsonStr);
  // let objJsonB64 = Buffer.from(objJsonStr).toString("base64");


  console.log('base64encode ---------------------------------');
  console.log(objJsonB64);

  let saltKey = '8289e078-be0b-484d-ae60-052f117f8deb';
  let apiEndPoint = "/v4/debit";
  var sha256Ky = crypto.createHash('sha256').update(`${objJsonB64}${apiEndPoint}${saltKey}`).digest('hex');
  // console.log('sha256Ky ---------------------------------');
  // console.log(sha256Ky);
  var SHA256ky = sha256Ky.toUpperCase()

  console.log('SHA256ky ---------------------------------');
  console.log(SHA256ky);


  var Xverify = SHA256ky + '###1'

  console.log('Xverify ---------------------------------');
  console.log(Xverify);

  var options = {
    method: 'post',
    json: true,
    url: 'https://mercury-uat.phonepe.com/v4/debit##',
    headers: {
      // 'x-callback-url':'https://www.demoMerchant.com/callback',
      'x-verify': Xverify,
      'content-type': 'application/json'
    },
    body: { request: objJsonB64 },

  }
  console.log('options ---------------------------------');
  console.log(options);
  var needDetails = {
    base64Body: objJsonB64,
    checksum: Xverify,
    apiEndPoint: apiEndPoint
  }

  console.log('needDetails ------------------------------');
  console.log(needDetails);


  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        var data = { res, needDetails };
        console.log('respponse --------------------------------------------------------');
        console.log(data);
        resolve(data);
        // var decodeRes = base64decode(`${res}`)
        // console.log('decodeRes--------------------------------------------------------');
        // console.log(decodeRes);

      }
      else {
        console.log('Error :', err);
        console.log('err--------------------------------------------------------');
        reject(err);
      }
    })
  })
}


exports.checkPhonepeRdrctActivity = function (reqData) {
  console.log(reqData.data);
  var id = reqData.data.splitDataTrsctnId;
  var rdrctUrl = reqData.data.rdrctUrl;


  // var objJsonStr = base64encode(`{
  // 	"merchantId": "M2306160483220675579140",
  // 	"transactionId": ${id},
  // 	"merchantOrderId": "M123456789",
  // 	"amount": 100,
  // 	"instrumentType": "MOBILE",
  // 	"instrumentReference": "8074012241",
  // 	"message": "collect for XXX order",
  // 	"email": "machina.ramyachowdary@gmail.com",
  // 	"expiresIn": 180,
  // 	"shortName": "DemoCustomer",
  // 	"subMerchant": "DemoMerchant",
  // 	"storeId": "store1",
  // 	"terminalId": "terminal1"
  // }`)


  var objJsonStr = `{
    "merchantId": "M2306160483220675579140",
    "transactionId": "${id}",
    "merchantOrderId": "M123456789",
    "amount": 100,
    "instrumentType": "MOBILE",
    "instrumentReference": "9010583587",
    "message": "collect for XXX order",
    "email": "ramya@gmail.com",
    "expiresIn": 180,
    "shortName": "DemoCustomer",
    "subMerchant": "DemoMerchant",
    "storeId": "store1",
    "terminalId": "terminal1"
  }`

  let objJsonB64 = base64encode(objJsonStr)

  // console.log('objJsonStr ---------------------------------');
  // console.log(objJsonStr);
  // let objJsonB64 = Buffer.from(objJsonStr).toString("base64");


  console.log('base64encode ---------------------------------');
  console.log(objJsonB64);

  let saltKey = '8289e078-be0b-484d-ae60-052f117f8deb';

  var sha256Ky = crypto.createHash('sha256').update(`${objJsonB64}/v3/debit${saltKey}`).digest('hex');
  // console.log('sha256Ky ---------------------------------');
  // console.log(sha256Ky);
  var SHA256ky = sha256Ky.toUpperCase()

  console.log('SHA256ky ---------------------------------');
  console.log(SHA256ky);


  // var Xverify = SHA256ky+'###1'

  // console.log('Xverify ---------------------------------');
  // console.log(Xverify);

  var options = {
    method: 'post',
    json: true,
    url: 'https://mercury-uat.phonepe.com/v3/debit',
    headers: {
      // 'x-callback-url':'https://www.demoMerchant.com/callback',
      'x-verify': SHA256ky + '###1',
      'content-type': 'application/json',
      'x-redirect-url': rdrctUrl
    },
    body: { request: objJsonB64 },

  }
  console.log('options ---------------------------------');
  console.log(options);


  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        resolve(res);
        // var decodeRes = base64decode(`${res}`)
        // console.log('decodeRes--------------------------------------------------------');
        // console.log(decodeRes);

      }
      else {
        console.log('Error :', err);
        console.log('err--------------------------------------------------------');
        reject(err);
      }
    })
  })
}




exports.checkPymntRefund = function (reqRefundData) {
  console.log(reqRefundData.data);
  var transactionId = reqRefundData.data.trnscId;
  var providerRefId = reqRefundData.data.prvdrId;
  var amount = reqRefundData.data.amount;

  var objJsonStr = `{
    "merchantId": "DemoMerchant",
    "transactionId": "${transactionId}",
    "providerReferenceId": "${providerRefId}",
    "amount": ${amount},
    "merchantOrderId": "OD1234",
    "subMerchant": "DemoMerchant",
    "message": "refund for cancelled order"
}`

  let objJsonB64 = base64encode(objJsonStr)

  // console.log('objJsonStr ---------------------------------');
  // console.log(objJsonStr);
  // let objJsonB64 = Buffer.from(objJsonStr).toString("base64");


  console.log('base64encode ---------------------------------');
  console.log(objJsonB64);

  let saltKey = '8289e078-be0b-484d-ae60-052f117f8deb';

  var sha256Ky = crypto.createHash('sha256').update(`${objJsonB64}/v3/credit/backToSource${saltKey}`).digest('hex');
  // console.log('sha256Ky ---------------------------------');
  // console.log(sha256Ky);
  var SHA256ky = sha256Ky.toUpperCase()

  console.log('SHA256ky ---------------------------------');
  console.log(SHA256ky);


  // var Xverify = SHA256ky+'###1'

  // console.log('Xverify ---------------------------------');
  // console.log(Xverify);

  var options = {
    method: 'post',
    url: 'https://mercury-uat.phonepe.com/v3/credit/backToSource',
    headers: {
      'x-verify': SHA256ky + '###1',
      'content-type': 'application/json'
    },
    body: { request: objJsonB64 },

  }
  console.log('options ---------------------------------');
  console.log(options);


  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        resolve(res);
        // var decodeRes = base64decode(`${res}`)
        // console.log('decodeRes--------------------------------------------------------');
        // console.log(decodeRes);

      }
      else {
        console.log('Error :', err);
        console.log('err--------------------------------------------------------');
        reject(err);
      }
    })
  })
}

exports.checkWeb = function (reqData) {
  console.log(reqData.data);
  var transactionId = reqData.data.transactionId
  var merchantUserId = reqData.data.merchantUserId
  var merchantOrderId = reqData.data.merchantOrderId

  
  var objJsonStr = `{  
    "merchantId":"M2306160483220675579140",
    "transactionId":"${transactionId}",
    "merchantUserId":"${merchantUserId}",
    "amount":100,
    "merchantOrderId":"${merchantOrderId}",
    "mobileNumber":"9010583587",
    "message":"payment for order placed ${merchantOrderId}",
    "subMerchant":"DemoMerchant",
    "email": "ramya@gmail.com",
    "shortName": "Ramya"
 }`

  let objJsonB64 = base64encode(objJsonStr)

  console.log('objJsonStr ****** ---------------------------------');
  console.log(objJsonStr);
  // let objJsonB64 = Buffer.from(objJsonStr).toString("base64");


  console.log('base64encode ---------------------------------');
  console.log(objJsonB64);

  let saltKey = '8289e078-be0b-484d-ae60-052f117f8deb';
  let apiEndPoint = "/v4/debit";
  var sha256Ky = crypto.createHash('sha256').update(`${objJsonB64}${apiEndPoint}${saltKey}`).digest('hex');
  // console.log('sha256Ky ---------------------------------');
  // console.log(sha256Ky);
  var SHA256ky = sha256Ky.toUpperCase()

  console.log('SHA256ky ---------------------------------');
  console.log(SHA256ky);


  var Xverify = SHA256ky + '###1'

  console.log('Xverify ---------------------------------');
  console.log(Xverify);

  var options = {
    method: 'post',
    json: true,
    url: 'https://mercury-uat.phonepe.com/v4/debit#',
    headers: {
      'x-callback-url':'https://www.demoMerchant.com/callback',
      'x-verify': Xverify,
      'content-type': 'application/json'
    },
    body: { request: objJsonB64 },

  }
  console.log('options ---------------------------------');
  console.log(options);
  // var needDetails = {
  //   base64Body: objJsonB64,
  //   checksum: Xverify,
  //   apiEndPoint: apiEndPoint
  // }

  // console.log('needDetails ------------------------------');
  // console.log(needDetails);


  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        // var data = { res, needDetails };
        console.log('respponse --------------------------------------------------------');
        console.log(res);
        resolve(res);
        // var decodeRes = base64decode(`${res}`)
        // console.log('decodeRes--------------------------------------------------------');
        // console.log(decodeRes);

      }
      else {
        console.log('Error :', err);
        console.log('err--------------------------------------------------------');
        reject(err);
      }
    })
  })
}



// exports.getTransactionStatus = function () {
//   var options = {
//     method: 'get',
//     url:
//       'https://mercury-uat.phonepe.com/v3/transaction/M2306160483220675579140/RJ123456899/status',
//     headers:
//     {
//       'x-verify':
//         '4120B75BF5E19B0BE9FB60372106BB0718AC62BB3B828A9A19600585CD50B3B6###1',
//       'content-type': 'application/json'
//     }
//   };

//   return new Promise((resolve, reject) => {
//     request(options, function (err, res, body) {
//       console.log('res.data-------------------------------');
//       // console.log(res.data)
//       // console.log(res)
//       if (res) {
//         resolve(res);
//       }
//       else {
//         console.log('Error :', err);
//         reject();
//       }
//     })
//   })
// }


 // var postData = {
  //   "merchantId": "MS2002131035504110000721",
  //   "transactionId": "TXSCAN2002131106449405047669",
  //   "merchantUserId": "M8GUD6WCE",
  //   "amount": 100,
  //   "merchantOrderId": "TXSCAN2002131106449405047669",
  //   "mobileNumber": "9010583587",
  //   "message": "payment for order placed OD1234",
  //   "subMerchant": "DemoMerchant",
  //   "email": "machina.ramyachowdary@gmail.com",
  //   "shortName": "Ramya"
  // }