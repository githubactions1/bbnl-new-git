var umRtr = require('express').Router();
var modRoot = appRoot + '/server/api/modules/general/um/'
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');



var umCtrl = require(modRoot + 'controllers/UserMgtCtrl');
var AppCtrl = require(modRoot + 'controllers/AppMgtCtrl');
var MenuCtrl = require(modRoot + 'controllers/MenuMgtCtrl');
var ReportCtrl = require(modRoot + 'controllers/ReportMgtCtrl');
var SetupCtrl = require(modRoot + 'controllers/SetupMgtCtrl');
var UsrPrfleCtrl = require(modRoot + 'controllers/UsrProfileMgtCtrl');
var permissionsCtrl = require(modRoot + 'controllers/permissionsCtrl');
/****************************************************************
					User Management (um) Module
*****************************************************************/

/**** Users - create, delete, update ****/
umRtr.get('/getall', checkUser.hasToken, umCtrl.allUsersList_get);
umRtr.post('/add', checkUser.hasToken, umCtrl.userCreate_post);
umRtr.post('/u/:id', checkUser.hasToken, umCtrl.updateUser_post);
umRtr.delete('/d/:id', checkUser.hasToken, umCtrl.deleteUser_post);
umRtr.get('/getUsrsWthDsgns', checkUser.hasToken, umCtrl.UsrsWthDsgns_get);
// Force users to change passwords for every 90 days
umRtr.get('/forceChangePassword', checkUser.hasToken, umCtrl._90DysFrcChngePwd_C);
umRtr.post('/add_p', umCtrl.userCreate_post_p);
umRtr.get("/audit/:dt", checkUser.hasToken, umCtrl.getUsrAdt);
umRtr.get('/getPwdResetUsr/:clnt_id/:tnt_id', checkUser.hasToken, umCtrl.PwdResetUsr_get);
// disable inactive user accounts every 90 days
umRtr.get('/inactiveUsers', checkUser.hasToken, umCtrl._90DysInactvUsrs_C);
umRtr.post('/sendmsg', umCtrl.sendMsg_post);
/**** Check User Details ****/
umRtr.post('/check', checkUser.hasToken, umCtrl.check_userCtrl);


/**** User Url Based Access Control ****/
umRtr.get('/acl/usrAccess/:usrid', checkUser.hasToken, umCtrl.userUrlAccess_get);

/**** App Profile Routes ****/
umRtr.get('/getApps/:clnt_id/:tnt_id/:cmpnt_id', checkUser.hasToken, AppCtrl.apps_get);
umRtr.get('/appsLst', checkUser.hasToken, AppCtrl.userappsLst_get);
umRtr.get('/appPrfl/:clnt_id/:tnt_id/:cmpnt_id', checkUser.hasToken, AppCtrl.usersAppPrfl_get);
umRtr.put('/appPrfl/:prfId', checkUser.hasToken, AppCtrl.updtAppPrf);

/**** Menu Profile Routes ****/
umRtr.get('/menuPrfl/:clnt_id/:tnt_id/:cmpnt_id', checkUser.hasToken, MenuCtrl.usersMnuPrfl_get);
umRtr.post('/menu', checkUser.hasToken, MenuCtrl.createMnu_post);
umRtr.post('/menu/:id', checkUser.hasToken, MenuCtrl.updtMnuPrf);
umRtr.delete('/menu/:id', checkUser.hasToken, MenuCtrl.dltMnuPrf);
umRtr.get('/menu/items', checkUser.hasToken, MenuCtrl.menuItems_get);
umRtr.get('/menuLst', checkUser.hasToken, MenuCtrl.usermenu_get);
umRtr.get('/agentApp/leftside-menuLst/:sde_mnu_prfl_id', checkUser.hasToken, MenuCtrl.getAgntAppLeftSideMenu);
umRtr.get('/getMenuItems/:clnt_id/:tnt_id/:cmpnt_id', checkUser.hasToken, MenuCtrl.menuitms_get);
umRtr.post('/updateAppLastRfrsh', checkUser.hasToken, MenuCtrl.updateAppLastRfrsh);
umRtr.post('/getNotificationDetails', checkUser.hasToken, MenuCtrl.getNotificationDetails);
umRtr.post('/getAllNotificationDetails', checkUser.hasToken, MenuCtrl.getAllNotificationDetails);
umRtr.get('/getYoutubeVdes', checkUser.hasToken, MenuCtrl.getYoutubeVdes);

