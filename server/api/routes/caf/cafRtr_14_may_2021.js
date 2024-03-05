var cafRtr = require('express').Router();
var checkUser = require(appRoot + '/server/api/modules/general/auth/controllers/accessCtrl');

// Routes specific to "caf" module
// Conroller,Schema related to 'CafEventStatus'
var CafEvntStsCtrl = require(appRoot + '/server/api/modules/caf/controllers/CafEvntStsCtrl');
var CafEvntStsSch = require(appRoot + '/server/api/modules/caf/schema/CafEvntStsSch');
var CafStsCtrl = require(appRoot + '/server/api/modules/caf/controllers/CafStsCtrl');
var CafStsSch = require(appRoot + '/server/api/modules/caf/schema/CafStsSch');
var CafTypeCtrl = require(appRoot + '/server/api/modules/caf/controllers/CafTypeCtrl');
var CafTypeSch = require(appRoot + '/server/api/modules/caf/schema/CafTypeSch');
var CafCtrl = require(appRoot + '/server/api/modules/caf/controllers/CafCtrl');
var aadhaarCtrl = require(appRoot + '/server/api/modules/externalApis/controllers/aadhaarCtrl');
var FngrCtrl = require(appRoot + '/server/api/modules/caf/controllers/FngrCtrl');
var NotifCtrl = require(appRoot + '/server/api/modules/caf/controllers/NotifCtrl');
// var extrnlCTrl=require(appRoot +'/server/api/modules/externalApis/fingerprint/controllers/fngerprCtrl')
var entCafCtrl = require(appRoot + '/server/api/modules/caf/controllers/EntCustomerCtrl');
var EntrpeCstmrTypCtrl = require(appRoot + '/server/api/modules/caf/controllers/EntrpeCstmrTypCtrl');
var EntrpeCstmrTypSch = require(appRoot + '/server/api/modules/caf/schema/EntrpeCstmrTypSch');
var EntrpeCstmrSubTypCtrl = require(appRoot + '/server/api/modules/caf/controllers/EntrpeCstmrSubTypCtrl');
var CustomerCtrl = require(appRoot + '/server/api/modules/caf/controllers/CustomerCtrl');
var EntrpeCstmrSubTypSch = require(appRoot + '/server/api/modules/caf/schema/EntrpeCstmrSubTypSch');
/****************************************************************
					DB Routes (Generated 03/02/2020)
*****************************************************************/

// Routes for Table : caf_evnt_sts_lst_t (CafEventStatus)
// --------------------------------------------------------------
//get details of all CafEventStatus
cafRtr.get('/caf-event-status', checkUser.hasToken, CafEvntStsCtrl.get_CafEvntStsCtrl);
//search details of all CafEventStatus
cafRtr.post('/caf-event-status/search', checkUser.hasToken, CafEvntStsCtrl.srch_CafEvntStsCtrl);
//get details of single  CafEventStatus  
cafRtr.get('/caf-event-status/:id', checkUser.hasToken, CafEvntStsCtrl.get_CafEvntStsByIdCtrl);
//Add new  CafEventStatus
cafRtr.post('/caf-event-status', checkUser.hasToken, CafEvntStsCtrl.insrt_CafEvntStsCtrl);
//Update existing  CafEventStatus
cafRtr.post('/caf-event-status/:id', checkUser.hasToken, CafEvntStsCtrl.updte_CafEvntStsCtrl);
//Delete existing  CafEventStatus
cafRtr.delete('/caf-event-status/:id', checkUser.hasToken, CafEvntStsCtrl.dlte_CafEvntStsCtrl);




/****************************************************************
					DB Routes (Generated 03/02/2020)
*****************************************************************/

