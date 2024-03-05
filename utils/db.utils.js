// Standard Inclusions
var log = require(appRoot + '/utils/logmessages');
var std = require(appRoot + '/utils/standardMessages');
var sqlParser = require(appRoot + '/utils/sql.parser');
var sqldb = require(appRoot + '/config/db.config');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : execQuery
* Parameters     : None
* Description    : Execute a query
* Change History :
* 11/29/2016    - Sunil Mulagada - Initial Function
* 12/30/2016    - Sunil Mulagada - Added A condition if callback is not send. Then it returns a Promise
* 19/10/2018    - Sony Angel - Audit SQL
***************************************************************************************/
exports.execQuery = function (ConPool, Qry, cntxtDtls, userDtls, fnm, callback) {
      if (Qry) {
            Qry = Qry.trim();
            // console.log(Qry);

            // Split query by semi-colon
            var multiQrs = sqlParser.multiQrs(Qry);
            // console.log(multiQrs);

            const len = multiQrs.length;
            let q = 0;
            let qry_rslts = [];
            if (callback && typeof callback == "function")
                  multiQrs.forEach(query => {
                        executeEachQuery(query, qry_rslts, ConPool, cntxtDtls, userDtls, fnm, function (err, results) {
                              if (err) {
                                    callback(err, results);
                                    return;
                              }
                              q++;
                              if (q == len) {
                                    if (results) len > 1 ? results : results = results[0]
                                    callback(err, results);
                              }
                        })
                  })
            else
                  return new Promise((resolve, reject) => {
                        multiQrs.forEach(query => {
                              executeEachQuery(query, qry_rslts, ConPool, cntxtDtls, userDtls,fnm, function (err, results) {
                                    if (err) {
                                          reject(err);
                                    }
                                    // console.log(q);
                                    q++;
                                    if (q == len) {
                                          if (results) len > 1 ? results : results = results[0];
                                          resolve(results);
                                    }
                              })
                        })

                  })

      } else console.log('No Query to execute');
}

/**************************************************************************************
* Controller     : execTrnsctnQuery
* Parameters     : None
* Description    : Execut SQL In a single Transaction
* Change History :
* 02/18/2020    - Sunil Mulagada - Initial Function
***************************************************************************************/
var execTrnsctnQuery = function (ConPool, Qry, cntxtDtls, userDtls, fnm, callback) {
      let qry_rslts = [];
      const len = Qry.length;
      if (len == 1) { // Single Query

            return new Promise((resolve, reject) => {
                  executeEachQuery(Qry[0], qry_rslts, ConPool, cntxtDtls, userDtls, fnm, function (err, results) {
                        if (err) {
                              reject(err);
                        } else {
                              resolve(results);
                        }
                  })
            })
      } else {
            LastQry = Qry[len - 1];
            QryRemaining = Qry.splice(0, len - 1)
            let q = 0;
            return new Promise((resolve, reject) => {
                  ConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
                        if (err) { log.db.conError(cntxtDtls, Qry, err.code, err.fatal); callback(err, null); return err; }
                        connection.beginTransaction(function (err) {
                              if (err) { throw err; }
                              QryRemaining.forEach(query => {
                                    executeEachTransQuery(connection, query, qry_rslts, ConPool, cntxtDtls, userDtls, function (err, results) {
                                          if (err) { reject(err); }
                                          q++;
                                          if (q == len - 1) { // Executing the last query after executing all the queries in QryRemaining
                                                connection.query(LastQry, function (error, results, fields) {
                                                      if (error) {
                                                            return connection.rollback(function () {
                                                                  throw error;
                                                            });
                                                      }
                                                      connection.commit(function (err) {
                                                            if (err) {
                                                                  return connection.rollback(function () {
                                                                        throw err;
                                                                  });
                                                            }
                                                            qry_rslts.push(results);
                                                            connection.release();
                                                            resolve(qry_rslts);
                                                            return;
                                                      });
                                                }); // -- Final Query End
                                          }// -- Final Query End of if
                                    }) // -- end of executeEachTransQuery
                              }) // End of for loop for QryRemaining
                        }); // Transaction End 
                  }); // -- End of Get connection
            }) // End
      } // End of else that need transaction
}
exports.execTrnsctnQuery = execTrnsctnQuery;
/*****************************************************************************
* Function      : getNxtKeyMdl
* Description   : Execute query to get Next key value generated
* Arguments     : callback function
* Change History :
* 18/02/2020    -  Sunil Mulagada  - Initial Function
* 
******************************************************************************/
var getNxtKeyMdl = (ky_hndlr_tx, user, callback) => {
      var QRY_TO_EXEC = [`SELECT ky_id from ky_sqnce_dtl_t WHERE  ky_hndlr_tx= '${ky_hndlr_tx}' FOR UPDATE`
            , `UPDATE ky_sqnce_dtl_t SET ky_id=ky_id+1 WHERE  ky_hndlr_tx= '${ky_hndlr_tx}'`];
      //console.log(QRY_TO_EXEC) 
      if (callback && typeof callback == "function")
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
                  callback(err, results);
                  return;
            });
      else
            return execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}

