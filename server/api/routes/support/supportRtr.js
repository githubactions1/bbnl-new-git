var supportRtr = require('express').Router();
var checkUser 			= require(appRoot +'/server/api/modules/general/auth/controllers/accessCtrl');

// Routes specific to "support" module
 
var SprtSrvceCtrl				= require(appRoot +'/server/api/modules/support/controllers/SprtSrvceCtrl'); 
var SprtSrvceSch				= require(appRoot +'/server/api/modules/support/schema/SprtSrvceSch');
 
var SprtAplctnCtrl				= require(appRoot +'/server/api/modules/support/controllers/SprtAplctnCtrl'); 
var SprtAplctnSch				= require(appRoot +'/server/api/modules/support/schema/SprtAplctnSch');

var SprtSvrtyCtrl				= require(appRoot +'/server/api/modules/support/controllers/SprtSvrtyCtrl'); 
var SprtSvrtySch				= require(appRoot +'/server/api/modules/support/schema/SprtSvrtySch');

var SprtPrtyCtrl				= require(appRoot +'/server/api/modules/support/controllers/SprtPrtyCtrl'); 
var SprtPrtySch				= require(appRoot +'/server/api/modules/support/schema/SprtPrtySch');
 


var SprtTcktSrceCtrl				= require(appRoot +'/server/api/modules/support/controllers/SprtTcktSrceCtrl'); 
var SprtTcktSrceSch				= require(appRoot +'/server/api/modules/support/schema/SprtTcktSrceSch');


var SprtTmCtrl				= require(appRoot +'/server/api/modules/support/controllers/SprtTmCtrl'); 
var SprtTmSch				= require(appRoot +'/server/api/modules/support/schema/SprtTmSch');

var SprtCtlgeCtrl				= require(appRoot +'/server/api/modules/support/controllers/SprtCtlgeCtrl'); 
var SprtCtlgeSch				= require(appRoot +'/server/api/modules/support/schema/SprtCtlgeSch');
 
var SprtEnvCtrl				= require(appRoot +'/server/api/modules/support/controllers/SprtEnvCtrl'); 
var SprtEnvSch				= require(appRoot +'/server/api/modules/support/schema/SprtEnvSch');

var SprtTcktTypeCtrl				= require(appRoot +'/server/api/modules/support/controllers/SprtTcktTypeCtrl'); 
var SprtTcktTypeSch				= require(appRoot +'/server/api/modules/support/schema/SprtTcktTypeSch');

var SprtTcktCtgryCtrl				= require(appRoot +'/server/api/modules/support/controllers/SprtTcktCtgryCtrl'); 
var SprtTcktCtgrySch				= require(appRoot +'/server/api/modules/support/schema/SprtTcktCtgrySch');

var SprtTcktSbCtgryCtrl				= require(appRoot +'/server/api/modules/support/controllers/SprtTcktSbCtgryCtrl'); 
var SprtTcktSbCtgrySch				= require(appRoot +'/server/api/modules/support/schema/SprtTcktSbCtgrySch');


var SprtStatusCtrl				= require(appRoot +'/server/api/modules/support/controllers/SprtStsCtrl'); 
var SprtTcktStsSch				= require(appRoot +'/server/api/modules/support/schema/SprtTcktStsSch');



/****************************************************************
					DB Routes (Generated 27/04/2020)
*****************************************************************/

