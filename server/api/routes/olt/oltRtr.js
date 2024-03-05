var oltRtr = require('express').Router();
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var modRoot = appRoot + '/server/api/modules/olt/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');
const oltCtrl = require(modRoot + 'controllers/oltCtrl');

//for OLT UP Down
oltRtr.post('/oltUpDwnDtlsfrmextrnls', oltCtrl.sendSmsOltUpDwn);

oltRtr.get('/oltdetails/:agentID/:cafid', checkUser.hasToken, oltCtrl.getapsflBbnloltsCtrl);
oltRtr.get('/oltdetails/:agentID', checkUser.hasToken, oltCtrl.get_oltsCtrl);
oltRtr.get('/portoltdetails/:agentID/:apsflBbnl', checkUser.hasToken, oltCtrl.getapsflBbnl_oltsCtrl);
oltRtr.get('/slotDetails/:oltID', checkUser.hasToken, oltCtrl.get_slotsCtrl);
oltRtr.post('/slotDetails', checkUser.hasToken, oltCtrl.insert_slotsCtrl);
oltRtr.post('/get/ponChange', checkUser.hasToken, oltCtrl.get_ponChangeCtrl);
oltRtr.post('/get/ponChange_with_srvr_pgntn', checkUser.hasToken, oltCtrl.get_ponChangeSrvrPgntnCtrl);
oltRtr.get('/slotDetailsForPort/:portID', checkUser.hasToken, oltCtrl.get_slotsForPortCtrl);
// Get slot1 details by port Idwhere caf id = null
oltRtr.get('/slotDtls/:portID', checkUser.hasToken, oltCtrl.get_slotsbyportCtrl);
// Get all slot1 details by port Id
oltRtr.get('/slot/:portID', checkUser.hasToken, oltCtrl.get_allslotsbyportCtrl);
// Get slot2 details by port Id where caf id = null
oltRtr.post('/slottwoDetailsForPort/', checkUser.hasToken, oltCtrl.get_slottwoForPortCtrl);
// Get all slot2 details by port Id
oltRtr.post('/allslottwoDetailsForPort/', checkUser.hasToken, oltCtrl.get_allslottwoForPortCtrl);
// Get slot3 details by port Id where caf id = null
oltRtr.post('/slotthreeDetailsForPort/', checkUser.hasToken, oltCtrl.get_slotthreeForPortCtrl);
// Get all slot3 details by port Id
oltRtr.post('/allslotthreeDetailsForPort/', checkUser.hasToken, oltCtrl.get_allslotthreeForPortCtrl);
oltRtr.post('/spiltsData', checkUser.hasToken, oltCtrl.get_spiltCtrl);
oltRtr.post('/ponchange', checkUser.hasToken, oltCtrl.updt_ponchangeCtrl);
oltRtr.post('/boxchange', checkUser.hasToken, oltCtrl.get_boxchangeCtrl);
oltRtr.post('/bulk_suspend',  checkUser.hasToken,oltCtrl.update_bulk_suspendcafsCtrl);

