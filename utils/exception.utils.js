// Standard Inclusions
var df = require(appRoot + '/utils/dflower.utils');
var fu = require(appRoot + '/utils/file.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

let reporter = function (type, ...rest)
{
	// remote reporter logic goes here
};

/* handle an uncaught exception & exit the process */
process.on('uncaughtException', function (err)
{
	log.err((new Date).toUTCString() + ' uncaughtException:'+err.message,0, cntxtDtls );
	log.err(err.stack);

	reporter("uncaughtException", (new Date).toUTCString(), err, err);

	process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection', function (reason, promise)
{
	log.err('unhandled rejection:'+reason.message || reason,0,cntxtDtls);

	reporter("uncaughtException", (new Date).toUTCString(), reason.message || reason);
})