// Routes for Table : caf_sts_lst_t (CafStatus)
// --------------------------------------------------------------
//get details of all CafStatus
cafRtr.get('/caf-status', checkUser.hasToken, CafStsCtrl.get_CafStsCtrl);
//search details of all CafStatus
cafRtr.post('/caf-status/search', checkUser.hasToken, CafStsCtrl.srch_CafStsCtrl);
//get details of single  CafStatus  
cafRtr.get('/caf-status/:id', checkUser.hasToken, CafStsCtrl.get_CafStsByIdCtrl);
//Add new  CafStatus
cafRtr.post('/caf-status', checkUser.hasToken, CafStsCtrl.insrt_CafStsCtrl);
//Update existing  CafStatus
cafRtr.post('/caf-status/:id', checkUser.hasToken, CafStsCtrl.updte_CafStsCtrl);
//Delete existing  CafStatus
cafRtr.delete('/caf-status/:id', checkUser.hasToken, CafStsCtrl.dlte_CafStsCtrl);
/****************************************************************
					DB Routes (Generated 03/02/2020)
*****************************************************************/

// Routes for Table : caf_type_lst_t (CAFType)
// --------------------------------------------------------------
//get details of all CAFType
cafRtr.get('/caf-type', checkUser.hasToken, checkUser.vldSelect('caf_type_lst_t', CafTypeSch.CafTypeSchema), CafTypeCtrl.get_CafTypeCtrl);
//search details of all CAFType
cafRtr.post('/caf-type/search', checkUser.hasToken, checkUser.vldSearch('caf_type_lst_t', CafTypeSch.CafTypeSchema), CafTypeCtrl.srch_CafTypeCtrl);
//get details of single  CAFType  
cafRtr.get('/caf-type/:id', checkUser.hasToken, checkUser.vldSelect('caf_type_lst_t'), CafTypeCtrl.get_CafTypeByIdCtrl);
//Add new  CAFType
cafRtr.post('/caf-type', checkUser.hasToken, checkUser.vldInsert('caf_type_lst_t', CafTypeSch.CafTypeSchema), CafTypeCtrl.insrt_CafTypeCtrl);
//Update existing  CAFType
cafRtr.post('/caf-type/:id', checkUser.hasToken, checkUser.vldUpdate('caf_type_lst_t', CafTypeSch.CafTypeSchema), CafTypeCtrl.updte_CafTypeCtrl);
//Delete existing  CAFType
cafRtr.delete('/caf-type/:id', checkUser.hasToken, checkUser.vldDelete('caf_type_lst_t'), CafTypeCtrl.dlte_CafTypeCtrl);
/****************************************************************
					DB Routes (Generated 17/02/2020)
*****************************************************************/

// Routes for Table : entrpe_cstmr_typ_lst_t (EntrpeCstmrTyp)
// --------------------------------------------------------------
//get details of all EntrpeCstmrTyp
cafRtr.get('/EntrpeCstmrTyp', checkUser.hasToken, EntrpeCstmrTypCtrl.get_EntrpeCstmrTypCtrl);
//search details of all EntrpeCstmrTyp
cafRtr.post('/EntrpeCstmrTyp/search', checkUser.hasToken, checkUser.vldSearch('entrpe_cstmr_typ_lst_t', EntrpeCstmrTypSch.EntrpeCstmrTypSchema), EntrpeCstmrTypCtrl.srch_EntrpeCstmrTypCtrl);
//get details of single  EntrpeCstmrTyp  
cafRtr.get('/EntrpeCstmrTyp/:id', checkUser.hasToken, checkUser.vldSelect('entrpe_cstmr_typ_lst_t'), EntrpeCstmrTypCtrl.get_EntrpeCstmrTypByIdCtrl);
//Add new  EntrpeCstmrTyp
cafRtr.post('/EntrpeCstmrTyp', checkUser.hasToken, checkUser.vldInsert('entrpe_cstmr_typ_lst_t', EntrpeCstmrTypSch.EntrpeCstmrTypSchema), EntrpeCstmrTypCtrl.insrt_EntrpeCstmrTypCtrl);
//Update existing  EntrpeCstmrTyp
cafRtr.post('/EntrpeCstmrTyp/:id', checkUser.hasToken, checkUser.vldUpdate('entrpe_cstmr_typ_lst_t', EntrpeCstmrTypSch.EntrpeCstmrTypSchema), EntrpeCstmrTypCtrl.updte_EntrpeCstmrTypCtrl);
//Delete existing  EntrpeCstmrTyp
cafRtr.delete('/EntrpeCstmrTyp/:id', checkUser.hasToken, checkUser.vldDelete('entrpe_cstmr_typ_lst_t'), EntrpeCstmrTypCtrl.dlte_EntrpeCstmrTypCtrl);
/****************************************************************
					DB Routes (Generated 17/02/2020)
*****************************************************************/