/**** User Profile Management ****/
umRtr.get('/profile', checkUser.hasToken, UsrPrfleCtrl.getMyProfile);
umRtr.post('/profile', checkUser.hasToken, UsrPrfleCtrl.UserProfile_update);
umRtr.get('/user/profiles/:id', checkUser.hasToken, UsrPrfleCtrl.userPrfles_get);
umRtr.post('/update/user/profile', checkUser.hasToken, UsrPrfleCtrl.userPrfle_update);
umRtr.get('/grpPrfl/:cmpnt_id', checkUser.hasToken, UsrPrfleCtrl.userGrpPrflLst_get);

/**** Setup Profile Management ****/
umRtr.get('/setup/profile', checkUser.hasToken, SetupCtrl.userStpPrfle_get);
umRtr.get('/setup/profiles', checkUser.hasToken, SetupCtrl.stpPrflGrpsCtrl);
umRtr.get('/setup/options', checkUser.hasToken, SetupCtrl.getSetupOptionsCtrl);
umRtr.get('/setup/profile/groups', checkUser.hasToken, SetupCtrl.getsetupCtrl);
umRtr.post('/setup/add/profile', checkUser.hasToken, SetupCtrl.setupPrflCrteCtrl);
umRtr.post('/setup/update/profile', checkUser.hasToken, SetupCtrl.updsetupprofileCtrl);
// umRtr.delete('/setup/profiles/:id', checkUser.hasToken, SetupCtrl.dltstpPrf);

umRtr.post('/addDeprt', SetupCtrl.insdeprtCtrl);
umRtr.post('/updDeprt', SetupCtrl.upddepCtrl);
umRtr.delete('/delDeprt/:deprt_id', SetupCtrl.deldepCtrl);
umRtr.get('/departments', SetupCtrl.getdeprtCtrl);

umRtr.post('/adddesgn', SetupCtrl.insdesgnCtrl);
umRtr.post('/upddesgn', SetupCtrl.upddesgnCtrl);
umRtr.delete('/deldesgn/:dsgn_id', SetupCtrl.deldesgnCtrl);
umRtr.get('/designations', SetupCtrl.getdesgnCtrl);

umRtr.post('/new/location', SetupCtrl.inslctnCtrl);
umRtr.post('/updlctn', SetupCtrl.updlctnCtrl);
umRtr.delete('/dellctn/:lctn_id', SetupCtrl.dellctnCtrl);
umRtr.get('/locations', SetupCtrl.getlctnCtrl);

umRtr.post('/addemply', checkUser.hasToken, SetupCtrl.insemplyCtrl);
umRtr.post('/updemply', checkUser.hasToken, SetupCtrl.updemplyCtrl);
umRtr.delete('/delemply/:mrcht_emp_id', SetupCtrl.delemplyCtrl);
umRtr.get('/employees', SetupCtrl.getemplyCtrl);

umRtr.post('/addorgn', SetupCtrl.insorgnCtrl);
umRtr.post('/updorgn', SetupCtrl.updorgnCtrl);
umRtr.delete('/delorgn/:orgn_id', SetupCtrl.delorgnCtrl);
umRtr.get('/organizations', SetupCtrl.getorgnCtrl);

umRtr.post('/addoutlet', checkUser.hasToken, SetupCtrl.insoutletCtrl);
umRtr.post('/updateoutlet', checkUser.hasToken, SetupCtrl.updoutletCtrl);
umRtr.delete('/outlet/:otlt_id', checkUser.hasToken, SetupCtrl.deloutletCtrl);
umRtr.get('/outlets', SetupCtrl.getoutletCtrl);

umRtr.post('/addoutletcategory', checkUser.hasToken, SetupCtrl.insoutletcategoryCtrl);
umRtr.post('/updateoutletcategory', checkUser.hasToken, SetupCtrl.updoutletcategoryCtrl);
umRtr.delete('/outletcategory/:otlt_ctgry_id', checkUser.hasToken, SetupCtrl.deloutletcategoryCtrl);
umRtr.get('/outletcatogiries', SetupCtrl.getoutletcategoryCtrl);

umRtr.get('/gender', SetupCtrl.getgndrCtrl);
umRtr.get('/mandalLst/:dstrct_id', SetupCtrl.getMandalLst);
umRtr.get('/svmLst/:mndl_id', SetupCtrl.getSvmLst);
umRtr.get('/usrlst', checkUser.hasToken, SetupCtrl.getusrlstCtrl);

// umRtr.get('/reportprofiles', checkUser.hasToken, SetupCtrl.getrptprflstCtrl);

umRtr.post('/add/user', checkUser.hasToken, SetupCtrl.addNewUserCtrl);

