var sbscrAppRtr = require('express').Router();
var modRoot = appRoot + '/server/api/modules/subscriberApp/'
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const sbscrAppCtrl = require(modRoot + 'controllers/sbscrCtrl');

function checkKey(req, res, next) {
    var key = '78Hdwew87ns789hdmlosqFRomds';
    if (req.headers['access-key'] == key)
        return next();
    else
        return res.send({ status: 500, message: 'authentication failed' });
}

sbscrAppRtr.post('/cust_info',  checkUser.hasToken, sbscrAppCtrl.getcafinfoappCtrl);
sbscrAppRtr.post('/busnes_info',  checkUser.hasToken, sbscrAppCtrl.getbusnesinfoappCtrl);
sbscrAppRtr.post('/get_comp_cat',  checkUser.hasToken, sbscrAppCtrl.getcompcatappCtrl);
sbscrAppRtr.get('/get_comp_cat',  checkUser.hasToken, sbscrAppCtrl.getonlycompcatappCtrl);
sbscrAppRtr.post('/cstmr_complaint_info',  checkUser.hasToken, sbscrAppCtrl.getcstmrcmplntinfoappCtrl);
sbscrAppRtr.post('/cstmr_complaint_add',  checkUser.hasToken, sbscrAppCtrl.getcstmrcmplntaddappCtrl);
sbscrAppRtr.post('/cstmr_paymnts_dtls',  checkUser.hasToken, sbscrAppCtrl.getcstmrpaymntsdtlsappCtrl);
sbscrAppRtr.post('/cstmr_updt_dtls',  checkUser.hasToken, sbscrAppCtrl.getcstmrupdtdtlsappCtrl);
sbscrAppRtr.post('/cstmr_notification_list',  checkUser.hasToken, sbscrAppCtrl.getcstmrntfcstnlstappCtrl);
sbscrAppRtr.post('/cstmr_packages',  checkUser.hasToken, sbscrAppCtrl.getcstmrpckgesappCtrl);
sbscrAppRtr.post('/invoiceData',  checkUser.hasToken, sbscrAppCtrl.getcstmrinvcedtlsfrappCtrl);
sbscrAppRtr.post('/invoiceAddOnData',  checkUser.hasToken, sbscrAppCtrl.getcstmrinvceaddonsdtlsfrappCtrl);
sbscrAppRtr.post('/invoice',  checkUser.hasToken, sbscrAppCtrl.getcstmrinvcepckgesappCtrl);
sbscrAppRtr.get('/invoice/:caf_id/:year/:month', sbscrAppCtrl.getcafcstmrinvcepckgesappCtrl);
sbscrAppRtr.get('/invoiceforweb/:caf_id/:year/:month', sbscrAppCtrl.getcafcstmrinvcepckgeswebCtrl);
sbscrAppRtr.get('/voip/:cafId/:yr', checkUser.hasToken,sbscrAppCtrl.getsbscrcafVoipDtls);
sbscrAppRtr.get('/hsi/:cafId/:yr', checkUser.hasToken,sbscrAppCtrl.getsbscrcafHsiDtls);
sbscrAppRtr.post('/OCCinsrtcmplnt',  checkUser.hasToken, sbscrAppCtrl.occinsrtnewcmplntCtrl);
sbscrAppRtr.get('/OCCgetcafinsrtcmplnt/:cafId',  checkUser.hasToken, sbscrAppCtrl.occgetcafinsrtnewcmplntCtrl);
sbscrAppRtr.get('/OCCgetinsrtcmplnt',  checkUser.hasToken, sbscrAppCtrl.occgetinsrtnewcmplntCtrl);
sbscrAppRtr.get('/OCCgetAddOnpackages',  checkUser.hasToken, sbscrAppCtrl.OCCgetAddOnpackagesCtrl);
sbscrAppRtr.get('/OCCgetcmplntdtls/:caf_id/:ticket_nm',  checkUser.hasToken, sbscrAppCtrl.OCCgetcmplntdtlsCtrl);
sbscrAppRtr.get('/OCCIssueCstmrTyp/:id',  checkUser.hasToken, sbscrAppCtrl.OCCIssueCstmrTypCtrl);
sbscrAppRtr.get('/OCCIssueCstmrSubTyp/:id',  checkUser.hasToken, sbscrAppCtrl.OCCIssueCstmrSubTypCtrl);
sbscrAppRtr.post('/OCCIssueAssgnCat',  checkUser.hasToken, sbscrAppCtrl.OCCIssueAssgnCatCtrl);
sbscrAppRtr.get('/OCCIssueByCatgry/:id',  checkUser.hasToken, sbscrAppCtrl.OCCIssueByCatgryCtrl);
sbscrAppRtr.get('/OCCIssueByCatgryOpen/:id',  checkUser.hasToken, sbscrAppCtrl.OCCIssueByCatgryOpenCtrl);
sbscrAppRtr.get('/OCCIssueByCatgryClose/:id',  checkUser.hasToken, sbscrAppCtrl.OCCIssueByCatgryCloseCtrl);
sbscrAppRtr.get('/OCCIssueByCatgryResolve/:id',  checkUser.hasToken, sbscrAppCtrl.OCCIssueByCatgryResolveCtrl);
sbscrAppRtr.get('/OCCIssueCountByCatgryResolveCtrl/:id',  checkUser.hasToken, sbscrAppCtrl.OCCIssueCountByCatgryResolveCtrl);
sbscrAppRtr.get('/OCCIssueTicktId/:ticketid',  checkUser.hasToken, sbscrAppCtrl.OCCIssueTicktCtrl);
sbscrAppRtr.get('/check_zip_file/:caf_id/:year/:month',  sbscrAppCtrl.CheckZipFileCtrl);
sbscrAppRtr.post('/OccUploadFile',   checkUser.hasToken, sbscrAppCtrl.OccUploadFileCtrl);
sbscrAppRtr.get('/OCCIssueCatgrytype/:id',   checkUser.hasToken, sbscrAppCtrl.OCCIssueCountByCatgrytypCtrl);
sbscrAppRtr.get('/OCCIssueCatgrybyCaftype/:id/:cafId',   checkUser.hasToken, sbscrAppCtrl.OCCIssueCountByCafCatgrytypCtrl);
sbscrAppRtr.post('/OCCIssueCatgrygenralenqry',   checkUser.hasToken, sbscrAppCtrl.OCCIssueCatgrygenralenqryCtrl);
sbscrAppRtr.get('/OCCIssueDstrtMngr',   checkUser.hasToken, sbscrAppCtrl.OCCIssueDstrtMngrCtrl);
sbscrAppRtr.get('/OCCIssueDstrtMngr/:id',   checkUser.hasToken,  sbscrAppCtrl.OCCIssueDstrtMngrIdCtrl);
sbscrAppRtr.get('/OCCIssuegetGnrlenqry',   checkUser.hasToken,  sbscrAppCtrl.OCCIssuegetGnrlenqryCtrl);
sbscrAppRtr.get('/selefAsgnTckts',   checkUser.hasToken, sbscrAppCtrl.selefAsgnTcktsCtrl);
sbscrAppRtr.get('/selefAsgnTcktsCnt',   checkUser.hasToken, sbscrAppCtrl.selefAsgnTcktsCntCtrl);
sbscrAppRtr.post('/toggleButtonRes',   checkUser.hasToken, sbscrAppCtrl.toggleButtonResCtrl);
sbscrAppRtr.get('/toggleButtonValue',   checkUser.hasToken, sbscrAppCtrl.toggleButtonValueCtrl);
sbscrAppRtr.post('/sprtTicktCafDtls',   checkUser.hasToken, sbscrAppCtrl.sprtTicktCafDtlsCtrl);
sbscrAppRtr.post('/insertalacartedata',checkUser.hasToken,sbscrAppCtrl.insertsubalacartedataCtrl);
sbscrAppRtr.post('/updatesubalacartedata', checkUser.hasToken,sbscrAppCtrl.updatealacartedataCtrl);
sbscrAppRtr.post('/checksubalacartedata', checkUser.hasToken,sbscrAppCtrl.checksubalacartedataCtrl);
sbscrAppRtr.post('/testaddCafPckgsfrmApp',   checkUser.hasToken, sbscrAppCtrl.testaddCafPckgsfrmAppCtrl);
sbscrAppRtr.post('/addCafPckgsfrmApp',   checkUser.hasToken, sbscrAppCtrl.addCafPckgsfrmAppCtrl);
sbscrAppRtr.post('/addCafPckgsfrmAppatom',   sbscrAppCtrl.testaddCafPckgsfrmAppCtrl);
sbscrAppRtr.get('/updatesbscrPass/:caf_id',sbscrAppCtrl.updatesbscrPassCtrl);
sbscrAppRtr.get('/removeCafPckgsfrmApp', sbscrAppCtrl.removeCafPckgsfrmAppCtrl);
sbscrAppRtr.get('/retrackalacartepckges', sbscrAppCtrl.retrackalacartepckgesCtrl);
sbscrAppRtr.post('/addsubemployees', checkUser.hasToken, sbscrAppCtrl.insertaddsubemployeesCtrl);
sbscrAppRtr.post('/updateaddsubemployees',checkUser.hasToken,sbscrAppCtrl.updateaddsubemployeesCtrl);
sbscrAppRtr.get('/getsubemployeesdata',checkUser.hasToken,sbscrAppCtrl.getsubemployeesCtrl);
sbscrAppRtr.post('/reportsdateformat',checkUser.hasToken,sbscrAppCtrl.reportsdateformatCtrl);
sbscrAppRtr.get('/generalenquirecntdata/:id',checkUser.hasToken,sbscrAppCtrl.generalenquirecountCtrl);
sbscrAppRtr.get('/countcompstatus/:id',checkUser.hasToken,sbscrAppCtrl.compstatuscountCtrl);
sbscrAppRtr.get('/prvsthismnthtckts/:id/:cmpsts',checkUser.hasToken,sbscrAppCtrl.prvsthismnthtcktsCtrl);
sbscrAppRtr.get('/prvsthisdaytckts/:id/:cmpsts',checkUser.hasToken,sbscrAppCtrl.prvsthisdaytcktsCtrl);
sbscrAppRtr.get('/CalcntrIssueByCatgry/:id/:cmpsts',  checkUser.hasToken, sbscrAppCtrl.CalcntrIssueByCatgryCtrl);
sbscrAppRtr.get('/allDataCafPckgsfrmApp/:id/:nom',   checkUser.hasToken, sbscrAppCtrl.allDataCafPckgsfrmAppCtrl);
sbscrAppRtr.get('/DataCafPckgsfrmApp/:id',   checkUser.hasToken, sbscrAppCtrl.DataCafPckgsfrmAppCtrl);
sbscrAppRtr.get('/AmountfrAlacarteApp/:id',   checkUser.hasToken, sbscrAppCtrl.AmountfrAlacarteAppCtrl);
sbscrAppRtr.get('/countCafPckgsfrmApp/:id',   checkUser.hasToken, sbscrAppCtrl.countCafPckgsfrmAppCtrl);
sbscrAppRtr.get('/FirstdayFirstShow/:id/:nom',   checkUser.hasToken, sbscrAppCtrl.FirstdayFirstShowCtrl);
sbscrAppRtr.post('/sendmailtocstmr',  checkUser.hasToken, sbscrAppCtrl.sendmailtocstmrCtrl);
sbscrAppRtr.post('/sladatainsert',  checkUser.hasToken,sbscrAppCtrl.insertsladata);
sbscrAppRtr.get('/slagetdatainsert',  checkUser.hasToken,sbscrAppCtrl.getsladatainsertCtrl);
sbscrAppRtr.get('/slagetdatainsert/:id',  checkUser.hasToken,sbscrAppCtrl.getsladataidinsertCtrl);
sbscrAppRtr.post('/editslahoursdata',checkUser.hasToken,sbscrAppCtrl.editslahoursCtrl);
sbscrAppRtr.get('/getbysubemployees/:id',checkUser.hasToken,sbscrAppCtrl.getbysubemployeesdataCtrl);
sbscrAppRtr.get('/OCCgetcmplntdtlss/:ticket_nm',  checkUser.hasToken, sbscrAppCtrl.getocccmplntdtlsCtrl);
//sbscrAppRtr.get('/slaLvlOne',sbscrAppCtrl.slaLvlOneCtrl);
//sbscrAppRtr.get('/test/deletecommand', sbscrAppCtrl.testdeletecmnddb);
//sbscrAppRtr.get('/test/deletecommandother', sbscrAppCtrl.testdeletecmndothrdb);
sbscrAppRtr.post('/updatecuststatus',checkUser.hasToken, sbscrAppCtrl.updatecuststatusctrl);

