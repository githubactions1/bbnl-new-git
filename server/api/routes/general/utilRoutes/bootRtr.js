var dbRtr = require('express').Router();

var wikiCtrl = require('../../modules/wiki/controllers/wikiCtrl');
var adminCtrl = require('../modules/admin/controllers/adminCtrl');
var checkUser = require('../../modules/general/auth/controllers/accessCtrl');

/****************************************************************
					DB Routes
*****************************************************************/
dbRtr.get('/bootstrap/reload_all', checkUser.hasToken, checkUser.canCreate("ctlg"), wikiCtrl.insrt_CtlgList_Ctrl);
dbRtr.get('/bootstrap/reload/:boot_variable', checkUser.hasToken, checkUser.canRead("ctlg"), wikiCtrl.get_CtlgList_Ctrl);

router.get('/bootstrap/load_audit_tables', checkUser.hasToken, adminCtrl.getAdtTableLst_C);

/****************************************************************
					DB Routes End
*****************************************************************/


module.exports = wikiRtr;