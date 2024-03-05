var express = require('express');
var router = express.Router();
// Standard Inclusions
var log = require(appRoot + '/utils/logmessages');
var std = require(appRoot + '/utils/standardMessages');

/****************************************************************
			  Application related Routess
*****************************************************************/

// router.get('/login', function (req, res) {
//     res.sendFile(path.join(clientRoot + '/auth/login.index.html'));
// });
router.get('/', function (req, res) {
    res.sendFile(path.join(clientRoot + '/jqueryhtml/index.html'));
});

router.get('/login', function (req, res) {
    res.sendFile(path.join(clientRoot + '/jqueryhtml/index.html'));
});
// router.get('/forgot-password', function (req, res) {
//     res.sendFile(path.join(clientRoot+ '/jqueryhtml/forget.html'));
// });
router.get('/tenant_reg', function (req, res) {
    res.sendFile(path.join(clientRoot + '/jqueryhtml/tent_reg.html'));
});

// router.get('/admin', function (req, res) {
//     res.sendFile(path.join(appRoot + '/ebase/angular_index.html'));
// });

//sachivalayam
// router.use('/'                  , require(appRoot + '/server/app/sachivalayam/home/routes/homeRtr'));
// router.use('/home'                  , require(appRoot + '/server/app/sachivalayam/home/routes/homeRtr'));
// router.use('/sachivalayam'                  , require(appRoot + '/server/app/sachivalayam/sachivalayam/routes/sachivalayamRtr'));
// router.use('/services'                  , require(appRoot + '/server/app/sachivalayam/services/routes/servicesRtr'));
// router.use('/contact'                  , require(appRoot + '/server/app/sachivalayam/contact/routes/contactRtr'));
// router.use('/training'                  , require(appRoot + '/server/app/sachivalayam/training/routes/trainingRtr'));
// router.use('/faq'                  , require(appRoot + '/server/app/sachivalayam/faq/routes/faqRtr'));
// router.use('/gallery'                  , require(appRoot + '/server/app/sachivalayam/gallery/routes/galleryRtr'));
//router.use('/services/:dprtmntId'                  , require(appRoot + '/server/app/sachivalayam/services/routes/servicesRtr'));
router.get('/Robots.txt', function (req, res) {
    res.sendFile(path.join(clientRoot + '/Robots.txt'));
});

router.get('/sitemap.xml', function (req, res) {
    res.sendFile(path.join(clientRoot + '/sitemap.xml'));
});

router.get('/ds', function (req, res) {
    res.sendFile(path.join(clientRoot + '/home.html'));
});


// router.get('**',function(req, res) {
//     res.sendFile(path.join(clientRoot + '/app/views/common/404.html'));
// });

module.exports = router