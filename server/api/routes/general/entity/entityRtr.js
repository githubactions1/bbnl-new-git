var entityRtr = require('express').Router();
var checkUser 			= require(appRoot +'/server/api/modules/general/auth/controllers/accessCtrl');
var entityCtrl =  require(appRoot +'/server/api/modules/general/entity/controllers/entityCtrl');
var mdfyCtrl =  require(appRoot +'/server/api/modules/externalApis/controllers/mdfyCtrl');


entityRtr.get('/entity',checkUser.hasToken , 		entityCtrl.get_entity);
entityRtr.get('/actions/:id',checkUser.hasToken , 		entityCtrl.get_actions);
entityRtr.get('/status/:id',checkUser.hasToken , 		entityCtrl.get_status);
entityRtr.post('/extapidtls',checkUser.hasToken , 		entityCtrl.get_extapidtls);
entityRtr.get('/extrnlapirqstdtl/:id',checkUser.hasToken , 		entityCtrl.get_extrnlapirqstdtlsCtrl);
entityRtr.post('/retry',checkUser.hasToken , 		entityCtrl.retryCtrl);
module.exports = entityRtr;