var reportRtr = require('express').Router();
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');
var reportCntrl = require(appRoot + '/server/api/modules/general/reports/controllers/reportCntrl');

reportRtr.get('/ctgrylst', reportCntrl.ctgrylstCtrl);
reportRtr.get('/rprtlst/:id/',checkUser.hasToken, reportCntrl.rprtlstCtrl);
// reportRtr.post('/ctgryrptlst', reportCntrl.ctgryrptlstCtrl);
reportRtr.get('/report/options', checkUser.hasToken, reportCntrl.getReportoptionsCtrl);

reportRtr.get('/report/profiles', checkUser.hasToken, reportCntrl.getrptprflstCtrl);

reportRtr.post('/add/report/profile', checkUser.hasToken, reportCntrl.insReprtProfileCtrl); //Add Menu Profile

reportRtr.post('/update/report/profile', checkUser.hasToken, reportCntrl.updreportprofileCtrl);

reportRtr.delete('/profile/:rpt_prfle_id', checkUser.hasToken, reportCntrl.delRptProfileCtrl);

reportRtr.post('/add/user/report/profile', checkUser.hasToken, reportCntrl.insUserReportPrfleCtrl);

module.exports = reportRtr;
