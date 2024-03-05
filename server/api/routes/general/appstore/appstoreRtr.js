var appstoreRtr = require('express').Router();
var checkUser 			= require(appRoot +'/server/api/modules/general/auth/controllers/accessCtrl');

// Routes specific to "appstore" module
 // Conroller,Schema related to 'Apps'
var AppCtrl				= require(appRoot +'/server/api/modules/general/appstore/controllers/AppCtrl'); 
var AppSch				= require(appRoot +'/server/api/modules/general/appstore/schema/AppSch');
 // Conroller,Schema related to 'Module properties'
var AppPrpryCtrl				= require(appRoot +'/server/api/modules/general/appstore/controllers/AppPrpryCtrl'); 
var AppPrprySch				= require(appRoot +'/server/api/modules/general/appstore/schema/AppPrprySch');
 // Conroller,Schema related to 'Modules'
var AppMdleCtrl				= require(appRoot +'/server/api/modules/general/appstore/controllers/AppMdleCtrl'); 
var AppMdleSch				= require(appRoot +'/server/api/modules/general/appstore/schema/AppMdleSch');
 // Conroller,Schema related to 'Data Types'
var AppDtypeCtrl				= require(appRoot +'/server/api/modules/general/appstore/controllers/AppDtypeCtrl'); 
var AppDtypeSch				= require(appRoot +'/server/api/modules/general/appstore/schema/AppDtypeSch');
 // Conroller,Schema related to 'App Category(s)'
var AppCtgryCtrl				= require(appRoot +'/server/api/modules/general/appstore/controllers/AppCtgryCtrl'); 
var AppCtgrySch				= require(appRoot +'/server/api/modules/general/appstore/schema/AppCtgrySch');
 // Conroller,Schema related to 'App Types'
var AppTypeCtrl				= require(appRoot +'/server/api/modules/general/appstore/controllers/AppTypeCtrl'); 
var AppTypeSch				= require(appRoot +'/server/api/modules/general/appstore/schema/AppTypeSch');
 // Conroller,Schema related to 'App Store'
var AppStreCtrl				= require(appRoot +'/server/api/modules/general/appstore/controllers/AppStreCtrl'); 
var AppStreSch				= require(appRoot +'/server/api/modules/general/appstore/schema/AppStreSch');


/****************************************************************
					DB Routes (Generated 17/01/2020)
*****************************************************************/

// Routes for Table : app_lst_t (Apps)
// --------------------------------------------------------------
//get details of all Apps
appstoreRtr.get('/apps', 			checkUser.hasToken, checkUser.vldSelect('app_lst_t',AppSch.AppSchema) ,AppCtrl.get_AppCtrl);
//search details of all Apps
appstoreRtr.post('/apps/search', 	checkUser.hasToken,checkUser.vldSearch('app_lst_t',AppSch.AppSchema) , AppCtrl.srch_AppCtrl);
//get details of single  Apps  
appstoreRtr.get('/apps/:id', 		checkUser.hasToken,checkUser.vldSelect('app_lst_t') ,AppCtrl.get_AppByIdCtrl);
//Add new  Apps
appstoreRtr.post('/apps', 			checkUser.hasToken,checkUser.vldInsert('app_lst_t',AppSch.AppSchema) , AppCtrl.insrt_AppCtrl);
//Update existing  Apps
appstoreRtr.post('/apps/:id', 		checkUser.hasToken,checkUser.vldUpdate('app_lst_t',AppSch.AppSchema) , AppCtrl.updte_AppCtrl);
//Delete existing  Apps
appstoreRtr.delete('/apps/:id', 		checkUser.hasToken,checkUser.vldDelete('app_lst_t') ,AppCtrl.dlte_AppCtrl);

