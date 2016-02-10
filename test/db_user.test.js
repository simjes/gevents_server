var mongoose = require('mongoose');
var assert = require('chai').assert;
var db = require('../lib/db_com');
var User = require('../lib/models/user');

var testUser;

describe('database testing for user', function () {
    before(function () {
        mongoose.connect('mongodb://localhost/db_test');
    });

    after(function (done) {
        mongoose.connection.db.dropDatabase(function (err, result) {
            mongoose.connection.close();
            done();
        });
    });

    testUser = {
        name: "String",
        fb_id: "String",
        mail: "String",
        phone: "String",
        approved: true
    }

    it('add user to db', function (done) {
        db.addUser(testUser, function (err, result) {
            assert(testUser.name == result.name, "Names did not match. Expected: " + testUser.name + ", got: " + result.name);
            done();
        });
    });

    it('get user from db', function (done) {
        db.addUser(testUser, function (err, savedResult) {
            db.getUser(savedResult.id, function (err, result) {
                assert(testUser.name == result.name, "Names did not match. Expected: " + testUser.name + ", got: " + result.name);
                done();
            });
        });
    });
});