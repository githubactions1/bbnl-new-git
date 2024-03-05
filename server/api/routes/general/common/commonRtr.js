var oltRtr = require('express').Router();
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var modRoot = appRoot + '/server/api/modules/olt/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');
const eventsCtrl = require(appRoot + '/server/api/modules/general/events/controllers/EventsCtrl');
const notesCtrl = require(appRoot +  '/server/api/modules/general/notes/controllers/NotesCtrl');


oltRtr.post('/events', checkUser.hasToken, eventsCtrl.get_EventsCtrl);
oltRtr.post('/notes',  checkUser.hasToken, notesCtrl.get_NotetsCtrl);


module.exports = oltRtr;