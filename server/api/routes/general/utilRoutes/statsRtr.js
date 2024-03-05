var dbRtr = require('express').Router();

var wikiCtrl = require('../../modules/wiki/controllers/wikiCtrl');
var checkUser = require('../../modules/general/auth/controllers/accessCtrl');

/****************************************************************
					DB Routes
*****************************************************************/
dbRtr.get('/db/stats', checkUser.hasToken, checkUser.canRead("ctlg"), wikiCtrl.get_CtlgList_Ctrl);
dbRtr.post('/dbr/killall', checkUser.hasToken, checkUser.canCreate("ctlg"), wikiCtrl.insrt_CtlgList_Ctrl);


/****************************************************************
					DB Routes End
*****************************************************************/


module.exports = wikiRtr;