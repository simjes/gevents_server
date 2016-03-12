var mongoose = require('mongoose');

var hostSchema = new mongoose.Schema({
   name: String,
   mail: String,
   web_link: String,
   fb_link: String,
   logo_link: String
});

module.exports = mongoose.model("Host", hostSchema);