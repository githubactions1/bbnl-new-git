var adminRtr = require('express').Router();
var checkUser = require(appRoot + '/server/api/modules/general/auth/controllers/accessCtrl');

// Routes specific to "admin" module
// Conroller,Schema related to 'States'
var SteCtrl = require(appRoot + '/server/api/modules/admin/controllers/SteCtrl');
var SteSch = require(appRoot + '/server/api/modules/admin/schema/SteSch');
var DstrtCtrl = require(appRoot + '/server/api/modules/admin/controllers/DstrtCtrl');
var DstrtSch = require(appRoot + '/server/api/modules/admin/schema/DstrtSch');


var OrgnCtrl = require(appRoot + '/server/api/modules/admin/controllers/OrgnCtrl');
var OrgnSch = require(appRoot + '/server/api/modules/admin/schema/OrgnSch');
var MndlCtrl = require(appRoot + '/server/api/modules/admin/controllers/MndlCtrl');
var MndlSch = require(appRoot + '/server/api/modules/admin/schema/MndlSch');
var VlgeCtrl = require(appRoot + '/server/api/modules/admin/controllers/VlgeCtrl');
var VlgeSch = require(appRoot + '/server/api/modules/admin/schema/VlgeSch');
var CtyCtrl = require(appRoot + '/server/api/modules/admin/controllers/CtyCtrl');
var CtySch = require(appRoot + '/server/api/modules/admin/schema/CtySch');
var DsgnCtrl = require(appRoot + '/server/api/modules/admin/controllers/DsgnCtrl');
var DsgnSch = require(appRoot + '/server/api/modules/admin/schema/DsgnSch');
var MrchtOtltCtrl = require(appRoot + '/server/api/modules/admin/controllers/MrchtOtltCtrl');
var MrchtOtltSch = require(appRoot + '/server/api/modules/admin/schema/MrchtOtltSch');
var MrchtOtltCtgryCtrl = require(appRoot + '/server/api/modules/admin/controllers/MrchtOtltCtgryCtrl');
var MrchtOtltCtgrySch = require(appRoot + '/server/api/modules/admin/schema/MrchtOtltCtgrySch');
var SbstnCtrl = require(appRoot + '/server/api/modules/admin/controllers/SbStnCtrl');
var SbstnSch = require(appRoot + '/server/api/modules/admin/schema/SbStnSch');
var SbstnTypeCtrl = require(appRoot + '/server/api/modules/admin/controllers/SbstnTypeCtrl');
var SbstnTypeSch = require(appRoot + '/server/api/modules/admin/schema/SbstnTypeSch');

/****************************************************************
					DB Routes (Generated 05/02/2020)
*****************************************************************/

// Routes for Table : sbstn_lst_t (subStn)
// --------------------------------------------------------------
//get details of all subStn
adminRtr.get('/subStn', SbstnCtrl.get_SbstnCtrl);
//search details of all subStn
adminRtr.post('/subStn/search', SbstnCtrl.srch_SbstnCtrl);
//get details of single  subStn  
adminRtr.get('/subStn/:id', checkUser.hasToken, SbstnCtrl.get_SbstnByIdCtrl);
//Add new  subStn
adminRtr.post('/subStn', checkUser.hasToken, SbstnCtrl.insrt_SbstnCtrl);
//Update existing  subStn
adminRtr.post('/subStn/:id', checkUser.hasToken, SbstnCtrl.updte_SbstnCtrl);
//Delete existing  subStn
adminRtr.delete('/subStn/:id', checkUser.hasToken, SbstnCtrl.dlte_SbstnCtrl);
/****************************************************************
					DB Routes (Generated 03/02/2020)
*****************************************************************/

// Routes for Table : ste_lst_t (states)
// --------------------------------------------------------------
//get details of all states
adminRtr.get('/states', checkUser.hasToken, SteCtrl.get_SteCtrl);
//search details of all states
adminRtr.post('/states/search', checkUser.hasToken, SteCtrl.srch_SteCtrl);
//get details of single  states  
adminRtr.get('/states/:id', checkUser.hasToken, SteCtrl.get_SteByIdCtrl);
//Add new  states
adminRtr.post('/states', checkUser.hasToken, SteCtrl.insrt_SteCtrl);
//Update existing  states
adminRtr.post('/states/:id', checkUser.hasToken, SteCtrl.updte_SteCtrl);
//Delete existing  states
adminRtr.delete('/states/:id', checkUser.hasToken, SteCtrl.dlte_SteCtrl);



/****************************************************************
					DB Routes (Generated 31/01/2020)
*****************************************************************/

