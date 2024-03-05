
var packageRtr = require('express').Router();
var checkUser 			= require(appRoot +'/server/api/modules/general/auth/controllers/accessCtrl');

// Routes specific to "package" module
 // Conroller,Schema related to 'Languages'
var LngeCtrl				= require(appRoot +'/server/api/modules/package/controllers/LngeCtrl'); 
var LngeSch				= require(appRoot +'/server/api/modules/package/schema/LngeSch');

var BrdcrCtrl				= require(appRoot +'/server/api/modules/package/controllers/BrdcrCtrl'); 
var BrdcrSch				= require(appRoot +'/server/api/modules/package/schema/BrdcrSch');


var PckgeSrvcpkTypeCtrl				= require(appRoot +'/server/api/modules/package/controllers/PckgeSrvcpkTypeCtrl'); 
var PckgeSrvcpkTypeSch				= require(appRoot +'/server/api/modules/package/schema/PckgeSrvcpkTypeSch');
var GenreCtrl				= require(appRoot +'/server/api/modules/package/controllers/GenreCtrl'); 
var GenreSch				= require(appRoot +'/server/api/modules/package/schema/GenreSch');
var SrvingAsrtCtrl				= require(appRoot +'/server/api/modules/package/controllers/SrvingAsrtCtrl'); 
var SrvingAsrtSch				= require(appRoot +'/server/api/modules/package/schema/SrvingAsrtSch');
var SrvingCbleTypeCtrl				= require(appRoot +'/server/api/modules/package/controllers/SrvingCbleTypeCtrl'); 
var SrvingCbleTypeSch				= require(appRoot +'/server/api/modules/package/schema/SrvingCbleTypeSch');
var PckgePlnCtrl				= require(appRoot +'/server/api/modules/package/controllers/PckgePlnCtrl'); 
var PckgePlnSch				= require(appRoot +'/server/api/modules/package/schema/PckgePlnSch');
var CreSrvceCtrl				= require(appRoot +'/server/api/modules/package/controllers/CreSrvceCtrl'); 
var CreSrvceSch				= require(appRoot +'/server/api/modules/package/schema/CreSrvceSch');
var PckgeVoipFtrsCtrl				= require(appRoot +'/server/api/modules/package/controllers/PckgeVoipFtrsCtrl'); 
var PckgeVoipFtrsSch				= require(appRoot +'/server/api/modules/package/schema/PckgeVoipFtrsSch');
var PckgeIptvChnleCtrl				= require(appRoot +'/server/api/modules/package/controllers/PckgeIptvChnleCtrl'); 
var PckgeIptvChnleSch				= require(appRoot +'/server/api/modules/package/schema/PckgeIptvChnleSch');
var PckgeSrvcpkCtrl				= require(appRoot +'/server/api/modules/package/controllers/PckgeSrvcpkCtrl'); 
var PckgeSrvcpkSch				= require(appRoot +'/server/api/modules/package/schema/PckgeSrvcpkSch');
var addonsCntrl             = require(appRoot + '/server/api/modules/addons/controllers/addonsCntrl');