// Routes for Table : app_prpry_lst_t (Module properties)
// --------------------------------------------------------------
//get details of all Module properties
appstoreRtr.get('/properties', 			checkUser.hasToken, checkUser.vldSelect('app_prpry_lst_t',AppPrprySch.AppPrprySchema) ,AppPrpryCtrl.get_AppPrpryCtrl);
//search details of all Module properties
appstoreRtr.post('/properties/search', 	checkUser.hasToken,checkUser.vldSearch('app_prpry_lst_t',AppPrprySch.AppPrprySchema) , AppPrpryCtrl.srch_AppPrpryCtrl);
//get details of single  Module properties  
appstoreRtr.get('/properties/:id', 		checkUser.hasToken,checkUser.vldSelect('app_prpry_lst_t') ,AppPrpryCtrl.get_AppPrpryByIdCtrl);
//Add new  Module properties
appstoreRtr.post('/properties', 			checkUser.hasToken,checkUser.vldInsert('app_prpry_lst_t',AppPrprySch.AppPrprySchema) , AppPrpryCtrl.insrt_AppPrpryCtrl);
//Update existing  Module properties
appstoreRtr.post('/properties/:id', 		checkUser.hasToken,checkUser.vldUpdate('app_prpry_lst_t',AppPrprySch.AppPrprySchema) , AppPrpryCtrl.updte_AppPrpryCtrl);
//Delete existing  Module properties
appstoreRtr.delete('/properties/:id', 		checkUser.hasToken,checkUser.vldDelete('app_prpry_lst_t') ,AppPrpryCtrl.dlte_AppPrpryCtrl);

// Routes for Table : app_mdle_lst_t (Modules)
// --------------------------------------------------------------
//get details of all Modules
appstoreRtr.get('/modules', 			checkUser.hasToken, checkUser.vldSelect('app_mdle_lst_t',AppMdleSch.AppMdleSchema) ,AppMdleCtrl.get_AppMdleCtrl);
//search details of all Modules
appstoreRtr.post('/modules/search', 	checkUser.hasToken,checkUser.vldSearch('app_mdle_lst_t',AppMdleSch.AppMdleSchema) , AppMdleCtrl.srch_AppMdleCtrl);
//get details of single  Modules  
appstoreRtr.get('/modules/:id', 		checkUser.hasToken,checkUser.vldSelect('app_mdle_lst_t') ,AppMdleCtrl.get_AppMdleByIdCtrl);
//Add new  Modules
appstoreRtr.post('/modules', 			checkUser.hasToken,checkUser.vldInsert('app_mdle_lst_t',AppMdleSch.AppMdleSchema) , AppMdleCtrl.insrt_AppMdleCtrl);
//Update existing  Modules
appstoreRtr.post('/modules/:id', 		checkUser.hasToken,checkUser.vldUpdate('app_mdle_lst_t',AppMdleSch.AppMdleSchema) , AppMdleCtrl.updte_AppMdleCtrl);
//Delete existing  Modules
appstoreRtr.delete('/modules/:id', 		checkUser.hasToken,checkUser.vldDelete('app_mdle_lst_t') ,AppMdleCtrl.dlte_AppMdleCtrl);

// Routes for Table : app_dtype_lst_t (Data Types)
// --------------------------------------------------------------
//get details of all Data Types
appstoreRtr.get('/datatypes', 			checkUser.hasToken, checkUser.vldSelect('app_dtype_lst_t',AppDtypeSch.AppDtypeSchema) ,AppDtypeCtrl.get_AppDtypeCtrl);
//search details of all Data Types
appstoreRtr.post('/datatypes/search', 	checkUser.hasToken,checkUser.vldSearch('app_dtype_lst_t',AppDtypeSch.AppDtypeSchema) , AppDtypeCtrl.srch_AppDtypeCtrl);
//get details of single  Data Types  
appstoreRtr.get('/datatypes/:id', 		checkUser.hasToken,checkUser.vldSelect('app_dtype_lst_t') ,AppDtypeCtrl.get_AppDtypeByIdCtrl);
//Add new  Data Types
appstoreRtr.post('/datatypes', 			checkUser.hasToken,checkUser.vldInsert('app_dtype_lst_t',AppDtypeSch.AppDtypeSchema) , AppDtypeCtrl.insrt_AppDtypeCtrl);
//Update existing  Data Types
appstoreRtr.post('/datatypes/:id', 		checkUser.hasToken,checkUser.vldUpdate('app_dtype_lst_t',AppDtypeSch.AppDtypeSchema) , AppDtypeCtrl.updte_AppDtypeCtrl);
//Delete existing  Data Types
appstoreRtr.delete('/datatypes/:id', 		checkUser.hasToken,checkUser.vldDelete('app_dtype_lst_t') ,AppDtypeCtrl.dlte_AppDtypeCtrl);

