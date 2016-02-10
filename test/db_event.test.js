var mongoose = require('mongoose');
var assert = require('chai').assert;
var db = require('../lib/db_com');
var testEvent1, testEvent2;

describe('database testing for events', function () {

    before(function () {
        mongoose.connect('mongodb://localhost/db_test');
    });

    after(function (done) {
        mongoose.connection.db.dropDatabase(function (err, result) {
            mongoose.connection.close();
            done();
        });
    })

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
        type: "cosplay",
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
                assert(result.id == event.id, "No the same id, expected: " + result.id + ", got: " + event.id);
                done();
            });

        });
    });

    it('get events by type', function (done) {
        db.addEvent(testEvent1, function (err, firstEvent) {
            db.addEvent(testEvent2, function (err, secondEvent) {
                db.addEvent(testEvent1, function (err, thirdEvent) {
                    db.getEventsByType("lan", function (err, result) {
                        assert(result.length >= 2, "Length was wrong, Expected: 2 or more, got: " + result.length);
                        result.forEach(function (item) {
                            assert(item.type == firstEvent.type && item.type == thirdEvent.type, "Not the same type, Expected: lan, got: " + item.type + ", " + firstEvent.type + ", " + thirdEvent.type);
                        });
                        done();
                    });
                });
            });
        });
    });

    describe('get all events in database', function () {
        before(function (done) {
            mongoose.connection.db.dropDatabase(function (err, result) {
                db.addEvent(testEvent1, function () {
                    db.addEvent(testEvent2, function () {
                        done();
                    });
                });
            });
        });

        it('get all events', function (done) {
            db.getAllEvents(function (err, result) {
                assert(result.length == 2, "Did not get correct amount of events, expected: " + 2 + ", got: " + result.length);
                done();
            });
        });
    });

});
