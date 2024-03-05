var videoRtr = require('express').Router();
var SnModRoot = appRoot + '/server/api/modules/general/auth/';
var modRoot = appRoot + '/server/api/modules/videos/';
var checkUser = require(SnModRoot + 'controllers/accessCtrl');
const videoCtrl = require(modRoot + 'controllers/videoCtrl');

videoRtr.get('/shwVideos', checkUser.hasToken, videoCtrl.get_VideoCtrl);

module.exports = videoRtr; 