// Routes for Table : entrpe_cstmr_sub_typ_lst_t (EntrpeCstmrSubTyp)
// --------------------------------------------------------------
//get details of all EntrpeCstmrSubTyp
cafRtr.get('/EntrpeCstmrSubTyp', checkUser.hasToken, EntrpeCstmrSubTypCtrl.get_EntrpeCstmrSubTypCtrl);
//search details of all EntrpeCstmrSubTyp
cafRtr.post('/EntrpeCstmrSubTyp/search', checkUser.hasToken, EntrpeCstmrSubTypCtrl.srch_EntrpeCstmrSubTypCtrl);
//get details of single  EntrpeCstmrSubTyp  
cafRtr.get('/EntrpeCstmrSubTyp/:id', checkUser.hasToken, EntrpeCstmrSubTypCtrl.get_EntrpeCstmrSubTypByIdCtrl);
//Add new  EntrpeCstmrSubTyp
cafRtr.post('/EntrpeCstmrSubTyp', checkUser.hasToken, EntrpeCstmrSubTypCtrl.insrt_EntrpeCstmrSubTypCtrl);
//Update existing  EntrpeCstmrSubTyp
cafRtr.post('/EntrpeCstmrSubTyp/:id', checkUser.hasToken, EntrpeCstmrSubTypCtrl.updte_EntrpeCstmrSubTypCtrl);
//Delete existing  EntrpeCstmrSubTyp
cafRtr.delete('/EntrpeCstmrSubTyp/:id', checkUser.hasToken, EntrpeCstmrSubTypCtrl.dlte_EntrpeCstmrSubTypCtrl);
//get details of EntrpeCstmrSubTyp by EntrpeCstmrTyp
cafRtr.get('/EntCstmrSubTyp/:id', checkUser.hasToken, EntrpeCstmrSubTypCtrl.get_EntCstmrSubTypByIdCtrl);





/****************************************************************
					DB Routes End
*****************************************************************/
// Routes for Table : caf_type_lst_t (CAFType)
// --------------------------------------------------------------
//get details of all CAFType
// cafRtr.get('/caf', 			checkUser.hasToken ,CafCtrl.get_CafCtrl);
//search details of all CAFType
// cafRtr.post('/caf/search', 	checkUser.hasToken , CafCtrl.srch_CafCtrl);
//get details of single  CAFType  
// cafRtr.get('/caf/:id', 		checkUser.hasToken ,CafCtrl.get_CafByIdCtrl);
//Add new  CAFType
cafRtr.post('/caf',  checkUser.hasToken,CafCtrl.insrt_indCafCtrl);
cafRtr.post('/insrtentcaf',  checkUser.hasToken,CafCtrl.insrt_entCafCtrl);


cafRtr.post('/cafblk',  checkUser.hasToken,CafCtrl.cafblkupld);
cafRtr.put('/updatecafDtls', checkUser.hasToken, CafCtrl.UpdateCafDtls);

cafRtr.post('/getdt', checkUser.hasToken, CafCtrl.get_cafdtls);
cafRtr.post('/getblkdt', checkUser.hasToken, CafCtrl.get_cafblkdtls);
cafRtr.post('/getentdt', checkUser.hasToken, CafCtrl.getentcafdt);
cafRtr.get('/srvpcs/:id', checkUser.hasToken, CafCtrl.srvpcsCtrl);
cafRtr.get('/getcstmrdt/:id', checkUser.hasToken, CafCtrl.getcstmrdtCtrl);
cafRtr.get('/agntid/:lmo_cd', checkUser.hasToken, CafCtrl.getagntidCtrl);

