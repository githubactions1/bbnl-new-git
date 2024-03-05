var billingRtr = require('express').Router();
var checkUser 			= require(appRoot +'/server/api/modules/general/auth/controllers/accessCtrl');

// Routes specific to "billing" module
 // Conroller,Schema related to 'AgntPymntMode'
var AgntPymntMdeCtrl				= require(appRoot +'/server/api/modules/billing/controllers/AgntPymntMdeCtrl'); 
var AgntPymntCtrl				= require(appRoot +'/server/api/modules/billing/controllers/AgntPymntsCtrl'); 
var pdfCtrl				= require(appRoot +'/server/api/modules/billing/controllers/PdfCtrl'); 
var AgntPymntMdeSch				= require(appRoot +'/server/api/modules/billing/schema/AgntPymntMdeSch');


/****************************************************************
					DB Routes (Generated 18/02/2020)
*****************************************************************/

// Routes for Table : agnt_pymnt_mde_lst_t (AgntPymntMode)
// --------------------------------------------------------------
//get details of all AgntPymntMode
billingRtr.get('/AgntPymntMode', 			checkUser.hasToken, checkUser.vldSelect('agnt_pymnt_mde_lst_t',AgntPymntMdeSch.AgntPymntMdeSchema) ,AgntPymntMdeCtrl.get_AgntPymntMdeCtrl);
//search details of all AgntPymntMode
billingRtr.post('/AgntPymntMode/search', 	checkUser.hasToken,checkUser.vldSearch('agnt_pymnt_mde_lst_t',AgntPymntMdeSch.AgntPymntMdeSchema) , AgntPymntMdeCtrl.srch_AgntPymntMdeCtrl);
//get details of single  AgntPymntMode  
billingRtr.get('/AgntPymntMode/:id', 		checkUser.hasToken,checkUser.vldSelect('agnt_pymnt_mde_lst_t') ,AgntPymntMdeCtrl.get_AgntPymntMdeByIdCtrl);
//Add new  AgntPymntMode
billingRtr.post('/AgntPymntMode', 			checkUser.hasToken,checkUser.vldInsert('agnt_pymnt_mde_lst_t',AgntPymntMdeSch.AgntPymntMdeSchema) , AgntPymntMdeCtrl.insrt_AgntPymntMdeCtrl);
//Update existing  AgntPymntMode
billingRtr.post('/AgntPymntMode/:id', 		checkUser.hasToken,checkUser.vldUpdate('agnt_pymnt_mde_lst_t',AgntPymntMdeSch.AgntPymntMdeSchema) , AgntPymntMdeCtrl.updte_AgntPymntMdeCtrl);
//Delete existing  AgntPymntMode
billingRtr.delete('/AgntPymntMode/:id', 		checkUser.hasToken,checkUser.vldDelete('agnt_pymnt_mde_lst_t') ,AgntPymntMdeCtrl.dlte_AgntPymntMdeCtrl);

//Get tranaction type list
billingRtr.get('/payments/transaction/types', 		checkUser.hasToken,AgntPymntCtrl.getTrnsnTypesByCtgryIdCtrl);

billingRtr.post('/getCstmrBySearch', checkUser.hasToken,AgntPymntCtrl.getAllCstmrs);
// --------------------------------------------------------------
//Insert agent payments
billingRtr.post('/agent/payments', 		checkUser.hasToken,AgntPymntCtrl.postAgntPymntsCtrl);
//Get agent payments
billingRtr.post('/payments/agent', 		checkUser.hasToken,checkUser.vldSelect('payments_to_apsfl'),AgntPymntCtrl.getPymntsByAgntIdCtrl); // get payments for approval & agent payments
//Get logged in user payment uploads
billingRtr.get('/payments/user', 		checkUser.hasToken,checkUser.vldSelect('payments_to_apsfl'),AgntPymntCtrl.getPymntsByUsrIdCtrl);
//Get all recent payments
billingRtr.post('/payments/recent', 		checkUser.hasToken,AgntPymntCtrl.getPymntsRcntCtrl);
//Insert agent payments witout lmo details
billingRtr.post('/agent/payments/staging', 		checkUser.hasToken,AgntPymntCtrl.postAgntPymntsWthoutLmoCtrl);

