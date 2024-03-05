var merchantRtr = require('express').Router();

const acntsCtrl = require(appRoot +'/server/api/modules/merchant/controllers/accountsCtrl');
const aprvlsCtrl = require(appRoot +'/server/api/modules/merchant/controllers/approvalsCtrl');
const dshbrdCtrl = require(appRoot +'/server/api/modules/merchant/controllers/dashboardCtrl');
const dprtCtrl = require(appRoot +'/server/api/modules/merchant/controllers/departmentsCtrl');
const dsgnCtrl = require(appRoot +'/server/api/modules/merchant/controllers/designationsCtrl');
const empleCtrl = require(appRoot +'/server/api/modules/merchant/controllers/employeesCtrl');
const lctnsCtrl = require(appRoot +'/server/api/modules/merchant/controllers/locationsCtrl');
const usrsdCtrl = require(appRoot +'/server/api/modules/merchant/controllers/usersCtrl');
const rlesCtrl = require(appRoot +'/server/api/modules/merchant/controllers/rolesCtrl');
const orgnsCtrl = require(appRoot +'/server/api/modules/merchant/controllers/organizationsCtrl');

const mrcntsCtrl = require(appRoot +'/server/api/modules/merchant/controllers/merchantsCtrl');
const otltsCtrl = require(appRoot +'/server/api/modules/merchant/controllers/outletsCtrl');

const merchantCtrl = require(appRoot +'/server/api/modules/merchant/controllers/merchantCtrl');

var checkUser = require('../../modules/general/auth/controllers/accessCtrl');



// //Location routes
merchantRtr.get('/locations', merchantCtrl.merch_get_locC);
merchantRtr.post('/locations', merchantCtrl.merch_add_locC);
merchantRtr.put('/locations', merchantCtrl.merch_updt_locC);
merchantRtr.delete('/locations/:id', merchantCtrl.merch_del_locC);

// //Account routes
// merchantRtr.get('/account/:id', merchantCtrl.getMrchntAccntCntrl);
// merchantRtr.post('/account', merchantCtrl.insrtMrchntAccntCntrl);
// merchantRtr.put('/account', merchantCtrl.updateMrchntAccntCntrl);
// merchantRtr.delete('/account/:id', merchantCtrl.deltMrchntAccntCntrl);


// //Organization routes
// merchantRtr.get('/organization', merchantCtrl.getOrgnztnCntrl);
//  merchantRtr.post('/organization', merchantCtrl.insrtOrgnztnCntrl);
// merchantRtr.put('/organization', merchantCtrl.updateOrgnztnCntrl);
// merchantRtr.delete('/organization/:id', merchantCtrl.deltOrgnztnCntrl);

// //Outlet routes
// merchantRtr.post('/outlet/list', merchantCtrl.getOutltCntrl);
// merchantRtr.post('/outlet', merchantCtrl.insrtOutltCntrl);
// merchantRtr.put('/outlet', merchantCtrl.updateOutltCntrl);
// merchantRtr.delete('/outlet/:id', merchantCtrl.deltOutltCntrl);
// merchantRtr.get('/outlets/category', merchantCtrl.getOutltCtgryCntrl);

// //Designation routes
// merchantRtr.get('/designation', merchantCtrl.getDsgntnCntrl);
// merchantRtr.post('/designation', merchantCtrl.insrtDsgntnCntrl);
// merchantRtr.put('/designation', merchantCtrl.updateDsgntnCntrl);
// merchantRtr.delete('/designation/:id', merchantCtrl.deltDsgntnCntrl);


// //Department routes
// merchantRtr.get('/department/:id', merchantCtrl.getDprtmntLstCntrl);
// merchantRtr.post('/department', merchantCtrl.insrtDprtmntCtrl);
// merchantRtr.put('/department', merchantCtrl.updateDprtmntCtrl);
// merchantRtr.delete('/department/:id', merchantCtrl.deltDprtmntCtrl);


// //Employe routes
// merchantRtr.get('/employes/:id', merchantCtrl.getMrchntEmplsLstCntrl);
// merchantRtr.post('/employes', merchantCtrl.insrtMrchntEmpCtrl);
// merchantRtr.put('/employes', merchantCtrl.updateMrchntEmpCtrl);
// merchantRtr.delete('/employes/:id', merchantCtrl.deltMrchntEmpCtrl);

// //Employee Groups
// merchantRtr.get('/employesbyGrps/:id', merchantCtrl.getMrchntEmpbyGrpsCtrl);
// merchantRtr.get('/employeGrps/:id', merchantCtrl.getMrchntEmpGrpsCtrl);
// merchantRtr.post('/employesGrps', merchantCtrl.insrtMrchntEmpGrpCtrl);
// merchantRtr.put('/employesGrps', merchantCtrl.updateMrchntEmpGrpCtrl);


// //Approval Routes
// merchantRtr.post('/apprvl', merchantCtrl.insrtMrchntApprvlCtrl);
// merchantRtr.put('/apprvlSetup', merchantCtrl.updateMrchntSetupCtrl);

// //Terminal routes
// merchantRtr.get('/terminal/:id', merchantCtrl.getTrmnlLstCntrl);
// merchantRtr.post('/terminal', merchantCtrl.insrtTrmnlCtrl);
// merchantRtr.put('/terminal', merchantCtrl.updateTrmnlCtrl);
// merchantRtr.delete('/terminal/:id', merchantCtrl.deltTrmnlCtrl);


