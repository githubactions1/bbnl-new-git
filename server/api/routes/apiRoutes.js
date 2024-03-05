

/**************************************************************************
 REFER A DOCUMENT WHEN CREATING A NEW ROUTE (SERVER/DOCUMENT/AUTHORISATION)
 **************************************************************************/

var express = require('express');
var router = express.Router();

//Include Controller
var checkUser = require('../modules/general/auth/controllers/accessCtrl');
var authCtrl = require('../modules/general/auth/controllers/authCtrl');
var adminCtrl = require('../modules/admin/controllers/adminCtrl');
var ticketSystemCtrl = require('../modules/ticketSystem/controllers/ticketSystemCtrl');
var directoryCtrl = require('../modules/directory/controllers/directoryCtrl');
var dataMigrationCtrl = require('../modules/dataMigration/controllers/dataMigrationCtrl');
var curlCtrl = require('../modules/curl/controllers/curlCtrl');
//***********new addded router for subscriber app************
router.use('/subscriberApp', require(appRoot + '/server/api/routes/subscriberApp/sbscrRtr'));
// **************** enterprise api ***************************
router.use('/extrnlentrprse', require(appRoot + '/server/api/routes/enterprisecafdtlextrnl/extrnlcafdtlsRtr'));
//var appCtrl     		= require('../../controllers/apiv1/application/appCtrl');
router.use('/alert', require(appRoot + '/server/api/routes/general/alerts/alertsRtr'));
router.use('/user', require(appRoot + '/server/api/routes/general/umRoutes/umRtr'));
router.use('/lmoprepaid', require(appRoot + '/server/api/routes/prepaidlmo/prepaidlmortr'));
router.use('/reports', require(appRoot + '/server/api/routes/general/reports/reportRtr'));
router.use('/appstore', require(appRoot + '/server/api/routes/general/appstore/appstoreRtr'));
router.use('/sql', require(appRoot + '/server/api/routes/general/reports/customReportsRtr'));
router.use('/maps', require(appRoot + '/server/api/routes/general/maps/mapsRtr'));
router.use('/batch', require(appRoot + '/server/api/routes/general/batch/batchRtr'));
router.use('/support', require(appRoot + '/server/api/routes/support/supportRtr'));
router.use('/kb', require(appRoot + '/server/api/routes/support/kbRtr'));
router.use('/common', require(appRoot + '/server/api/routes/general/common/commonRtr'));
router.use('/entity', require(appRoot + '/server/api/routes/general/entity/entityRtr'));
/****************************************************************
 Application Routes
 *****************************************************************/
router.use('/merchant', checkUser.hasToken, require(appRoot + '/server/api/routes/merchant/merchantRtr'));
router.use('/admin', require(appRoot + '/server/api/routes/admin/adminRtr'));
router.use('/caf', require(appRoot + '/server/api/routes/caf/cafRtr'));
router.use('/extApi', require(appRoot + '/server/api/routes/externalApis/externalApiRtr'));
router.use('/lmo', require(appRoot + '/server/api/routes/lmo/lmoRtr'));
router.use('/package', require(appRoot + '/server/api/routes/packages/packageRtr'));
router.use('/packages/addons', require(appRoot + '/server/api/routes/packages/packageRtr'));
router.use('/erp', require(appRoot + '/server/api/routes/erp/erpRtr'));
router.use('/crm', require(appRoot + '/server/api/routes/crm/enterpriseCustomerRtr'));
router.use('/crm/customer', require(appRoot + '/server/api/routes/crm/customersRtr'));
router.use('/inventory', require(appRoot + '/server/api/routes/inventory/inventoryRtr'));
router.use('/agent', require(appRoot + '/server/api/routes/agents/agentRtr'));
router.use('/billing', require(appRoot + '/server/api/routes/billing/billingRtr'));
router.use('/extApi', require(appRoot + '/server/api/routes/externalApis/externalApiRtr'));
// router.use('/baseproject', require(appRoot + '/server/api/routes/baseproject/baseprojctRtr'));
router.use('/olt', require(appRoot + '/server/api/routes/olt/oltRtr'));
router.use('/ticket', require(appRoot + '/server/api/routes/support/ticketRtr'));


router.use('/ont', require(appRoot + '/server/api/routes/ont/ontRtr'));
router.use('/videos', require(appRoot + '/server/api/routes/videos/videoRtr'));

// operations related 
router.use('/operation', require(appRoot + '/server/api/routes/operations/operationRtr'));
/****************************************************************
 Client App Routes
 *****************************************************************/
router.use('/client/app/', require(appRoot + '/server/api/routes/clientApp/clientAppRtr'));

