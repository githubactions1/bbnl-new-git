var dbRtr = require('express').Router();
const util = require('util');
var exec = require('child_process').exec;



// var wikiCtrl = require('../../modules/wiki/controllers/wikiCtrl');
// var checkUser = require('../../modules/general/auth/controllers/accessCtrl');

/****************************************************************
					DB Routes
*****************************************************************/
dbRtr.get('/util/restart_node',  function(req,res){
	console.log("restarting node"+process.pid);
	res.send("kill -9 "+process.pid+";node "+process.argv[1]+" &");

	// exec("sleep 2000;nohup node "+process.argv[1]+ " &", function(error, stdout, stderr) {
	// 	    console.log(error)

	// });
	// exec("kill -9 "+process.pid, function(error, stdout, stderr) {
	// // command output is in stdout
	// });	
});
//dbRtr.post('/dbr/killall', checkUser.hasToken, checkUser.canCreate("ctlg"), wikiCtrl.insrt_CtlgList_Ctrl);


/****************************************************************
					DB Routes End
*****************************************************************/


module.exports = dbRtr;