// --------------------------------------------------------------
//get details of all Languages
packageRtr.get('/languanges', 			checkUser.hasToken ,LngeCtrl.get_LngeCtrl);
//search details of all Languages
packageRtr.post('/languanges/search', 	checkUser.hasToken, LngeCtrl.srch_LngeCtrl);
//get details of single  Languages  
packageRtr.get('/languanges/:id', 		checkUser.hasToken,LngeCtrl.get_LngeByIdCtrl);
//Add new  Languages
packageRtr.post('/languanges', 			checkUser.hasToken, LngeCtrl.insrt_LngeCtrl);
//Update existing  Languages
packageRtr.post('/languanges/:id', 		checkUser.hasToken, LngeCtrl.updte_LngeCtrl);
//Delete existing  Languages
packageRtr.delete('/languanges/:id', 		checkUser.hasToken,LngeCtrl.dlte_LngeCtrl);
// Routes for Table : brdcr_lst_t (Broadcasters)
// --------------------------------------------------------------
//get details of all Broadcasters
packageRtr.get('/broadcasters', 			checkUser.hasToken,BrdcrCtrl.get_BrdcrCtrl);
//search details of all Broadcasters
packageRtr.post('/broadcasters/search', 	checkUser.hasToken,BrdcrCtrl.srch_BrdcrCtrl);
//get details of single  Broadcasters  
packageRtr.get('/broadcasters/:id', 		checkUser.hasToken,BrdcrCtrl.get_BrdcrByIdCtrl);
//Add new  Broadcasters
packageRtr.post('/broadcasters', 			checkUser.hasToken, BrdcrCtrl.insrt_BrdcrCtrl);
//Update existing  Broadcasters
packageRtr.post('/broadcasters/:id', 		checkUser.hasToken, BrdcrCtrl.updte_BrdcrCtrl);
//Delete existing  Broadcasters
packageRtr.delete('/broadcasters/:id', 		checkUser.hasToken,BrdcrCtrl.dlte_BrdcrCtrl);

// Routes for Table : pckge_srvcpk_type_lst_t (packageServicetype)
// --------------------------------------------------------------
//get details of all packageServicetype
packageRtr.get('/packageServicetype', 			checkUser.hasToken, PckgeSrvcpkTypeCtrl.get_PckgeSrvcpkTypeCtrl);
//search details of all packageServicetype
packageRtr.post('/packageServicetype/search', 	checkUser.hasToken, PckgeSrvcpkTypeCtrl.srch_PckgeSrvcpkTypeCtrl);
//get details of single  packageServicetype  
packageRtr.get('/packageServicetype/:id', 		checkUser.hasToken,PckgeSrvcpkTypeCtrl.get_PckgeSrvcpkTypeByIdCtrl);
//Add new  packageServicetype
packageRtr.post('/packageServicetype', 			checkUser.hasToken, PckgeSrvcpkTypeCtrl.insrt_PckgeSrvcpkTypeCtrl);
//Update existing  packageServicetype
packageRtr.post('/packageServicetype/:id', 		checkUser.hasToken, PckgeSrvcpkTypeCtrl.updte_PckgeSrvcpkTypeCtrl);
//Delete existing  packageServicetype
packageRtr.delete('/packageServicetype/:id', 		checkUser.hasToken,PckgeSrvcpkTypeCtrl.dlte_PckgeSrvcpkTypeCtrl);
// Routes for Table : genre_lst_t (genrelst)
// --------------------------------------------------------------
//get details of all genrelst
packageRtr.get('/genrelst', 			checkUser.hasToken, GenreCtrl.get_GenreCtrl);
//search details of all genrelst
packageRtr.post('/genrelst/search', 	checkUser.hasToken,GenreCtrl.srch_GenreCtrl);
//get details of single  genrelst  
packageRtr.get('/genrelst/:id', 		checkUser.hasToken,GenreCtrl.get_GenreByIdCtrl);
//Add new  genrelst
packageRtr.post('/genrelst', 			checkUser.hasToken,GenreCtrl.insrt_GenreCtrl);
//Update existing  genrelst
packageRtr.post('/genrelst/:id', 		checkUser.hasToken, GenreCtrl.updte_GenreCtrl);
//Delete existing  genrelst
packageRtr.delete('/genrelst/:id', 		checkUser.hasToken,GenreCtrl.dlte_GenreCtrl);
/****************************************************************
					DB Routes (Generated 05/02/2020)
*****************************************************************/

