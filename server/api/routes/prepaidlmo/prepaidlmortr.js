var prpdlmoRtr = require('express').Router();
var modRoot = appRoot + '/server/api/modules/prepaidlmo/'
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const prepaidlmoCtrl = require(modRoot + 'controllers/prepaidlmoCtrl');
 
prpdlmoRtr.get('/cafcount',  checkUser.hasToken, prepaidlmoCtrl.cafcountdata);
prpdlmoRtr.get('/allcafcount',  checkUser.hasToken, prepaidlmoCtrl.allcafcountdata);
prpdlmoRtr.get('/allcafamtdata',  checkUser.hasToken, prepaidlmoCtrl.allcafamtdataCtrl);
prpdlmoRtr.get('/allcafcountin',  checkUser.hasToken, prepaidlmoCtrl.allcafcountindataCtrl);
prpdlmoRtr.get('/apsflmnthtdyrev',  checkUser.hasToken, prepaidlmoCtrl.apsflmnthtdyrevCtrl);
prpdlmoRtr.get('/apsflmnthtdyclctn',  checkUser.hasToken, prepaidlmoCtrl.apsflmnthtdyclctndataCtrl);
prpdlmoRtr.get('/mnthtdyrenewcaf',  checkUser.hasToken, prepaidlmoCtrl.mnthtdyrenewcafCtrl);
prpdlmoRtr.get('/expcafsum',  checkUser.hasToken, prepaidlmoCtrl.expcafsumCtrl);
prpdlmoRtr.get('/activecafcount',  checkUser.hasToken, prepaidlmoCtrl.getactivecafcountdata);
prpdlmoRtr.get('/suspendcaf',  checkUser.hasToken, prepaidlmoCtrl.getsuspentcafdata);
prpdlmoRtr.get('/terminatecafs',  checkUser.hasToken, prepaidlmoCtrl.getterminatecafdata);
prpdlmoRtr.get('/terminatepending',  checkUser.hasToken, prepaidlmoCtrl.getterminatependingcafdata);
prpdlmoRtr.get('/suspendpending',  checkUser.hasToken, prepaidlmoCtrl.getsuspendpendingdata);
prpdlmoRtr.get('/resumepending',  checkUser.hasToken, prepaidlmoCtrl.getresumependingcafs);
prpdlmoRtr.get('/pendingactivation',  checkUser.hasToken, prepaidlmoCtrl.getpendingactivationdata);
prpdlmoRtr.get('/boxchange',  checkUser.hasToken, prepaidlmoCtrl.getboxchangedata);
prpdlmoRtr.get('/ponchange',  checkUser.hasToken, prepaidlmoCtrl.getponchangedata);
prpdlmoRtr.post('/faccountingledger',  checkUser.hasToken, prepaidlmoCtrl.faccountingledgerdata);
prpdlmoRtr.post('/faccountingwebledger',  checkUser.hasToken, prepaidlmoCtrl.faccountingwebledgerdataCtrl);
prpdlmoRtr.get('/chckblncelmo',  checkUser.hasToken, prepaidlmoCtrl.chckblncelmoCtrl);
prpdlmoRtr.get('/tdayblnceFaccounting',  checkUser.hasToken, prepaidlmoCtrl.tdayblnceFaccounting);
prpdlmoRtr.get('/mnthblnceFaccounting',  checkUser.hasToken, prepaidlmoCtrl.mnthblnceFaccounting);
prpdlmoRtr.post('/todayexpiredcaf', checkUser.hasToken,prepaidlmoCtrl.expiredcafdata);
prpdlmoRtr.get('/paymentapprovals', checkUser.hasToken,prepaidlmoCtrl.paymentapprovalsdata);
prpdlmoRtr.post('/mnthlyrenewdcafs', checkUser.hasToken,prepaidlmoCtrl.monthlyrenewdcafdata);
prpdlmoRtr.post('/tdyrenewdcafs', checkUser.hasToken,prepaidlmoCtrl.todayrenewdcafdata);
prpdlmoRtr.post('/onlinecollectionamunt', checkUser.hasToken,prepaidlmoCtrl.onlinecollectiondata);
prpdlmoRtr.get('/getonlinelistdata', checkUser.hasToken,prepaidlmoCtrl.onlinelistdata);
prpdlmoRtr.post('/tdyrevenue', checkUser.hasToken,prepaidlmoCtrl.todayrevenuedata);
prpdlmoRtr.post('/mnthlyrevenue', checkUser.hasToken,prepaidlmoCtrl.monthlyrevenuedata);
prpdlmoRtr.post('/mnthlycollection', checkUser.hasToken, prepaidlmoCtrl.monthlycollectiondata);
prpdlmoRtr.post('/tdycollection', checkUser.hasToken,prepaidlmoCtrl.todaycollectiondata);
prpdlmoRtr.post('/reportlist', checkUser.hasToken,prepaidlmoCtrl.reportlistdata);
prpdlmoRtr.post('/reportCreditlist', checkUser.hasToken,prepaidlmoCtrl.reportCreditlistdata);
prpdlmoRtr.post('/sharingreport', checkUser.hasToken,prepaidlmoCtrl.sharingreportdata);
prpdlmoRtr.get('/removelmoappaddonsfrCafPckgs', prepaidlmoCtrl.removeaddonsfrCafPckgsCtrl);
prpdlmoRtr.get('/walletamountfrlmo', checkUser.hasToken,prepaidlmoCtrl.walletamountfrlmoCtrl);
prpdlmoRtr.get('/threemnths_spnd/:id', prepaidlmoCtrl.threemnths_spndCtrl);
prpdlmoRtr.get('/threemnthscafspndcount', checkUser.hasToken,prepaidlmoCtrl.threemnthscafspndcountCtrl);
prpdlmoRtr.get('/threemnthscafspnddata', checkUser.hasToken,prepaidlmoCtrl.gettrmndcaflmodtlsCtrl);
prpdlmoRtr.get('/renewcafdata/:id', checkUser.hasToken,prepaidlmoCtrl.renewcafdataCtrl);
prpdlmoRtr.get('/pckgewisedata/:caf_id/:pckge_id',  checkUser.hasToken, prepaidlmoCtrl.pckgewisedataCtrl);
prpdlmoRtr.get('/listresumepending',  checkUser.hasToken, prepaidlmoCtrl.getlistresumependingcafs);
prpdlmoRtr.get('/listsuspendpending',  checkUser.hasToken, prepaidlmoCtrl.getlistsuspendpendingdata);
prpdlmoRtr.post('/insertprpdlmoamtdtls',  checkUser.hasToken, prepaidlmoCtrl.insertprpdlmoamtdtlsCtrl);
prpdlmoRtr.post('/updtprpdlmoamtdtls',  checkUser.hasToken, prepaidlmoCtrl.updtprpdlmoamtdtlsCtrl);
prpdlmoRtr.get('/kyclistview',  checkUser.hasToken, prepaidlmoCtrl.kyclistviewCtrl);
prpdlmoRtr.post('/AtomGateway',  checkUser.hasToken, prepaidlmoCtrl.AtomGatewayCtrl);
prpdlmoRtr.post('/AtomresGateway', prepaidlmoCtrl.AtomresGatewayCtrl);
prpdlmoRtr.get('/expcafsumthreendfiveday',  checkUser.hasToken, prepaidlmoCtrl.expcafsumthreendfivedayCtrl);



