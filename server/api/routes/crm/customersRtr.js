var customersRtr = require('express').Router();
var checkUser 			= require(appRoot +'/server/api/modules/general/auth/controllers/accessCtrl');

// Routes specific to "customers" module
 // Conroller,Schema related to 'Customer'
var CstmrCtrl				= require(appRoot +'/server/api/modules/crm/customers/controllers/CstmrCtrl'); 
var CstmrSch				= require(appRoot +'/server/api/modules/crm/customers/schema/CstmrSch');


/****************************************************************
					DB Routes (Generated 28/01/2020)
*****************************************************************/

// Routes for Table : cstmr_lst_t (Customer)
// --------------------------------------------------------------
//get details of all Customer
customersRtr.get('/customer', 			checkUser.hasToken ,CstmrCtrl.get_CstmrCtrl);
// checkUser.vldSelect('cstmr_lst_t',CstmrSch.CstmrSchema)
//search details of all Customer
customersRtr.post('/customer/search', 	checkUser.hasToken,checkUser.vldSearch('cstmr_lst_t',CstmrSch.CstmrSchema) , CstmrCtrl.srch_CstmrCtrl);
//get details of single  Customer  
customersRtr.get('/customer/:id', 		checkUser.hasToken,checkUser.vldSelect('cstmr_lst_t') ,CstmrCtrl.get_CstmrByIdCtrl);
//Add new  Customer
customersRtr.post('/customer', 			checkUser.hasToken, CstmrCtrl.insrt_CstmrCtrl);
// checkUser.vldInsert('cstmr_lst_t',CstmrSch.CstmrSchema) ,
//Update existing  Customer
customersRtr.post('/customer/:id', 		checkUser.hasToken, CstmrCtrl.updte_CstmrCtrl);
// checkUser.vldUpdate('cstmr_lst_t',CstmrSch.CstmrSchema) ,
//Delete existing  Customer
customersRtr.delete('/customer/:id', 		checkUser.hasToken,CstmrCtrl.dlte_CstmrCtrl);
// checkUser.vldDelete('cstmr_lst_t') ,

customersRtr.get('/customertype', 			checkUser.hasToken ,CstmrCtrl.get_CstmrTypeCtrl);


//get  Customer CPE/Set top box information
customersRtr.get('/customer/:id/cpe', 		checkUser.hasToken, CstmrCtrl.get_CstmrByIdCtrl);

//get  Customer Service Packs Information  information
customersRtr.get('/customer/:id/packs', 		checkUser.hasToken, CstmrCtrl.get_CstmrByIdCtrl);

//get  Customer HSI Information  information
customersRtr.get('/customer/:id/hsi', 		checkUser.hasToken, CstmrCtrl.get_CstmrByIdCtrl);

//get  Customer VOIP/Phone Information  information
customersRtr.get('/customer/:id/phone', 		checkUser.hasToken, CstmrCtrl.get_CstmrByIdCtrl);

//get  Customer VOIP/Phone Information  information
customersRtr.get('/customer/:id/callhistory', 		checkUser.hasToken, CstmrCtrl.get_CstmrByIdCtrl);

//get  Customer Invoice Information  information
customersRtr.get('/customer/:id/invoice', 		checkUser.hasToken, CstmrCtrl.get_CstmrByIdCtrl);

//get  Customer Profile Information  information
customersRtr.get('/customer/:id/profile',  CstmrCtrl.get_CstmrByIdCtrl);




/****************************************************************
					DB Routes End
*****************************************************************/


module.exports = customersRtr;