adminRtr.get('/districts', checkUser.hasToken, DstrtCtrl.get_DstrtCtrl);
//search details of all districts
adminRtr.post('/districts/search', checkUser.hasToken, DstrtCtrl.srch_DstrtCtrl);
//get details of single  districts  
adminRtr.get('/districts/:id', checkUser.hasToken, DstrtCtrl.get_DstrtByIdCtrl);
//get details of   mandals by district  
adminRtr.get('/states/:id/districts', checkUser.hasToken, DstrtCtrl.get_DstrtBySteIdCtrl);
//Add new  districts
adminRtr.post('/districts', checkUser.hasToken, DstrtCtrl.insrt_DstrtCtrl);
//Update existing  districts
adminRtr.post('/districts/:id', checkUser.hasToken, DstrtCtrl.updte_DstrtCtrl);
//Delete existing  districts
adminRtr.delete('/districts/:id', checkUser.hasToken, DstrtCtrl.dlte_DstrtCtrl);

/****************************************************************
				   DB Routes (Generated 31/01/2020)
*****************************************************************/

// Routes for Table : orgn_lst_t (Organisations)
// --------------------------------------------------------------
//get details of all Organisations
adminRtr.get('/organisations', checkUser.hasToken, OrgnCtrl.get_OrgnCtrl);
//search details of all Organisations
adminRtr.post('/organisations/search', checkUser.hasToken, OrgnCtrl.srch_OrgnCtrl);
//get details of single  Organisations  
adminRtr.get('/organisations/:id', checkUser.hasToken, OrgnCtrl.get_OrgnByIdCtrl);
//Add new  Organisations
adminRtr.post('/organisations', checkUser.hasToken, OrgnCtrl.insrt_OrgnCtrl);
//Update existing  Organisations
adminRtr.post('/organisations/:id', checkUser.hasToken, OrgnCtrl.updte_OrgnCtrl);
//Delete existing  Organisations
adminRtr.delete('/organisations/:id', checkUser.hasToken, OrgnCtrl.dlte_OrgnCtrl);



/****************************************************************
					DB Routes (Generated 05/02/2020)
*****************************************************************/

// Routes for Table : mndl_lst_t (mandals)
// --------------------------------------------------------------
//get details of all mandals
adminRtr.get('/mandals', checkUser.hasToken, MndlCtrl.get_MndlCtrl);
//get details of   mandals by district  
adminRtr.get('/districts/:id/mandals', checkUser.hasToken, MndlCtrl.get_MndlBydstIdCtrl);
//search details of all mandals
adminRtr.post('/mandals/search', checkUser.hasToken, MndlCtrl.srch_MndlCtrl);
//get details of single  mandals  
adminRtr.get('/mandals/:id', checkUser.hasToken, MndlCtrl.get_MndlByIdCtrl);
//Add new  mandals
adminRtr.post('/mandals', checkUser.hasToken, MndlCtrl.insrt_MndlCtrl);
//Update existing  mandals
adminRtr.post('/mandals/:id', checkUser.hasToken, MndlCtrl.updte_MndlCtrl);
//Delete existing  mandals
adminRtr.delete('/mandals/:id', checkUser.hasToken, MndlCtrl.dlte_MndlCtrl);

/****************************************************************
					DB Routes End
*****************************************************************/
/****************************************************************
					DB Routes (Generated 05/02/2020)
*****************************************************************/

// Routes for Table : sbstn_type_lst_t (subStnTyp)
// --------------------------------------------------------------
//get details of all subStnTyp
adminRtr.get('/subStnTyp', checkUser.hasToken, SbstnTypeCtrl.get_SbstnTypeCtrl);
//search details of all subStnTyp
adminRtr.post('/subStnTyp/search', checkUser.hasToken, SbstnTypeCtrl.srch_SbstnTypeCtrl);
//get details of single  subStnTyp  
adminRtr.get('/subStnTyp/:id', checkUser.hasToken, SbstnTypeCtrl.get_SbstnTypeByIdCtrl);
//Add new  subStnTyp
adminRtr.post('/subStnTyp', checkUser.hasToken, SbstnTypeCtrl.insrt_SbstnTypeCtrl);
//Update existing  subStnTyp
adminRtr.post('/subStnTyp/:id', checkUser.hasToken, SbstnTypeCtrl.updte_SbstnTypeCtrl);
//Delete existing  subStnTyp
adminRtr.delete('/subStnTyp/:id', checkUser.hasToken, SbstnTypeCtrl.dlte_SbstnTypeCtrl);



/****************************************************************
					DB Routes (Generated 07/02/2020)
*****************************************************************/

