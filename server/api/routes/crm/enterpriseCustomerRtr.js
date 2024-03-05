var enterpriseCustomerRtr = require('express').Router();
var checkUser = require(appRoot + '/server/api/modules/general/auth/controllers/accessCtrl');

// Routes specific to "enterpriseCustomer" module
// Conroller,Schema related to 'enterprise Customer'
var EntrpeCstmrCtrl = require(appRoot + '/server/api/modules/crm/enterpriseCustomer/controllers/EntrpeCstmrCtrl');
var EntrpeCstmrTypCtrl = require(appRoot + '/server/api/modules/crm/enterpriseCustomer/controllers/EntrpeCstmrTypCtrl');
var EntrpeCstmrSubTypCtrl = require(appRoot + '/server/api/modules/crm/enterpriseCustomer/controllers/EntrpeCstmrSubTypCtrl');
var BlngFrqncyCtrl = require(appRoot + '/server/api/modules/crm/enterpriseCustomer/controllers/BlngFrqncyCtrl');


var EntrpeCstmrSch = require(appRoot + '/server/api/modules/crm/enterpriseCustomer/schema/EntrpeCstmrSch');
var EntrpeCstmrTypSch = require(appRoot + '/server/api/modules/crm/enterpriseCustomer/schema/EntrpeCstmrTypSch');
var EntrpeCstmrSubTypSch = require(appRoot + '/server/api/modules/crm/enterpriseCustomer/schema/EntrpeCstmrSubTypSch');
var BlngFrqncySch = require(appRoot + '/server/api/modules/crm/enterpriseCustomer/schema/BlngFrqncySch');


/****************************************************************
					DB Routes (Generated 27/01/2020)
*****************************************************************/

// Routes for Table : entrpe_cstmr_lst_t (enterprise Customer)
// --------------------------------------------------------------
//get details of all enterprise Customer
enterpriseCustomerRtr.get('/enterpriseCustomer', checkUser.hasToken, checkUser.vldSelect('entrpe_cstmr_lst_t', EntrpeCstmrSch.EntrpeCstmrSchema), EntrpeCstmrCtrl.get_EntrpeCstmrCtrl);
//search details of all enterprise Customer
enterpriseCustomerRtr.post('/enterpriseCustomer/search', checkUser.hasToken, checkUser.vldSearch('entrpe_cstmr_lst_t', EntrpeCstmrSch.EntrpeCstmrSchema), EntrpeCstmrCtrl.srch_EntrpeCstmrCtrl);
//get details of single  enterprise Customer  
enterpriseCustomerRtr.get('/enterpriseCustomer/:id', checkUser.hasToken, checkUser.vldSelect('entrpe_cstmr_lst_t'), EntrpeCstmrCtrl.get_EntrpeCstmrByIdCtrl);
//Add new  enterprise Customer
// checkUser.vldInsert('entrpe_cstmr_lst_t',EntrpeCstmrSch.EntrpeCstmrSchema) ,
enterpriseCustomerRtr.post('/enterpriseCustomer', checkUser.hasToken, checkUser.vldInsert('entrpe_cstmr_lst_t',EntrpeCstmrSch.EntrpeCstmrSchema) ,EntrpeCstmrCtrl.insrt_EntrpeCstmrCtrl);
//Update existing  enterprise Customer
// checkUser.vldUpdate('entrpe_cstmr_lst_t',EntrpeCstmrSch.EntrpeCstmrSchema) ,
enterpriseCustomerRtr.post('/enterpriseCustomer/:id', checkUser.hasToken, checkUser.vldUpdate('entrpe_cstmr_lst_t',EntrpeCstmrSch.EntrpeCstmrSchema) ,EntrpeCstmrCtrl.updte_EntrpeCstmrCtrl);
//Delete existing  enterprise Customer
// checkUser.vldDelete('entrpe_cstmr_lst_t') ,
enterpriseCustomerRtr.delete('/enterpriseCustomer/:id', checkUser.hasToken,  EntrpeCstmrCtrl.dlte_EntrpeCstmrCtrl);

/****************************************************************
					DB Routes (Generated 29/01/2020)
*****************************************************************/

// Routes for Table : entrpe_cstmr_typ_lst_t  (enterprise Customer Type)
// --------------------------------------------------------------
//get details of all enterprise Customer Type
enterpriseCustomerRtr.get('/enterpriseCustomerType', checkUser.hasToken, checkUser.vldSelect('entrpe_cstmr_typ_lst_t ', EntrpeCstmrTypSch.EntrpeCstmrTypSchema), EntrpeCstmrTypCtrl.get_EntrpeCstmrTypCtrl);
//search details of all enterprise Customer Type
enterpriseCustomerRtr.post('/enterpriseCustomerType/search', checkUser.hasToken, checkUser.vldSearch('entrpe_cstmr_typ_lst_t ', EntrpeCstmrTypSch.EntrpeCstmrTypSchema), EntrpeCstmrTypCtrl.srch_EntrpeCstmrTypCtrl);
//get details of single  enterprise Customer Type  
enterpriseCustomerRtr.get('/enterpriseCustomerType/:id', checkUser.hasToken, checkUser.vldSelect('entrpe_cstmr_typ_lst_t '), EntrpeCstmrTypCtrl.get_EntrpeCstmrTypByIdCtrl);
//Add new  enterprise Customer Type
enterpriseCustomerRtr.post('/enterpriseCustomerType', checkUser.hasToken, checkUser.vldInsert('entrpe_cstmr_typ_lst_t ', EntrpeCstmrTypSch.EntrpeCstmrTypSchema), EntrpeCstmrTypCtrl.insrt_EntrpeCstmrTypCtrl);
//Update existing  enterprise Customer Type
enterpriseCustomerRtr.post('/enterpriseCustomerType/:id', checkUser.hasToken, checkUser.vldUpdate('entrpe_cstmr_typ_lst_t ', EntrpeCstmrTypSch.EntrpeCstmrTypSchema), EntrpeCstmrTypCtrl.updte_EntrpeCstmrTypCtrl);
//Delete existing  enterprise Customer Type
enterpriseCustomerRtr.delete('/enterpriseCustomerType/:id', checkUser.hasToken, checkUser.vldDelete('entrpe_cstmr_typ_lst_t '), EntrpeCstmrTypCtrl.dlte_EntrpeCstmrTypCtrl);