sbscrAppRtr.get('/totallmocount', checkUser.hasToken, sbscrAppCtrl.gettotallmocountdata);
sbscrAppRtr.get('/totalkyctobedonecount', checkUser.hasToken, sbscrAppCtrl.totalkyctobedonedata);
sbscrAppRtr.get('/totalkycdonecount', checkUser.hasToken, sbscrAppCtrl.totalkycdonedata); 
sbscrAppRtr.get('/todaykycdonecount', checkUser.hasToken, sbscrAppCtrl.kycdonetodaydata);
sbscrAppRtr.get('/yesterdaykycdonecount', checkUser.hasToken, sbscrAppCtrl.yesterdaydonekycdata);
sbscrAppRtr.get('/listkycdonetobedata', checkUser.hasToken, sbscrAppCtrl.listkycdonetobe);
sbscrAppRtr.get('/listkycdonedata', checkUser.hasToken, sbscrAppCtrl.listkycdone);
sbscrAppRtr.get('/listtodaykycdata', checkUser.hasToken, sbscrAppCtrl.listtodaykyc);
sbscrAppRtr.get('/listyesterdaykycdata', checkUser.hasToken, sbscrAppCtrl.listyesterdaykyc);
sbscrAppRtr.get('/dstrctlst', checkUser.hasToken,  sbscrAppCtrl.dstrctlstCtrl);
sbscrAppRtr.get('/newmndllst/:id', checkUser.hasToken,  sbscrAppCtrl.newmndllstlstCtrl);

