var mongoose = require('mongoose');

//save link to img? save img on server?
var eventSchema = new mongoose.Schema({
    name: String,
    type: [String],
    date_start: Date,
    date_end: Date,
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