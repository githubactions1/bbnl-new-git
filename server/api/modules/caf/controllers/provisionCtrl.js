var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
const request = require('request');
var qs = require('querystring')


/**************************************************************************************
* Controller     : getServicesMdlWr
* Parameters     : req,res()
* Description    : Get Services (MiddleWaer)
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getServicesMdlWr = function (data) {
  var options = {
    url: 'http://iptv.apsfl.co.in:8080/appserver/rest/iptv/getServices?serviceType=LTV&partnerCode=APSFL',
    headers: {
      'username': as.bssapi.mdle.un,
      'apikey': as.bssapi.mdle.api_key,
    }
  };
  console.log(options)
  request(options, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body);
  });
}
