var sqlRtr = require('express').Router();
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');
var sqlCtrl = require(appRoot +'/server/api/modules/general/reports/controllers/customReportCtrl');

sqlRtr.get('/querydata/:id', checkUser.hasToken, sqlCtrl.getqueryDetails);
sqlRtr.post('/querypstDtls', checkUser.hasToken,sqlCtrl.saveSqlAsReport);
sqlRtr.post('/getquery', checkUser.hasToken,sqlCtrl.getquery);
sqlRtr.get('/grouplist', checkUser.hasToken,sqlCtrl.getgrpLst);
sqlRtr.get('/catgrylist', checkUser.hasToken,sqlCtrl.getctgryLst);
sqlRtr.post('/reportgroupsrltn', checkUser.hasToken,sqlCtrl.pstgrps);
sqlRtr.post('/reportctgryrltn', checkUser.hasToken,sqlCtrl.pstctgrs);
sqlRtr.get('/fltrslist', checkUser.hasToken,sqlCtrl.getfltrsLst);
sqlRtr.post('/reportfiltrsrltn', checkUser.hasToken,sqlCtrl.pstfiltrs);
sqlRtr.post('/getrptfltrsdata', checkUser.hasToken,sqlCtrl.getrptfltrsrltn);
sqlRtr.post('/reportfiltrsrltntwo', checkUser.hasToken,sqlCtrl.pstfiltrstwo);
sqlRtr.post('/getallrptdetails', checkUser.hasToken,sqlCtrl.getallRptDetails);
sqlRtr.get('/distrctLst/:id', checkUser.hasToken,sqlCtrl.getdsrtctLst);
sqlRtr.get('/mandalLst/:id', checkUser.hasToken,sqlCtrl.getmndlLst);
sqlRtr.get('/designationLst', checkUser.hasToken,sqlCtrl.getdesgntnLst);
sqlRtr.post('/reportPrflesrltntwo', checkUser.hasToken,sqlCtrl.pstprflestwo);
sqlRtr.post('/postTodefaultValues', checkUser.hasToken,sqlCtrl.pstForDefaultDetails);
sqlRtr.post('/reportqrycolumns', checkUser.hasToken,sqlCtrl.rptcolumns);
sqlRtr.get('/chkrpt/:rpt_id', checkUser.hasToken,sqlCtrl.chckRptcrtl);
sqlRtr.get('/getOnlyCustmRptsDetails', checkUser.hasToken,sqlCtrl.gercustmRptDtls);
sqlRtr.post('/updatecolumnsData', checkUser.hasToken,sqlCtrl.updatecolumns);
sqlRtr.post('/updateReportData', checkUser.hasToken,sqlCtrl.updatereportData);
sqlRtr.post('/getStatusrprt', checkUser.hasToken,sqlCtrl.getStatusrprtCtrl);
sqlRtr.get('/customReportslist', checkUser.hasToken,sqlCtrl.getcustomreports);
sqlRtr.get('/standedvariableslist', checkUser.hasToken,sqlCtrl.getStandedvariables);
sqlRtr.get('/dbconnectionlist', checkUser.hasToken,sqlCtrl.getDbconnection);


sqlRtr.get('/stdCodes/:dist_id', checkUser.hasToken,sqlCtrl.getstdCode);
sqlRtr.get('/stdCdMndls/:dist_id/:mndl_id/:std_cd', checkUser.hasToken,sqlCtrl.getstdCodeMandals);

sqlRtr.get('/getColumnDetailsForEdit/:id', checkUser.hasToken,sqlCtrl.getcolumnDetailsForEdit);
















module.exports = sqlRtr; 