oltRtr.post('/boxchange_with_srvr_pgntn', checkUser.hasToken, oltCtrl.get_boxchangeSrvrPgntnCtrl);
oltRtr.post('/collectionData', checkUser.hasToken, oltCtrl.getcollectionDataCtrl);
oltRtr.post('/active/cafs', checkUser.hasToken, oltCtrl.get_activecafsCtrl);
oltRtr.post('/active/cafs_with_srvr_pgntn', checkUser.hasToken, oltCtrl.get_activecafsSrvrPgntnCtrl);
oltRtr.post('/advncersmeactive/cafs_with_srvr_pgntn', checkUser.hasToken, oltCtrl.get_advncersmeactivecafsSrvrPgntnCtrl);
oltRtr.post('/suspended/cafs', checkUser.hasToken, oltCtrl.get_suspendedcafsCtrl);
oltRtr.post('/suspended/cafs_with_srvr_pgntn', checkUser.hasToken, oltCtrl.get_suspendedcafsSrvrPgntnCtrl);
oltRtr.post('/bulksuspended/cafs_with_srvr_pgntn', checkUser.hasToken, oltCtrl.get_bulksuspendedcafsSrvrPgntnCtrl);
oltRtr.post('/caf/active', checkUser.hasToken, oltCtrl.update_activecafsCtrl);
oltRtr.get('/payment/modes', checkUser.hasToken, oltCtrl.get_paymntmodesCtrl);
oltRtr.get('/invoice/dueamount/:cstmrID/:agentID', checkUser.hasToken, oltCtrl.get_dueAmountCtrl);
oltRtr.post('/paying/dueamount', checkUser.hasToken, oltCtrl.insertmonthlyPaymentsCtrl);
oltRtr.post('/caf/suspend', checkUser.hasToken, oltCtrl.update_suspendcafsCtrl);
oltRtr.get('/terminated/:agntID', checkUser.hasToken, oltCtrl.get_terminationCtrl);
oltRtr.post('/cafterminated/:cafId', checkUser.hasToken, oltCtrl.to_terminationCtrl);
oltRtr.get('/setupbox/iptv/:iptvserialNo', checkUser.hasToken, oltCtrl.get_iptvDetailsCtrl);
oltRtr.get('/setupbox/onu/:onuserialNo', checkUser.hasToken, oltCtrl.get_onuDetailsCtrl);
oltRtr.post('/caf/setupbox', checkUser.hasToken, oltCtrl.updateBoxChangeCtrl);
oltRtr.post('/caf/setupbox/double', checkUser.hasToken, oltCtrl.updateBoxChangeDoubleCtrl);

// oltRtr.get('/oltInstalAddr/:oltID', checkUser.hasToken, oltCtrl.get_oltInstallAddress);
oltRtr.get('/oltdtls/:id', checkUser.hasToken, oltCtrl.getOltdtls);
// get olt details by agent id and sustation id
oltRtr.get('/getOltdtls/:id', checkUser.hasToken, oltCtrl.getOltdtlsByagentId);

oltRtr.post('/oltInstalAddr', checkUser.hasToken, oltCtrl.get_oltInstallAddress);

oltRtr.get('/olts', checkUser.hasToken, checkUser.vldSelect('olt_lst_t'), oltCtrl.get_olts);
oltRtr.get('/getSubstations/:dstrct_id/:mndl_id', checkUser.hasToken, oltCtrl.get_sbstns);
oltRtr.get('/getSubstationsType', checkUser.hasToken, oltCtrl.get_sbstnstypeCtrl);
oltRtr.post('/update/oltdtls/:olt_id', checkUser.hasToken, oltCtrl.updateOltdtls);
oltRtr.post('/insert/oltdtls', checkUser.hasToken, oltCtrl.insertOltdtls);
oltRtr.post('/insert/sbstndtls', checkUser.hasToken, oltCtrl.insertsbstndtlsCtrl);
oltRtr.delete('/delete/olt/:olt_id', checkUser.hasToken, oltCtrl.deleteOltdtls);

oltRtr.get('/olt/ports/agent/:id', checkUser.hasToken, oltCtrl.getOltPortDtlsByAgntIdCtrl);

oltRtr.get('/revenueShaing/year/:yearId/:agnt_id', checkUser.hasToken, oltCtrl.getRevenueSharingMonthWiseCtrl);
oltRtr.get('/prepaid_revenueShaing/year/:yearId/:agnt_id', checkUser.hasToken, oltCtrl.prepaidgetRevenueSharingMonthWiseCtrl);
oltRtr.get('/newprepaid_revenueShaing/year/:yearId/:agnt_id/:mnth_id', checkUser.hasToken, oltCtrl.prepaidgetRevenueSharingMonthFilterWiseCtrl);
oltRtr.post('/revenueSharing/customer', checkUser.hasToken, oltCtrl.getRevenueSharingCustomerWiseCtrl);

// pagination routes for agent app
oltRtr.post('/revenueSharing/customer_pagenation', checkUser.hasToken, oltCtrl.getRevenueSharingCustomerWisePageNationsCtrl);


oltRtr.post('/revenueSharing/customerdetails', checkUser.hasToken, oltCtrl.getRevenueSharingCustomerWiseDetailsCtrl);
oltRtr.post('/revenueTtlSharing/customerdetails', checkUser.hasToken, oltCtrl.getTtlRvnShrngCusDtlsCtrl);

