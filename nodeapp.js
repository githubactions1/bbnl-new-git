// Before all other 'require' statements
// require('appmetrics-dash').attach()
var express = require('express');
var cors = require('cors');

var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MySQLStore = require('express-mysql-session')(expressSession);
var helmet = require('helmet');
var app = express();
let http = require('http');
//let https = require('https');
let socketIO = require('socket.io');

var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var notifier = require('node-notifier');
let ejs = require('ejs');
var fs = require('fs');
var compression = require('compression')
moment = require('moment');
path = require('path');
nconf = require('nconf');
expressValidator = require('express-validator');
util = require('util');

/****************************
 * START :: GLOBAL VARIABLE *
 *****************************/
appRoot = __dirname;
clientRoot = appRoot + "/client"
publicRoot = appRoot + "/client/public"
node_start_ts = new Date();
as = require(appRoot + '/utils/settings.utils').getSettings();
log = require(appRoot + '/utils/logmessages');
event = require(appRoot + '/utils/events.utils');
notes = require(appRoot + '/utils/notes.utils');
metric = require(appRoot + '/utils/metrics.utils');
require(appRoot + '/utils/exception.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
base_url = 'http://localhost:4901/ds#/web/'
/****************************
 * END :: GLOBAL VARIABLE *
 *****************************/
metric.define('api_calls')
metric.define('logins')
metric.define('registrations')
metric.define('db_errors')
metric.define('db_sql')
metric.define('db_sql_err')
metric.define('db_contn')
metric.define('db_contn_err')

//metric.printAllMetrics()


metric.incriment('db_sql')
metric.incriment('db_sql')
metric.incriment('db_sql')
// metric.print_data('db_sql')
// metric.print_data('db_contn')
//metric.print();
var auditRequest = require(appRoot + '/utils/audit.requests');
var df = require(appRoot + '/utils/dflower.utils');
var fileUtils = require(appRoot + '/utils/file.utils')
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var banner = require(appRoot + '/utils/banner');
var osDtls = require(appRoot + '/server/ds-services/modules/monitor/utils/osdetails');
var repDsEvents = require(appRoot + '/server/ds-services/modules/monitor/exposures/reportEvents');
var restartUtils = require(appRoot + '/utils/restart.utils');
var redisclnt = require(appRoot + '/utils/redis.utils');
var logDirectory = appRoot + '/' + as.app.log_dir;
var sch = require(appRoot + '/utils/schedule.utils');
var bootstrap_load = require('./utils/bootstrap_load');
redisclnt.getValue('test', function () {

});
app.use(helmet());
// app.use(express.static(path.join(__dirname, '/algtHst')));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
})); // support encoded bodies

// app.use('/client', express.static(__dirname + '/client'));
// app.use('/webclient', express.static(__dirname + '/webclient/dist/webclient'));

// app.use('/client', express.static(__dirname + '/jqueryhtml'));
// app.use('/client', express.static(__dirname + '/client'));
app.use('', express.static(__dirname + '/apsfl'));
app.use('/images', express.static('/glits/web/code/nodejs/apsfl_web/uploads'));
app.use('/sliderimages', express.static('/glits/filestore/images'));
app.use('/prepaidimages', express.static('/'));
// app.use('', express.static(__dirname + '/ebase'));
//app.use(express.static(path.join(__dirname, 'client')));
app.set('views', __dirname + '/server/app/templates');
app.use('/server/app/templates', express.static(process.cwd() + '/server/app/templates'));
app.set('view engine', 'ejs');
app.use(express.static(appRoot + '/api/swagger/swagger.json'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      fld_nm: formParam,
      msg_tx: msg,
      spld_vl: value
    };
  }
}));
//event.record('CAF',1,'INSTALLED',"CAF New installation",{user_id:100});

// var dbutil = require(appRoot + '/utils/db.utils');
// dbutil.getNxtKey('ent_ctmr_id').then(function (nextId) {
//     console.log(nextId)
// }).catch(function (error) {
//     console.log(error)
// });

var sqldb = require(appRoot + '/config/db.config');
// Load session options from settings
var session_options = as.app.session_info;

sessionStore = '';
sqldb.MySQLConPool.getConnection(function (err, connection) { // get connection from Connection Pool
  if (err) {
    log.db.conError(cntxtDtls, err, err.fatal);
    metric.incriment('db_contn_err');
    log.err("Can not get the connection for Session Datastore", 0, cntxtDtls)
    return err;
  } else {
    sessionStore = new MySQLStore(session_options, connection);
  }

});

// i'll change key & secret later
app.use(expressSession({
  key: '69Atu22GZTSyDGW4sf4mMJdJ42436gAs',
  secret: '3dCE84rey8R8pHKrVRedgyEjhrqGT5Hz',
  store: sessionStore,
  secure: true,
  resave: false,
  saveUninitialized: true
}));
app.use(cors());
app.use(cookieParser());
app.use(compression({threshold: 0}));
// ensure log directory exists
fileUtils.createDirectory([appRoot + "/" + as.app.audit_dir, appRoot + "/" + as.app.log_dir, appRoot + "/" + as.app.temp_dir])

