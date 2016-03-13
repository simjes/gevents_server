var mongoose = require('mongoose');
var Event = require('./models/event');
var User = require('./models/user');
var Host = require('./models/host');

module.exports = {

    //events
    addEvent: function(eventInfo, callback) {
        var event = new Event(eventInfo);
        event.save(function(err, result) {
            typeof callback === 'function' && callback(err, result); //optional callback
        });
    },

    getEvent: function(eventId, callback) {
        Event.findOne({ _id: eventId }, function(err, result) {
            typeof callback === 'function' && callback(err, result);
        }).select({ "uploader": 0, "approved": 0 });
    },

    //limit and offset?
    getAllEvents: function(callback) {
        Event.find({ approved: true, date_end: { $gt: new Date() } }, function(err, result) {
            typeof callback === 'function' && callback(err, result);
        })
            .select({ "name": 1, "type": 1, "date_start": 1, "address": 1, "img": 1 })
            .sort('date_start');
    },

    //limit and offset?
    getEventsByType: function(eventType, callback) {
        Event.find({ type: eventType, approved: true, date_end: { $gt: new Date() } }, function(err, result) {
            typeof callback === 'function' && callback(err, result);
        })
            .select({ "name": 1, "type": 1, "date_start": 1, "address": 1, "img": 1 })
            .sort('date_start');
    },

    //limit and offset?
    getLocalEvents: function(centerCoordinates, callback) {
        Event.find({ approved: true, date_end: { $gt: new Date() }, 
        loc: {$geoWithin : {$centerSphere: [[centerCoordinates.lng, centerCoordinates.lat], 20/3963.2]}}}, 
        function(err, result) {
            typeof callback === 'function' && callback(err, result);
        })
            .select({ "name": 1, "type": 1, "date_start": 1, "address": 1, "img": 1 })
            .sort('date_start');
    },

    //host
    addHost: function(hostInfo, callback) {
        var host = new Host(hostInfo);
        host.save(function(err, result) {
            typeof callback === 'function' && callback(err, result);
        });
    },

    getHostInfo: function(hostName, callback) {
        Host.findOne({ name: hostName }, function(err, result) {
            typeof callback === 'function' && callback(err, result);
        });
    },
    //get all hosts? f.eks til å velge existerende hosts when adding event


    //user
    addUser: function(userInfo, callback) {
        var user = new User(userInfo);
        user.save(function(err, result) {
            typeof callback === 'function' && callback(err, result);
        });
    },

    getUser: function(fbId, callback) {
        User.findOne({ fb_id: fbId }, function(err, result) {
            typeof callback === 'function' && callback(err, result);
        });
    }
}