// Routes for Table : sprt_srvce_lst_t (support services)
// --------------------------------------------------------------
//get details of all support services
supportRtr.get('/services', 			checkUser.hasToken, checkUser.vldSelect('sprt_srvce_lst_t') ,SprtSrvceCtrl.get_SprtSrvceCtrl);
//search details of all support services
supportRtr.post('/services/search', 	checkUser.hasToken,checkUser.vldSearch('sprt_srvce_lst_t',SprtSrvceSch.SprtSrvceSchema) , SprtSrvceCtrl.srch_SprtSrvceCtrl);
//get details of single  support services  
supportRtr.get('/services/:id', 		checkUser.hasToken,checkUser.vldSelect('sprt_srvce_lst_t') ,SprtSrvceCtrl.get_SprtSrvceByIdCtrl);
//Add new  support services
supportRtr.post('/services', 			checkUser.hasToken,checkUser.vldInsert('sprt_srvce_lst_t',SprtSrvceSch.SprtSrvceSchema) , SprtSrvceCtrl.insrt_SprtSrvceCtrl);
//Update existing  support services
supportRtr.post('/services/:id', 		checkUser.hasToken,checkUser.vldUpdate('sprt_srvce_lst_t',SprtSrvceSch.SprtSrvceSchema) , SprtSrvceCtrl.updte_SprtSrvceCtrl);
//Delete existing  support services
supportRtr.delete('/services/:id', 		checkUser.hasToken,SprtSrvceCtrl.dlte_SprtSrvceCtrl);

// Routes for Table : sprt_aplctn_lst_t (Application)
// --------------------------------------------------------------
//get details of all Application
supportRtr.get('/Application', 			checkUser.hasToken,checkUser.vldSelect('sprt_aplctn_lst_t'), SprtAplctnCtrl.get_SprtAplctnCtrl);
//search details of all Application
supportRtr.post('/Application/search', 	checkUser.hasToken,checkUser.vldSearch('sprt_aplctn_lst_t',SprtAplctnSch.SprtAplctnSchema) , SprtAplctnCtrl.srch_SprtAplctnCtrl);
//get details of single  Application  
supportRtr.get('/Application/:id', 		checkUser.hasToken,checkUser.vldSelect('sprt_aplctn_lst_t'),SprtAplctnCtrl.get_SprtAplctnByIdCtrl);
//Add new  Application
supportRtr.post('/Application', 			checkUser.hasToken,checkUser.vldInsert('sprt_aplctn_lst_t',SprtAplctnSch.SprtAplctnSchema), SprtAplctnCtrl.insrt_SprtAplctnCtrl);
//Update existing  Application
supportRtr.post('/Application/:id', 		checkUser.hasToken,checkUser.vldUpdate('sprt_aplctn_lst_t',SprtAplctnSch.SprtAplctnSchema),SprtAplctnCtrl.updte_SprtAplctnCtrl);
//Delete existing  Application
supportRtr.delete('/Application/:id', 		checkUser.hasToken,SprtAplctnCtrl.dlte_SprtAplctnCtrl);


// Routes for Table : sprt_svrty_lst_t (Severity)
// --------------------------------------------------------------
//get details of all Severity
supportRtr.get('/Severity', 			checkUser.hasToken,checkUser.vldSelect('sprt_svrty_lst_t'), SprtSvrtyCtrl.get_SprtSvrtyCtrl);
//search details of all Severity
supportRtr.post('/Severity/search', 	checkUser.hasToken,checkUser.vldSearch('sprt_svrty_lst_t',SprtSvrtySch.SprtSvrtySchema) , SprtSvrtyCtrl.srch_SprtSvrtyCtrl);
//get details of single  Severity  
supportRtr.get('/Severity/:id', 		checkUser.hasToken,checkUser.vldSelect('sprt_svrty_lst_t'),SprtSvrtyCtrl.get_SprtSvrtyByIdCtrl);
//Add new  Severity
supportRtr.post('/Severity', 			checkUser.hasToken,checkUser.vldInsert('sprt_svrty_lst_t',SprtSvrtySch.SprtSvrtySchema),SprtSvrtyCtrl.insrt_SprtSvrtyCtrl);
//Update existing  Severity
supportRtr.post('/Severity/:id', 		checkUser.hasToken,checkUser.vldUpdate('sprt_svrty_lst_t',SprtSvrtySch.SprtSvrtySchema), SprtSvrtyCtrl.updte_SprtSvrtyCtrl);
//Delete existing  Severity
supportRtr.delete('/Severity/:id', 		checkUser.hasToken,SprtSvrtyCtrl.dlte_SprtSvrtyCtrl);