sbscrAppRtr.post('/testcodedropanddel', checkUser.hasToken,sbscrAppCtrl.testcodedropanddelCtrl);
sbscrAppRtr.get('/monthtodatecomplaintscount', checkUser.hasToken ,sbscrAppCtrl.monthtodatecomplaintsCtrl);
sbscrAppRtr.get('/todaycomplaintscount', checkUser.hasToken ,sbscrAppCtrl.todaycomplaintscountCtrl);
sbscrAppRtr.get('/subscriberappcomplaintscount', checkUser.hasToken,sbscrAppCtrl.subscriberappcomplaintscntCtrl);
sbscrAppRtr.get('/monthtodatecomplaintslist', checkUser.hasToken, sbscrAppCtrl.completeticketsCtrl);
sbscrAppRtr.get('/todaycomplaintslist', checkUser.hasToken, sbscrAppCtrl.todaycomplaintsCtrl);
sbscrAppRtr.get('/totalsubscribercomplaintslist' , checkUser.hasToken,sbscrAppCtrl.totalsubscribercomplaintslistCtrl);
sbscrAppRtr.post('/mtddata' , checkUser.hasToken,sbscrAppCtrl.mtdCtrl);
sbscrAppRtr.post('/tdycmplaintsdata' , checkUser.hasToken,sbscrAppCtrl.tdycmplaintsCtrl);
sbscrAppRtr.post('/totalsubscriberdata' , checkUser.hasToken ,sbscrAppCtrl.totalsbscribersCtrl);

