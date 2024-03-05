var dashboardRtr = require('express').Router();
var checkUser = require(appRoot + '/server/api/modules/general/auth/controllers/accessCtrl');

var dashbrdCtrl = require(appRoot + '/server/api/modules/dashborad/controllers/dashbrdCtrl');

//BBNL Api's
dashboardRtr.get('/enterprise/cafs/counts/:apsflBbnl', checkUser.hasToken,dashbrdCtrl.getbbnlEntCafSmryCntsCtrl);
dashboardRtr.get('/enterprise/top/cafs/:apsflBbnl', checkUser.hasToken,dashbrdCtrl.getbbnlEntTopTenCafDtlsCtrl);
dashboardRtr.get('/enterprise/cafs/last6months/provisions/:apsflBbnl', checkUser.hasToken,dashbrdCtrl.getbbnlEntCafsLast6MnthsPrvCtrl);
dashboardRtr.post('/getBbnlCafConuts', checkUser.hasToken, dashbrdCtrl.get_BbnlAllCafCounts);

dashboardRtr.get('/Bbnlenterprise/cafs/counts/:apsflBbnl', checkUser.hasToken,dashbrdCtrl.getbbnlEntCafSmryCntsCtrl);
dashboardRtr.get('/Bbnlenterprise/cafs/last6months/provisions/:apsflBbnl', checkUser.hasToken,dashbrdCtrl.getbbnlEntCafsLast6MnthsPrvCtrl);

dashboardRtr.get('/planwisedata/:year/:month', checkUser.hasToken,dashbrdCtrl.planWiseDataCtrl);
dashboardRtr.post('/getCpeConuts', checkUser.hasToken,dashbrdCtrl.get_AllCpeCounts);
dashboardRtr.post('/getAgentsConuts', checkUser.hasToken,dashbrdCtrl.get_AllAgentsCounts);
dashboardRtr.post('/getCafConuts', checkUser.hasToken, dashbrdCtrl.get_AllCafCounts);
dashboardRtr.get('/getShareConuts/:year/:id', checkUser.hasToken, dashbrdCtrl.get_AllShareCountsCtrl);
dashboardRtr.get('/getAllShareConuts/:year', dashbrdCtrl.get_AllShareCtrl);
dashboardRtr.get('/getShareDtls/:year/:id', dashbrdCtrl.getShareDtlsCtrl);
dashboardRtr.get('/getCafsConuts/:year', dashbrdCtrl.getCafCntsCtrl);
dashboardRtr.get('/caf/last7days/counts', checkUser.hasToken,dashbrdCtrl.getCafLst7DayCntsCtrl); // managerial dashboard
dashboardRtr.get('/caf/currentday/counts', checkUser.hasToken,dashbrdCtrl.getCafTdyCntsCtrl); // managerial dashboard
dashboardRtr.get('/current/previous/month/counts', checkUser.hasToken,dashbrdCtrl.getCrntPrvsMnthCntsCtrl); // managerial dashboard
dashboardRtr.post('/agent/monthly/operational/summary', checkUser.hasToken,dashbrdCtrl.getMnthlyAgntOptnCntsCtrl); // marketing dashboard
dashboardRtr.post('/current/previous/month/caf/operations', checkUser.hasToken,dashbrdCtrl.getDstrtCrntPrvsMnthCntsCtrl); // marketing dashboard
dashboardRtr.get('/previous/month/share/counts', checkUser.hasToken,dashbrdCtrl.getDstrtPrvsMnthShreCntsCtrl); // marketing financial dashboard
dashboardRtr.get('/district/monthly/revenue/sharing/:year', checkUser.hasToken,dashbrdCtrl.get_AllMnthlyRvnueShareCtrl); // marketing financial dashboard

// LMO dashboard
dashboardRtr.get('/getCafConuts/:id', checkUser.hasToken,dashbrdCtrl.get_AllLmoCafCountsCtrl);
dashboardRtr.get('/getlmodata/:id', checkUser.hasToken,dashbrdCtrl.get_getlmoprepaiddataCtrl);
dashboardRtr.post('/getsinglelmodata', checkUser.hasToken,dashbrdCtrl.postlmoprepaiddataCtrl);
dashboardRtr.get('/getCpeConuts/:id', checkUser.hasToken,dashbrdCtrl.get_AllLmoCpeCountsCtrl);
dashboardRtr.get('/caf/last6months/:id', checkUser.hasToken,dashbrdCtrl.getCafLst6MnthsCntsCtrl);
dashboardRtr.get('/caf/currentMnth/:id', checkUser.hasToken,dashbrdCtrl.getCafMnthCntsCtrl);
dashboardRtr.get('/getLmoStsCnts', checkUser.hasToken,dashbrdCtrl.getLmoStsCntsCtrl);
dashboardRtr.post('/getLmoStsCntsData', checkUser.hasToken,dashbrdCtrl.getLmoStsCntsDataCtrl);
dashboardRtr.get('/getLmoVoipDtls/:id', checkUser.hasToken,dashbrdCtrl.getLmoVoipDtlsCtrl);
dashboardRtr.get('/getStsCnts', checkUser.hasToken,dashbrdCtrl.getStsCntsCtrl);
dashboardRtr.post('/getStsCntsData', checkUser.hasToken,dashbrdCtrl.getStsCntsDataCtrl);