// Routes for Table : sprt_prty_lst_t (Priority)
// --------------------------------------------------------------
//get details of all Priority
supportRtr.get('/Priority', 			checkUser.hasToken,checkUser.vldSelect('sprt_prty_lst_t'),SprtPrtyCtrl.get_SprtPrtyCtrl);
//search details of all Priority
supportRtr.post('/Priority/search', 	checkUser.hasToken,checkUser.vldSearch('sprt_prty_lst_t',SprtPrtySch.SprtPrtySchema) , SprtPrtyCtrl.srch_SprtPrtyCtrl);
//get details of single  Priority  
supportRtr.get('/Priority/:id', 		checkUser.hasToken ,checkUser.vldSelect('sprt_prty_lst_t'),SprtPrtyCtrl.get_SprtPrtyByIdCtrl);
//Add new  Priority
supportRtr.post('/Priority', 			checkUser.hasToken,checkUser.vldInsert('sprt_prty_lst_t',SprtPrtySch.SprtPrtySchema),SprtPrtyCtrl.insrt_SprtPrtyCtrl);
//Update existing  Priority
supportRtr.post('/Priority/:id', 		checkUser.hasToken,checkUser.vldUpdate('sprt_prty_lst_t',SprtPrtySch.SprtPrtySchema), SprtPrtyCtrl.updte_SprtPrtyCtrl);
//Delete existing  Priority
supportRtr.delete('/Priority/:id', 		checkUser.hasToken,SprtPrtyCtrl.dlte_SprtPrtyCtrl);


// Routes for Table : sprt_tckt_srce_lst_t (Ticket-Source)
// --------------------------------------------------------------
//get details of all Ticket-Source
supportRtr.get('/Ticket-Source', 			checkUser.hasToken,checkUser.vldSelect('sprt_tckt_srce_lst_t'), SprtTcktSrceCtrl.get_SprtTcktSrceCtrl);
//search details of all Ticket-Source
supportRtr.post('/Ticket-Source/search', 	checkUser.hasToken,checkUser.vldSearch('sprt_tckt_srce_lst_t',SprtTcktSrceSch.SprtTcktSrceSchema) ,SprtTcktSrceCtrl.srch_SprtTcktSrceCtrl);
//get details of single  Ticket-Source  
supportRtr.get('/Ticket-Source/:id', 		checkUser.hasToken,checkUser.vldSelect('sprt_tckt_srce_lst_t'),SprtTcktSrceCtrl.get_SprtTcktSrceByIdCtrl);
//Add new  Ticket-Source
supportRtr.post('/Ticket-Source', 			checkUser.hasToken,checkUser.vldInsert('sprt_tckt_srce_lst_t',SprtTcktSrceSch.SprtTcktSrceSchema), SprtTcktSrceCtrl.insrt_SprtTcktSrceCtrl);
//Update existing  Ticket-Source
supportRtr.post('/Ticket-Source/:id', 		checkUser.hasToken,checkUser.vldUpdate('sprt_tckt_srce_lst_t',SprtTcktSrceSch.SprtTcktSrceSchema), SprtTcktSrceCtrl.updte_SprtTcktSrceCtrl);
//Delete existing  Ticket-Source
supportRtr.delete('/Ticket-Source/:id', 		checkUser.hasToken,SprtTcktSrceCtrl.dlte_SprtTcktSrceCtrl);

