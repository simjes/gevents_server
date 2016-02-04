var mongoose = require('mongoose');
var assert = require('chai').assert;
var Event = require('../lib/models/event');
var User = require('../lib/models/user');
var Host = require('../lib/models/host');
var db = require('../lib/db_com');
var testEvent1;
var testEvent2;
describe('database testing', function () {

    before(function () {
        mongoose.connect('mongodb://localhost/db_test');
    });

    after(function () {
        mongoose.connection.db.dropDatabase(function (err, result) {
            console.log(result);
        });
    })

    describe('event', function () {

        testEvent1 = {
            name: "testname",
            type: "lan",
            date: new Date('01.02.2016'),
            fb_link: "fblink",
            web_link: "String",
            address: "String",
            coords: {
                lat: 2,
                lng: 2
            },
            price: 2,
            hosts: ['host1', 'testhost'],
            uploader: {
                name: "simon"
            }
        }
        testEvent2 = {
            name: "testname2",
            type: "lan2",
            date: new Date('01.02.2016'),
            fb_link: "fblink2",
            web_link: "String2",
            address: "String2",
            coords: {
                lat: 2,
                lng: 2
            },
            price: 2,
            hosts: ['host12', 'testhost2'],
            uploader: {
                name: "simon2"
            }
        }

        it('adds a new event', function (done) {
            db.addEvent(testEvent1, function (err, result) {
                assert(testEvent1.name == result.name, "Could not add event, expected: " + testEvent1.name + ", got: " + result.name);
                done();
            });
        });

        it('get an event', function (done) {
            db.addEvent(testEvent1, function (err, result) {
                db.getEvent(result.id, function (err, event) {
                    assert(result.id == event.id, "No the same id: expected: " + result.id + ", got: " + event.id);
                    done();
                });

            });
        });



    });
});
