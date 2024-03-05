var erpRtr = require('express').Router();
var checkUser 			= require(appRoot +'/server/api/modules/general/auth/controllers/accessCtrl');

// Routes specific to "erp" module
 // Conroller,Schema related to 'erpTmpltTyp'
var ErpTmpleTypeCtrl				= require(appRoot +'/server/api/modules/erp/controllers/ErpTmpleTypeCtrl'); 
var ErpTmpleTypeSch				= require(appRoot +'/server/api/modules/erp/schema/ErpTmpleTypeSch');

var ErpTmpleCtrl				= require(appRoot +'/server/api/modules/erp/controllers/ErpTmpleCtrl'); 
var ErpTmpleSch				= require(appRoot +'/server/api/modules/erp/schema/ErpTmpleSch');

var ErpPrtnrsCtrl				= require(appRoot +'/server/api/modules/erp/controllers/ErpPrtnrsCtrl'); 
var ErpPrtnrsSch				= require(appRoot +'/server/api/modules/erp/schema/ErpPrtnrsSch');
var AraTypeCtrl				= require(appRoot +'/server/api/modules/erp/controllers/AraTypeCtrl'); 
var AraTypeSch				= require(appRoot +'/server/api/modules/erp/schema/AraTypeSch');
var ErpTmplePrtnrsCtrl				= require(appRoot +'/server/api/modules/erp/controllers/ErpTmplePrtnrsCtrl'); 
var ErpTmplePrtnrsSch				= require(appRoot +'/server/api/modules/erp/schema/ErpTmplePrtnrsSch');


/****************************************************************
					DB Routes (Generated 05/02/2020)
*****************************************************************/

// Routes for Table : erp_tmple_prtnrs_rel_t (erpTmpltprtnrs)
// --------------------------------------------------------------
//get details of all erpTmpltprtnrs
erpRtr.get('/erpTmpltprtnrs', 			checkUser.hasToken ,ErpTmplePrtnrsCtrl.get_ErpTmplePrtnrsCtrl);
//search details of all erpTmpltprtnrs
erpRtr.post('/erpTmpltprtnrs/search', 	checkUser.hasToken, ErpTmplePrtnrsCtrl.srch_ErpTmplePrtnrsCtrl);
//get details of single  erpTmpltprtnrs  
erpRtr.get('/erpTmpltprtnrs/:id', 		checkUser.hasToken,ErpTmplePrtnrsCtrl.get_ErpTmplePrtnrsByIdCtrl);
//Add new  erpTmpltprtnrs
erpRtr.post('/erpTmpltprtnrs', 			checkUser.hasToken, ErpTmplePrtnrsCtrl.insrt_ErpTmplePrtnrsCtrl);
//Update existing  erpTmpltprtnrs
erpRtr.post('/erpTmpltprtnrs/:id', 		checkUser.hasToken, ErpTmplePrtnrsCtrl.updte_ErpTmplePrtnrsCtrl);
//Delete existing  erpTmpltprtnrs
erpRtr.delete('/erpTmpltprtnrs/:id', 		checkUser.hasToken,ErpTmplePrtnrsCtrl.dlte_ErpTmplePrtnrsCtrl);



/****************************************************************
					DB Routes (Generated 04/02/2020)
*****************************************************************/

// Routes for Table : erp_tmple_lst_t (erpTmplt)
// --------------------------------------------------------------
//get details of all erpTmplt
erpRtr.get('/erpTmplt', 			checkUser.hasToken,checkUser.vldSelect('erp_tmplt'), ErpTmpleCtrl.get_ErpTmpleCtrl);
//search details of all erpTmplt
erpRtr.post('/erpTmplt/search', 	checkUser.hasToken, ErpTmpleCtrl.srch_ErpTmpleCtrl);
//get details of single  erpTmplt  
erpRtr.get('/erpTmplt/:id', 		checkUser.hasToken,ErpTmpleCtrl.get_ErpTmpleByIdCtrl);
//Add new  erpTmplt
erpRtr.post('/erpTmplt', 			checkUser.hasToken,ErpTmpleCtrl.insrt_ErpTmpleCtrl);
//Update existing  erpTmplt
erpRtr.put('/erpTmplt/:id', 		checkUser.hasToken,ErpTmpleCtrl.updte_ErpTmpleCtrl);
//Delete existing  erpTmplt
erpRtr.delete('/erpTmplt/:id', 		checkUser.hasToken,ErpTmpleCtrl.dlte_ErpTmpleCtrl);