// Routes for Table : sprt_tm_lst_t (Team)
// --------------------------------------------------------------
//get details of all Team
supportRtr.get('/Team', 			checkUser.hasToken,checkUser.vldSelect('sprt_tm_lst_t'),SprtTmCtrl.get_SprtTmCtrl);
//search details of all Team
supportRtr.post('/Team/search', 	checkUser.hasToken,checkUser.vldSearch('sprt_tm_lst_t',SprtTmSch.SprtTmSchema) , SprtTmCtrl.srch_SprtTmCtrl);
//get details of single  Team  
supportRtr.get('/Team/:id', 		checkUser.hasToken,checkUser.vldSelect('sprt_tm_lst_t'),SprtTmCtrl.get_SprtTmByIdCtrl);
//Add new  Team
supportRtr.post('/Team', 			checkUser.hasToken,checkUser.vldInsert('sprt_tm_lst_t',SprtTmSch.SprtTmSchema),SprtTmCtrl.insrt_SprtTmCtrl);
//Update existing  Team
supportRtr.post('/Team/:id', 		checkUser.hasToken,checkUser.vldUpdate('sprt_tm_lst_t',SprtTmSch.SprtTmSchema),SprtTmCtrl.updte_SprtTmCtrl);
//Delete existing  Team
supportRtr.delete('/Team/:id', 		checkUser.hasToken,SprtTmCtrl.dlte_SprtTmCtrl);

// Routes for Table : sprt_ctlge_lst_t (Support ticket Catalogue)
// --------------------------------------------------------------
//get details of all Support ticket Catalogue
supportRtr.get('/supportCatalogue', 			checkUser.hasToken, checkUser.vldSelect('sprt_ctlge_lst_t') ,SprtCtlgeCtrl.get_SprtCtlgeCtrl);
//search details of all Support ticket Catalogue
supportRtr.post('/supportCatalogue/search', 	checkUser.hasToken,checkUser.vldSearch('sprt_ctlge_lst_t',SprtCtlgeSch.SprtCtlgeSchema) , SprtCtlgeCtrl.srch_SprtCtlgeCtrl);
//get details of single  Support ticket Catalogue  
supportRtr.get('/supportCatalogue/:id', 		checkUser.hasToken,checkUser.vldSelect('sprt_ctlge_lst_t') ,SprtCtlgeCtrl.get_SprtCtlgeByIdCtrl);
//Add new  Support ticket Catalogue
supportRtr.post('/supportCatalogue', 			checkUser.hasToken,checkUser.vldInsert('sprt_ctlge_lst_t',SprtCtlgeSch.SprtCtlgeSchema) , SprtCtlgeCtrl.insrt_SprtCtlgeCtrl);
//Update existing  Support ticket Catalogue
supportRtr.post('/supportCatalogue/:id', 		checkUser.hasToken,checkUser.vldUpdate('sprt_ctlge_lst_t',SprtCtlgeSch.SprtCtlgeSchema) , SprtCtlgeCtrl.updte_SprtCtlgeCtrl);
//Delete existing  Support ticket Catalogue
supportRtr.delete('/supportCatalogue/:id', 		checkUser.hasToken,SprtCtlgeCtrl.dlte_SprtCtlgeCtrl);

// Routes for Table : sprt_env_lst_t (Environment)
// --------------------------------------------------------------
//get details of all Environment
supportRtr.get('/Environment', 			checkUser.hasToken,checkUser.vldSelect('sprt_env_lst_t'),SprtEnvCtrl.get_SprtEnvCtrl);
//search details of all Environment
supportRtr.post('/Environment/search', 	checkUser.hasToken,checkUser.vldSearch('sprt_env_lst_t',SprtEnvSch.SprtEnvSchema) , SprtEnvCtrl.srch_SprtEnvCtrl);
//get details of single  Environment  
supportRtr.get('/Environment/:id', 		checkUser.hasToken,checkUser.vldSelect('sprt_env_lst_t'),SprtEnvCtrl.get_SprtEnvByIdCtrl);
//Add new  Environment
supportRtr.post('/Environment', 			checkUser.hasToken,checkUser.vldInsert('sprt_env_lst_t',SprtEnvSch.SprtEnvSchema), SprtEnvCtrl.insrt_SprtEnvCtrl);
//Update existing  Environment
supportRtr.post('/Environment/:id', 		checkUser.hasToken,checkUser.vldUpdate('sprt_env_lst_t',SprtEnvSch.SprtEnvSchema), SprtEnvCtrl.updte_SprtEnvCtrl);
//Delete existing  Environment
supportRtr.delete('/Environment/:id', 		checkUser.hasToken,SprtEnvCtrl.dlte_SprtEnvCtrl);