prpdlmoRtr.get('/listcafcount',  checkUser.hasToken, prepaidlmoCtrl.listcafcountCtrl);
prpdlmoRtr.get('/listactivecaf',  checkUser.hasToken, prepaidlmoCtrl.listactivecafCtrl);
prpdlmoRtr.get('/listsuspendcaf',  checkUser.hasToken, prepaidlmoCtrl.listgetsuspentcafdata);
prpdlmoRtr.get('/listterminatecafs',  checkUser.hasToken, prepaidlmoCtrl.listgetterminatecafdata);
prpdlmoRtr.get('/listterminatepending',  checkUser.hasToken, prepaidlmoCtrl.listgetterminatependingcafdata);
prpdlmoRtr.get('/getlistsuspendpending',  checkUser.hasToken, prepaidlmoCtrl.listgetsuspendpendingdata);
prpdlmoRtr.get('/getlistresumepending',  checkUser.hasToken, prepaidlmoCtrl.listgetresumependingcafs);
prpdlmoRtr.get('/listpendingactivation',  checkUser.hasToken, prepaidlmoCtrl.listgetpendingactivationdata);
prpdlmoRtr.post('/listboxchange',  checkUser.hasToken, prepaidlmoCtrl.listgetboxchangedata);
prpdlmoRtr.get('/listponchange',  checkUser.hasToken, prepaidlmoCtrl.listgetponchangedata);
prpdlmoRtr.post('/listmnthlyrenewdcafs', checkUser.hasToken,prepaidlmoCtrl.listmonthlyrenewdcafdata);
prpdlmoRtr.post('/listtdyrenewdcafs', checkUser.hasToken,prepaidlmoCtrl.listtodayrenewdcafdata);
prpdlmoRtr.post('/listtdyrevenue', checkUser.hasToken,prepaidlmoCtrl.listtodayrevenuedata);
prpdlmoRtr.post('/listmnthlyrevenue', checkUser.hasToken,prepaidlmoCtrl.listmonthlyrevenuedata);
prpdlmoRtr.post('/listmnthlycollection', checkUser.hasToken, prepaidlmoCtrl.listmonthlycollectiondata);
prpdlmoRtr.post('/listtdycollection', checkUser.hasToken,prepaidlmoCtrl.listtodaycollectiondata);
prpdlmoRtr.get('/listtodayonlinecollectionamunt', checkUser.hasToken,prepaidlmoCtrl.listtodayonlinecollectionCtrl);
prpdlmoRtr.get('/listmonthlyonlinecollectionamunt', checkUser.hasToken,prepaidlmoCtrl.listmonthlyonlinecollectionCtrl);
prpdlmoRtr.get('/expcafsumthreeday',  checkUser.hasToken, prepaidlmoCtrl.expcafsumthreedayCtrl);
prpdlmoRtr.get('/expcafsumfiveday',  checkUser.hasToken, prepaidlmoCtrl.expcafsumfivedayCtrl);

