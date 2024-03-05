var convert = require('xml-js');

/**************************************************************************************
* Controller     : xml2json
* Parameters     : None
* Description    : XML to JSON Parser
* Change History :
* 05/FEB/2019     - Raju Dasari - Initial Function
***************************************************************************************/
exports.xml2json = function (task, xml, callback) {
    console.log(xml);
    var result = convert.xml2json(xml, { compact: true, spaces: 4 });
    // var result2 = convert.xml2json(xml, {compact: false, spaces: 4});
    if (result) {
        callback(false, JSON.parse(result));
    }
    else {
        callback(false, null)
    }
}