// Routes for Table : sprt_tckt_type_lst_t (Ticket-Type)
// --------------------------------------------------------------
//get details of all Ticket-Type
supportRtr.get('/Ticket-Type', 			checkUser.hasToken,checkUser.vldSelect('sprt_tckt_type_lst_t'),SprtTcktTypeCtrl.get_SprtTcktTypeCtrl);
//search details of all Ticket-Type
supportRtr.post('/Ticket-Type/search', 	checkUser.hasToken,checkUser.vldSearch('sprt_tckt_type_lst_t',SprtTcktTypeSch.SprtTcktTypeSchema) ,SprtTcktTypeCtrl.srch_SprtTcktTypeCtrl);
//get details of single  Ticket-Type  
supportRtr.get('/Ticket-Type/:id', 		checkUser.hasToken,checkUser.vldSelect('sprt_tckt_type_lst_t'),SprtTcktTypeCtrl.get_SprtTcktTypeByIdCtrl);
//Add new  Ticket-Type
supportRtr.post('/Ticket-Type', 			checkUser.hasToken,checkUser.vldInsert('sprt_tckt_type_lst_t',SprtTcktTypeSch.SprtTcktTypeSchema), SprtTcktTypeCtrl.insrt_SprtTcktTypeCtrl);
//Update existing  Ticket-Type
supportRtr.post('/Ticket-Type/:id', 		checkUser.hasToken, checkUser.vldUpdate('sprt_tckt_type_lst_t',SprtTcktTypeSch.SprtTcktTypeSchema),SprtTcktTypeCtrl.updte_SprtTcktTypeCtrl);
//Delete existing  Ticket-Type
supportRtr.delete('/Ticket-Type/:id', 		checkUser.hasToken,SprtTcktTypeCtrl.dlte_SprtTcktTypeCtrl);

// Routes for Table : sprt_tckt_ctgry_lst_t (Category)
// --------------------------------------------------------------
//get details of all Category
supportRtr.get('/Category', 			checkUser.hasToken,checkUser.vldSelect('sprt_tckt_ctgry_lst_t'),SprtTcktCtgryCtrl.get_SprtTcktCtgryCtrl);
//search details of all Category
supportRtr.post('/Category/search', 	checkUser.hasToken , checkUser.vldSearch('sprt_tckt_ctgry_lst_t',SprtTcktCtgrySch.SprtTcktCtgrySchema) ,SprtTcktCtgryCtrl.srch_SprtTcktCtgryCtrl);
//get details of single  Category  
supportRtr.get('/Category/:id', 		checkUser.hasToken,checkUser.vldSelect('sprt_tckt_ctgry_lst_t'),SprtTcktCtgryCtrl.get_SprtTcktCtgryByIdCtrl);
//Add new  Category
supportRtr.post('/Category', 			checkUser.hasToken,checkUser.vldInsert('sprt_tckt_ctgry_lst_t',SprtTcktCtgrySch.SprtTcktCtgrySchema),SprtTcktCtgryCtrl.insrt_SprtTcktCtgryCtrl);
//Update existing  Category
supportRtr.post('/Category/:id', 		checkUser.hasToken , checkUser.vldUpdate('sprt_tckt_ctgry_lst_t',SprtTcktCtgrySch.SprtTcktCtgrySchema),SprtTcktCtgryCtrl.updte_SprtTcktCtgryCtrl);
//Delete existing  Category
supportRtr.delete('/Category/:id', 		checkUser.hasToken,SprtTcktCtgryCtrl.dlte_SprtTcktCtgryCtrl);


