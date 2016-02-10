var mongoose = require('mongoose');
var assert = require('chai').assert;
var db = require('../lib/db_com');

var testHost1;

describe('database testing for hosts', function () {
    before(function () {
        mongoose.connect('mongodb://localhost/db_test');
    });

    after(function (done) {
        mongoose.connection.db.dropDatabase(function (err, result) {
            mongoose.connection.close();
            done();
        });
    });

    testHost1 = {
        name: "geekcrew",
        mail: "geeklel@gmail.com",
        web_link: "String",
        fb_link: "String"
    }

    it('adds new host to db', function (done) {
        db.addHost(testHost1, function (err, result) {
            assert(testHost1.name == result.name, "Host name was not correct. Expected: " + testHost1.name + ", got: " + result.name);
            done();
        });
    });
    
    it('get host from db', function (done) {
        db.addHost(testHost1, function (err, savedHost) {
           db.getHostInfo(savedHost._id, function(err, result) {
               assert(savedHost.id == result.id, "Id does not match. Expected: " + savedHost._id + ", got: " + result._id);
               done();
           }); 
        });
    });
});