/****************************************************************
					DB Routes (Generated 04/02/2020)
*****************************************************************/

// Routes for Table : erp_tmple_type_lst_t (erpTmpltTyp)
// --------------------------------------------------------------
//get details of all erpTmpltTyp
erpRtr.get('/erpTmpltTyp', 			checkUser.hasToken,ErpTmpleTypeCtrl.get_ErpTmpleTypeCtrl);
//search details of all erpTmpltTyp
erpRtr.post('/erpTmpltTyp/search', 	checkUser.hasToken,ErpTmpleTypeCtrl.srch_ErpTmpleTypeCtrl);
//get details of single  erpTmpltTyp  
erpRtr.get('/erpTmpltTyp/:id', 		checkUser.hasToken,ErpTmpleTypeCtrl.get_ErpTmpleTypeByIdCtrl);
//Add new  erpTmpltTyp
erpRtr.post('/erpTmpltTyp', 			checkUser.hasToken , ErpTmpleTypeCtrl.insrt_ErpTmpleTypeCtrl);
//Update existing  erpTmpltTyp
erpRtr.post('/erpTmpltTyp/:id', 		checkUser.hasToken, ErpTmpleTypeCtrl.updte_ErpTmpleTypeCtrl);
//Delete existing  erpTmpltTyp
erpRtr.delete('/erpTmpltTyp/:id', 		checkUser.hasToken,ErpTmpleTypeCtrl.dlte_ErpTmpleTypeCtrl);

// Routes for Table : prtnrs_lst_t (erpprtnrslstt)
// --------------------------------------------------------------
//get details of all erpprtnrslstt
erpRtr.get('/erpprtnrslstt', 			checkUser.hasToken, ErpPrtnrsCtrl.get_ErpPrtnrsCtrl);
//search details of all erpprtnrslstt
erpRtr.post('/erpprtnrslstt/search', 	checkUser.hasToken,ErpPrtnrsCtrl.srch_ErpPrtnrsCtrl);
//get details of single  erpprtnrslstt  
erpRtr.get('/erpprtnrslstt/:id', 		checkUser.hasToken,ErpPrtnrsCtrl.get_ErpPrtnrsByIdCtrl);
//Add new  erpprtnrslstt
erpRtr.post('/erpprtnrslstt', 			checkUser.hasToken, ErpPrtnrsCtrl.insrt_ErpPrtnrsCtrl);
//Update existing  erpprtnrslstt
erpRtr.post('/erpprtnrslstt/:id', 		checkUser.hasToken, ErpPrtnrsCtrl.updte_ErpPrtnrsCtrl);
//Delete existing  erpprtnrslstt
erpRtr.delete('/erpprtnrslstt/:id', 		checkUser.hasToken,ErpPrtnrsCtrl.dlte_ErpPrtnrsCtrl);

/****************************************************************
					DB Routes End
*****************************************************************/


// Routes for Table : ara_type_lst_t (araType)
// --------------------------------------------------------------
//get details of all araType
erpRtr.get('/araType', 			checkUser.hasToken,AraTypeCtrl.get_AraTypeCtrl);
//search details of all araType
erpRtr.post('/araType/search', 	checkUser.hasToken, AraTypeCtrl.srch_AraTypeCtrl);
//get details of single  araType  
erpRtr.get('/araType/:id', 		checkUser.hasToken,AraTypeCtrl.get_AraTypeByIdCtrl);
//Add new  araType
erpRtr.post('/araType', 			checkUser.hasToken, AraTypeCtrl.insrt_AraTypeCtrl);
//Update existing  araType
erpRtr.post('/araType/:id', 		checkUser.hasToken, AraTypeCtrl.updte_AraTypeCtrl);
//Delete existing  araType
erpRtr.delete('/araType/:id', 		checkUser.hasToken,AraTypeCtrl.dlte_AraTypeCtrl);

erpRtr.post('/erpTmpltprtnrsUpdate', 			checkUser.hasToken, ErpTmpleCtrl.updateTmp_Ptrnrs_Rel);

erpRtr.delete('/erpTmpltPrtnrRel/:id', 		checkUser.hasToken,ErpTmpleCtrl.dlte_tmp_prtnrs_Rel);


erpRtr.get('/slctTmpltePrtnrsRel/:id', 		checkUser.hasToken,ErpTmpleCtrl.get_templePartersRelCtrl);

module.exports = erpRtr;