/**************************************************************************************
* Controller     : getNxtKey
* Parameters     : req,res()
* Description    : get notes
* Change History :
* 18/02/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.getNxtKey = function (hndlr_tx) {
      return new Promise((resolve, reject) => {
            // console.log(len)
            getNxtKeyMdl(hndlr_tx, { user_id: null })
                  .then(function (results) {
                        resolve(JSON.parse(JSON.stringify(results[0][0].ky_id)));
                  }).catch(function (error) {
                        reject(error);
                  });
      })
}
/**************************************************************************************
* Controller     : executeEachTransQuery
* Parameters     : req,res()
* Description    : Execute each query for a transaction
* Change History :
* 18/02/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
function executeEachTransQuery(connection, query, qry_rslts, ConPool, cntxtDtls, userDtls, callback) {
      if (!query) { return callback(false, qry_rslts); }
      // Execute the query
      connection.query(query, function (err, rows) {
		  //connection.release();//newlyadded
            if (err) callback(err, null);
            if (rows) qry_rslts.push(rows);
            callback(false, qry_rslts);
      });
}

function executeEachQuery(query, qry_rslts, ConPool, cntxtDtls, userDtls, fnm, callback) {
      let audit = false;
      if (!query) { return callback(false, qry_rslts); }

      var qryEle = sqlParser.sql2ast(query);
      //console.log(qryEle);
      //console.log(qryEle.TABLES[0].name);
     // console.log(qryEle.TYPE);

      // if(typeof audit_sqltable_lst !== 'undefined')
      // if (audit_sqltable_lst && audit_sqltable_lst.length) {
      //       for (var i = 0; i < audit_sqltable_lst.length; i++) {
      //             for (var j = 0; j < qryEle.TABLES.length; j++) {
      //                   if (audit_sqltable_lst[i].tbl_nm == qryEle.TABLES[j].name) {
      //                         audit = audit_sqltable_lst[i];
      //                   }
      //             }
      //       }
      // }
      // console.log('Audit ::: ', audit ? true : false);
      if (audit) {
            execAdtQry(qryEle, query, audit, ConPool, cntxtDtls, userDtls, (err, results) => {
                  if (err) callback(err, null);
                  if (results) qry_rslts.push(results);
                  callback(false, qry_rslts);
            })
      } else {
            conn_execSQL(qryEle, query, ConPool, cntxtDtls, userDtls, fnm, function (err, results) {
                  if (err) callback(err, null);
                  if (results) qry_rslts.push(results);
                  callback(false, qry_rslts);
            });
      }
}

function execAdtQry(qryEle, query, audit, ConPool, cntxtDtls, userDtls, callback) {
      // console.log('In AdtQry_fn');
      var qry_typ = qryEle.TYPE;
      var tbl_nm = qryEle.TABLES[0].name + ' ' + qryEle.TABLES[0].clauses;
      var joins = qryEle.JOINS || '';
      var where = qryEle.WHERE ? ' where ' + qryEle.WHERE : '';

      var previous_record = [];
      // console.log(qryEle);

      if (qry_typ == 'SELECT' || qry_typ == 'INSERT') {
            var get_records = `select count(*) as count from ${tbl_nm} ${joins} ${where}`;
            // console.log(get_records);

            conn_execSQL(qryEle, get_records, ConPool, cntxtDtls, userDtls, function (pq_err, results) {
                  if (pq_err) {
                        callback(pq_err, results);
                        return;
                  }
                  previous_record = results;
                  // console.log('previous_record', previous_record.length);

                  if (qry_typ == 'SELECT') {
                        if (audit.max_slct && audit.max_slct < previous_record.length) {
                              log.err(std.message.LIMIT_EXCEED_ERROR.message);
                              callback(true, 0);
                              return;
                        }
                  } else if (qry_typ == 'INSERT') {
                        if (audit.max_insrt && audit.max_insrt < previous_record.length) {
                              log.err(std.message.LIMIT_EXCEED_ERROR.message);
                              callback(true, 0);
                              return;
                        }
                  }
                  // Execute actual query
                  conn_execSQL(qryEle, query, ConPool, cntxtDtls, userDtls, function (err, results) {
                        if (err) {
                              callback(err, results);
                              return;
                        }
                        // console.log(audit);
                        var adt_qry = `insert into adt_sql_dtl_t (tbl_id, prmry_ky_vl, old_rcrd, nw_rcrd, qry_tx, adt_usr_id, i_ts) VALUES (${audit.tbl_id},null, null , null, ${JSON.stringify(query)}, ${userDtls ? userDtls.mrcht_usr_id : 0}, current_timestamp());`;
                        // console.log(adt_qry);
                        conn_execSQL(qryEle, adt_qry, ConPool, cntxtDtls, userDtls, function (adt_err, adt_results) {
                              if (adt_err) {
                                    callback(adt_err, adt_results);
                                    return;
                              }
                              callback(err, results);
                        });
                  })
            })
      }
      else if (qry_typ == 'UPDATE' || qry_typ == 'DELETE') {
            var get_records = `select * from ${tbl_nm} ${joins} ${where}`;
            // console.log(get_records);
            conn_execSQL(qryEle, get_records, ConPool, cntxtDtls, userDtls, function (pq_err, results) {
                  if (pq_err) {
                        callback(pq_err, results);
                        return;
                  }
                  previous_record = results;
                  // console.log('previous_record', previous_record.length);
                  if (qry_typ == 'UPDATE') {
                        if (audit.max_updt && audit.max_updt < previous_record.length) {
                              log.err(std.message.LIMIT_EXCEED_ERROR.message);
                              callback(true, results);
                              return;
                        }
                  } else if (qry_typ == 'DELETE') {
                        if (audit.max_dlt && audit.max_dlt < previous_record.length) {
                              log.err(std.message.LIMIT_EXCEED_ERROR.message);
                              callback(true, results);
                              return;
                        }
                  }

                  // Execute actual query
                  conn_execSQL(qryEle, query, ConPool, cntxtDtls, userDtls, function (err, results) {
                        if (err) {
                              callback(err, results);
                              return;
                        }
                        // console.log('query', results);

                        // Get Current Records
                        conn_execSQL(qryEle, get_records, ConPool, cntxtDtls, userDtls, function (cq_err, current_record) {
                              // console.log('current_record', current_record.length);
                              if (cq_err) {
                                    callback(cq_err, results);
                                    return;
                              }

                              // Insert Current & Previous Records based on actual table primary key..
                              for (var i = 0; i < previous_record.length; i++) {
                                    let prmy_kys = [], prmy_kys_vl = '';
                                    if (audit.prmry_ky.indexOf(',') != -1) prmy_kys = audit.prmry_ky.split(',');
                                    else prmy_kys = [audit.prmry_ky];

                                    for (var p = 0; p < prmy_kys.length; p++) {
                                          prmy_kys[p] = prmy_kys[p].trim();
                                          if (!previous_record[i][prmy_kys[p]]) prmy_kys_vl = '';
                                          else prmy_kys_vl += previous_record[i][prmy_kys[p]] + ',';
                                    }

                                    var adt_qry = `insert into adt_sql_dtl_t (tbl_id, prmry_ky_vl, old_rcrd, nw_rcrd, qry_tx, adt_usr_id, i_ts) VALUES (${audit.tbl_id}, '${prmy_kys_vl}', '${JSON.stringify(previous_record[i])}', '${JSON.stringify(current_record[i])}', ${JSON.stringify(query)}, ${userDtls ? userDtls.mrcht_usr_id : 0}, current_timestamp());`;
                                    // console.log(adt_qry);
                                    conn_execSQL(qryEle, adt_qry, ConPool, cntxtDtls, userDtls, function (adt_err, adt_results) {
                                          if (adt_err) {
                                                callback(adt_err, adt_results);
                                                return;
                                          }
                                          callback(err, results);
                                    });
                              }
                        });
                  });
            })
      } else {
            conn_execSQL(qryEle, query, ConPool, cntxtDtls, userDtls, function (err, results) {
                  if (err) return callback(err, null);
                  callback(err, results);
            });
      }
}

function conn_execSQL(qryEle, Qry, ConPool, cntxtDtls, userDtls, fnm, callback) {
      // console.log(Qry);
	  var qrychk=Qry;
      var whr = qrychk.toUpperCase().includes('WHERE');
      var shwdb = qrychk.toUpperCase().includes('SHOW ');
      ConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
            if (err) { log.db.conError(cntxtDtls, Qry, err.code, err.fatal); 
			//connection.release();   
			callback(err, null); 
			return err; }
			var adt_qry = `insert into adt_sql_dtl_t (tbl_id, qry_tx, adt_usr_id,old_rcrd, i_ts) VALUES ("1",${JSON.stringify(Qry)}, ${userDtls ? userDtls.mrcht_usr_id : 0},'${fnm}', current_timestamp());`;
            // console.log(adt_qry);
            connection.query(adt_qry, function (err, rows) {
                                    
            });
            // Execute the query
			if(qryEle.TYPE == 'DELETE'){
				if(qryEle.TABLES[0].name == 'subscriber_app_retrack_pckgs' || qryEle.TABLES[0].name == 'inv_stpbx_lst_s' || qryEle.TABLES[0].name == 'pckge_iptv_chnle_stg_t'){
					connection.query(Qry, function (err, rows) {
						console.log("came delete")
					  connection.release();                  // Release connection back to Pool  
					  if (err) { log.db.qryError("ERROR", cntxtDtls, Qry, err.code, err.sqlMessage); callback(err, null); return; } // Handle Query Errors         
					  callback(false, rows);                 // Send the results back  
					  return;
					});
				}else {
					connection.release();
                        console.log("1 connection release");
						console.log("1 connection release");
                           let err = {
                                 code :200,
                                 msg : "Source IP Captured"
                           }
                        callback(false, err);
                        return; 
				}
			} else if(qryEle.TYPE == 'UPDATE' && !whr ){
                  connection.release();
                  console.log("1 connection release");
                        let err = {
                              code :200,
                              msg : "Source IP Captured"
                        }
                  callback(false, err);
             } else if( shwdb  ){
                  connection.release();
                  console.log("1 connection  release");
                        let err = {
                              code :200,
                              msg : "Source IP Captured"
                        }
                  callback(false, err);
            } else {
            connection.query(Qry, function (err, rows) {
				console.log("came")
                  connection.release();                  // Release connection back to Pool  
                  if (err) { log.db.qryError("ERROR", cntxtDtls, Qry, err.code, err.sqlMessage); callback(err, null); return; } // Handle Query Errors         
                  callback(false, rows);                 // Send the results back  
                  return;
            });
			}
      });
};

/**************************************************************************************
* Controller     : makeRandomPassword
* Parameters     : req,res()
* Description    : Random Password Generation
* Change History :
* 29/02/2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.makeRandomPassword = function () {
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*&%$#@!";
      const lengthOfCode = 8;
      let text = "";
      for (let i = 0; i < lengthOfCode; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
}
