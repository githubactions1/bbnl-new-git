var chalk = require('chalk');
const os = require('os');
var log = require(appRoot + '/utils/logmessages');
var std = require(appRoot + '/utils/standardMessages');
var fileUtils= require(appRoot + '/utils/file.utils')
var auditReq= require(appRoot + '/utils/audit.requests')
var restartUtils= require(appRoot + '/utils/restart.utils')

exports.startPrint = function(url) {
// style a string 

// for (i=0;i<os_cpu.length;i++)
//   console.log(os_cpu[i].model)
//console.log(as.app.audit_dir)

auditReq.auditRestarts();

// §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
console.log( chalk.blue("\n           DDDDDDD    ")+ chalk.red(" SSSSSSSS ")+"\
             \n "+chalk.blue("          DDDDDDDD   ")+ chalk.red(" SS")+"\
             \n "+chalk.blue("          DD    DD   ")+ chalk.red(" SS")+"\
             \n "+chalk.blue("          DD    DD   ")+ chalk.red(" SSSSSSSS")+"\
             \n "+chalk.blue("          DD    DD         ")+ chalk.red(" SS")+"\
             \n "+chalk.blue("          DDDDDDDD         ")+ chalk.red(" SS")+"\
             \n "+chalk.blue("          DDDDDDD    ")+ chalk.red(" SSSSSSSS") );

console.log("\n\n © glits Software Innovations Pvt Ltd.\
             \n "+chalk.green("  Server URL      ")+": "+url +"\
             \n"+chalk.green("   Start Time      ")+": "+moment().format('MM-DD-YYYY h:mm:ss')+"\
             \n"+chalk.green("   App Name        ")+": "+as.app.app_name+"\
             \n"+chalk.green("   App Code        ")+": "+as.app.app_cd+"\
             \n"+chalk.green("   App Id          ")+": "+as.app.app_id+"\
             \n"+chalk.green("   Url Audit       ")+": "+(as.app.audit_requests?'Enabled':'Disbled')+"\
             \n"+chalk.green("   App Base        ")+": "+appRoot+"\
             \n"+chalk.green("   Audit Directory ")+": "+appRoot+"/"+as.app.audit_dir+"\
             \n"+chalk.green("   Log Directory   ")+": "+appRoot+"/"+as.app.log_dir+"\
             \n"+chalk.green("   Restart Audit   ")+": "+(as.app.audit_requests?'Enabled':'Disbled')+"\
             \n"+chalk.green("   API Load Audit  ")+": "+(as.app.audit_requests?'Enabled':'Disbled')+"\
             \n"+chalk.green("   DB Load Audit   ")+": "+(as.app.audit_requests?'Enabled':'Disbled')+"\
             \n"+chalk.green("   Server Name     ")+": "+os.hostname()+"\
             \n"+chalk.green("   Total Memory    ")+": "+os.totalmem()/(1024*1024*1024)+"\
             \n"+chalk.green("   Free Memory     ")+": "+os.freemem()/(1024*1024*1024)+"\
             \n"+chalk.green("   Platform        ")+": "+os.platform()+"\
             \n"+chalk.green("   Total CPU       ")+": "+os.cpus().length+"\
             \n"+chalk.green("   Server UP Time  ")+": "+restartUtils.upTime()+"\
             \n"+chalk.green("   Process Id      ")+": "+process.pid+"\
             \n"+chalk.green("   App Debug Mode  ")+": "+as.app.debug_level);
};

exports.EndPrint = function(url) {

console.log("\n           DDDDDDD     SSSSSSSS\
             \n           DDDDDDDD    SS\
             \n           DD    DD    SS\
             \n           DD    DD    SSSSSSSS\
             \n           DD    DD          SS\
             \n           DDDDDDDD          SS\
             \n           DDDDDDD     SSSSSSSS\
             \n\n Andhra Pradesh State FiberNet Ltd.\
             \n   Server      : "+url +"\
             \n   Termination Time  : "+moment().format('MM-DD-YYYY h:mm:ss'));

};