// Routes for Table : pckge_lst_t (packagePlan)
// --------------------------------------------------------------
//get details of all packagePlan
packageRtr.get('/get_rpt_packages', 			checkUser.hasToken,PckgePlnCtrl.get_rpt_pckgCtrl);
packageRtr.get('/packagePlan', 			checkUser.hasToken,PckgePlnCtrl.get_PckgePlnCtrl);
packageRtr.get('/getpackages', 			checkUser.hasToken,PckgePlnCtrl.get_PckgesCtrl);
//search details of all packagePlan
packageRtr.post('/packagePlan/search', 	checkUser.hasToken, PckgePlnCtrl.srch_PckgePlnCtrl);
//get details of single  packagePlan  
packageRtr.get('/packagePlan/:id', 		checkUser.hasToken,PckgePlnCtrl.get_PckgePlnByIdCtrl);
//Add new  packagePlan
packageRtr.post('/packagePlan', 			checkUser.hasToken, PckgePlnCtrl.insrt_PckgePlnCtrl);
//Update existing  packagePlan
packageRtr.post('/packagePlan/:id', 		checkUser.hasToken, PckgePlnCtrl.updte_PckgePlnCtrl);
//Delete existing  packagePlan
packageRtr.delete('/packagePlan/:id', 		checkUser.hasToken,PckgePlnCtrl.dlte_PckgePlnCtrl);

packageRtr.get('/srvcpcks/:id', 			checkUser.hasToken,PckgePlnCtrl.get_srvcpcksCtrl);

packageRtr.get('/getPckgeDtlsById/:id', 		checkUser.hasToken,	PckgePlnCtrl.get_PckgeDtlsByIdCtrl);

packageRtr.get('/getPckgesByAgntId/:id/:caf_type_id', checkUser.hasToken ,	PckgePlnCtrl.get_PckgesByAgntIdCtrl);
packageRtr.get('/getEntPckges/:caf_type_id', 		PckgePlnCtrl.get_entPckgesCtrl);
packageRtr.get('/getPckgesById/:id', 		PckgePlnCtrl.get_PckgesByIdCtrl);


packageRtr.get('/getPckgesfrPdf', checkUser.hasToken ,	PckgePlnCtrl.get_PckgesFrPdfIdCtrl);

packageRtr.post('/getPckgesfrcafIdPdf', checkUser.hasToken ,	PckgePlnCtrl.get_PckgesFrcafIdPdfIdCtrl);


// Routes for Table : srving_asrt_lst_t (Srvngasrtlst)
// --------------------------------------------------------------
//get details of all Srvngasrtlst
packageRtr.get('/Srvngasrtlst', 		SrvingAsrtCtrl.get_SrvingAsrtCtrl);
//search details of all Srvngasrtlst
packageRtr.post('/Srvngasrtlst/search', 	checkUser.hasToken, SrvingAsrtCtrl.srch_SrvingAsrtCtrl);
//get details of single  Srvngasrtlst  
packageRtr.get('/Srvngasrtlst/:id', 		checkUser.hasToken,SrvingAsrtCtrl.get_SrvingAsrtByIdCtrl);
//Add new  Srvngasrtlst
packageRtr.post('/Srvngasrtlst', 			checkUser.hasToken,SrvingAsrtCtrl.insrt_SrvingAsrtCtrl);
//Update existing  Srvngasrtlst
packageRtr.post('/Srvngasrtlst/:id', 		checkUser.hasToken, SrvingAsrtCtrl.updte_SrvingAsrtCtrl);
//Delete existing  Srvngasrtlst
packageRtr.delete('/Srvngasrtlst/:id', 		checkUser.hasToken,SrvingAsrtCtrl.dlte_SrvingAsrtCtrl);




// Routes for Table : srving_cble_type_lst_t (srvngcbltyplst)
// --------------------------------------------------------------
//get details of all srvngcbltyplst
packageRtr.get('/srvngcbltyplst', 		 SrvingCbleTypeCtrl.get_SrvingCbleTypeCtrl);
//search details of all srvngcbltyplst
packageRtr.post('/srvngcbltyplst/search', 	checkUser.hasToken, SrvingCbleTypeCtrl.srch_SrvingCbleTypeCtrl);
//get details of single  srvngcbltyplst  
packageRtr.get('/srvngcbltyplst/:id', 		checkUser.hasToken,SrvingCbleTypeCtrl.get_SrvingCbleTypeByIdCtrl);
//Add new  srvngcbltyplst
packageRtr.post('/srvngcbltyplst', 			checkUser.hasToken,SrvingCbleTypeCtrl.insrt_SrvingCbleTypeCtrl);
//Update existing  srvngcbltyplst
packageRtr.post('/srvngcbltyplst/:id', 		checkUser.hasToken, SrvingCbleTypeCtrl.updte_SrvingCbleTypeCtrl);
//Delete existing  srvngcbltyplst
packageRtr.delete('/srvngcbltyplst/:id', 		checkUser.hasToken,SrvingCbleTypeCtrl.dlte_SrvingCbleTypeCtrl);

