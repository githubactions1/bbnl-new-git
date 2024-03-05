// Standard Inclusions
var std         = require(appRoot+'/utils/standardMessages');
var df          = require(appRoot+'/utils/dflower.utils');
var sqldb       = require(appRoot+'/config/db.config');
var cntxtDtls   = df.getModuleMetaData(__dirname,__filename);

var dbutil      = require(appRoot+'/utils/db.utils');




/*****************************************************************************
* Function      : getAllZonesLst
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getAllZonesLst = function(user,{},callback) {
    var fnm = "getAllZonesLst"
    
    var QRY_TO_EXEC = `select  * from zones_lst_t`;
 
    
    if(callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool,QRY_TO_EXEC,cntxtDtls,user,fnm,function(err,results){
            callback(err,results);
            return;
        });
    else
       return dbutil.execQuery(sqldb.MySQLConPool,QRY_TO_EXEC,cntxtDtls, user,fnm);
};

