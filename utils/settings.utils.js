var nconf = require('nconf')
fs = require('fs'),
  path = require('path');



// add multiple files, hierarchically. notice the unique key for each file
var loadConfigFiles = function () {
  nconf.file('app', appRoot + '/config/app.config.json');
  nconf.file('dss2', appRoot + '/config/ds-services.config.json');
  nconf.file('ds-servicess', appRoot + '/config/ds-services.config.json');
  nconf.file('ds-utils', appRoot + '/config/ds-utils.config.json');
  nconf.file('passport', appRoot + '/config/passport.config.js');
  nconf.file('sec', appRoot + '/config/sec.config.json');
  nconf.file('redis', appRoot + '/config/redis.config.json');
  nconf.file('ext', appRoot + '/config/ext.config.json');
  nconf.file('bssapi', appRoot + '/config/bss.config.json');
  nconf.file('customer-app', appRoot + '/config/customer-app.config.json');
}



/*****************************************************************************
* Function 		  : getSettings
* Description   : get all the settings
* Arguments		  : callback function
******************************************************************************/
exports.getSettings = function (callback) {
  loadConfigFiles();
  var t_settings = {
    "app": nconf.get('app'),
    "dsServices": nconf.get('ds-services'),
    "dsUtils": nconf.get('ds-utils'),
    "redis": nconf.get('redis'),
    "ext": nconf.get('ext'),
    "sec": nconf.get('sec'),
    "bssapi": nconf.get('bssapi'),
    "bssconf": nconf.get('bssconf'),
    "customer_app": nconf.get('customer-app')
  }

  return t_settings;
};


