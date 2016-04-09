var mongoose = require('mongoose');
var assert = require('chai').assert;
var db = require('../lib/db_com');

describe('database testing for hosts', function() {
	before(function() {
		mongoose.connect('mongodb://localhost/db_test');
	});

	after(function() {
		mongoose.connection.close();
	});

	afterEach(function(done) {
		mongoose.connection.db.dropDatabase(function(err, result) {
			done();
		});
	});

	var host = {
		name: "geekcrew",
		mail: "geeklel@gmail.com",
		web_link: "http://www.geekcrew.com",
		fb_link: "http://www.facebook.com/geekcrew"
	}

	it('adds new host to db', function(done) {
		db.addHost(host, function(err, result) {
			assert(host.name == result.name, "Host name was not correct. Expected: " + host.name + ", got: " + result.name);
			done();
		});
	});

	it('get host from db', function(done) {
		db.addHost(host, function(err, savedHost) {
			db.getHostInfo(savedHost.name, function(err, result) {
				assert(savedHost.id == result.id, "Id does not match. Expected: " + savedHost._id + ", got: " + result._id);
				done();
			});
		});
	});
});