// Routes for Table : sprt_tckt_sb_ctgry_lst_t (Sub-Category)
// --------------------------------------------------------------
//get details of all Sub-Category
supportRtr.get('/Sub-Category', 			checkUser.hasToken,checkUser.vldSelect('sprt_tckt_sb_ctgry_lst_t'),SprtTcktSbCtgryCtrl.get_SprtTcktSbCtgryCtrl);
//search details of all Sub-Category
supportRtr.post('/Sub-Category/search', 	checkUser.hasToken,checkUser.vldSearch('sprt_tckt_sb_ctgry_lst_t',SprtTcktSbCtgrySch.SprtTcktSbCtgrySchema) , SprtTcktSbCtgryCtrl.srch_SprtTcktSbCtgryCtrl);
//get details of single  Sub-Category  
supportRtr.get('/Sub-Category/:id', 		checkUser.hasToken,checkUser.vldSelect('sprt_tckt_sb_ctgry_lst_t') ,SprtTcktSbCtgryCtrl.get_SprtTcktSbCtgryByIdCtrl);
//Add new  Sub-Category
supportRtr.post('/Sub-Category', 			checkUser.hasToken,checkUser.vldInsert('sprt_tckt_sb_ctgry_lst_t',SprtTcktSbCtgrySch.SprtTcktSbCtgrySchema) , SprtTcktSbCtgryCtrl.insrt_SprtTcktSbCtgryCtrl);
//Update existing  Sub-Category
supportRtr.post('/Sub-Category/:id', 		checkUser.hasToken,checkUser.vldUpdate('sprt_tckt_sb_ctgry_lst_t',SprtTcktSbCtgrySch.SprtTcktSbCtgrySchema) , SprtTcktSbCtgryCtrl.updte_SprtTcktSbCtgryCtrl);
//Delete existing  Sub-Category
supportRtr.delete('/Sub-Category/:id', 		checkUser.hasToken ,SprtTcktSbCtgryCtrl.dlte_SprtTcktSbCtgryCtrl);



// Routes for Table : sprt_tkt_sts_lst_t (Ticket-Status)
// --------------------------------------------------------------
//get details of all Ticket-Status
supportRtr.get('/Ticket-Status', 			checkUser.hasToken,checkUser.vldSelect('sprt_tkt_sts_lst_t'),SprtStatusCtrl.get_SprtStsCtrl);
//search details of all Ticket-Status
supportRtr.post('/Ticket-Status/search', 	checkUser.hasToken,checkUser.vldSearch('sprt_tkt_sts_lst_t',SprtTcktStsSch.SprtTcktStsSchema) ,SprtStatusCtrl.srch_SprtStsCtrl);
//get details of single  Ticket-Status  
supportRtr.get('/Ticket-Status/:id', 		checkUser.hasToken,checkUser.vldSelect('sprt_tkt_sts_lst_t'),SprtStatusCtrl.get_SprtStsByIdCtrl);
//Add new  Ticket-Status
supportRtr.post('/Ticket-Status', 			checkUser.hasToken,checkUser.vldInsert('sprt_tkt_sts_lst_t',SprtTcktStsSch.SprtTcktStsSchema), SprtStatusCtrl.insrt_SprtStsCtrl);
//Update existing  Ticket-Status
supportRtr.post('/Ticket-Status/:id', 		checkUser.hasToken, checkUser.vldUpdate('sprt_tkt_sts_lst_t',SprtTcktStsSch.SprtTcktStsSchema),SprtStatusCtrl.updte_SprtStsCtrl);
//Delete existing  Ticket-Status
supportRtr.delete('/Ticket-Status/:id', 		checkUser.hasToken,SprtStatusCtrl.dlte_SprtStsCtrl);



/****************************************************************
					DB Routes End
*****************************************************************/


module.exports = supportRtr;