// Enterprise dashboard
dashboardRtr.get('/enterprise/cafs/counts', checkUser.hasToken,dashbrdCtrl.getEntCafSmryCntsCtrl);
dashboardRtr.get('/enterprise/top/cafs', checkUser.hasToken,dashbrdCtrl.getEntTopTenCafDtlsCtrl);
dashboardRtr.get('/enterprise/cafs/last6months/provisions', checkUser.hasToken,dashbrdCtrl.getEntCafsLast6MnthsPrvCtrl);

// OLT ONT dashboard
dashboardRtr.get('/getoltcounts', checkUser.hasToken,dashbrdCtrl.get_OltCountsCtrl);
dashboardRtr.get('/getHourloltcounts', checkUser.hasToken,dashbrdCtrl.get_OltHourlCountsCtrl);
dashboardRtr.get('/getontcounts', checkUser.hasToken,dashbrdCtrl.get_OntCountsCtrl);
dashboardRtr.get('/getHourlontcounts', checkUser.hasToken,dashbrdCtrl.get_OntHourlCountsCtrl);
dashboardRtr.get('/getLiveTvWatchCount', checkUser.hasToken,dashbrdCtrl.get_LiveTvWatchCntCtrl);
dashboardRtr.get('/getVoipCallCount', checkUser.hasToken,dashbrdCtrl.get_VoipCallCntCtrl);
dashboardRtr.get('/distrctWseOlts/:dstrctid', checkUser.hasToken,dashbrdCtrl.get_distrctWseOltsCtrl);
dashboardRtr.get('/distrctWseOlts/notoperational/:dstrctid/:mandalid/:oltid', checkUser.hasToken,dashbrdCtrl.get_distrctWseNtOperationalOltsCtrl);



//IPTV dashboard
dashboardRtr.get('/iptvcrdcnts', checkUser.hasToken,dashbrdCtrl.get_IptvTdyCntsCtrl);
dashboardRtr.get('/getHourlyLiveSts/:date', checkUser.hasToken,dashbrdCtrl.get_IptvHourlyLiveStsCtrl);
dashboardRtr.get('/getMnthDysSts/:mnth/:year', checkUser.hasToken,dashbrdCtrl.get_IptvMnthStsCtrl);
dashboardRtr.get('/Addonscnts', checkUser.hasToken,dashbrdCtrl.get_AddonsCntsCtrl);

//Voip dashboard
dashboardRtr.get('/VoipDayWiseData/:year/:mnth', dashbrdCtrl.get_VoipDayWiseDataCtrl);
dashboardRtr.get('/VoipHorlyWiseData/:date', dashbrdCtrl.get_VoipHorlyWiseDataCtrl);
dashboardRtr.get('/VoipMnthlyChrgesData/:year',dashbrdCtrl.get_VoipMnthlyChrgesDataCtrl);
dashboardRtr.get('/VoipPhneNumsCnt',dashbrdCtrl.get_VoipTotalCntCtrl);
dashboardRtr.get('/VoipCurrntMnthCnt',dashbrdCtrl.get_VoipCurrntMnthCntCtrl);
dashboardRtr.get('/VoipUsedPhneCnt',dashbrdCtrl.get_VoipUsedPhneCntCtrl);


//Hsi dashboard
dashboardRtr.get('/HsidayWiseUsge/:mnth/:year', dashbrdCtrl.get_HsidayWiseUsgeCtrl);
dashboardRtr.get('/HsimnthWiseUsge/:year', dashbrdCtrl.get_HsimnthWiseUsgeCtrl);
dashboardRtr.get('/HsiCrrntMnthCnt',dashbrdCtrl.get_HsiCrrntMnthCntCtrl);
dashboardRtr.get('/HsitdyprvsDayCnt',dashbrdCtrl.get_HsitdyprvsDayCntCtrl);
dashboardRtr.get('/HsiMnthWiseUsgCafs/:year',dashbrdCtrl.get_HsiMnthWiseUsgCafsCtrl);


//Customer dashboard
dashboardRtr.get('/CafsDtls/:id', dashbrdCtrl.get_CafsCtrl);
dashboardRtr.get('/customer/hsi/:id', dashbrdCtrl.get_CafsHsiCtrl);
dashboardRtr.get('/customer/package/:id', dashbrdCtrl.get_CafsPackgesCtrl);
dashboardRtr.get('/customer/voip/:id/:year', dashbrdCtrl.get_CafsVoipCtrl);
dashboardRtr.get('/customer/hsilimit/:id/', dashbrdCtrl.get_CafsHSIlimitCtrl);
dashboardRtr.get('/customer/hsiData/:mnth/:year/:id', dashbrdCtrl.get_CafHsiDataCtrl);