billingRtr.post('/bank/statements/details', 		checkUser.hasToken,checkUser.vldSelect('bnk_stmnt_upld'),AgntPymntCtrl.getBnkStmntsDtlsCtrl);

billingRtr.post('/agent/transaction/check', 		checkUser.hasToken,AgntPymntCtrl.getAllTrnsnsToUpldCtrl);



//Get logged in user bank statement uploads
billingRtr.get('/bank/statement/payments/user', 		checkUser.hasToken,checkUser.vldSelect('bnk_stmnt_upld'),AgntPymntCtrl.getbnkStmtPymntsByUsrIdCtrl);
//Get recent in user bank statement uploads
billingRtr.post('/bank/statement/payments/recent', 		checkUser.hasToken,AgntPymntCtrl.getbnkStmtPymntsRcntCtrl);

// Payment approval routes
//update payments list for approval
billingRtr.post('/agent/payment/approvals', 		checkUser.hasToken,AgntPymntCtrl.updateAgntPymntAprvlsCtrl);
//Get agent payments approvals
billingRtr.get('/agent/payment/approvals/details', checkUser.hasToken,checkUser.vldSelect('payment_approvals'),AgntPymntCtrl.getagntPymntAprlDtlsCtrl);
//Get loggedin user approvals
billingRtr.get('/agent/payment/approvals/user', 		checkUser.hasToken,AgntPymntCtrl.agntPymntAprvlsByUsrCtrl);
//Get all recent approvals
billingRtr.post('/agent/payment/approvals/recent', 		checkUser.hasToken,AgntPymntCtrl.agntPymntAprvlsRcntCtrl);

// Agent credit payments
//Get logged in user payment credit uploads
billingRtr.get('/payments/credits/user', 		checkUser.hasToken,checkUser.vldSelect('pymnt_crdts'),AgntPymntCtrl.getPymntsCrdtsByUsrIdCtrl);
//Get all recent payments credit
billingRtr.post('/payments/credits/recent', 		checkUser.hasToken,AgntPymntCtrl.getPymntsCrdtsRcntCtrl);
// Agent credit payments approval routes
//update payments list for approval
billingRtr.get('/agent/payment/credit/approvals', 		checkUser.hasToken,checkUser.vldSelect('payment_credit_approvals'),AgntPymntCtrl.getAgntPymntCrdtAprvlsCtrl);
//update payments list for approval
// billingRtr.post('/agent/payment/credit/approvals', 		checkUser.hasToken,AgntPymntCtrl.updateAgntPymntCrdtAprvlsCtrl);
//Get loggedin user approvals
billingRtr.get('/agent/payment/credit/approvals/user', 		checkUser.hasToken,AgntPymntCtrl.agntPymntCrdtAprvlsByUsrCtrl);
//Get all recent approvals
billingRtr.post('/agent/payment/credit/approvals/recent', 		checkUser.hasToken,AgntPymntCtrl.agntPymntCrdtAprvlsRcntCtrl);

billingRtr.post('/generateCount',checkUser.hasToken,pdfCtrl.generateCountPdf)
billingRtr.post('/getgeneratePdfCstmrs',checkUser.hasToken,pdfCtrl.getgeneratePdfCstmrs)
billingRtr.post('/retryPdfs',checkUser.hasToken,pdfCtrl.retryPdfsCtrl)
billingRtr.get('/user_generated_invoices',checkUser.hasToken,checkUser.vldSelect('invoice_generation'),pdfCtrl.usrGnrtdPdfs)
billingRtr.post('/mygenertdpdfs',checkUser.hasToken,pdfCtrl.myGenrtPdfsCtrl)
billingRtr.post('/recntgenertdpdfs',checkUser.hasToken,pdfCtrl.myRecntGenrtPdfsCtrl)
billingRtr.get('/refreshPdfdta/:id',checkUser.hasToken,pdfCtrl.refreshPdfdtaCtrl)

billingRtr.get('/lmo/month/invoice/:year/:month/:lmo',checkUser.hasToken,AgntPymntCtrl.getLmoMonthyInvceDtlsCtrl)

