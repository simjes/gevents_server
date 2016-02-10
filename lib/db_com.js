var mongoose = require('mongoose');
var Event = require('./models/event');
var User = require('./models/user');
var Host = require('./models/host');

module.exports = {
    
    //events
    addEvent: function (eventInfo, callback) {
        var event = new Event(eventInfo);
        event.save(function (err, result) {
            typeof callback === 'function' && callback(err, result); //optional callback
        });
    },

    getEvent: function (eventId, callback) {
        Event.findOne({ _id: eventId }, function (err, result) {
            typeof callback === 'function' && callback(err, result);
        });
    },
    
    //limit and offset?
    getAllEvents: function (callback) {
        Event.find({}, function (err, result) {
            typeof callback === 'function' && callback(err, result);
        });
    },

    getEventsByType: function (eventType, callback) {
        Event.find({ type: eventType }, function (err, result) {
            typeof callback === 'function' && callback(err, result);
        });
    },


    //host
    addHost: function (hostInfo, callback) {
        var host = new Host(hostInfo);
        host.save(function (err, result) {
            typeof callback === 'function' && callback(err, result);
        });
    },

    getHostInfo: function (hostId, callback) {
        Host.findOne({ _id: hostId }, function (err, result) {
            typeof callback === 'function' && callback(err, result);
        });
    },


    //user
    addUser: function (userInfo, callback) {
        var user = new User(userInfo);
        user.save(function (err, result) {
            typeof callback === 'function' && callback(err, result);
        });
    },

    getUser: function (userId, callback) {
        User.findOne({ _id: userId }, function (err, result) {
            typeof callback === 'function' && callback(err, result);
        });
    }
}