cafRtr.get('/boxallocated/:stpbx_id', checkUser.hasToken, CafCtrl.stpbxallocated);
cafRtr.get('/entcaf', checkUser.hasToken, checkUser.vldSelect('entrpe_cstmr_lst_t'), entCafCtrl.getentcstmrdt);
cafRtr.get('/entcaflst/:id', checkUser.hasToken, entCafCtrl.getentcstmrcaflst);
cafRtr.get('/entnodelst/:id', checkUser.hasToken, entCafCtrl.getentcstmrnodelst);
cafRtr.get('/connectioncnt', checkUser.hasToken, entCafCtrl.getentcstmrcnt);
cafRtr.get('/entnodecnt/:id', checkUser.hasToken, entCafCtrl.getentcstmrnodecnt);
cafRtr.get('/entcaf/:id', checkUser.hasToken, entCafCtrl.getagnt_entcstmrdtls);
cafRtr.get('/fngcaf', FngrCtrl.getfngrcafdt);
cafRtr.post('/Grpfngcaf', checkUser.hasToken, FngrCtrl.getGrpFngrcafdt);
//cafRtr.post('/entcaf', 			checkUser.hasToken , CafCtrl.insrt_entCafCtrl);
// cafRtr.get('/orgtyp', 			checkUser.hasToken , entCafCtrl.getorgtyp);
cafRtr.get('/suborgtyp/:id', checkUser.hasToken, entCafCtrl.getsuborgtyp);
// get caf details by customer id
cafRtr.get('/getcafdetails/:id', 			checkUser.hasToken , CafCtrl.getcafdetails);
cafRtr.get('/splt/:id', 			checkUser.hasToken , CafCtrl.getspltdetails);

cafRtr.get('/entcustomers/operations/:id', checkUser.hasToken, entCafCtrl.getEntCstmrsOprtnCrntMnthCtrl);

//get caf id
cafRtr.get('/cafid', checkUser.hasToken, CafCtrl.getCafId);
//add new enterprice customer
cafRtr.post('/entcustomer', checkUser.hasToken, entCafCtrl.insrt_entcustCtrl);
//add new node for existing enterprice customer
cafRtr.post('/addnode', checkUser.hasToken, entCafCtrl.insrt_entnodecustCtrl);
// customer update
cafRtr.post('/updatecstmrDtls', checkUser.hasToken, CafCtrl.updatecstmrDtlsCtrl);
// caf bulk upload
cafRtr.post('/bulkcaf', 			checkUser.hasToken , CafCtrl.insrt_blkCafCtrl);
cafRtr.get('/gtblckdtls', 			checkUser.hasToken , CafCtrl.get_blkCafCtrl);
cafRtr.get('/blkdtls', 			checkUser.hasToken , CafCtrl.get_blkdtlsCtrl);
cafRtr.post('/bulk/update', 			checkUser.hasToken , CafCtrl.updtblkcafdtlsCtrl);
cafRtr.delete('/bulk/delete/:id', 			checkUser.hasToken , CafCtrl.dltblkcafdtlsCtrl);
cafRtr.get('/orgtyp', checkUser.hasToken, entCafCtrl.getorgtyp);
cafRtr.get('/cstmrDtls',  CustomerCtrl.getcstmrdt);

cafRtr.get('/nodes/:id',checkUser.hasToken,  entCafCtrl.getentnodecustCtrl);

// cafRtr.get('/orgtyp', 			checkUser.hasToken , entCafCtrl.getorgtyp);
// cafRtr.post('/extrnApi', 			checkUser.hasToken , extrnlCTrl.initRequests);
cafRtr.get('/getfnts', checkUser.hasToken, FngrCtrl.gtFntCtrl);
cafRtr.get('/CafCt', checkUser.hasToken, FngrCtrl.gtCafct);
cafRtr.post('/sndMsg', checkUser.hasToken, FngrCtrl.sndMsgCtrl);
cafRtr.get('/gtmsgbyid/:msgid',checkUser.hasToken, FngrCtrl.getmsgbyid);
cafRtr.get('/MsgStuts', checkUser.hasToken, FngrCtrl.gtmsgStsCtrl);
cafRtr.post('/gtmsges', checkUser.hasToken, FngrCtrl.getMsgDtls);
cafRtr.post('/cnclmsg', FngrCtrl.cnclmsgCtrl);