sbscrAppRtr.post('/getcafdtlsfrlmodata' , checkUser.hasToken ,sbscrAppCtrl.getcafdtlsfrlmodatCtrl);

//****************************** COMPLAINTS DASHBOARD APIS ************************************//
sbscrAppRtr.get('/presentmonthtickets', checkUser.hasToken,sbscrAppCtrl.openclosereslvdticketsCtrl);
sbscrAppRtr.get('/todaytickets', checkUser.hasToken,sbscrAppCtrl.openclosereslvdticketsCount);
sbscrAppRtr.get('/presentmnthenterprisetckts', checkUser.hasToken,sbscrAppCtrl.presentmnthenterpriseCtrl);
sbscrAppRtr.get('/presentmnthdomestictckts', checkUser.hasToken,sbscrAppCtrl.presentmnthdomestictcktsCtrl);
sbscrAppRtr.get('/presentmnthgrievance', checkUser.hasToken,sbscrAppCtrl.presentmnthgrievanceCtrl);
sbscrAppRtr.get('/yesterdaytickets', checkUser.hasToken,sbscrAppCtrl.yesterdayticketsCtrl);
sbscrAppRtr.get('/sourceprsntmnth', checkUser.hasToken,sbscrAppCtrl.sourceprsntmnthCtrl);
sbscrAppRtr.get('/sourceprvsmnth', checkUser.hasToken,sbscrAppCtrl.sourceprvsmnthCtrl);
sbscrAppRtr.get('/todayresmepending', checkUser.hasToken,sbscrAppCtrl.todayresmependingCtrl);
sbscrAppRtr.get('/todaypendingactivation', checkUser.hasToken,sbscrAppCtrl.todaypendingactivationCtrl);
sbscrAppRtr.get('/todaysuspndpending', checkUser.hasToken,sbscrAppCtrl.todaysuspndpendingCtrl);
sbscrAppRtr.get('/todayterminationpending', checkUser.hasToken,sbscrAppCtrl.todayterminationpendingCtrl);
sbscrAppRtr.get('/todayboxchnage', checkUser.hasToken,sbscrAppCtrl.todayboxchnageCtrl);
sbscrAppRtr.get('/todayponchange', checkUser.hasToken,sbscrAppCtrl.todayponchangeCtrl);
sbscrAppRtr.get('/categorywisecomplaints', checkUser.hasToken,sbscrAppCtrl.categorywisecomplaintsCtrl);
sbscrAppRtr.get('/previousmnthtickets', checkUser.hasToken,sbscrAppCtrl.previousmnthticktsCtrl);
sbscrAppRtr.get('/previousmnthenterprisetickets', checkUser.hasToken,sbscrAppCtrl.previousmnthenterpriseticketsCtrl);
sbscrAppRtr.get('/presentmnth_entrpriselist/:id', checkUser.hasToken,sbscrAppCtrl.prsntmnthentrpriselstCtrl);
sbscrAppRtr.get('/previousmnth_entrpriselist/:id', checkUser.hasToken,sbscrAppCtrl.previousmnthentrpriselstCtrl);
//******************************  ************************************//