// Routes for Table : vlge_lst_t (villages)
// --------------------------------------------------------------
//get details of all villages
adminRtr.get('/villages', checkUser.hasToken, VlgeCtrl.get_VlgeCtrl);
//search details of all villages
adminRtr.post('/villages/search', checkUser.hasToken, VlgeCtrl.srch_VlgeCtrl);
//get details of single  villages  
adminRtr.get('/villages/:id', checkUser.hasToken, VlgeCtrl.get_VlgeByIdCtrl);
//Add new  villages
adminRtr.post('/villages', checkUser.hasToken, VlgeCtrl.insrt_VlgeCtrl);
//Update existing  villages
adminRtr.post('/villages/:id', checkUser.hasToken, VlgeCtrl.updte_VlgeCtrl);
//Delete existing  villages
adminRtr.delete('/villages/:id', checkUser.hasToken, VlgeCtrl.dlte_VlgeCtrl);
//get details of village by mandal  
adminRtr.get('/mandals/:id/villages', checkUser.hasToken, VlgeCtrl.get_VlgeByMndlIdCtrl);

/****************************************************************
					DB Routes (Generated 07/02/2020)
*****************************************************************/

// Routes for Table : cty_lst_t (cities)
// --------------------------------------------------------------
//get details of all cities
adminRtr.get('/cities', checkUser.hasToken, CtyCtrl.get_CtyCtrl);
//search details of all cities
adminRtr.post('/cities/search', checkUser.hasToken, CtyCtrl.srch_CtyCtrl);
//get details of single  cities  
adminRtr.get('/cities/:id', checkUser.hasToken, CtyCtrl.get_CtyByIdCtrl);
//Add new  cities
adminRtr.post('/cities', checkUser.hasToken, CtyCtrl.insrt_CtyCtrl);
//Update existing  cities
adminRtr.post('/cities/:id', checkUser.hasToken, CtyCtrl.updte_CtyCtrl);
//Delete existing  cities
adminRtr.delete('/cities/:id', checkUser.hasToken, CtyCtrl.dlte_CtyCtrl);



// Routes for Table : dsgn_lst_t (Designations)
// --------------------------------------------------------------
//get details of all Designations
adminRtr.get('/designations', checkUser.hasToken, DsgnCtrl.get_DsgnCtrl);
//search details of all Designations
adminRtr.post('/designations/search', checkUser.hasToken, DsgnCtrl.srch_DsgnCtrl);
//get details of single  Designations  
adminRtr.get('/designations/:id', checkUser.hasToken, DsgnCtrl.get_DsgnByIdCtrl);
//Add new  Designations
adminRtr.post('/designations', checkUser.hasToken, DsgnCtrl.insrt_DsgnCtrl);
//Update existing  Designations
adminRtr.post('/designations/:id', checkUser.hasToken, DsgnCtrl.updte_DsgnCtrl);
//Delete existing  Designations
adminRtr.delete('/designations/:id', checkUser.hasToken, DsgnCtrl.dlte_DsgnCtrl);


// Routes for Table : mrcht_otlt_lst_t (branches)
// --------------------------------------------------------------
//get details of all branches
adminRtr.get('/branches', checkUser.hasToken, MrchtOtltCtrl.get_MrchtOtltCtrl);
//search details of all branches
adminRtr.post('/branches/search', checkUser.hasToken, MrchtOtltCtrl.srch_MrchtOtltCtrl);
//get details of single  branches  
adminRtr.get('/branches/:id', checkUser.hasToken, MrchtOtltCtrl.get_MrchtOtltByIdCtrl);
//Add new  branches
adminRtr.post('/branches', checkUser.hasToken, MrchtOtltCtrl.insrt_MrchtOtltCtrl);
//Update existing  branches
adminRtr.post('/branches/:id', checkUser.hasToken, MrchtOtltCtrl.updte_MrchtOtltCtrl);
//Delete existing  branches
adminRtr.delete('/branches/:id', checkUser.hasToken, MrchtOtltCtrl.dlte_MrchtOtltCtrl);

// Routes for Table : mrcht_otlt_ctgry_lst_t (BranchCategory)
// --------------------------------------------------------------
//get details of all BranchCategory
adminRtr.get('/branchCategory', checkUser.hasToken, MrchtOtltCtgryCtrl.get_MrchtOtltCtgryCtrl);
//search details of all BranchCategory
adminRtr.post('/branchCategory/search', checkUser.hasToken, MrchtOtltCtgryCtrl.srch_MrchtOtltCtgryCtrl);
//get details of single  BranchCategory  
adminRtr.get('/branchCategory/:id', checkUser.hasToken, MrchtOtltCtgryCtrl.get_MrchtOtltCtgryByIdCtrl);
//Add new  BranchCategory
adminRtr.post('/branchCategory', checkUser.hasToken, MrchtOtltCtgryCtrl.insrt_MrchtOtltCtgryCtrl);
//Update existing  BranchCategory
adminRtr.post('/branchCategory/:id', checkUser.hasToken, MrchtOtltCtgryCtrl.updte_MrchtOtltCtgryCtrl);
//Delete existing  BranchCategory
adminRtr.delete('/branchCategory/:id', checkUser.hasToken, MrchtOtltCtgryCtrl.dlte_MrchtOtltCtgryCtrl);

module.exports = adminRtr;