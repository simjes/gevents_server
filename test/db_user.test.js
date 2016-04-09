var mongoose = require('mongoose');
var assert = require('chai').assert;
var db = require('../lib/db_com');

describe('database testing for user', function() {
	before(function() {
		mongoose.connect('mongodb://localhost/db_test');
	});

	after(function(done) {
		mongoose.connection.db.dropDatabase(function(err, result) {
			mongoose.connection.close();
			done();
		});
	});

	var user = {
		name: "Simon jespersen",
		fb_id: "100000165147511",
		mail: "simonjespersen1@hotmail.com",
		phone: "999999",
		approved: true
	}

	it('add user to db', function(done) {
		db.addUser(user, function(err, result) {
			assert(user.name == result.name, "Names did not match. Expected: " + user.name + ", got: " + result.name);
			done();
		});
	});

	it('get user from db', function(done) {
		db.addUser(user, function(err, savedResult) {
			db.getUser(savedResult.fb_id, function(err, result) {
				assert(user.name == result.name, "Names did not match. Expected: " + user.name + ", got: " + result.name);
				done();
			});
		});
	});
});