router.use('/addons', require(appRoot + '/server/api/routes/addons/addonsRtr'));
router.use('/fcm/notifcaions', require(appRoot + '/server/api/routes/push_notifications/pushNtfyRtr'));

router.use('/dashbrd', require(appRoot + '/server/api/routes/dashboard/dashboardRtr'));
router.use('/bbnl', require(appRoot + '/server/api/routes/bbnl/bbnlRtr'));
/****************************************************************
 Authentication Routes
 *****************************************************************/

/**** login ****/
router.post("/login", authCtrl.login_sess);
router.post("/login_new", authCtrl.login_sess_new);
router.get("/login/capcha", authCtrl.generateCaptchaCntrl);

/***** subscriber app login ******/
router.post("/subscriberApplogin", authCtrl.login_sbscrbr_app_sess);
router.post("/subscriberApploginDtls", authCtrl.login_sbscrbr_dtls_app_sess);

router.post("/client/user/:usrId", authCtrl.getClntUsr);
router.get("/audit/users", checkUser.hasToken, authCtrl.getUsrsAdt);

/**** Select Organization ****/
router.get("/getOrgnsLst", checkUser.hasToken, authCtrl.getOrgnsLst);

/**** Go to login page ****/
router.get("/goToLgn/:tnt_id", authCtrl.get_goToLgn);
router.post("/contactus", authCtrl.contactus);

/**** forgot password ****/
router.post("/forget_password", authCtrl.forget_pwd);

/**** subscriber app forgot password ****/
router.post("/subscriberAppforget_password", authCtrl.sbscrbd_app_forget_pwd);

/**** change password ****/
router.post("/change_password", authCtrl.change_pwd);

/**** subscriber app change password ****/
router.post("/subscriberAppchange_password", authCtrl.sbscrbd_app_change_pwd);

/**** reset password ****/
router.post("/reset_password", checkUser.hasToken, authCtrl.reset_pwd);

router.post("/subscriberAppReset_password",  authCtrl.sbscr_app_reset_pwd);

router.post('/match_old_new_password', checkUser.hasToken, authCtrl.matchOldNewPwd)

router.get("/logout", checkUser.hasToken, authCtrl.logout_sess);

/***** subscriber app logout ******/
router.get("/subscriberApplogout", authCtrl.logout_sbscrbr_app_sess);

/**** otp verification ****/
router.post("/otpValidation", authCtrl.validateOtp);

/**** User Registration User Check & Send OTP ****/
router.post('/register/send_otp', authCtrl.sendOtp);

/**** Forgot Password User Check & Send OTP ****/
router.post('/forgot-password/send_otp', authCtrl.forget_pwd_sendOtp);
router.post('/auth/forgot-password/send_otp', authCtrl.forget_pwd_sendOtp);


/**** Phonenumber chnage through OTP ****/
router.post('/auth/phnVerification/send_otp', authCtrl.sendPhnVrctnOtp);
router.post("/change_phoneNumber", authCtrl.change_phnum);

router.get('/client/report', checkUser.hasToken, adminCtrl.getClientReport);
router.post('/client/report', checkUser.hasToken, adminCtrl.updtClientReport);

router.get('/appver/appUpdtDtl/:app_id/:vrsn_nu', adminCtrl.appUpdtDtl);
router.get('/appver/lclstrgdta/:lcl_vrsn', adminCtrl.lclstrgdta);

router.get('/user/permissions/:prm_txt', checkUser.hasToken, authCtrl.getUsrPrmsDataCtrl);


// *************************middle ware routes**************
router.use('/middleware', require(appRoot + '/server/api/routes/middle_ware/middleWareRtr'));


// *************************prepaid routes**************
router.use('/prepaid', require(appRoot + '/server/api/routes/prepaid/prepaidRtr'));


