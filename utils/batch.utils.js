var moment = require('moment');
var chalk = require('chalk');
var path = require('path');

let header     = chalk.bold.blue;
let breaker    = chalk.bold.magenta;

exports.getBatchId = () => moment().format('YYYYMMDDhhmmss');
exports.logheader = (prop,value) =>console.log(header(prop+"\t:: ")+value);
exports.logFileName = (BaseDir,ScriptFile,BatchId) =>path.resolve(BaseDir, '..')+"/log/"+ScriptFile.replace(/\.[^/.]+$/, "")+"_"+BatchId.substring(0,8)+".log";

exports.getNewBatchDtls = () =>{
  return {
      batchId:moment().format('YYYYMMDDhhmmss'),
      startTs : moment().format('MM:DD:YYYY hh:mm:ss')
  }
}


exports.registerBatchStart = (BatchName,BatchId) =>{

}



exports.printBatchHeader = (HdrDtl)=>{
    console.log(breaker('**************************************************************************************'));
    for(var i=0;i<HdrDtl.length;i++){
        for ( key in HdrDtl[i]) {
            console.log(header(key+"\t:: ")+HdrDtl[i][key]);
        }
    }
    console.log(breaker('**************************************************************************************'));
}








exports.ParamsRange = (val) => val.split('..').map(Number);
exports.ParamsList = (val)  => val.split(',');
 
exports.ParamsCollect = (val, memo) => {
  memo.push(val);
  return memo;
}