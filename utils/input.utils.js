var _ = require('lodash');


/**************************************************************************************
* Controller     : prepare JSON input
* Description    : Returns Groupd Json
* 18/Oct/2018    -Sony Angel - Initial Function
***************************************************************************************/
exports.prepareJsonInput = function (template, data) {
    let strTemplate = JSON.stringify(template)
    for (var key in data) {
      strTemplate  = strTemplate.replace("$$"+key+"$$",data[key]);
    }
    return JSON.parse(strTemplate)
}
/**************************************************************************************
* Controller     : prepare XML input
* Description    : Returns Groupd Json
* 18/Oct/2018    -Sony Angel - Initial Function
***************************************************************************************/
exports.prepareXmlInput = function (template, data) {
    let strTemplate = template;
    for (var key in data) {
        strTemplate  = strTemplate.replace("$$"+key+"$$",data[key]);
      }
      return strTemplate
}