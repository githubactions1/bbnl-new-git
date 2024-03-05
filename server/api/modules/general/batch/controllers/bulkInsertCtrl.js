var log = require(appRoot + '/utils/logmessages');
var std = require(appRoot + '/utils/standardMessages');
var jsonUtils = require(appRoot + '/utils/json.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var request = require("request");
var _ = require('lodash');


var bulkInsertMdl = require('../models/bulkInsertMdl');

/**************************************************************************************
* Controller     : insertDataIntoTable
* Parameters     : taskDtls,previousTaskData
* Description    : Bulk Insert Executor
* Change History :
* 07/01/2020     - Raju Dasari - Initial Function
***************************************************************************************/
exports.insertDataIntoTable = function (task, prevTaskRes, callback) {
    var tbl_data = fromatData(_.compact(prevTaskRes)); 

    bulkInsertMdl.getBulkInsertDef(task)
        .then((blkInsrtDtls) => {
            if (blkInsrtDtls && blkInsrtDtls.length > 0) {
                var clmns_tmp = blkInsrtDtls[0].dta_clmns_frmt_tx.split(',');
                var tbl_clms_str = '';
                var objKeys = [];
                for (i = 0; i < clmns_tmp.length; i++) {
                    (i == 0) ? tbl_clms_str += clmns_tmp[i].split(':')[0] : tbl_clms_str += ',' + clmns_tmp[i].split(':')[0];

                    objKeys[i] = clmns_tmp[i].split(':')[1];
                }

                var vls_str = '';
                for (i = 0; i < tbl_data.length; i++) {
                    var val_tmp_str = '';
                    for (j = 0; j < objKeys.length; j++) {
                        (j == 0) ? val_tmp_str += ((tbl_data[i][objKeys[j]]) ? "'" + tbl_data[i][objKeys[j]] + "'" : 'NULL') : val_tmp_str += ((tbl_data[i][objKeys[j]]) ? ',' + "'" + tbl_data[i][objKeys[j]] + "'" : ',NULL');
                    }
                    (vls_str == '') ? vls_str += '(' + val_tmp_str + ')' : vls_str += ',(' + val_tmp_str + ')';
                }

                var Insert_qry = `INSERT INTO ${blkInsrtDtls[0].trgt_tble_nm}(${tbl_clms_str}) VALUES ${vls_str}`;
                bulkInsertMdl.insertToTable(Insert_qry)
                    .then((insertRes) => {
                        callback(false, insertRes);
                    })
                    .catch((error) => {
                        callback(error, []);
                    })

            } else {
                callback(false, []);
            }

        })
        .catch((error) => {
            callback(false, []);
        })

}


function fromatData(data) {
    var resdata = [];
    for (i = 0; i < data.length; i++) {
        for (j = 0; j < data[i].length; j++) {
            resdata.push(data[i][j]);
        }
    }
    return resdata;
}