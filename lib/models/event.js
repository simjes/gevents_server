var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	name: String,
	type: [String],
	description: String,
	date_start: Date,
	date_end: Date,
	img: String,
	fb_link: String,
	web_link: String,
	address: {
		street: String,
		zip_code: Number,
		city: String
	},
	loc: {
		type: [Number],
		index: '2dsphere'
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