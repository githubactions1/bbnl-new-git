var extApiRtr = require('express').Router();
var apiMstrCtrl = require(appRoot + '/server/api/modules/externalApis/controllers/apiMstrCtrl');


//lmoRtr.post('/mdfySbscrbr', 		mdfyCtrl.mdfySbscrbr);
extApiRtr.get('/corpus/newSubscription', 		apiMstrCtrl.corpusNewChannelSubscription);


extApiRtr.post('/inventoryUpladfromBss', 		apiMstrCtrl.inventoryUpladfromBss);

extApiRtr.post('/inventoryTransferfromBss', 		apiMstrCtrl.inventoryTransferfromBssCtrl);

extApiRtr.post('/InventorydeleteCpeFrmBss', 		apiMstrCtrl.InventorydeleteCpe);

extApiRtr.post('/updateoltupdownFrmBss', 		apiMstrCtrl.updateoltupdownFrmBss);

extApiRtr.post('/AddOltFrmBss', 		apiMstrCtrl.AddOltFrmBssCtrl);

extApiRtr.post('/AddSbstnFrmBss', 		apiMstrCtrl.AddSbstnFrmBssCtrl);

extApiRtr.post('/AddLmoMsoFrmBss', 		apiMstrCtrl.AddLmoMsoFrmBssCtrl);

module.exports = extApiRtr;