var mongoose = require('mongoose');
var assert = require('chai').assert;
var db = require('../lib/db_com');
var Host = require('../lib/models/host');

var testHost1, testHost2, testHost3;

describe('database testing for hosts', function () {
    before(function () {
        mongoose.connect('mongodb://localhost/db_test');
    });

    after(function () {
        mongoose.connection.db.dropDatabase(function (err, result) {
            console.log(result);
        });
    })

});