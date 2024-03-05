var inventoryRtr = require('express').Router();

const inventoryCtrl=require(appRoot+'/server/api/modules/inventory/controllers/inventoryCtrl');
var checkUser = require('../../modules/general/auth/controllers/accessCtrl');


inventoryRtr.get('/productList',checkUser.hasToken, inventoryCtrl.getInvetryPrdctLst);
inventoryRtr.get('/product/modls/:id',checkUser.hasToken, inventoryCtrl.getPrdctModls);
inventoryRtr.get('/setupboxPrefix',checkUser.hasToken, inventoryCtrl.getSetupboxPrefix);
//inventoryRtr.post('/setupboxupload',checkUser.hasToken, inventoryCtrl.uploadSetupBox);
inventoryRtr.get('/getAgentCpeStock/:id',checkUser.hasToken, inventoryCtrl.getAgentCpeStock);
inventoryRtr.get('/getAgentCpeStock/:ctgryid/:id',checkUser.hasToken, inventoryCtrl.getAgentCpeStockByCtgry);
inventoryRtr.get('/getAgentCpeStock/prdctId/:id/:prdctid',checkUser.hasToken, inventoryCtrl.getAgentCpeStockPrdctIdCtrl);
inventoryRtr.get('/getAgentCpeStock/:id/:prdctid/:frm_date/:to_date/:srlnum/:ctgryId',checkUser.hasToken, inventoryCtrl.getAgentCpeStockByPrdctId);
inventoryRtr.get('/getUploadCpeStock',checkUser.hasToken, inventoryCtrl.getUploadCpeStock);
inventoryRtr.get('/getRecntUploadCpeStock',checkUser.hasToken, inventoryCtrl.getRecntUploadCpeStock);
inventoryRtr.post('/addPrix',checkUser.hasToken, inventoryCtrl.insrtaddPrix);
//inventoryRtr.post('/transferCpeToAgent',checkUser.hasToken, inventoryCtrl.updteTransfrCpe);
inventoryRtr.put('/deleteCpeToAgent',checkUser.hasToken, inventoryCtrl.deleteCpe);
inventoryRtr.get('/getTransferUploadCpeStock',checkUser.hasToken, inventoryCtrl.getTransferUploadCpeStock);
inventoryRtr.get('/getTransferRecntUploadCpeStock',checkUser.hasToken, inventoryCtrl.getTransferRecntUploadCpeStock);
inventoryRtr.post('/getCpeStockBySrlnum',checkUser.hasToken, inventoryCtrl.getCpeStockBySrlnumCtrl);

inventoryRtr.get('/getInvntrySplrsCnt',checkUser.hasToken, inventoryCtrl.getInvntrySplrsCntCtrl);
inventoryRtr.get('/getInvntryTtlCnt',checkUser.hasToken, inventoryCtrl.getInvntryTtlCntCtrl);


inventoryRtr.post('/boxdtls',checkUser.hasToken, inventoryCtrl.getBoxDtlsCtrl);
inventoryRtr.post('/updateboxdtls',checkUser.hasToken, inventoryCtrl.updtbxchngdtlsCtrl);

inventoryRtr.post('/updatebbnlboxinvntrydtls', inventoryCtrl.updatebbnlboxinvntrydtlsCtrl);
inventoryRtr.post('/updateBoxChangebbnlboxinvntrydtls', inventoryCtrl.updateBoxChangebbnlboxinvntrydtls);
inventoryRtr.post('/updateterminatebbnlboxinvntrydtls', inventoryCtrl.updateterminatebbnlboxinvntrydtlsCtrl);

module.exports = inventoryRtr;
