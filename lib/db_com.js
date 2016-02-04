var mongoose = require('mongoose');
var Event = require('./models/event');
var User = require('./models/user');
var Host = require('./models/host');

module.exports = {
    addEvent: function (eventInfo, callback) {
        var event = new Event(eventInfo);
        event.save(function (err, result) {
            typeof callback === 'function' && callback(err, result); //optional callback
        });
    },

    getEvent: function (eventId, callback) {
        Event.findOne({ _id: eventId }, function (err, result) {
            typeof callback === 'function' && callback(err, result); //optional callback 
        });
    }
}