// Merchant get/Update routes
umRtr.get('/mymerchant',checkUser.hasToken, SetupCtrl.getMyMrchtDtlsCtrl);
umRtr.post('/mymerchant',checkUser.hasToken, SetupCtrl.updateMyMrchtDtlsCtrl);

// ********************* Menu Profile Routes ***************************
umRtr.get('/cmpnt', checkUser.hasToken, SetupCtrl.getCmpntCtrl);

umRtr.get('/menu/profile', checkUser.hasToken, SetupCtrl.getprflstCtrl);

umRtr.get('/menu/profile/items', checkUser.hasToken, SetupCtrl.getprfItmsLstCtrl);

umRtr.get('/menu/options/:cmpnt_id', checkUser.hasToken, SetupCtrl.getoptionsCtrl);

umRtr.post('/add/menu/profile', checkUser.hasToken, SetupCtrl.insmnuprofileCtrl); //Add Menu Profile

umRtr.post('/update/menu/profile', checkUser.hasToken, SetupCtrl.updmnuprofileCtrl);

umRtr.delete('/profile/:prfle_id', checkUser.hasToken, SetupCtrl.delmnuprofileCtrl);

umRtr.post('/add/user/menu/profile', checkUser.hasToken, SetupCtrl.asgnMnuPrfleCtrl);

umRtr.post('/add/user/setup/profile', checkUser.hasToken, SetupCtrl.inssetupprfCtrl);

umRtr.post('/updateuserprfrel', checkUser.hasToken, SetupCtrl.updusrprfCtrl);

// umRtr.post('/update/report/profile', checkUser.hasToken, SetupCtrl.updreportprofileCtrl);

umRtr.post('/updateuser', checkUser.hasToken, SetupCtrl.upduserCtrl);

umRtr.post('/loginfo', checkUser.hasToken, SetupCtrl.loginfoCtrl);

umRtr.delete('/deluser/:usr_id', checkUser.hasToken, SetupCtrl.deluserCtrl);

umRtr.delete('/delprf/:prf_id', checkUser.hasToken, SetupCtrl.delprofileCtrl);

umRtr.get('/getstates', SetupCtrl.getstatesCtrl)
umRtr.post('/updateState', checkUser.hasToken, SetupCtrl.updateStateCtrl)
umRtr.post('/addNewState', checkUser.hasToken, SetupCtrl.insSteCtrl)
umRtr.delete('/delState/:ste_id', checkUser.hasToken, SetupCtrl.deleteStateCtrl)

umRtr.get('/getdstrcts/:ste_id', SetupCtrl.getDstrctsCtrl)
umRtr.post('/addNewDstrct', checkUser.hasToken, SetupCtrl.insDstrctsCtrl)
umRtr.post('/updateDstrct', checkUser.hasToken, SetupCtrl.updateDstrctsCtrl)
umRtr.delete('/deldstrct/:dstrt_id', checkUser.hasToken, SetupCtrl.delDstrctsCtrl)

umRtr.get('/getMndls/:dstrct_id', SetupCtrl.getMndlsCtrl)
umRtr.post('/addNewMndl', checkUser.hasToken, SetupCtrl.insMndlsCtrl)
umRtr.post('/updateMndl', checkUser.hasToken, SetupCtrl.updateMndlsCtrl)
umRtr.delete('/delMandal/:mndl_id', checkUser.hasToken, SetupCtrl.delMndlsCtrl)

umRtr.get('/getvlgs/:mndl_id/:dstrct_id', SetupCtrl.getvlgsCtrl)
umRtr.post('/addNewvilage', checkUser.hasToken, SetupCtrl.insvlgsCtrl)
umRtr.post('/updateVilage', checkUser.hasToken, SetupCtrl.updatevlgsCtrl)
umRtr.delete('/delVilage/:vlg_id', checkUser.hasToken, SetupCtrl.delvlgsCtrl)

umRtr.get('/cities', SetupCtrl.getCitiesCtrl)
umRtr.post('/cities', checkUser.hasToken, SetupCtrl.insCityCtrl)
umRtr.post('/update/cities', checkUser.hasToken, SetupCtrl.UpdateCityCtrl)
umRtr.delete('/delCity/:cty_id', checkUser.hasToken, SetupCtrl.delCityCtrl)

