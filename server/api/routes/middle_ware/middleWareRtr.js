var middleWareRtr = require('express').Router();
var middleWareCntrl = require(appRoot +'/server/api/modules/middleWare/controllers/middleWareCntrl'); 


// **********************MiddileWare Account Routes*********************
//get  Customer Voip Information  information
middleWareRtr.get('/customer/:id/voip',  middleWareCntrl.get_CstmrvoipByIdCtrl);
//get  Customer Invoice Information  information
middleWareRtr.get('/customer/:id/invoice', middleWareCntrl.get_CstmrInvoiceByIdCtrl);
//get  Customer Invoice Charges Information  information
middleWareRtr.get('/customer/invoice/:id/charges', middleWareCntrl.get_CstmrInvoiceChargsByIdCtrl);
//get  Customer HSI Information  information
middleWareRtr.get('/customer/:id/hsi', middleWareCntrl.get_CstmrHsiByIdCtrl);

// get requested channels subscription list
middleWareRtr.post("/channelAprvlLst", middleWareCntrl.getchannelAprvlLst);
middleWareRtr.post("/channelHstryLst", middleWareCntrl.getchannelHstryLst);

// update subscription approval by lmo
middleWareRtr.post("/updtAprvl", middleWareCntrl.postUpdtAprvl);
middleWareRtr.post("/rjctAprvl", middleWareCntrl.postRjctAprvl);

// subscription request api 
middleWareRtr.post('/subscription/request', middleWareCntrl.insrtSubscrptnRqustCtrl);
middleWareRtr.post('/unsubscription/request', middleWareCntrl.updtUnsubscrptnRqustCtrl);

/****************************************************************
					DB Routes End
*****************************************************************/


module.exports = middleWareRtr;