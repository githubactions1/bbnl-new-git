// Standard Inclusions
var log = require(appRoot + '/utils/logmessages');
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsSHA = require('jssha');
var request = require('request');
var dbutil = require(appRoot + '/utils/db.utils');

exports.checkPermissionMdl = function (obj, user, callback) {

  var QRY_TO_EXEC = `
    select objct_hndlr_nm,ro.slct_in
    ,ro.insrt_in
    ,ro.updt_in
    ,ro.dlte_in
    ,ro.exprt_in
    ,o.spcl_prmsns_in
    ,o.aprvl_grp_id
    ,o.adt_in
    from
    rle_objct_lst_t o
    join rle_objct_rel_t ro on o.objct_id=ro.objct_id
    join rle_lst_t r on r.rle_id=ro.rle_id
    join rle_mrcht_usr_rel_t ru on r.rle_id=ru.rle_id
    WHERE o.objct_hndlr_nm='${obj}'
    and ru.mrcht_usr_id=${user.mrcht_usr_id}`
  console.log(QRY_TO_EXEC);
  //   if (callback && typeof callback == "function")
  //   dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
  //       callback(err, results);
  //       return;
  //   });
  // else
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
};