umRtr.get('/bnkAcntType', SetupCtrl.bnk_acnt_typ_get);
// umRtr.get('/getDstrcts/:ste_id',checkUser.hasToken, SetupCtrl.getDstrctsCtrl)
/**** Chnage Log ****/
umRtr.post('/change-log/udt_lg_ind', SetupCtrl.chnageLogInd);
umRtr.get('/change-log/get_chng_lg_info', SetupCtrl.ltstChngdLgData);
umRtr.get('/change-log/:slctdCmpntId', SetupCtrl.allChngdLgData);
umRtr.get('/change-log-tmelne/:slctdCmpntId', SetupCtrl.allChngdLgTmlneDtaData);
umRtr.get('/change-log-ctgry', SetupCtrl.chngeLgCtgryCtrl);
umRtr.get('/change-log-cmpnt', SetupCtrl.chngeLgCmpntCtrl);
umRtr.post('/addchangelog', SetupCtrl.inschngelogCtrl);
umRtr.delete('/delchngelog/:chng_lg_id', SetupCtrl.delchngelogCtrl);
umRtr.post('/updchangelog', SetupCtrl.updchngelogCtrl);


// umRtr.get('/designations/:clnt_id', checkUser.hasToken, umCtrl.getDesignationsByClnt);
// umRtr.get('/allProfiles/:clnt_id/:tnt_id', checkUser.hasToken, umCtrl.allPrfl_get);
// umRtr.get('/allDstnctProfiles/:clnt_id', checkUser.hasToken, umCtrl.allDstPrfl_get);
// umRtr.get('/allDstnctProfiles/:clnt_id/:tnt_id', checkUser.hasToken, umCtrl.allDstPrfl_get);
// umRtr.get('/getApps', checkUser.hasToken, umCtrl.apps_get);
// umRtr.get('/getUsrAllMenus/:clnt_id/:tnt_id/:usrId', checkUser.hasToken, umCtrl.Allusrmenus_get);
// umRtr.post('assign/mtplClntTntCrtnFrUsr', umCtrl.mtplClntTntCrtnFrUsr_post);
// umRtr.post('/user/UpdatePrfles', checkUser.hasToken, umCtrl.updatePrf_updt);
// umRtr.post('/user/UpdateMnuPrfles/:usrId', checkUser.hasToken, umCtrl.updateMnuPrf_updt);
// umRtr.get('/getMnuItmsbyappID/:appId', umCtrl.mnuItms_get);
// umRtr.get('/getSubMnuItmsbyappID/:appId', umCtrl.submnuItms_get);
//umRtr.post('/delete/appPrf/:prfId', checkUser.hasToken, umCtrl.dltAppPrf);
// umRtr.post('/create/appPrf/:clnt_id/:tnt_id/:appPrflNm', checkUser.hasToken, umCtrl.createAppPrf_post);
// umRtr.post('/appPrf/assignusers/:appPrflNm', checkUser.hasToken, umCtrl.assignAppPrfToUsr_post);

// ********************Roles and Permessions***********************
umRtr.get('/roles', checkUser.hasToken, permissionsCtrl.getRolesCtrl);
umRtr.post('/role', checkUser.hasToken, permissionsCtrl.instRolesCtrl);
umRtr.put('/role/:id', checkUser.hasToken, permissionsCtrl.UpdtRolesCtrl);
umRtr.delete('/role/:id', checkUser.hasToken, permissionsCtrl.DeletRolesCtrl);
umRtr.get('/permessions/:id', checkUser.hasToken, permissionsCtrl.getRolesPermByIdCtrl);
umRtr.post('/permessions', checkUser.hasToken, permissionsCtrl.instRolesPermByIdCtrl);
umRtr.get('/SpclPermessions/:id', checkUser.hasToken, permissionsCtrl.getRolesSpclPermByIdCtrl);
// umRtr.post('/splPermessions', checkUser.hasToken, permissionsCtrl.instRolesPclPermByIdCtrl);



umRtr.post('/chkActivity', permissionsCtrl.checkPymntActivity);
umRtr.post('/chkRdrctActivity', permissionsCtrl.checkPymntRdrctActivity);
umRtr.post('/chkRefund', permissionsCtrl.checkPymntRefund);
umRtr.post('/chkWeb', permissionsCtrl.checkWeb);


umRtr.get('/getTransactionSts', permissionsCtrl.getPymntTransactionStatus);

// ********************Usercategory*********************** //
umRtr.get('/category', checkUser.hasToken, umCtrl.getUsrCtgryCtrl);

// ********************Userotp*********************** //
umRtr.post('/agent/otp', umCtrl.postAgntOtpCtrl);
umRtr.post('/agent/validate/otp', umCtrl.postAgntVldtOtpCtrl);

umRtr.get('/getLMOContacts/:agent_id', checkUser.hasToken, umCtrl.getLMOContacts);

// **************************************************************** //
umRtr.get('/getxml/:id',  umCtrl.generateXmlCtrl);
umRtr.get('/getxml/:frmdt/:todt',  umCtrl.generateXmlMultiCtrl);

module.exports = umRtr;