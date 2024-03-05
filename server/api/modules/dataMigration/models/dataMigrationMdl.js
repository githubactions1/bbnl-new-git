var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : get_prdctTypeMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getOltPortDtls = (user, callback) => {
	var fnm = 'getOltPortDtls';
    console.log("::::::::::::::::getOltPortDtls:::::::::::::::::")
    var QRY_TO_EXEC = `SELECT d.dstrt_nm,s.sbstn_nm,o.olt_id,o.olt_srl_nu,a.agnt_id,a.agnt_cd,stg.pop_olt_serialno,stg.portno as olt_prt_nm,stg.l1slots,stg.createdon
                        FROM olt_lst_t as o
                        JOIN oltportdtls_stg as stg on stg.pop_olt_serialno=o.olt_srl_nu
                        left JOIN agnt_lst_t as a on a.agnt_cd=stg.lmocode
                        JOIN sbstn_lst_t as s on s.sbstn_id=o.sbstn_id
                        JOIN dstrt_lst_t as d on d.dstrt_id=s.dstrct_id
                        WHERE d.dstrt_id=1
                        GROUP BY o.olt_id,stg.portno
                        ORDER BY o.olt_srl_nu,stg.portno`;
    console.log("::::::::::QRY_TO_EXEC::::::::::::::::")
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}



/*****************************************************************************
* Function      : addOltPort
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.addOltPort = (portDtls, user, callback) => {
	var fnm = 'addOltPort';
    var QRY_TO_EXEC = `INSERT INTO  olt_prts_lst_t ( olt_prt_nm, olt_id, agnt_id,a_in,i_ts) VALUES ('${portDtls.olt_prt_nm}', '${portDtls.olt_id}', '${portDtls.agnt_id}','1','${portDtls.createdon}');`;
    //console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/*****************************************************************************
* Function      : addSlot
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.addSlot = (port_id, slot, user, callback) => {
	var fnm = 'addSlot'
	slot = slot.replace(/'/g,"");
    var sltArr = slot.split('-');
    var s1 = (sltArr[0] && sltArr[0] > 0) ? sltArr[0] : 0;
    var s2 = (sltArr[1] && sltArr[1] > 0) ? sltArr[1] : 0;
    var s3 = (sltArr[2] && sltArr[2] > 0) ? sltArr[2] : 0;
    var QRY_TO_EXEC = `INSERT INTO olt_prt_slts_lst_t ( olt_prt_id, slt1_id, slt2_id, slt3_id, a_in,i_ts) VALUES ( '${port_id}', '${s1}', '${s2}', '${s3}', '1',CURRENT_TIMESTAMP());`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/*****************************************************************************
* Function      : addSplits
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.addSplits = (slot_id, slot,sum, user, oltdata, callback) => {
	var fnm = 'addSplits'
	slot = slot.replace(/'/g,"");
    if (slot.split('-') && slot.split('-').length > 2) {
        var slots_str = slot;
        var resVal = '';
        if(sum == 1){
            var ct = 0;
        }
        else if(sum == 2){
            var ct = 32;
        }
        else if(sum == 3){
            var ct = 64;
        }
        else if(sum == 4){
            var ct = 96;
        }
       
      
        var slotsArr = slots_str.split(",");
        for (i = 0; i < slotsArr.length; i++) {
            var slot = slotsArr[i];
            var mSplits = slot.split('-').map(x => +x);
            for (j = 1; j <= mSplits[1]; j++) {
                for (k = 1; k <= mSplits[2]; k++) {
                    ct++;
                    if(oltdata.olt_vndr_id == 1){
                        var value = ct
                    } else {
                        var value = ct - 1;
                    }
                    (resVal == '') ? resVal += `(${slot_id}, ${mSplits[0]}, ${j}, ${k}, ${value} ,1, CURRENT_TIMESTAMP())` : resVal += `,(${slot_id}, ${mSplits[0]}, ${j}, ${k}, ${value}, 1, CURRENT_TIMESTAMP())`

                }
            }
        }

        var QRY_TO_EXEC = `INSERT INTO  olt_prt_splt_lst_t (olt_slt_id, splt1_nu, splt2_nu, splt3_nu,onu_id,a_in,i_ts) VALUES ${resVal};`;

        console.log("dataMigrationModelllllllllllllllllllllllllllllllllllllllllllllllllllll")
        console.log(QRY_TO_EXEC);
        if (callback && typeof callback == "function")
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
                callback(err, results);
                return;
            });
        else
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
    } else {
        callback(false, []);
    }

}


/*****************************************************************************
* Function       : getOltDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getOltDtlsMdl = function (id, user, callback) {
    var fnm = "getOltDtlsMdl"
    var QRY_TO_EXEC = `SELECT olt_vndr_id FROM olt_lst_t WHERE olt_id = ${id}`;
	console.log(QRY_TO_EXEC)
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function(err, result){
		callback(err, result);
		return;
	});
};