// Routes for Table : cre_srvce_lst_t (cresrvce)
// --------------------------------------------------------------
//get details of all cresrvce
packageRtr.get('/cresrvce', 			checkUser.hasToken,CreSrvceCtrl.get_CreSrvceCtrl);
//search details of all cresrvce
packageRtr.post('/cresrvce/search', 	checkUser.hasToken, CreSrvceCtrl.srch_CreSrvceCtrl);
//get details of single  cresrvce  
packageRtr.get('/cresrvce/:id', 		checkUser.hasToken,CreSrvceCtrl.get_CreSrvceByIdCtrl);
//Add new  cresrvce
packageRtr.post('/cresrvce', 			checkUser.hasToken, CreSrvceCtrl.insrt_CreSrvceCtrl);
//Update existing  cresrvce
packageRtr.post('/cresrvce/:id', 		checkUser.hasToken, CreSrvceCtrl.updte_CreSrvceCtrl);
//Delete existing  cresrvce
packageRtr.delete('/cresrvce/:id', 		checkUser.hasToken,CreSrvceCtrl.dlte_CreSrvceCtrl);

// Routes for Table : pckge_voip_ftrs_lst_t (pckgevoipFeatures)
// --------------------------------------------------------------
//get details of all pckgevoipFeatures
packageRtr.get('/pckgevoipFeatures', 			checkUser.hasToken,PckgeVoipFtrsCtrl.get_PckgeVoipFtrsCtrl);
//search details of all pckgevoipFeatures
packageRtr.post('/pckgevoipFeatures/search', 	checkUser.hasToken, PckgeVoipFtrsCtrl.srch_PckgeVoipFtrsCtrl);
//get details of single  pckgevoipFeatures  
packageRtr.get('/pckgevoipFeatures/:id', 		checkUser.hasToken,PckgeVoipFtrsCtrl.get_PckgeVoipFtrsByIdCtrl);
//Add new  pckgevoipFeatures
packageRtr.post('/pckgevoipFeatures', 			checkUser.hasToken, PckgeVoipFtrsCtrl.insrt_PckgeVoipFtrsCtrl);
//Update existing  pckgevoipFeatures
packageRtr.post('/pckgevoipFeatures/:id', 		checkUser.hasToken, PckgeVoipFtrsCtrl.updte_PckgeVoipFtrsCtrl);
//Delete existing  pckgevoipFeatures
packageRtr.delete('/pckgevoipFeatures/:id', 		checkUser.hasToken,PckgeVoipFtrsCtrl.dlte_PckgeVoipFtrsCtrl);
/****************************************************************
					DB Routes (Generated 06/02/2020)
*****************************************************************/

// Routes for Table : pckge_iptv_chnle_lst_t (pckgeIptvChannels)
// --------------------------------------------------------------
//get details of all pckgeIptvChannels
packageRtr.get('/pckgeIptvChannels', 			checkUser.hasToken,PckgeIptvChnleCtrl.get_PckgeIptvChnleCtrl);
//search details of all pckgeIptvChannels
packageRtr.post('/pckgeIptvChannels/search', 	checkUser.hasToken, PckgeIptvChnleCtrl.srch_PckgeIptvChnleCtrl);
//get details of single  pckgeIptvChannels  
packageRtr.get('/pckgeIptvChannels/:id', 		checkUser.hasToken,PckgeIptvChnleCtrl.get_PckgeIptvChnleByIdCtrl);
//Add new  pckgeIptvChannels
packageRtr.post('/pckgeIptvChannels', 			checkUser.hasToken, PckgeIptvChnleCtrl.insrt_PckgeIptvChnleCtrl);
//Update existing  pckgeIptvChannels
packageRtr.post('/pckgeIptvChannels/:id', 		checkUser.hasToken, PckgeIptvChnleCtrl.updte_PckgeIptvChnleCtrl);
//Delete existing  pckgeIptvChannels
packageRtr.delete('/pckgeIptvChannels/:id', 		checkUser.hasToken,PckgeIptvChnleCtrl.dlte_PckgeIptvChnleCtrl);