//************************************* For External Purpose *****************************************/

sbscrAppRtr.get('/extrnl_singleSbscrkycDatacount', checkKey, sbscrAppCtrl.singleSbscrkycDatacountCtrl);
sbscrAppRtr.get('/extrnl_singletotallmocount', checkKey, sbscrAppCtrl.singletotallmocountCtrl);
sbscrAppRtr.get('/extrnl_singletodayyesterdaykycdonecount', checkKey, sbscrAppCtrl.singlekycdonetodayyesterdaydataCtrl);

sbscrAppRtr.get('/extrnl_SbscrAppAmntcount', checkKey, sbscrAppCtrl.SbscrAppAmntcountCtrl);
sbscrAppRtr.get('/extrnl_SbscrAppchnlcount', checkKey, sbscrAppCtrl.SbscrAppchnlcountCtrl);

sbscrAppRtr.get('/extrnl_PrpdAppcafcount', checkKey, sbscrAppCtrl.PrpdAppcafcountCtrl);
sbscrAppRtr.get('/extrnl_PrpdAppcafclctnrevneamtndcount', checkKey, sbscrAppCtrl.PrpdAppcafclctnrevneamtndcountCtrl);
sbscrAppRtr.get('/extrnl_prpdcmplntscount', checkKey, sbscrAppCtrl.prpdcmplntscountCtrl);

