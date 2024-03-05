var extrnlcafdtlsRtr = require('express').Router();
var modRoot = appRoot + '/server/api/modules/extrnlcafdtls/'
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');


const extrnlcafdtlsCtrl = require(modRoot + 'controllers/extrnlcafdtlCtrl');

extrnlcafdtlsRtr.get('/entrprisecaf/:cafId', extrnlcafdtlsCtrl.getsbscrcafextrnlDtls);
extrnlcafdtlsRtr.get('/entrprisecafsts', extrnlcafdtlsCtrl.getsbscrextcafstsrnlDtls);
extrnlcafdtlsRtr.get('/hsi/:cafId', extrnlcafdtlsCtrl.getextcafHsiDtlsCtrl);

extrnlcafdtlsRtr.post('/oltEffectedcafcount', extrnlcafdtlsCtrl.oltEffectedcafcountCtrl);

extrnlcafdtlsRtr.get('/todayprovisionedafs', extrnlcafdtlsCtrl.todayprovisionedafsDataCtrl);

extrnlcafdtlsRtr.get('/ActiveLmoDtls/:id', extrnlcafdtlsCtrl.ActiveLmoDtlsDataCtrl);

extrnlcafdtlsRtr.get('/timebasedOltData/:id', extrnlcafdtlsCtrl.timebasedOltDataCtrl);

extrnlcafdtlsRtr.get('/yesterdaycafinsert', extrnlcafdtlsCtrl.yesterdaycafinsertCtrl);

module.exports = extrnlcafdtlsRtr;