packageRtr.get('/refrshChnles/', 		checkUser.hasToken,PckgeIptvChnleCtrl.get_PckgeIptvChnleRefrshCtrl);

//get details of all packagePlanList
packageRtr.get('/packagePlanLst', checkUser.hasToken,PckgePlnCtrl.get_PckgePlnLstCtrl);
packageRtr.get('/packages/services/:pckgeid', checkUser.hasToken,PckgePlnCtrl.get_PckgeservicesCtrl);
packageRtr.post('/insrt_packageAgreement', checkUser.hasToken,PckgePlnCtrl.insert_PckgeAgreementCtrl);
packageRtr.post('/cancel_packageAgreement', checkUser.hasToken,PckgePlnCtrl.cancel_PckgeAgreementCtrl);
packageRtr.get('/select_packageAgreement', checkUser.hasToken,checkUser.vldSelect('pckge_agrmnt'),PckgePlnCtrl.get_PckgeAgreementCtrl);
packageRtr.post('/ServicesAndPartners', checkUser.hasToken,PckgePlnCtrl.get_servicesPartnersCtrl);
packageRtr.get('/select_packageAgreement/:agntId', checkUser.hasToken,PckgePlnCtrl.get_PckgeAgreementAgentCtrl);
packageRtr.get('/agreement/details/:agreemntId', checkUser.hasToken,PckgePlnCtrl.get_PckgeAgreementDtlsCtrl);
packageRtr.post('/agreement/partners/details', checkUser.hasToken,PckgePlnCtrl.get_pckgeprtnrsCtrl);
packageRtr.get('/packageAgreement/approval', checkUser.hasToken,checkUser.vldSelect('pckge_agrmnt_aprvl'),PckgePlnCtrl.get_PckgeAgreementAprvalCtrl);

packageRtr.post('/agreement/ApproveAndReject', checkUser.hasToken,PckgePlnCtrl.get_agreementToAprvalCtrl);
packageRtr.get('/agreement/myapprovals', checkUser.hasToken,PckgePlnCtrl.get_MyApprovals);
packageRtr.get('/agreement/recentApprovals', checkUser.hasToken,PckgePlnCtrl.get_recentapprovals);












// Routes for Table : pckge_srvcpk_lst_t (packageServiceLst)
// --------------------------------------------------------------
//get details of all packageServiceLst
packageRtr.get('/packageServiceLst', 			checkUser.hasToken, checkUser.vldSelect('pckge_srvcpk_lst_t',PckgeSrvcpkSch.PckgeSrvcpkSchema) ,PckgeSrvcpkCtrl.get_PckgeSrvcpkCtrl);
//search details of all packageServiceLst
packageRtr.post('/packageServiceLst/search', 	checkUser.hasToken,checkUser.vldSearch('pckge_srvcpk_lst_t',PckgeSrvcpkSch.PckgeSrvcpkSchema) , PckgeSrvcpkCtrl.srch_PckgeSrvcpkCtrl);
//get details of single  packageServiceLst  
packageRtr.get('/packageServiceLst/:id', 		checkUser.hasToken,checkUser.vldSelect('pckge_srvcpk_lst_t') ,PckgeSrvcpkCtrl.get_PckgeSrvcpkByIdCtrl);
//Add new  packageServiceLst
packageRtr.post('/packageServiceLst', 			checkUser.hasToken,PckgeSrvcpkCtrl.insrt_PckgeSrvcpkCtrl);
//Update existing  packageServiceLst
packageRtr.post('/packageServiceLst/:id', 		checkUser.hasToken, PckgeSrvcpkCtrl.updte_PckgeSrvcpkCtrl);
//Delete existing  packageServiceLst
packageRtr.delete('/packageServiceLst/:id', 		checkUser.hasToken,PckgeSrvcpkCtrl.dlte_PckgeSrvcpkCtrl);