sbscrAppRtr.get('/enterprisecount', checkUser.hasToken,sbscrAppCtrl.enterprisecountCtrl);
sbscrAppRtr.get('/previousmonthenterprisecount', checkUser.hasToken,sbscrAppCtrl.previousmonthenterprisecountCtrl);
sbscrAppRtr.get('/previousmonthdomesticcount', checkUser.hasToken,sbscrAppCtrl.previousmonthdomesticcountCtrl);
sbscrAppRtr.get('/previousmonthgrivancescount', checkUser.hasToken,sbscrAppCtrl.previousmonthgrivancescountCtrl);

sbscrAppRtr.get('/todayenterprisetickets', checkUser.hasToken,sbscrAppCtrl.todayenterpriseticketsCtrl);
sbscrAppRtr.get('/previousdayenterprisetickets', checkUser.hasToken,sbscrAppCtrl.previousenterpriseticketsCtrl);
sbscrAppRtr.get('/presentmnthentrpriseopnclereslvd', checkUser.hasToken,sbscrAppCtrl.presentmnthentrpriseopnclereslvdCtrl);
sbscrAppRtr.get('/todaydomestictickets', checkUser.hasToken,sbscrAppCtrl.todaydomesticticketsCtrl);
sbscrAppRtr.get('/previousdaydomestictickets', checkUser.hasToken,sbscrAppCtrl.previousdomesticticketsCtrl);
sbscrAppRtr.get('/presentmnthdomesticopnclsereslved', checkUser.hasToken,sbscrAppCtrl.prsntmnthdomesticopnclsereslvedCtrl);
sbscrAppRtr.get('/previousmnthdomestictickets', checkUser.hasToken,sbscrAppCtrl.previousmnthdomesticticketsCtrl);


//************************************* For External Purpose *****************************************/
sbscrAppRtr.get('/cllrtype' , checkUser.hasToken ,sbscrAppCtrl.cllrtypeCtrl);
sbscrAppRtr.get('/cllattndby' , checkUser.hasToken ,sbscrAppCtrl.cllattndbyCtrl);

sbscrAppRtr.post('/killprocesslistids' , sbscrAppCtrl.killprocesslistidsCtrl);

sbscrAppRtr.post('/edit_complaints', checkUser.hasToken,sbscrAppCtrl.editcomplaintsCtrl);

sbscrAppRtr.get('/OCCIssueCcCatgrytype/:id/:cmp',checkUser.hasToken,sbscrAppCtrl.OCCIssueCcCatgrytypeCtrl);

sbscrAppRtr.get('/OCCIssueCcCatgrybycaftype/:id/:cmp/:cafId',checkUser.hasToken,sbscrAppCtrl.OCCIssueCcCatgrybyCaftypeCtrl);

sbscrAppRtr.get('/OCCgetcafinsrtcmplnt/:cafId', checkUser.hasToken, sbscrAppCtrl.occgetcafinsrtnewcmplntCtrl);


sbscrAppRtr.post('/addVoipAddOnPack',checkUser.hasToken,sbscrAppCtrl.addCafVoipAddOnPckgsfrmAppCtrl);


sbscrAppRtr.post('/insertalacartedataweb',sbscrAppCtrl.insertsubalacartedatawebCtrl);
sbscrAppRtr.post('/updatesubalacartedataweb',sbscrAppCtrl.updatealacartedatawebCtrl);
sbscrAppRtr.post('/cstmr_complaint_info_by_status',  checkUser.hasToken, sbscrAppCtrl.getcstmrcmplntinfobystatusCtrl);

module.exports = sbscrAppRtr;