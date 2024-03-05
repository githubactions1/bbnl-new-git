// Standard Inclusions
var std    = require(appRoot+'/utils/standardMessages');

exports.reportNodeStart = function() {
    if(as.dsServices.monitor.MONITOR_APP_START==true) {
            log.info("Report Node Started");
    }
    
}