//ILL dashboard
dashboardRtr.get('/getillConnctnsCnt', dashbrdCtrl.get_illConnctnsCntCtrl);
dashboardRtr.get('/getAllillCafs', dashbrdCtrl.get_AllillCafsCtrl);
dashboardRtr.get('/leasedCstmr/hsi/:id', dashbrdCtrl.get_LeasdCafsHsiCtrl);
dashboardRtr.get('/getinvceamnt/lesdcstmr/:year', dashbrdCtrl.get_LesdcstmrInvceCtrl);
dashboardRtr.get('/olts/:dstid/:mndlid', dashbrdCtrl.get_oltsCtrl);


//Enterprise Customer dashboard
dashboardRtr.get('/getEntpCstmronucounts/:id', checkUser.hasToken,dashbrdCtrl.getEntpCstmronucountsCtrl);
dashboardRtr.get('/getEntpCstmrHourlyonucounts/:id', checkUser.hasToken,dashbrdCtrl.getEntpCstmrHourlyonucountsCtrl);
dashboardRtr.get('/getEntpCstmroltcounts/:id', checkUser.hasToken,dashbrdCtrl.getEntpCstmroltcountsCtrl);
dashboardRtr.get('/getEntpCstmrHourloltcounts/:id', checkUser.hasToken,dashbrdCtrl.getEntpCstmrHourloltcountsCtrl);
dashboardRtr.get('/getEntpCstmrBndWdth/:id', checkUser.hasToken,dashbrdCtrl.getEntpCstmrBndWdthCtrl);
dashboardRtr.get('/getBndWdthByCafWse/:id', checkUser.hasToken,dashbrdCtrl.getBndWdthByCafWseCtrl);
dashboardRtr.get('/getBndWdthPrvsMnth/:id', checkUser.hasToken,dashbrdCtrl.getBndWdthPrvsMnthCtrl);
dashboardRtr.get('/getTdyBndWdth/:id', checkUser.hasToken,dashbrdCtrl.getTdyBndWdthCtrl);
dashboardRtr.get('/getHsimnthWiseUsge/:mnth/:year/:id',checkUser.hasToken,dashbrdCtrl.getCstmrhsiMnthWseCtrl);
dashboardRtr.get('/entcaf/:id', checkUser.hasToken, checkUser.vldSelect('entrpe_cstmr_lst_t'), dashbrdCtrl.getentcstmrdt);
dashboardRtr.get('/DstrctSmmry/:id', checkUser.hasToken, dashbrdCtrl.getDstrctSmmryCtrl);
dashboardRtr.get('/getCafHsimnthWiseUsge/:id/:yr/:mnth', checkUser.hasToken, dashbrdCtrl.getCafHsimnthWiseUsgeCtrl);

//extrnal api
dashboardRtr.post('/dasanCreateOnu', checkUser.hasToken,dashbrdCtrl.dasanCreateOnuCtrl);
dashboardRtr.post('/dasanCreateOnuHsi', checkUser.hasToken,dashbrdCtrl.dasanCreateOnuHsiCtrl);
dashboardRtr.post('/dasanCreateOnuIptv', checkUser.hasToken,dashbrdCtrl.dasanCreateOnuIptvCtrl);
dashboardRtr.post('/createHuaweiProfile', checkUser.hasToken,dashbrdCtrl.createHuaweiProfileCtrl);
dashboardRtr.post('/createNewSubscriber', checkUser.hasToken,dashbrdCtrl.createNewSubscriberCtrl);
dashboardRtr.post('/firstTimeaddnewservicepack', checkUser.hasToken,dashbrdCtrl.firstTimeaddnewservicepackCtrl);

dashboardRtr.post('/huaweiAAAview', checkUser.hasToken, dashbrdCtrl.huaweiAAAviewCtrl);
dashboardRtr.post('/huaweiAAAdelete', checkUser.hasToken, dashbrdCtrl.huaweiAAAdeleteCtrl);
dashboardRtr.post('/updateHuaweiProfile', checkUser.hasToken, dashbrdCtrl.updateHuaweiProfileCtrl);

dashboardRtr.post('/HuaweiBngUpdateProfile', checkUser.hasToken, dashbrdCtrl.HuaweiBngUpdateProfileCtrl);

dashboardRtr.post('/dasanBoxchange', checkUser.hasToken, dashbrdCtrl.dasanBoxchangeCtrl);
dashboardRtr.post('/AAAdasanupdateBoxchange', checkUser.hasToken, dashbrdCtrl.AAAdasanupdateBoxchangeCtrl);
dashboardRtr.post('/IPtvdasanBoxReplace', checkUser.hasToken, dashbrdCtrl.IPtvdasanBoxReplaceCtrl);

dashboardRtr.post('/disconnectservicepack', checkUser.hasToken,dashbrdCtrl.disconnectservicepackCtrl);
dashboardRtr.get('/totalolts', checkUser.hasToken,dashbrdCtrl.oltcountsCtrl);
dashboardRtr.get('/oltlistview', checkUser.hasToken,dashbrdCtrl.oltlistviewCtrl);

dashboardRtr.post('/entlistviwes', checkUser.hasToken,dashbrdCtrl.entlistviwesCtrl);

module.exports = dashboardRtr;