// revenue-sharing related

billingRtr.post('/revenue/sharing',checkUser.hasToken,checkUser.vldSelect('revenue_sharing'),AgntPymntCtrl.getRevenueShrngDtlsCtrl)
billingRtr.post('/revenue/sharing/lmo',checkUser.hasToken,AgntPymntCtrl.getRevenueShrngByLmoCtrl)
billingRtr.post('/revenue/sharing/lmo/customers',checkUser.hasToken,AgntPymntCtrl.getRevenueShrngByLmoCstmrCtrl)
billingRtr.post('/revenue/sharing/lmo/monthly',checkUser.hasToken,AgntPymntCtrl.getMnthlyRevenueShrngByLmoCtrl)
// Customer Waivers routes
// --------------------------------------------------------------

//Get customer - wave offs
billingRtr.get('/customer/caf/waveoffs', 		checkUser.hasToken,checkUser.vldSelect('cstmr_wvrs'),AgntPymntCtrl.getCstmrWaveOffsCtrl);
//Get customer - wave offs - by updated user
billingRtr.get('/customer/caf/waveoffs/user', 		checkUser.hasToken,AgntPymntCtrl.getCstmrWaveOffsByUsrIdCtrl);
//Get customer - wave offs - all recent
billingRtr.post('/customer/caf/waveoffs/recent', 		checkUser.hasToken,AgntPymntCtrl.getCstmrWaveOffsAllRcntCtrl);
//insert CAF Waivers
billingRtr.post('/customer/caf/waveoffs', 		checkUser.hasToken,AgntPymntCtrl.postCafWaveOffsCtrl);

// Customer Waivers approval routes
//get customer waveoff list
billingRtr.get('/customer/caf/waveoffs/approvals', 		checkUser.hasToken,checkUser.vldSelect('cstmr_wvr_aprl'),AgntPymntCtrl.getCafWaveOffAprvlsCtrl);
//get customer waveoff list - by user
billingRtr.get('/customer/caf/waveoffs/approvals/user', 		checkUser.hasToken,AgntPymntCtrl.getCafWaveOffAprvlsByUsrCtrl);
//get customer waveoff list - all recent
billingRtr.post('/customer/caf/waveoffs/approvals/recent', 		checkUser.hasToken,AgntPymntCtrl.getCafWaveOffAprvlsAllRcntCtrl);
//update customer waveoff list
billingRtr.post('/customer/caf/waveoffs/approvals', 		checkUser.hasToken,AgntPymntCtrl.updateCafWaveOffAprvlsCtrl);


// to update payments with agent balance 9999999999.99
billingRtr.get('/agent/balance/correction',	AgntPymntCtrl.updateAgntBlnceAmtCtrl);

// payment dashboard
billingRtr.get('/agent/payments/today/month', 	checkUser.hasToken,AgntPymntCtrl.getAgntPymntTdyMnthCtrl);
billingRtr.get('/agent/payments/monthly', 	checkUser.hasToken,AgntPymntCtrl.getAgntPymntsMnthlyCtrl);
billingRtr.get('/agent/payments/month/daywise/:mnth_id', 	checkUser.hasToken,AgntPymntCtrl.getAgntPymntsMnthDyWseCtrl);
billingRtr.get('/agent/payment/balance', 	checkUser.hasToken,AgntPymntCtrl.getAgntPymntBlnceTlDtCtrl);
billingRtr.get('/payment/apsflshare/details/month', 	checkUser.hasToken,AgntPymntCtrl.getPymntApdflShreDtlsCtrl);


billingRtr.get('/file/download/glits/web/code/nodejs/APSFLWEB/server/pdf_invoice/:dt/:typ/:fnm', function (req, res) {
    console.log("in function")
    console.log(req.params,'1');
    filepath = path.join(appRoot + '/glits/web/code/nodejs/APSFLWEB/server/pdf_invoice') + '/' + req.params.dt + '/' + req.params.typ + '/' + req.params.fnm;
    console.log(filepath,'1');
    res.download(filepath);

})
/****************************************************************
					DB Routes End
*****************************************************************/

module.exports = billingRtr;
