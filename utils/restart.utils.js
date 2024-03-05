var schedule = require("node-schedule");
var fs = require('fs');
var os = require("os");

var log = require(appRoot + '/utils/logmessages');
var dtUtils = require(appRoot + '/utils/date.utils');

var moduoleNm = "RESTART-AUDIT";


/*****************************************************************************
* Function      : writeRestartLog
* Description   : Write a restart log to a file
* Arguments     : Timestamp
* History   
* 10/20/2018    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
var writeRestartLog = function(filename,node_start_ts) {
	fs.writeFile(filename,"START::"+moment(node_start_ts).format('MM-DD-YYYY h:mm:ss')+" :: END::"+moment().format('MM-DD-YYYY h:mm:ss')+os.EOL, function (err) {
	if (err) throw err;
	//console.log('The "data to append" was appended to file!');
	});
};

/*****************************************************************************
* Function      : auditRestarts
* Description   : Audits the restart of the Nodejs process
* Arguments     : None
* History   
* 10/20/2018    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
var auditRestarts = function() {
	// var now = new Date();
	writeRestartLog(restart_temp_file_name,node_start_ts)
}

/*****************************************************************************
* Function      : upTime
* Description   : Get System Up time
* Arguments     : None
* History   
* 10/20/2018    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.upTime = function() {
	return dtUtils.secToDateString(os.uptime());
};

/*****************************************************************************
* Function      : NONE -- global code
* Description   : Get System Up time
* Arguments     : None
* History   
* 10/20/2018    ** Sunil Mulagada  ** Initial Code
******************************************************************************/

var restart_temp_file_name = appRoot + "/" + as.app.temp_dir+'/'+'restart_temp.log'
var restart_file_name = appRoot + "/" + as.app.audit_dir+'/'+as.app.audit_restart_log+"_" + node_start_ts.getFullYear() +'.txt'

if (as.dsServices.monitor.MONITOR_APP_START === true) {
	// Copying old temp.log restart entry to the audit file
	if(fs.existsSync(restart_temp_file_name)){
		cpy_entry = fs.createReadStream(restart_temp_file_name).pipe(fs.createWriteStream(restart_file_name,{'flags': 'a'}));
		cpy_entry.on('close', function() {
				// Make first entry to the temp restart log
				writeRestartLog(restart_temp_file_name,node_start_ts)
		});
	} else {
		// Make first entry to the temp restart log
		writeRestartLog(restart_temp_file_name,node_start_ts)
	} 

	auditRestarts();
	schedule.scheduleJob('*/1 * * * *', function () {
		auditRestarts();
	});
}
