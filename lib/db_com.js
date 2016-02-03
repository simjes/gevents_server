/*var mongoose = require('mongoose');
var Event = require('./models/event');
var User = require('./models/user');
var Host = require('./models/host');

module.exports = {
    addEvent: function (eventInfo) {
        var event = mapEvent(eventInfo);
        var res = event.save(function (err, result) {
            if (err) return console.error(err);
            console.log("result");
            return result;
        });
        return res;
    }
}*/