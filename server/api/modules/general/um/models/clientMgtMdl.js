// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/*****************************************************************************
* Function      : updatePrf_ins_updt
* Description   : 
* Arguments     : callback function
* Change History :
* 23/07/2019    -   - Initial Function
*
******************************************************************************/

exports.updatePrf_ins_updt = function (user, data, callback) {
    var fnm = "updatePrf_ins_updt"
    var QRY_TO_EXEC1 = "SELECT  * FROM usr_clnt_tnt_rel_t  where usr_id ='" + data.usr_id + "' and clnt_id='" + data.clnt_id + "' and tnt_id='" + data.tnt_id + "'";
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls, user,fnm, function (err, results) {
            if (results.length > 0) {
                var QRY_TO_EXEC2 = "UPDATE usr_clnt_tnt_rel_t set app_prfle_id = '" + data.app_prfle_id + "', u_ts = CURRENT_TIMESTAMP() where usr_id = '" + data.usr_id + "' and clnt_id = '" + data.clnt_id + "' and tnt_id = '" + data.tnt_id + "';";
                dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC2, cntxtDtls, user,fnm, function (err, results) {
                    callback(err, { "chk": 0, "data": results });
                    return;
                });
            }
            else {
                var QRY_TO_EXEC3 = "insert into usr_clnt_tnt_rel_t(usr_id,app_prfle_id,clnt_id,tnt_id,i_ts) values ('" + data.usr_id + "' ,'" + data.app_prfle_id + "',' " + data.clnt_id + " ,'" + data.tnt_id + "',current_timestamp());"
                dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC3, cntxtDtls, user,fnm, function (err, results) {
                    callback(err, { "chk": 0, "data": results });
                    return;
                });
            }
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : PostMtlyClntTntCrtnFrUsr
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.PostMtplClntTntCrtnFrUsr = function (user, data, callback) {
    var fnm = "PostMtplClntTntCrtnFrUsr"
    var QRY_TO_EXEC = "INSERT INTO usr_clnt_tnt_rel_t (usr_id,clnt_id,tnt_id,app_prfle_id,i_ts) values (" + data.usr_id + "," + data.clnt_id + "," + data.tnt_id + "," + data.app_prfle_id + ",CURRENT_TIMESTAMP())"

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : insertClntTntRelation
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insertClntTntRelation = function (user, usrId, data, tntDtls, callback) {
    var fnm = "insertClntTntRelation"
    var QRY_TO_EXEC = "INSERT INTO usr_clnt_tnt_rel_t (usr_id,clnt_id,tnt_id,app_prfle_id,clnt_admn_in,tnt_admn_in,a_in,i_ts) values (" + usrId + "," + data.clnt_id + "," + tntDtls.tnt_id + "," + tntDtls.app_prfle_id + "," + data.clnt_admn_in + "," + tntDtls.tnt_admn_in + ",1,CURRENT_TIMESTAMP())";

    // console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


