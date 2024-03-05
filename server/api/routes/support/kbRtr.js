var kbRtr = require('express').Router();
var checkUser 			= require(appRoot +'/server/api/modules/general/auth/controllers/accessCtrl');

// Routes specific to "kb" module
 
var kbCtrl				= require(appRoot +'/server/api/modules/support/controllers/kbCtrl');

kbRtr.post('/section', 			checkUser.hasToken, kbCtrl.add_kbSectionCtrl);
kbRtr.put('/section', 			checkUser.hasToken, kbCtrl.updt_kbSectionCtrl);
kbRtr.delete('/section', 			checkUser.hasToken, kbCtrl.dlt_kbSectionCtrl);
kbRtr.get('/sections/:page_id', 			checkUser.hasToken, kbCtrl.get_kbSectionsCtrl);

kbRtr.post('/page', 			checkUser.hasToken, kbCtrl.get_kbPageCtrl);

// froala editor routes
kbRtr.post('/froalaImgUpld', checkUser.hasToken, kbCtrl.froalaImgUpld);
kbRtr.post('/froalaVideoUpld', checkUser.hasToken, kbCtrl.froalaVideoUpld);
kbRtr.post('/froalaDltFile', checkUser.hasToken, kbCtrl.froalaDltFile);

module.exports = kbRtr;