prpdlmoRtr.post('/listtodayexpiredcaf', checkUser.hasToken,prepaidlmoCtrl.listexpiredcafdata);

prpdlmoRtr.get('/listonlinecollectionamunt', checkUser.hasToken,prepaidlmoCtrl.listonlinecollectiondata);

prpdlmoRtr.post('/postlistcafcount',  checkUser.hasToken, prepaidlmoCtrl.postlistcafcountCtrl);
prpdlmoRtr.post('/postlistactivecaf',  checkUser.hasToken, prepaidlmoCtrl.postlistactivecafCtrl);
prpdlmoRtr.post('/postlistsuspendcaf',  checkUser.hasToken, prepaidlmoCtrl.postlistgetsuspentcafdata);
prpdlmoRtr.post('/postlistterminatecafs',  checkUser.hasToken, prepaidlmoCtrl.postlistgetterminatecafdata);
prpdlmoRtr.post('/postlistterminatepending',  checkUser.hasToken, prepaidlmoCtrl.postlistgetterminatependingcafdata);
prpdlmoRtr.post('/postgetlistsuspendpending',  checkUser.hasToken, prepaidlmoCtrl.postlistgetsuspendpendingdata);
prpdlmoRtr.post('/postgetlistresumepending',  checkUser.hasToken, prepaidlmoCtrl.postlistgetresumependingcafs);
prpdlmoRtr.post('/postlistpendingactivation',  checkUser.hasToken, prepaidlmoCtrl.postlistgetpendingactivationdata);
prpdlmoRtr.post('/postlistboxchange',  checkUser.hasToken, prepaidlmoCtrl.postlistgetboxchangedata);
prpdlmoRtr.post('/postlistponchange',  checkUser.hasToken, prepaidlmoCtrl.postlistgetponchangedata);
prpdlmoRtr.post('/postlistmnthlyrenewdcafs', checkUser.hasToken,prepaidlmoCtrl.postlistmonthlyrenewdcafdata);
prpdlmoRtr.post('/postlisttdyrenewdcafs', checkUser.hasToken,prepaidlmoCtrl.postlisttodayrenewdcafdata);
prpdlmoRtr.post('/postlisttdyrevenue', checkUser.hasToken,prepaidlmoCtrl.postlisttodayrevenuedata);
prpdlmoRtr.post('/postlistmnthlyrevenue', checkUser.hasToken,prepaidlmoCtrl.postlistmonthlyrevenuedata);
prpdlmoRtr.post('/postlistmnthlycollection', checkUser.hasToken, prepaidlmoCtrl.postlistmonthlycollectiondata);
prpdlmoRtr.post('/postlisttdycollection', checkUser.hasToken,prepaidlmoCtrl.postlisttodaycollectiondata);
prpdlmoRtr.post('/postlisttodayonlinecollectionamunt', checkUser.hasToken,prepaidlmoCtrl.postlisttodayonlinecollectionCtrl);
prpdlmoRtr.post('/postlistmonthlyonlinecollectionamunt', checkUser.hasToken,prepaidlmoCtrl.postlistmonthlyonlinecollectionCtrl);
prpdlmoRtr.post('/postexpcafsumthreeday',  checkUser.hasToken, prepaidlmoCtrl.postexpcafsumthreedayCtrl);
prpdlmoRtr.post('/postexpcafsumfiveday',  checkUser.hasToken, prepaidlmoCtrl.postexpcafsumfivedayCtrl);