// setup the logger

app.use(errorhandler({
  log: errorNotification
}));

function errorNotification(err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url

  notifier.notify({
    title: title,
    message: str
  })
}
// log.info("Test message",0, df.getModuleMetaData(__dirname, __filename))
// log.warn("Test message",0, df.getModuleMetaData(__dirname, __filename))
// log.err("Test message",0, df.getModuleMetaData(__dirname, __filename))
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // response headers you wish to expose
  res.setHeader('Access-Control-Expose-Headers', 'x-access-token');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  if (req.body) {
    // req.body = qryUtl.qryString(req.body)
    // console.log(req.body)
  }
  next();
});


app.all('*', function (req, res, next) {
  auditRequest.auditAllUrls(req, res, appRoot+'/audit', 'bss');
  next();
});



app.get('/api/swagger/swagger.json', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(appRoot + '/api/swagger/swagger.json');
});

if (as.app.app_in_maintanance == true) {
  log.err("Application Started in Maintanance Mode", 0, cntxtDtls)
  app.use('/', function (req, res) {
    res.sendFile(path.join(clientRoot + '/maintanance.html'));
  });
} else if (as.app.api_in_maintanance == true) {
  log.err("API Started in Maintanance Mode", 0, cntxtDtls)
  app.use('/apiv1', function (req, res) {
    res.send({
      "status": 9999,
      "message": "API In Maintanance Mode",
      "data": null,
      "url": "API In Maintanance Mode"
    });
  });
  app.use('/login', function (req, res) {
    res.sendFile(path.join(clientRoot + '/maintanance.html'));
  });
  //app.use('/', require('./server/app/routes/appRoutes'));
} else {



  app.use('/apiv1', require('./server/api/routes/apiRoutes'));
  app.use('/utils/apiv1', require('./server/api/routes/general/utilRoutes/utilRtr'));
  app.use('/dservices', require('./server/ds-services/routes/dsRoutes'));
  app.use('/tms', require('./server/api/routes/cms/cmsRtr'));
  app.use('/coms', require('./server/api/routes/coms/comsRtr'));
  app.use('/', require('./server/app/routes/appRoutes'));
  // app.use('/', require('./server/app/routes/appRoutes'));
  // app.use('/india', require('./server/app/routes/politicalRtr'));

  //app.use('/', require('./server/app/routes/alligetRtr'));

  // app.use('/', require('./server/app/alliget/home/routes/homeRtr'));
  // app.use('/tutorial', require('./server/app/alliget/kx/routes/tutRtr'));
  // app.use('/tut_list', require('./server/app/alliget/routes/tut_listRtr'));
  // app.use('/tut_list_all', require('./server/app/alliget/routes/tut_list_allRtr'));
  // app.use('/spaces', require('./server/app/alliget/routes/tutRtr'));
  // app.use('/challenge', require('./server/app/alliget/challengers/routes/chlngRtr'));
}
app.use('/apiv1', require('./server/api/routes/apiRoutes'));


// app.use('/ds', require('./server/ds-services/routes/dsRoutes'));

app.get('**', function (req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname + '/apsfl/index.html'));
});

if (as.dsUtils.scheduler.start_on_launch === true)
  sch.scheduleScripts(function (err) {
    if (err) {
      log.error("Issues with Scheculing :: " + err, 0, cntxtDtls);
    }
  });
if (as.dsServices.monitor.REGISTER_ON_START === true)
  osDtls.registerApp();

if (as.dsServices.monitor.REGISTER_ON_START === true)
  osDtls.registerApp();

/*const options = {
	//key : fs.readFileSync('./certificates/apsfl.key'),
	//cert : fs.readFileSync('./certificates/certificate.crt')//,
	//ca : fs.readFileSync('./certificates/certificate.crt')
//}

const port = 443;
const server = https.createServer(options, app);

server.listen(as.app.app_port, ()=>{
	console.log("server listen on port : ", as.app.app_port)
}) */

var server = app.listen(as.app.app_port, function () {
  var host = server.address().address;
  var port = server.address().port;
  log.info(`${as.app.app_name} App Started.Listening at http://${host}:${port}`, 0, df.getModuleMetaData(__dirname, __filename))

  if (as.dsServices.monitor.MONITOR_APP_START === true)
    repDsEvents.reportNodeStart();
  if (as.app.banner == true)
    banner.startPrint("http://" + server.address().address + ":" + server.address().port);

  bootstrap_load.getAdtTableLst_M();
  bootstrap_load.loadSchedular_get();
});
io = socketIO.listen(server);


io.sockets.on('connection', function (socket) {
  console.log('Socket has connected to the client.');
  socket.on('disconnect', function () {
    console.log('Socket has disconnected from the client.');
  });
  socket.on('join', function (data) {
    socket.join(data.website); // We are using room of socket io
  });
  socket.on('newmessage', function () {
    console.log('message emitted');
  })
});

process.on('exit', (code) => {
  banner.EndPrint("http://" + server.address().address + ":" + server.address().port);
});