// //Transaction routes
// merchantRtr.get('/transaction/:id', merchantCtrl.getMrchntTrnscCntrl);
// merchantRtr.get('/transaction/:id/:trnscId', merchantCtrl.getMrchntTrnscDtlsCntrl);
// merchantRtr.get('/transaction/:id/:frmdt/:todt', merchantCtrl.getMrchntTrnscDateFltrCntrl);


// //Statement routes
// merchantRtr.get('/stmnt/:id/:frmdt/:todt', merchantCtrl.getMrchntStmntCntrl);

// //Dashboard routes
// merchantRtr.get('/dashboard/:id', merchantCtrl.getMrchntDshbrdCntrl);
// merchantRtr.get('/dashboard/:id/:otletId', merchantCtrl.getMrchntDshbrdDtlsCntrl);


// //Offers routes
// merchantRtr.get('/offers/:mrchntID/:mnu_itm_id', merchantCtrl.getMrchntOffrsCtrl);
// merchantRtr.post('/offers', merchantCtrl.insrtMrchntOffrsCtrl);
// merchantRtr.put('/offers', merchantCtrl.updateMrchntOffrsCtrl);
// merchantRtr.delete('/offers/:mrchntID/:id', merchantCtrl.deltMrchntOffrsCtrl);
// merchantRtr.get('/templates', merchantCtrl.getTemplatesCtrl);
// merchantRtr.get('/template_details/:tmpltId', merchantCtrl.getTemplateDtlsCtrl);
// merchantRtr.post('/template_details', merchantCtrl.insrtTemplateDtlsCtrl);

// //LoadNPay routes
// merchantRtr.get('/loadnpay/:mrchntID', merchantCtrl.getMrchntLoadNPayCtrl);
// merchantRtr.post('/loadnpay', merchantCtrl.insrtMrchntLoadNPayCtrl);
// merchantRtr.get('/loadnpay/:mrchntID/:id', merchantCtrl.getMrchntLoadNPayDtlCtrl);
// //merchantRtr.put('/loadnpay', merchantCtrl.updateMrchntLoadNPayCtrl);

// //LoadNCollect routes
// merchantRtr.get('/loadncollect/:mrchntID', merchantCtrl.getMrchntLoadNCollectCtrl);
// merchantRtr.post('/loadncollect', merchantCtrl.insrtMrchntLoadNCollectCtrl);
// merchantRtr.get('/loadncollect/:mrchntID/:id', merchantCtrl.getMrchntLoadNCollectDtlCtrl);
// //merchantRtr.put('/loadncollect', merchantCtrl.updateMrchntLoadNCollectCtrl);

// //Counter routes
// merchantRtr.get('/counter/:id', merchantCtrl.getMrchntCntrCntrl);
// merchantRtr.post('/counter', merchantCtrl.insrtMrchntCntrCtrl);
// merchantRtr.put('/counter', merchantCtrl.updateMrchntCntrCtrl);
// merchantRtr.delete('/counter/:id', merchantCtrl.deltMrchntCntrCtrl);



// //Merchant  routes
// merchantRtr.get('/merchant/:id', merchantCtrl.getMrchntCntrl);
// merchantRtr.post('/merchant', merchantCtrl.insrtMrchntCtrl);
// merchantRtr.put('/merchant', merchantCtrl.updateMrchntCtrl);
// merchantRtr.delete('/merchant/:id', merchantCtrl.deltMrchntCtrl);




// //Merchant users routes
// merchantRtr.get('/mrchntUsers/:id', merchantCtrl.getMrchntUsrCntrl);
// merchantRtr.post('/mrchntUsers', merchantCtrl.insrtMrchntUsrCtrl);
// merchantRtr.put('/mrchntUsers', merchantCtrl.updateMrchntUsrCtrl);
// merchantRtr.delete('/mrchntUsers/:id', merchantCtrl.deltMrchntUsrCtrl);




// // Merchant Documentaion routes
// merchantRtr.post('/documentation', merchantCtrl.upldMrchntDoc);

// merchantRtr.get('/roles', merchantCtrl.get_mrchnt_roles);
// merchantRtr.post('/roles', merchantCtrl.insrt_mrchnt_roles);
// merchantRtr.put('/roles/:id', merchantCtrl.updt_mrchnt_roles);

// // Members Routes
// merchantRtr.post('/member',merchantCtrl.insrt_membr_Ctrl)


// // Menu Route
// merchantRtr.get('/profiles', checkUser.hasToken, merchantCtrl.get_profiles_Ctrl)
merchantRtr.get('/menu/items', checkUser.hasToken, merchantCtrl.get_mnuitms_Ctrl)
// merchantRtr.put('/menu/active', checkUser.hasToken, merchantCtrl.actve_mnuitm_Ctrl)
// merchantRtr.put('/menu/sqnce', checkUser.hasToken, merchantCtrl.updt_sqnce_mnu)
// merchantRtr.delete('/menu/active/:id', checkUser.hasToken, merchantCtrl.inactve_mnuitm_Ctrl)

// //member ship
// merchantRtr.get('/mrchntdetls', merchantCtrl.get_mrchntdetails);
// merchantRtr.get('/userdetls', merchantCtrl.get_userdetails);











module.exports = merchantRtr;