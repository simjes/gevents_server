var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    fb_id: String,
    mail: String,
    phone: String,
    approved: Boolean
});

module.exports = mongoose.model("User", userSchema);