//Delete existing  CAFType
// cafRtr.delete('/caf/:id', 		checkUser.hasToken ,CafCtrl.dlte_CafCtrl);
cafRtr.get('/aadhaar/:u_id', checkUser.hasToken, aadhaarCtrl.get_aadhaarDtlsCtrl);
// get caf details based on caf id
cafRtr.get('/customer/profile/:id', checkUser.hasToken,CafCtrl.getcafDtls);
// get caf packege details based on caf id
cafRtr.get('/customer/package/:id', checkUser.hasToken,CafCtrl.getcafPckgeDtls);
cafRtr.get('/customer/package/Agntwise/:id', checkUser.hasToken,CafCtrl.AgntPckgeDtls);

cafRtr.get('/customer/Apppackage/:id', checkUser.hasToken,CafCtrl.getAppcafPckgeDtls);
cafRtr.get('/customer/ApppackagesNw/:id', checkUser.hasToken,CafCtrl.getAppNwcafPckgeDtls);
// get caf Voip details based on caf id
cafRtr.get('/customer/voip/:id', checkUser.hasToken,CafCtrl.getcafVoipDtls);
cafRtr.get('/customerApp/voip/:id/:yr', checkUser.hasToken,CafCtrl.getcafAppVoipDtls);
// get caf HSI details based on caf id
cafRtr.get('/customer/hsi/:id', checkUser.hasToken,CafCtrl.getcafHsiDtls);
cafRtr.get('/customer/Apphsi/:id/:yr', checkUser.hasToken,CafCtrl.getAppcafHsiDtls);

// get caf INVOICE details based on caf id
cafRtr.get('/customer/invoice/:id', checkUser.hasToken,CafCtrl.getcafInvoiceDtls);
cafRtr.get('/customer/invoice/:id/:yr', checkUser.hasToken,CafCtrl.getcafAppInvoiceDtls);
cafRtr.get('/customer/Cafinvoice/:id/:yr', checkUser.hasToken,CafCtrl.getcafInvoice_ctrl);


// get caf INVOICE Charges details based on caf id
cafRtr.get('/customer/invoices/charges/:id', checkUser.hasToken,CafCtrl.getcafInvoiceChargesDtls);
cafRtr.get('/customer/getClctninvoice/charges/:id', checkUser.hasToken,CafCtrl.getcafClctnInvoiceChargesDtls);
cafRtr.get('/customer/Appinvoice/charges/:id/:yr', checkUser.hasToken,CafCtrl.getcafAppInvoiceChargesDtlsCtrl);

// get box details using serial number
cafRtr.get('/boxdtls/:id', checkUser.hasToken , CafCtrl.getBoxDtls);
// get pop details by agent id
cafRtr.get('/getPopByAgntId/:id', checkUser.hasToken , CafCtrl.getPopDtls);
cafRtr.post('/getPop', checkUser.hasToken , CafCtrl.getPop);
cafRtr.post('/getallPop', checkUser.hasToken , CafCtrl.getallPop);
cafRtr.post('/addpop', checkUser.hasToken , CafCtrl.addPop);
cafRtr.get('/poploc/:id', checkUser.hasToken , CafCtrl.getpoploc);
// Get Agent Wise CAF Details

cafRtr.post('/getAgntCafDetails', checkUser.hasToken , CafCtrl.getAgntCafDetailsCtrl)
cafRtr.post('/getAgntCafDetailsWthLmtCndtn', checkUser.hasToken , CafCtrl.getAgntCafDetailsWthLmtCndtn)
cafRtr.post('/getTotalAgentCafCnts', checkUser.hasToken , CafCtrl.getTotalAgentCafCnts)
cafRtr.post('/getpopsbyditstc', checkUser.hasToken , CafCtrl.getpopsbyditstcCtrl)
cafRtr.get('/getEntprsCafCnctns', checkUser.hasToken , CafCtrl.getEntprsCafCnctnsCntrl)
cafRtr.get('/getCustomerSegmntDta', checkUser.hasToken , CafCtrl.getCustomerSegmntDtaCtrl);
cafRtr.get('/getCustomerNewSegmntDta', checkUser.hasToken , CafCtrl.getCustomerNewSegmntDtaCtrl);
cafRtr.get('/getCustomerSlctdSegmntDta/:id/:cafID/:yr', checkUser.hasToken , CafCtrl.getCustomerSlctdSegmntDtaCtrl);
cafRtr.get('/getCustomerNewSlctdSegmntDta/:id/:cafID/:yr', checkUser.hasToken , CafCtrl.getCustomerNewSlctdSegmntDtaCtrl)


