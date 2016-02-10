var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    name: String,
    type: String,
    date: Date,
    fb_link: String,
    web_link: String,
    address: String,
    coords: {
        lat: Number,
        lng: Number
    },
    price: Number,
    hosts: Array,
    uploader: {
     name: String,
     userId: mongoose.Schema.Types.ObjectId //fb id?
    }
});

module.exports = mongoose.model("Event", eventSchema);