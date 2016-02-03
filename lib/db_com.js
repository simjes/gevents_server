var mongoose = require('mongoose');


module.exports = {
    addEvent: function (eventInfo) {
        eventInfo.save(function (err, eventInfo) {
            if (err) return console.error(err);
            return eventInfo;
        });
    }
}