
var addonsRtr = require('express').Router();
var checkUser = require(appRoot + '/server/api/modules/general/auth/controllers/accessCtrl');
var addonsCntrl = require(appRoot + '/server/api/modules/addons/controllers/addonsCntrl');

addonsRtr.post('/getCafCstmrDtls', checkUser.hasToken , addonsCntrl.getCafCstmrDtls)
addonsRtr.post('/web/getCafCstmrDtls', checkUser.hasToken , addonsCntrl.getWebCafCstmrDtls)
addonsRtr.post('/getHsiCafCstmrDtls', checkUser.hasToken , addonsCntrl.getHsiCafCstmrDtls)

// addon packages routes
addonsRtr.post('/packages/addons/channels', addonsCntrl.getAddOnPackages);
addonsRtr.post('/packages/addons/localChannels', addonsCntrl.getAddOnLocalChnlPackages);
addonsRtr.post('/packages/web/addons/localChannels', addonsCntrl.getWebAddOnLocalChnlPackages);


// add packages to caf
addonsRtr.post('/addCafPckgs', checkUser.hasToken , addonsCntrl.addCafPckgs);
addonsRtr.post('/addCafPckgs_newversion', checkUser.hasToken , addonsCntrl.newversionaddCafPckgs);
addonsRtr.post('/addHSICafPckgs', checkUser.hasToken , addonsCntrl.addHSICafPckgs);
addonsRtr.post('/addHSICafPckgs_newversion', checkUser.hasToken , addonsCntrl.newversionaddHSICafPckgs);

addonsRtr.post('/removeAddons', checkUser.hasToken , addonsCntrl.removeAddons);
addonsRtr.get('/getAddonsFromCAF/:caf_id', checkUser.hasToken , addonsCntrl.getAddonsFromCAF);
addonsRtr.get('/getChannels/:srvc_pck_id', checkUser.hasToken , addonsCntrl.getChannels);
addonsRtr.get('/getCAFSelectdPackage/:caf_id', checkUser.hasToken , addonsCntrl.getCAFSelectdPackage);
addonsRtr.post('/updtCrntPlanToNewPackgePlan', checkUser.hasToken , addonsCntrl.updtCrntPlanToNewPackgePlan);
addonsRtr.post('/validatePackagePlan', checkUser.hasToken , addonsCntrl.validatePackagePlan);

// HSI routes
addonsRtr.post('/packages/addons/hsi', addonsCntrl.getAddOnHSIPackages);
addonsRtr.post('/packages/agent/addons/hsi', addonsCntrl.getAgntAddOnHSIPackagesCtrl);

addonsRtr.get('/call-history-download', function (req, res) {
    filepath = path.join(appRoot +'/glits/DSN/2020331/filename.pdf');
    console.log(filepath);
    res.download(filepath);

})

module.exports = addonsRtr;