packageRtr.get('/channels', 			checkUser.hasToken,PckgeSrvcpkCtrl.get_chnlsCtrl);
packageRtr.get('/hsiproperties', 			checkUser.hasToken,PckgeSrvcpkCtrl.get_HsiPrptyCtrl);
packageRtr.get('/ChrgTyp', 			checkUser.hasToken,PckgePlnCtrl.get_PlnChrgTypCtrl);
packageRtr.post('/srvpckDtls', 			checkUser.hasToken,PckgeSrvcpkCtrl.get_srvpckDtls);
packageRtr.post('/iptvextnlcall', 			checkUser.hasToken,PckgePlnCtrl.iptvextnlcallCtrl);




// ADON Routes

packageRtr.post('/getCafVoipCstmrDtls', checkUser.hasToken , addonsCntrl.getCafVoipCstmrDtlsCtrl)

packageRtr.post('/getCafCstmrDtls', checkUser.hasToken , addonsCntrl.getCafCstmrDtls)
packageRtr.post('/web/getCafCstmrDtls', checkUser.hasToken , addonsCntrl.getWebCafCstmrDtls)
packageRtr.post('/getHsiCafCstmrDtls', checkUser.hasToken , addonsCntrl.getHsiCafCstmrDtls)

// addon packages routes
packageRtr.post('/packages/addons/channels', addonsCntrl.getAddOnPackages);
packageRtr.post('/packages/addons/localChannels', addonsCntrl.getAddOnLocalChnlPackages);
packageRtr.post('/packages/web/addons/localChannels', addonsCntrl.getWebAddOnLocalChnlPackages);


// add packages to caf
packageRtr.post('/addCafPckgs', checkUser.hasToken , addonsCntrl.addCafPckgs);
packageRtr.post('/addCafPckgs_newversion', checkUser.hasToken , addonsCntrl.newversionaddCafPckgs);
packageRtr.post('/addHSICafPckgs', checkUser.hasToken , addonsCntrl.addHSICafPckgs);
packageRtr.post('/addHSICafPckgs_newversion', checkUser.hasToken , addonsCntrl.newversionaddHSICafPckgs);

packageRtr.post('/removeAddons', checkUser.hasToken , addonsCntrl.removeAddons);
packageRtr.get('/getAddonsFromCAF/:caf_id', checkUser.hasToken , addonsCntrl.getAddonsFromCAF);
packageRtr.get('/getChannels/:srvc_pck_id', checkUser.hasToken , addonsCntrl.getChannels);
packageRtr.get('/getCAFSelectdPackage/:caf_id', checkUser.hasToken , addonsCntrl.getCAFSelectdPackage);
packageRtr.post('/updtCrntPlanToNewPackgePlan', checkUser.hasToken , addonsCntrl.updtCrntPlanToNewPackgePlan);
packageRtr.post('/validatePackagePlan', checkUser.hasToken , addonsCntrl.validatePackagePlan);

// HSI routes
packageRtr.post('/packages/addons/hsi', addonsCntrl.getAddOnHSIPackages);
packageRtr.post('/packages/addons/voip', addonsCntrl.getAddOnVOIPPackages);
packageRtr.get('/hsi/monthly/details/caf/:id', checkUser.hasToken , addonsCntrl.getCstmrMnthlyHsiPckgeDtlsCtrl);

packageRtr.get('/call-history-download', function (req, res) {
    filepath = path.join(appRoot +'/glits/DSN/2020331/filename.pdf');
    console.log(filepath);
    res.download(filepath);

})

module.exports = packageRtr;


// ADON Routes End






module.exports = packageRtr;