oltRtr.post('/mnthlyCollections', checkUser.hasToken, oltCtrl.getMnthlyCollectionsCtrl);
oltRtr.post('/prepaid_mnthlyCollections', checkUser.hasToken, oltCtrl.prepaidgetMnthlyCollectionsCtrl);

oltRtr.post('/previous/suspenstion', checkUser.hasToken, oltCtrl.get_prvoususpnstn);
oltRtr.get('/validation/setupbox/:id', checkUser.hasToken, oltCtrl.validtion_box);
oltRtr.get('/oltsbstndetails/:agentID/:apsflBbnl', checkUser.hasToken, oltCtrl.get_bbnlolts_sbstn_Ctrl);
oltRtr.get('/oltsbstndetails/:agentID', checkUser.hasToken, oltCtrl.get_olts_sbstn_ctrl);
oltRtr.post('/validation/splitsData', checkUser.hasToken, oltCtrl.validationDataForSplits);

oltRtr.get('/ponchangeCaf/:cafId', checkUser.hasToken, oltCtrl.getPonchangeCafctrl);
oltRtr.get('/boxchangeCaf/:cafId', checkUser.hasToken, oltCtrl.getBoxchangeCafctrl);

oltRtr.get('/getLmoMsg', checkUser.hasToken, oltCtrl.getLmoMsgctrl);


oltRtr.post('/revenusharing/ForEachLmo', checkUser.hasToken, oltCtrl.getRevenueSharing);
oltRtr.post('/revenusharing/CAFcount', checkUser.hasToken, oltCtrl.getRevenueSharingCafCount);
oltRtr.post('/revenusharing/invoice', checkUser.hasToken, oltCtrl.getLmoRevenueSharing);

oltRtr.get('/getAgntPonCounts', checkUser.hasToken, oltCtrl.getAgntPonCountsCntrl);
oltRtr.post('/getAgntPonAssgnedCaf', checkUser.hasToken, oltCtrl.getAgntPonAssgnedCafCtrl);

oltRtr.get('/msorevenueShaing/:year/:agnt_id', checkUser.hasToken, oltCtrl.getMsoRevenueSharingMonthWiseCtrl);


oltRtr.get('/oltDetails', checkUser.hasToken, oltCtrl.getOltLstCtrl);
oltRtr.post('/getRefreshOlt', checkUser.hasToken, oltCtrl.getRefreshOltLstCtrl);
oltRtr.get('/getIssueCategory', checkUser.hasToken, oltCtrl.getIsueCtrgryCtrl);
oltRtr.post('/insertUpdate/oltoutageDtls', checkUser.hasToken, oltCtrl.postOutgeCtrl);
oltRtr.get('/getOltoutageDtls/:oltid', checkUser.hasToken, oltCtrl.getoutageOltCtrl);
oltRtr.get('/getIssueSubCategory/:catid', checkUser.hasToken, oltCtrl.getisueSubCtgryOltCtrl);
oltRtr.post('/insertUpdate/multipleoltoutageDtls', checkUser.hasToken, oltCtrl.postmultipleOutgeCtrl);



oltRtr.post('/getsplitDtlsbyIp', checkUser.hasToken, oltCtrl.getsplitDtlsbyIpCtrl);


oltRtr.get('/olt/monitoring', checkUser.hasToken,checkUser.vldSelect('olt_ltrck_dtl_t'), oltCtrl.get_olt_mntrng);
oltRtr.get('/pull/oltMntrngdtls', checkUser.hasToken, oltCtrl.pullOltMntrngdtls);
oltRtr.post('/update/oltMntrngdtls/:olt_id', checkUser.hasToken, oltCtrl.updateoltMntrngdtls);
oltRtr.delete('/delete/oltMntrngDtl/:olt_id', checkUser.hasToken, oltCtrl.deleteoltMntrngDtl);
oltRtr.delete('/active/oltMntrngDtl/:olt_id', checkUser.hasToken, oltCtrl.activeoltMntrngDtl);

























module.exports = oltRtr;