// /*********************************  Request Monitoring System  ***************************************************************/
// router.get('/ticket-system/search-filetkts/:file_nu', ticketSystemCtrl.searchfilenumber);
// router.get('/ticket-system/menuLst/:clnt_id/:tnt_id/:usr_id', ticketSystemCtrl.menuProfileLst);
// router.get('/ticket-system/Department-list', ticketSystemCtrl.DepartmentLst);
// router.get('/ticket-system/category-list', ticketSystemCtrl.categoriesLst);
// router.get('/ticket-system/sub-category-list/:cat_id', ticketSystemCtrl.subCategoriesLst);
// router.post('/ticket-system/request-entry', ticketSystemCtrl.requestEntry);
// router.post('/ticket-system/req-entry-list', ticketSystemCtrl.reqEntryList);
// router.get('/ticket-system/req-list/:usr_id', ticketSystemCtrl.reqList);
// router.post('/ticket-system/pending-list', ticketSystemCtrl.pendingList);
// router.get('/ticket-system/pending-timeline-list', ticketSystemCtrl.pendingtimelineList);
// router.post('/ticket-system/pending-timeline-list', ticketSystemCtrl.pendingtimelineList);
// router.get('/ticket-system/check-list/:', ticketSystemCtrl.checkList);
// router.get('/ticket-system/stage-details', ticketSystemCtrl.stageDetails);
// router.post('/ticket-system/forward-chcek-list', ticketSystemCtrl.forwardChckLst);
// router.post('/ticket-system/stage-chat', ticketSystemCtrl.stgWseChat);
// router.post('/ticket-system/atchmnt-lst', ticketSystemCtrl.atchmntLst);
// router.get('/ticket-system/users-lst', ticketSystemCtrl.usersLst);
// router.get('/ticket-system/qr-cd-lst/:qr_cd', ticketSystemCtrl.qrCdLst);
// router.get('/ticket-system/status-lst', ticketSystemCtrl.statusLst);
// router.get('/ticket-system/close-tickets/:usr_id', ticketSystemCtrl.clsdTkts);
// router.get('/ticket-system/req-stg-details/:usr_id/:req_entry_id', ticketSystemCtrl.reqStgDtls);

// router.post('/ticket-system/update-request', ticketSystemCtrl.updateRequestInfo);

// router.post('/ticket-system/close-request', ticketSystemCtrl.closeRequest);
// router.post('/updateuser/:reqid', ticketSystemCtrl.updtusrCtrl);
// router.put('/ticket-system/archive-request', ticketSystemCtrl.archiveRequest);
// router.put('/ticket-system/unarchive-request', ticketSystemCtrl.unarchiveRequest);

// router.post('/ticket-system/otpbyid', ticketSystemCtrl.otpRequest);
// router.post('/ticket-system/req-entry-list-public', ticketSystemCtrl.reqEntryListPub);
// router.get('/ticket-system/archived-request-list/:req_entry_id/:ind', ticketSystemCtrl.archiveRequestLst);
// router.post('/ticket-system/analsys-request', ticketSystemCtrl.analysRequest);
// router.get('/ticket-system/ofcr-wse-rqst-mntr/:field/:usr_id', ticketSystemCtrl.ofcrWseRqstmntr);
// router.get('/ticket-system/dprt-wse-rqst-mntr/:field/:dprtmnt_id', ticketSystemCtrl.dprtWseRqstmntr);

// router.post('/ticket-system/dept-reprt', ticketSystemCtrl.departmentreport);
// router.post('/ticket-system/user-reprt', ticketSystemCtrl.userreport);

// router.post('/ticket-system/dashboard-req-entry-list', ticketSystemCtrl.dashboardEntryList);
// router.post('/ticket-system/dshbrd-list', ticketSystemCtrl.usrDshbrdList);
// router.post('/ticket-system/usr-dshbrd-rnge', ticketSystemCtrl.usrDshbrdrng);

// router.post('/ticket-system/overalldshbrd-list', ticketSystemCtrl.overallDshbrdList);
// router.put('/ticket-system/fcmtk',ticketSystemCtrl.fcmRequest)
// router.put('/ticket-system/send-notification',ticketSystemCtrl.sendPushNotificationCtrl)
// router.post('/ticket-system/informed-to', ticketSystemCtrl.infrmdToUsr);



// -- STOP

/****************************************************************
					App related Routess
*****************************************************************/
router.get('/directory/users', checkUser.hasToken, directoryCtrl.userDirectory_get);


/****************************************************************
					Data Migration related Routess
*****************************************************************/
router.get('/migration/oltPorts', dataMigrationCtrl.get_oltPortSlotSplitMigration);

router.get('/dsn/:path/:fm', function (req, res) {
    filepath = path.join(appRoot + '/glits/DSN/') + req.params.path + '/' + req.params.fm;
    console.log(filepath);
    res.download(filepath);

})
router.get('/zte/:path/:fm', function (req, res) {
    filepath = path.join(appRoot + '/glits/ZTC/') + req.params.path + '/' + req.params.fm;
    console.log(filepath);
    res.download(filepath);

})
/****************************************************************
					Prepaid Routes
*****************************************************************/
router.use('/prepaid', require(appRoot + '/server/api/routes/prepaid/prepaidRtr'));


/****************************************************************
					CURL Execution Function
*****************************************************************/
router.post('/execurl', checkUser.hasToken, curlCtrl.exeCurlCtrl);

module.exports = router;