// Customer Upadte

cafRtr.get('/customer/cafDetails/:cstmr_id', checkUser.hasToken , CafCtrl.getCstmr_dtlsCtrl);
cafRtr.post('/customer/updtCstmrDtls', checkUser.hasToken , CafCtrl.cstmrDtlsUpdtnCtrl);


//get package details using package Id and servicepack Id
cafRtr.post('/getpckgeProperties', checkUser.hasToken , CafCtrl.getpckgePropertiesCtrl)
cafRtr.get('/getCafBySearch/:value', checkUser.hasToken , CafCtrl.getCafBySearchCtrl)
// Get terminated cafs by agent
cafRtr.post('/terminated/cafs', checkUser.hasToken , checkUser.vldSelect('agnt_caf_trmnd'), CafCtrl.getTrmndCafsByAgntCtrl);

cafRtr.post('/rejectTermination', checkUser.hasToken , CafCtrl.rejectTerminationCtrl);

// Insert terminated cafs by agent
cafRtr.post('/agent/terminated/cafs', checkUser.hasToken , CafCtrl.postTrmndCafsByAgntCtrl);
// Get request terminated cafs pending for approval
cafRtr.get('/terminate/cafs/approval', checkUser.hasToken , checkUser.vldSelect('caf_trmnd_aprvls'),CafCtrl.getTrmndReqCafsCtrl);
// Update request terminated cafs approval
cafRtr.post('/terminate/cafs/approval', checkUser.hasToken , CafCtrl.updateTrmndCafsCtrl);
// Get termination approved cafs by user
cafRtr.get('/terminate/cafs/approved/user', checkUser.hasToken , CafCtrl.getTrmndAprvdCafsByUsrCtrl);
cafRtr.get('/agntdstrcts', checkUser.hasToken , CafCtrl.agntdstrcs);
cafRtr.get('/agntmndls/:dstrc_id', checkUser.hasToken , CafCtrl.agntmndls);
cafRtr.get('/agntvlgs/:mndl_id/:dstrc_id', checkUser.hasToken , CafCtrl.agntvlgs);
// Get recent termination approved cafs
cafRtr.post('/terminate/cafs/approved/recent', checkUser.hasToken , CafCtrl.getTrmndAprvdCafsRcntCtrl);
// Update rejection cafs of termination
cafRtr.post('/terminate/cafs/reject', checkUser.hasToken , CafCtrl.updateTrmndCafsRjctCtrl);

// termination approval step 1 routes

// Update request terminated cafs approval --- first step process by marketing manager
cafRtr.post('/manager/terminate/cafs/approval', checkUser.hasToken , CafCtrl.updateStep1CafTrmndAprvlCtrl);

// Get termination request cafs for approval --- first step process by marketing manager
cafRtr.get('/terminate/request/cafs/approval', checkUser.hasToken , checkUser.vldSelect('caf_trmnd_aprvl_lvl1'), CafCtrl.getStep1CafTrmndAprvlCtrl);

// Get termination approved cafs by user --- first step process by marketing manager
cafRtr.get('/terminate/request/cafs/approved/user', checkUser.hasToken , CafCtrl.getStep1CafTrmndAprvdUsrCtrl);
// Get recent termination approved cafs --- first step process by marketing manager
cafRtr.post('/terminate/request/cafs/approved/recent', checkUser.hasToken , CafCtrl.getStep1CafTrmndAprvdRcntCtrl);


