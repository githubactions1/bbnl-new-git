var schedule = require("node-schedule");

var log = require(appRoot + '/utils/logmessages');
var umCtrl = require(appRoot + '/server/api/modules/general/um/controllers/UserMgtCtrl');
const sendMdl = require(appRoot +'/server/ds-services/modules/alerts/models/alertsMdl');
var cafOperationsSchCtrl = require(appRoot +'/server/api/modules/general/schedules/controllers/cafOperationsSchCtrl');

var moduoleNm = "UTIL-SCHEDULER";

exports.scheduleScripts = function (callback) {

	schedule.scheduleJob('*/1 * * * *', function () {
		log_schedule(0, "Running Every 1 min");
		// sendMdl.sendAlerts((err, result)=>{
		// 	if (err) { console.log(err); return; }
		// })
	});

	schedule.scheduleJob('*/15 * * * *', function () {
		log_schedule(0, "Running Every 15 minutes");
	});

	schedule.scheduleJob('*/30 * * * *', function () {
		log_schedule(0, "Running Every 30 minutes");
		// cafOperationsSchCtrl.retryFailedProvisionCAlls(function(status){
		// 	console.log(status);
		// })
	});

	schedule.scheduleJob('0 * * * *', function () {
		log_schedule(0, "Running Every 1 hour");
	});

	// // Running Every 90 days
	// schedule.scheduleJob("0 0 0 1,90 * ?", function () {
	// 	// disable inactive user accounts every 90 days
	// 	umCtrl._90DysInactvUsrs_C();
	// 	// Force users to change passwords for every 90 days
	// 	umCtrl._90DysFrcChngePwd_C();
	// });
};

var log_schedule = function (dtlIn, msg) {
	if (dtlIn == 0 & as.dsUtils.scheduler.log_scheule_run == true)
		log.message("INFO", moduoleNm, 0, msg);
	else if (dtlIn == 1 & as.dsUtils.scheduler.log_detailed_run == true)
		log.message("INFO", moduoleNm, 0, msg);

}