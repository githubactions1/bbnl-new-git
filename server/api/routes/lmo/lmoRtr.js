var lmoRtr = require('express').Router();
var checkUser 			= require(appRoot +'/server/api/modules/general/auth/controllers/accessCtrl');
var lmoCtrl =  require(appRoot +'/server/api/modules/lmo/controllers/lmoctrl');

lmoRtr.get('/lmos', 			checkUser.hasToken , lmoCtrl.get_lmos);

lmoRtr.get('/terms_cndtnRtr', 			checkUser.hasToken , lmoCtrl.get_trmsCndtnsCtrl);

lmoRtr.post('/newLMOroles', lmoCtrl.insrtLmo_mrchnt_roles);

module.exports = lmoRtr;