// Get Cafs Paid stuats list
cafRtr.post('/getPaidStatusLst', checkUser.hasToken , CafCtrl.getPaidStatusLstCtrl);
// Get caf counts for payment
cafRtr.post('/getPaidCafCnts', checkUser.hasToken , CafCtrl.getPymntCntsCtrl);

cafRtr.post('/getAgntSummaryDetails', checkUser.hasToken , CafCtrl.getAgntSummaryDetailsCtrl);

cafRtr.get('/customer/cafDetails/:cstmr_id', checkUser.hasToken , CafCtrl.getCstmr_dtlsCtrl);
cafRtr.post('/customer/updtCstmrDtls', checkUser.hasToken , CafCtrl.cstmrDtlsUpdtnCtrl);

cafRtr.post('/customer/previousSearch', CafCtrl.cmPrvSearchCtrl);

cafRtr.post('/post-notification', checkUser.hasToken , NotifCtrl.postNotifCtrl)
cafRtr.post('/post-notification-update', checkUser.hasToken , NotifCtrl.postNotifSubUpdtCtrl)
cafRtr.post('/post-notification-verify', checkUser.hasToken , NotifCtrl.verfyUpdtOtpCtrl)
cafRtr.post('/post-notification-resend', checkUser.hasToken , NotifCtrl.postNotifRsndOtpCtrl)


cafRtr.post('/verify-customer-form-update', checkUser.hasToken , NotifCtrl.verfyCustmrFormUpdteCtrl)
cafRtr.get('/getVillages/:dsct_id/:mndl_id', checkUser.hasToken , NotifCtrl.getVillages);
cafRtr.get('/getOTPPndngVrfdList/:agnt_id', checkUser.hasToken , NotifCtrl.getOTPPndngVrfdList);
cafRtr.get('/restart/:caf_id',checkUser.hasToken, CafCtrl.restartCafCtrl);
cafRtr.get('/vilidateCAF/:caf_id', CafCtrl.vilidateCAF);

cafRtr.post('/getsnglCafData', checkUser.hasToken , CafCtrl.getsnglCafDataCntrl)

cafRtr.post('/relatedcafs', CafCtrl.relatedcafsCtrl);
cafRtr.post('/getcafdtls', checkUser.hasToken , CafCtrl.getcafdtlsbyID);
cafRtr.get('/getcafdtlsbyId/:caf_id', checkUser.hasToken , CafCtrl.getdtlsbyCAFId);
cafRtr.post('/cafupdtn/:caf_id', checkUser.hasToken , CafCtrl.updtcafdtlsbyID)
cafRtr.get('/getcafsts', checkUser.hasToken , CafCtrl.getcafstsCtrl);
cafRtr.post('/updtBlngFrq', checkUser.hasToken , CafCtrl.updtBlngFrqCtrl);

cafRtr.post('/spltsupdtn/:caf_id', checkUser.hasToken , CafCtrl.spltsupdtnbycafIDCtrl)



cafRtr.get('/customer/invoiceBId/:id/:year/:mnth', checkUser.hasToken , CafCtrl.getcafdtlsbyinveId);

cafRtr.get('/crntMnthLmoCollectnsts', checkUser.hasToken , CafCtrl.getcrntMnthLmoCollectnsts);

cafRtr.get('/mnthwiseLmoCollectnsts', checkUser.hasToken , CafCtrl.getmnthwiseLmoCollectnsts);

cafRtr.post('/crntMnthLmoPndgCafs', checkUser.hasToken, CafCtrl.getcrntMnthLmoPndgCafs);

cafRtr.get('/crntMnthLmoPndgInvceCafs/:id', checkUser.hasToken, CafCtrl.getcrntMnthLmoPndgInvceCafs);

cafRtr.get('/customer/Appinvoice/charges/:id', checkUser.hasToken,CafCtrl.getcrntMnthLmoInvcDtls);