prpdlmoRtr.post('/updateprepaidlmoamount', checkUser.hasToken,prepaidlmoCtrl.updatelmoamountdata);

prpdlmoRtr.post('/updatedflagnotify', checkUser.hasToken,prepaidlmoCtrl.updatedflagnotifydata);
prpdlmoRtr.post('/activeagentflagnotification', checkUser.hasToken,prepaidlmoCtrl.activeagntflagdata);

prpdlmoRtr.post('/advancerenewalcafs',checkUser.hasToken,prepaidlmoCtrl.advancerenewalcafCtrl);
prpdlmoRtr.post('/totalprepaidlmocount',checkUser.hasToken,prepaidlmoCtrl.totalprepaidlmocountCtrl);
prpdlmoRtr.post('/totalprepaidlmodata', checkUser.hasToken,prepaidlmoCtrl.totalprepaidlmoCtrl);
prpdlmoRtr.post('/advancerenewalcafcount', checkUser.hasToken,prepaidlmoCtrl.advancerenewalcafcountCtrl);
prpdlmoRtr.get('/totalprepaidcafcount', checkUser.hasToken,prepaidlmoCtrl.totalprepaidcafCtrl);

prpdlmoRtr.get('/suspendedcafscount', checkUser.hasToken,prepaidlmoCtrl.suspendcafcountCtrl);
prpdlmoRtr.get('/activecafscount', checkUser.hasToken,prepaidlmoCtrl.activecafcountCtrl);
prpdlmoRtr.get('/terminatedcafscount', checkUser.hasToken,prepaidlmoCtrl.terminatedcafcountCtrl);
prpdlmoRtr.get('/terminatedpendingcafscount', checkUser.hasToken,prepaidlmoCtrl.terminatedpendingcafcountCtrl);
prpdlmoRtr.get('/suspendedpendingcafscount', checkUser.hasToken,prepaidlmoCtrl.suspenededpendingcafcountCtrl);
prpdlmoRtr.get('/resumependingcafscount', checkUser.hasToken,prepaidlmoCtrl.resumependingcafcountCtrl);
prpdlmoRtr.get('/pendingactivationcount', checkUser.hasToken,prepaidlmoCtrl.pendingactivationcountCtrl);
prpdlmoRtr.get('/boxchangecount', checkUser.hasToken,prepaidlmoCtrl.boxchangeCtrl);
prpdlmoRtr.get('/ponchangecount', checkUser.hasToken,prepaidlmoCtrl.ponchangeCtrl);
prpdlmoRtr.post('/totalprepaidcafslist', checkUser.hasToken,prepaidlmoCtrl.totalprepaidlistdata);
prpdlmoRtr.post('/suspendedcaflist', checkUser.hasToken,prepaidlmoCtrl.suspendedcaflistCtrl);
prpdlmoRtr.post('/activecaflist', checkUser.hasToken,prepaidlmoCtrl.activecaflistCtrl);
prpdlmoRtr.post('/terminatedcaflist', checkUser.hasToken,prepaidlmoCtrl.terminatedcaflist);
prpdlmoRtr.post('/terminatedpendingcaflist', checkUser.hasToken,prepaidlmoCtrl.terminatedpendingcaflist);
prpdlmoRtr.post('/suspendpendingcaflist', checkUser.hasToken,prepaidlmoCtrl.suspendpendingcaflist);
prpdlmoRtr.post('/resumependingcaflist', checkUser.hasToken,prepaidlmoCtrl.resumependingcaflist);
prpdlmoRtr.post('/pendingactivationcaflist', checkUser.hasToken,prepaidlmoCtrl.pendingactivationcaflist);
//prpdlmoRtr.post('/boxchangelist', checkUser.hasToken,prepaidlmoCtrl.boxchangelistdata);
prpdlmoRtr.post('/ponchangelist', checkUser.hasToken,prepaidlmoCtrl.ponchangelistCtrl);

prpdlmoRtr.post('/payment/upi/settlement', checkUser.hasToken, prepaidlmoCtrl.dynamicUPItStlmntCtrl);
prpdlmoRtr.post('/payment/upi/settlement/open',  prepaidlmoCtrl.dynamicUPItStlmntOpenCtrl);
prpdlmoRtr.post('/payment/upi/settlement/open/sbscr',  prepaidlmoCtrl.dynamicSbscrUPItStlmntOpenCtrl);

prpdlmoRtr.get('/enterpricecallcntr', checkUser.hasToken,prepaidlmoCtrl.enterpricecallcntrCtrl);
prpdlmoRtr.get('/grievancelist',checkUser.hasToken,prepaidlmoCtrl.grievancelistCtrl);