// Routes for Table : app_ctgry_lst_t (App Category(s))
// --------------------------------------------------------------
//get details of all App Category(s)
appstoreRtr.get('/category', 			checkUser.hasToken, checkUser.vldSelect('app_ctgry_lst_t',AppCtgrySch.AppCtgrySchema) ,AppCtgryCtrl.get_AppCtgryCtrl);
//search details of all App Category(s)
appstoreRtr.post('/category/search', 	checkUser.hasToken,checkUser.vldSearch('app_ctgry_lst_t',AppCtgrySch.AppCtgrySchema) , AppCtgryCtrl.srch_AppCtgryCtrl);
//get details of single  App Category(s)  
appstoreRtr.get('/category/:id', 		checkUser.hasToken,checkUser.vldSelect('app_ctgry_lst_t') ,AppCtgryCtrl.get_AppCtgryByIdCtrl);
//Add new  App Category(s)
appstoreRtr.post('/category', 			checkUser.hasToken,checkUser.vldInsert('app_ctgry_lst_t',AppCtgrySch.AppCtgrySchema) , AppCtgryCtrl.insrt_AppCtgryCtrl);
//Update existing  App Category(s)
appstoreRtr.post('/category/:id', 		checkUser.hasToken,checkUser.vldUpdate('app_ctgry_lst_t',AppCtgrySch.AppCtgrySchema) , AppCtgryCtrl.updte_AppCtgryCtrl);
//Delete existing  App Category(s)
appstoreRtr.delete('/category/:id', 		checkUser.hasToken,checkUser.vldDelete('app_ctgry_lst_t') ,AppCtgryCtrl.dlte_AppCtgryCtrl);

// Routes for Table : app_type_lst_t (App Types)
// --------------------------------------------------------------
//get details of all App Types
appstoreRtr.get('/appstore/apptype', 			checkUser.hasToken, checkUser.vldSelect('app_type_lst_t',AppTypeSch.AppTypeSchema) ,AppTypeCtrl.get_AppTypeCtrl);
//search details of all App Types
appstoreRtr.post('/appstore/apptype/search', 	checkUser.hasToken,checkUser.vldSearch('app_type_lst_t',AppTypeSch.AppTypeSchema) , AppTypeCtrl.srch_AppTypeCtrl);
//get details of single  App Types  
appstoreRtr.get('/appstore/apptype/:id', 		checkUser.hasToken,checkUser.vldSelect('app_type_lst_t') ,AppTypeCtrl.get_AppTypeByIdCtrl);
//Add new  App Types
appstoreRtr.post('/appstore/apptype', 			checkUser.hasToken,checkUser.vldInsert('app_type_lst_t',AppTypeSch.AppTypeSchema) , AppTypeCtrl.insrt_AppTypeCtrl);
//Update existing  App Types
appstoreRtr.post('/appstore/apptype/:id', 		checkUser.hasToken,checkUser.vldUpdate('app_type_lst_t',AppTypeSch.AppTypeSchema) , AppTypeCtrl.updte_AppTypeCtrl);
//Delete existing  App Types
appstoreRtr.delete('/appstore/apptype/:id', 		checkUser.hasToken,checkUser.vldDelete('app_type_lst_t') ,AppTypeCtrl.dlte_AppTypeCtrl);

// Routes for Table : app_stre_lst_t (App Store)
// --------------------------------------------------------------
//get details of all App Store
appstoreRtr.get('/store', 			checkUser.hasToken,checkUser.vldSelect('app_stre_lst_t',AppStreSch.AppStreSchema), AppStreCtrl.get_AppStreCtrl);
//search details of all App Store
appstoreRtr.post('/store/search', 	checkUser.hasToken,checkUser.vldSearch('app_stre_lst_t',AppStreSch.AppStreSchema) , AppStreCtrl.srch_AppStreCtrl);
//get details of single  App Store  
appstoreRtr.get('/store/:id', 		checkUser.hasToken,checkUser.vldSelect('app_stre_lst_t') ,AppStreCtrl.get_AppStreByIdCtrl);
//Add new  App Store
appstoreRtr.post('/store', 			checkUser.hasToken,checkUser.vldInsert('app_stre_lst_t',AppStreSch.AppStreSchema), AppStreCtrl.insrt_AppStreCtrl);
//Update existing  App Store
appstoreRtr.post('/store/:id', 		checkUser.hasToken,checkUser.vldUpdate('app_stre_lst_t',AppStreSch.AppStreSchema), AppStreCtrl.updte_AppStreCtrl);
//Delete existing  App Store
appstoreRtr.delete('/store/:id', 		checkUser.hasToken,checkUser.vldDelete('app_stre_lst_t',AppStreSch.AppStreSchema), AppStreCtrl.dlte_AppStreCtrl);



/****************************************************************
					DB Routes End
*****************************************************************/


module.exports = appstoreRtr;