var mongoose = require('mongoose');

//save img?
//endre date?
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
        fb_Id: String
    },
    approved: Boolean
});

module.exports = mongoose.model("Event", eventSchema);