prpdlmoRtr.post('/faccountingsbscrledger',  checkUser.hasToken, prepaidlmoCtrl.faccountingsbscrledgerdata);

prpdlmoRtr.post('/tdyadvancerenwedcafcount', checkUser.hasToken,prepaidlmoCtrl.tdyadvancerenwedcafcountCtrl);
prpdlmoRtr.post('/tdyadvancerenwedcaf', checkUser.hasToken,prepaidlmoCtrl.tdyadvancerenwedcafCtrl);
prpdlmoRtr.post('/prvsdaysuspndcaf', checkUser.hasToken,prepaidlmoCtrl.prvsdaysuspndcafCtrl);
prpdlmoRtr.post('/prvsdaysuspndcafcount', checkUser.hasToken,prepaidlmoCtrl.prvsdaysuspndcafcountCtrl);

prpdlmoRtr.post('/onlinecollectionwebcount', checkUser.hasToken,prepaidlmoCtrl.onlinecollectionwebcountCtrl);
prpdlmoRtr.post('/onlinecollectionweblisttdy', checkUser.hasToken,prepaidlmoCtrl.onlinecollectionweblisttdyCtrl);
prpdlmoRtr.post('/onlinecollectionwebmtdcount', checkUser.hasToken,prepaidlmoCtrl.onlinecollectionwebmtdcountCtrl);
prpdlmoRtr.post('/onlinecollectionwebmtdlist', checkUser.hasToken,prepaidlmoCtrl.onlinecollectionwebmtdlistCtrl);

prpdlmoRtr.get('/todaysuspendedlist', checkUser.hasToken,prepaidlmoCtrl.todaysuspendedlistCtrl);
prpdlmoRtr.get('/todaysuspendedcount', checkUser.hasToken,prepaidlmoCtrl.todaysuspendedcountCtrl);

prpdlmoRtr.post('/prepaidcafdstrtcount', checkUser.hasToken,prepaidlmoCtrl.prepaidcafdstrtcountCtrl);
prpdlmoRtr.get('/prepaid_business_info_version', prepaidlmoCtrl.versionchckforPrepaidCtrl);

prpdlmoRtr.post('/getnotificationdata', checkUser.hasToken, prepaidlmoCtrl.getnotificationdataCtrl);
prpdlmoRtr.post('/updatenotificationdata', checkUser.hasToken, prepaidlmoCtrl.updatenotificationdataCtrl);

prpdlmoRtr.post('/alcartecount/:id', checkUser.hasToken,prepaidlmoCtrl.alcartecountCtrl);
prpdlmoRtr.post('/alcartelist/:id', checkUser.hasToken,prepaidlmoCtrl.alcartelistCtrl);
prpdlmoRtr.post('/planchangecount/:id', checkUser.hasToken,prepaidlmoCtrl.planchangecountCtrl);
prpdlmoRtr.post('/planchangelist/:id', checkUser.hasToken,prepaidlmoCtrl.planchangelistCtrl);
prpdlmoRtr.post('/terminateinitiatcount/:id', checkUser.hasToken,prepaidlmoCtrl.terminateinitiatcountCtrl);
prpdlmoRtr.post('/terminateinitiatlist/:id', checkUser.hasToken,prepaidlmoCtrl.terminateinitiatlistCtrl);

prpdlmoRtr.post('/allbasepackscount', checkUser.hasToken, prepaidlmoCtrl.allbasepackscountCtrl);
//prpdlmoRtr.post('/allbasepackslist', checkUser.hasToken, prepaidlmoCtrl.allbasepackslistCtrl);
prpdlmoRtr.post('/allalacartepackscount', checkUser.hasToken, prepaidlmoCtrl.allalacartepackscountCtrl);
//prpdlmoRtr.post('/allalacartepackslist', checkUser.hasToken, prepaidlmoCtrl.allalacartepackslistCtrl);

prpdlmoRtr.post('/basepackscnt', checkUser.hasToken, prepaidlmoCtrl.basepacksAllcountCtrl);
prpdlmoRtr.post('/basepackslistview', checkUser.hasToken, prepaidlmoCtrl.basepackslistviewCtrl);

//Insert Caf Count Daily Cron Job
prpdlmoRtr.get('/cafCountInsrt', prepaidlmoCtrl.cafCountInsrtCtrl);

prpdlmoRtr.get('/lmotxnids', checkUser.hasToken, prepaidlmoCtrl.lmotxnidsCtrl); 

module.exports = prpdlmoRtr;