/****************************************************************
					DB Routes (Generated 29/01/2020)
*****************************************************************/

// Routes for Table : entrpe_cstmr_sub_typ_lst_t  (enterprise Customer Sub Type)
// --------------------------------------------------------------
//get details of all enterprise Customer Sub Type
enterpriseCustomerRtr.get('/enterpriseCustomerSubType', 			checkUser.hasToken, checkUser.vldSelect('entrpe_cstmr_sub_typ_lst_t ',EntrpeCstmrSubTypSch.EntrpeCstmrSubTypSchema) ,EntrpeCstmrSubTypCtrl.get_EntrpeCstmrSubTypCtrl);
//search details of all enterprise Customer Sub Type
enterpriseCustomerRtr.post('/enterpriseCustomerSubType/search', 	checkUser.hasToken,checkUser.vldSearch('entrpe_cstmr_sub_typ_lst_t ',EntrpeCstmrSubTypSch.EntrpeCstmrSubTypSchema) , EntrpeCstmrSubTypCtrl.srch_EntrpeCstmrSubTypCtrl);
//get details of single  enterprise Customer Sub Type  
enterpriseCustomerRtr.get('/enterpriseCustomerSubType/:id', 		checkUser.hasToken,checkUser.vldSelect('entrpe_cstmr_sub_typ_lst_t ') ,EntrpeCstmrSubTypCtrl.get_EntrpeCstmrSubTypByIdCtrl);
//Add new  enterprise Customer Sub Type
enterpriseCustomerRtr.post('/enterpriseCustomerSubType', 			checkUser.hasToken,checkUser.vldInsert('entrpe_cstmr_sub_typ_lst_t ',EntrpeCstmrSubTypSch.EntrpeCstmrSubTypSchema) , EntrpeCstmrSubTypCtrl.insrt_EntrpeCstmrSubTypCtrl);
//Update existing  enterprise Customer Sub Type
enterpriseCustomerRtr.post('/enterpriseCustomerSubType/:id', 		checkUser.hasToken,checkUser.vldUpdate('entrpe_cstmr_sub_typ_lst_t ',EntrpeCstmrSubTypSch.EntrpeCstmrSubTypSchema) , EntrpeCstmrSubTypCtrl.updte_EntrpeCstmrSubTypCtrl);
//Delete existing  enterprise Customer Sub Type
enterpriseCustomerRtr.delete('/enterpriseCustomerSubType/:id', 		checkUser.hasToken,checkUser.vldDelete('entrpe_cstmr_sub_typ_lst_t ') ,EntrpeCstmrSubTypCtrl.dlte_EntrpeCstmrSubTypCtrl);

/****************************************************************
					DB Routes (Generated 29/01/2020)
*****************************************************************/

// Routes for Table : blng_frqncy_lst_t  (billing Frequency)
// --------------------------------------------------------------
//get details of all billing Frequency
enterpriseCustomerRtr.get('/billingFrequency', 			BlngFrqncyCtrl.get_BlngFrqncyCtrl);
//get details of deparement names
enterpriseCustomerRtr.get('/entDepartmentNames', 			checkUser.hasToken, BlngFrqncyCtrl.getDepartmentNamesCtrl);
//search details of all billing Frequency
enterpriseCustomerRtr.post('/billingFrequency/search', 	checkUser.hasToken,checkUser.vldSearch('blng_frqncy_lst_t ',BlngFrqncySch.BlngFrqncySchema) , BlngFrqncyCtrl.srch_BlngFrqncyCtrl);
//get details of single  billing Frequency  
enterpriseCustomerRtr.get('/billingFrequency/:id', 		checkUser.hasToken,checkUser.vldSelect('blng_frqncy_lst_t ') ,BlngFrqncyCtrl.get_BlngFrqncyByIdCtrl);
//Add new  billing Frequency
enterpriseCustomerRtr.post('/billingFrequency', 			checkUser.hasToken,checkUser.vldInsert('blng_frqncy_lst_t ',BlngFrqncySch.BlngFrqncySchema) , BlngFrqncyCtrl.insrt_BlngFrqncyCtrl);
//Update existing  billing Frequency
enterpriseCustomerRtr.post('/billingFrequency/:id', 		checkUser.hasToken,checkUser.vldUpdate('blng_frqncy_lst_t ',BlngFrqncySch.BlngFrqncySchema) , BlngFrqncyCtrl.updte_BlngFrqncyCtrl);
//Delete existing  billing Frequency
enterpriseCustomerRtr.delete('/billingFrequency/:id', 		checkUser.hasToken,checkUser.vldDelete('blng_frqncy_lst_t ') ,BlngFrqncyCtrl.dlte_BlngFrqncyCtrl);


/****************************************************************
					DB Routes End
*****************************************************************/


module.exports = enterpriseCustomerRtr;