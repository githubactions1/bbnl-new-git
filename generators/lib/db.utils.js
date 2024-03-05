var mysql           = require('mysql');

var MySQLConnection = {};
var MySQLConPool	  = {};

var USER = 'bbnlmysql';
var PWD = 'MysQl#123';
//var PWD = 'w4b@pp!0D';
var DATABASE = 'BSS_ONLINE_U';
var DB_HOST_NAME = '172.17.4.182';
var DB_PORT = '3306';
var MAX_POOL_SIZE		= 10;
var MIN_POOL_SIZE		= 5;

var ConPool = mysql.createPool({
        host                : DB_HOST_NAME,
        user                : USER,
        password            : PWD,
        database            : DATABASE,
        port: DB_PORT,
        acquireTimeout	    : 5000,
        connectionLimit	    : MAX_POOL_SIZE,
        debug 		    : false,
        multipleStatements  : true,
        supportBigNumbers   : true,
        port: DB_PORT
}); 

var execute_sql= function(sql,h,d,u,p) {

}


exports.conn_execSQL= function(Qry,  callback) {
      ConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
            if (err) {  callback(err, null); return err; }

            // Execute the query
            connection.query(Qry, function (err, rows) {
                  connection.release();                  // Release connection back to Pool  
                  if (err) { callback(err, null); return; } // Handle Query Errors         
                  callback(false, rows);                 // Send the results back  
                  return;
            });
      });
};