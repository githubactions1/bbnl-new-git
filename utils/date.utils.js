var moment = require('moment');

exports.secToDateString = function(seconds) {
		var d = moment.duration(seconds, 'seconds');
		var days = Math.floor(d.asDays());
		var hours = Math.floor(d.asHours()) - days * 24;
		var mins = Math.floor(d.asMinutes()) - (hours+days * 24) * 60;
		var sec = seconds % 60;
		return days+" days :: "+hours+" hours :: "+mins+" mins :: "+sec+" sec";
};

exports.MinToDateString = function(seconds) {
		var d = moment.duration(os.uptime(), 'minutes');
		var days = Math.floor(d.asDays());
		var hours = Math.floor(d.asHours()) - days * 24;
		var mins = minutes % 60;
		return days+" days :: "+hours+" hours :: "+mins+" mins";
};

exports.DateFileString = function(d) {
	return d.getMonth() + "_" + d.getDay() +'_'+d.getHours();
};


exports.getDate = function() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	
	var yyyy = today.getFullYear();
	if (dd < 10) {
	  dd = '0' + dd;
	} 
	if (mm < 10) {
	  mm = '0' + mm;
	} 
	var today = dd + '/' + mm + '/' + yyyy;
	return today;
};
exports.getTimestamp = function() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var hours = Math.floor(today.asHours()) - days * 24;
	var mins = Math.floor(today.asMinutes()) - (hours+days * 24) * 60;
	var sec = seconds % 60;	
	var yyyy = today.getFullYear();
	if (dd < 10) {
	  dd = '0' + dd;
	} 
	if (mm < 10) {
	  mm = '0' + mm;
	} 
	var today = dd + '/' + mm + '/' + yyyy+ ' ' + hours+':' + mins+':' + sed;
	return today;
};