cafRtr.get('/linemanList', checkUser.hasToken,CafCtrl.getlinemanList);
cafRtr.post('/linemanCafsList', checkUser.hasToken, CafCtrl.getlinemanCafsListCtrl);
cafRtr.post('/assignPon', checkUser.hasToken, CafCtrl.postassignPonCtrl);
cafRtr.post('/removePon', checkUser.hasToken, CafCtrl.removePonCtrl);
cafRtr.post('/addLineman', checkUser.hasToken, CafCtrl.addLinemanCtrl);
cafRtr.post('/paying/dueamount', checkUser.hasToken, CafCtrl.insertmonthlyPaymentsCtrl);

//************************ CAF Reassignment Routes ********************************/
cafRtr.post('/reAssgndCafs/cafs', checkUser.hasToken, CafCtrl.getReAssgndCafsByAgntCtrl);
cafRtr.get('/kycDtls', checkUser.hasToken, CafCtrl.get_kyctypesCtrl);
cafRtr.post('/reassgndcaf', checkUser.hasToken, CafCtrl.reAssgndCafsCtrl);
cafRtr.get('/kycLmoCafDtls', checkUser.hasToken, CafCtrl.get_kycLmoCafCntDtlsCtrl);
cafRtr.post('/uploadCafKyc', checkUser.hasToken, CafCtrl.uploadCafKycCtrl);
cafRtr.post('/getcaflmoKycDtls', checkUser.hasToken, CafCtrl.getcaflmoKycDtlsCtrl);
cafRtr.post('/uploadSelfCafKyc', checkUser.hasToken, CafCtrl.uploadSelfCafKyc);
cafRtr.get('/agntkycDtls', checkUser.hasToken, CafCtrl.get_agntkyctypesCtrl);



//************************ Prepaid Routes ********************************/
cafRtr.post('/duepay_prpdCafs', checkUser.hasToken, CafCtrl.getDuepay_prpdCafsCtrl);
cafRtr.get('/getprpdCafInvcs/:id', checkUser.hasToken,CafCtrl.getprpdCafInvcsCtrl);

//************************ILL ROUTES ********************************/
cafRtr.get('/llfDtls', checkUser.hasToken,entCafCtrl.getIllCafDtlsCtrl);
cafRtr.get('/getProofTypes',checkUser.hasToken,entCafCtrl.getPrfTypsCtrl);
cafRtr.post('/illentcustomer', checkUser.hasToken, entCafCtrl.insrt_illentcustCtrl);
cafRtr.get('/getIllApprovalPckges', checkUser.hasToken, entCafCtrl.getIllApprovalPckgesCtrl);
cafRtr.get('/getIllApprovalPckgeslvl2', checkUser.hasToken, entCafCtrl.getIllApprovalPckgeslvl2Ctrl);
cafRtr.post('/ApprovalPckgeslevlOne', checkUser.hasToken, entCafCtrl.ApprovalPckgeslevlOneCtrl);
cafRtr.post('/ApprovalPckgeslevlTwo', checkUser.hasToken, entCafCtrl.ApprovalPckgeslevlTwoCtrl);
cafRtr.post('/illRjctPckges', checkUser.hasToken, entCafCtrl.illRjctPckgesCtrl);
cafRtr.get('/getCstmrData/:id/:pckgeid',checkUser.hasToken,entCafCtrl.getIilCstmrDtlsCtrl);
cafRtr.get('/CstmrDataget/:id',checkUser.hasToken,entCafCtrl.getCstmrDtlsCtrl);
cafRtr.post('/addPckge/:id',checkUser.hasToken,entCafCtrl.addPckgeILLCtrl);
cafRtr.get('/iilCaf/package/:id',checkUser.hasToken,CafCtrl.getIilcafPckgeDtls);
cafRtr.get('/getMyApprovalPckges/:lvl', checkUser.hasToken, entCafCtrl.getMyApprovalPckgesCtrl);
cafRtr.get('/getRcntApprovalPckges/:lvl', checkUser.hasToken, entCafCtrl.getRcntApprovalPckgesCtrl);
cafRtr.get('/getcreSrvcs', checkUser.hasToken, entCafCtrl.getcreSrvcsCtrl);
cafRtr.post('/uploadPckgeAgreemnt', checkUser.hasToken, entCafCtrl.getuploadAgreemntCtrl);





module.exports = cafRtr;