var clientAppRtr = require('express').Router();
var modRoot = appRoot + '/server/api/modules/clientApp/'
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const clientAppCtrl = require(modRoot + 'controllers/clientAppCtrl');
clientAppRtr.get('/loginMbleNum/:id', clientAppCtrl.getMyCAfMbleNum_Ctrl);
clientAppRtr.get('/loginsrlNum/:id', clientAppCtrl.getMyCAfSrlNum_Ctrl);

clientAppRtr.post('/login', clientAppCtrl.userLogIn);

clientAppRtr.post('/signup', clientAppCtrl.userSignUp);
clientAppRtr.post('/otp', clientAppCtrl.getSMSOTP);
clientAppRtr.post('/validate_otp', clientAppCtrl.validateOTP);
// clientAppRtr.get('/plan/generes', clientAppCtrl.getAllGeneres);
clientAppRtr.get('/plan/channels/:cstmr_id/:caf_id', clientAppCtrl.getMyChannels);


// plan routes
clientAppRtr.get('/caf/my_caf/:cstmr_id', clientAppCtrl.getMyCAfDetails);
clientAppRtr.get('/plan/my_plan/:cstmr_id/:caf_id', clientAppCtrl.getMyPlanDetails);
clientAppRtr.get('/plan/internet/:cstmr_id/:caf_id', clientAppCtrl.getInternetPlanDetails);
clientAppRtr.get('/plan/iptv_chnl_cnt/:cstmr_id/:caf_id', clientAppCtrl.getIPTVChnlCntDetails);
clientAppRtr.get('/plan/calls/:cstmr_id/:caf_id', clientAppCtrl.getCallsPlanDetails);
clientAppRtr.get('/plan/due_date/:cstmr_id/:caf_id', clientAppCtrl.getDueDateDetails);

// history routes
clientAppRtr.get('/history/call/:year/:mnth/:caf_id/:lmt_start/:lmt_end', clientAppCtrl.getCallHistory);
clientAppRtr.get('/history/hsi/:year/:mnth/:caf_id/:lmt_start/:lmt_end', clientAppCtrl.getHSIHistory);
clientAppRtr.get('/history/bills', clientAppCtrl.getCallHistory);


clientAppRtr.get('/getCafCallhistory/:yr/:mnt/:cfId', clientAppCtrl.getCafCallhistoryCtrl);
clientAppRtr.get('/getTotalCallChrge/:yr/:mnt/:cfId', clientAppCtrl.getTotalCallChrgeCtrl);
clientAppRtr.get('/getAddonsFromCAF/:caf_id',  clientAppCtrl.getAddonsFromCAF);
clientAppRtr.get('/customer/profile/:id', clientAppCtrl.getcafDtls);
clientAppRtr.get('/customer/voip/:id', clientAppCtrl.getcafVoipDtls);
clientAppRtr.get('/getChannels/:srvc_pck_id', clientAppCtrl.getChannels);
clientAppRtr.get('/getCAFSelectdPackage/:caf_id', clientAppCtrl.getCAFSelectdPackage);
clientAppRtr.post('/getCafCstmrDtls', checkUser.hasToken , clientAppCtrl.getCafCstmrDtls)
clientAppRtr.get('/customer/invoice/:id/:yr',clientAppCtrl.getcafAppInvoiceDtls);
clientAppRtr.get('/getLmoDtls/:lmoId',  clientAppCtrl.getLmoDtls);
clientAppRtr.get('/customer/package/:id', clientAppCtrl.getcafPckgeDtls);
clientAppRtr.post('/getCstmrCafDtlsApptest', clientAppCtrl.getCafCstmrDtls);
clientAppRtr.post('/packages/addons/hsi', clientAppCtrl.getAddOnHSIPackages);

clientAppRtr.get('/getApphomeCards', clientAppCtrl.getApphomeCardsCtrl);
clientAppRtr.get('/getAppMsgs', clientAppCtrl.getAppMsgsCtrl);

clientAppRtr.get('/getYoutubeVdes', clientAppCtrl.getYoutubeVdes);

clientAppRtr.get('/getMnus', clientAppCtrl.getMnus);
clientAppRtr.get('/avlablePackges', clientAppCtrl.getAvlablePackges_Ctrl);
clientAppRtr.get('/invoice/dueamount/:cstmrID/:agentID', clientAppCtrl.get_dueAmountCtrl);
clientAppRtr.get('/payment/modes', clientAppCtrl.get_paymntmodesCtrl);



module.exports = clientAppRtr;