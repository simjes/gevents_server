var mongoose = require('mongoose');
var assert = require('chai').assert;
var db = require('../lib/db_com');
var testEvent1, testEvent2, testEvent3, testEvent4;

describe('database testing for events', function() {

    before(function() {
        mongoose.connect('mongodb://localhost/db_test');
    });

    after(function(done) {
        mongoose.connection.db.dropDatabase(function(err, result) {
            mongoose.connection.close();
            done();
        });
    })

    //use legit data
    testEvent1 = {
        "name": "DigitalityX 2016",
        "type": ["lan", "cosplay"],
        "fb_link": "https://www.facebook.com/events/1660514624227880/",
        "web_link": "https://www.geekevents.org/dx16/",
        "img": "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xta1/v/t1.0-9/11222179_1507105956256440_5828645921692580351_n.png?oh=36770bf621d84e0121cf0cb6de3f0531&oe=57926CC6",
        "address": {
            "street": "Gunnar Warebergs Gate 13",
            "zip_code": "4021",
            "city": "Stavanger"

        },
        "date_start": "2016-06-30T18:00:00.000Z",
        "date_end": "2016-07-03T12:00:00.000Z",
        "loc": [58.954723, 5.698567],
        "price": 695,
        "uploader": {
            "name": "Simon Jespersen",
            "fb_id": "100000165147511",
            "mail": "simonjespersen1@hotmail.com",
            "phone": "999999"
        },
        "hosts": [
            {
                "name": "Stavanger Forum",
                "mail": "",
                "web_link": "http://stavanger-forum.no/",
                "logo_link": "http://www.regionstavanger.com/ImageVault/Images/width_150/scope_0/filename_OeouxDEos8K3fylAiBKB.jpg/storage_Edited/conversionFormatType_WebSafe/ImageVaultHandler.aspx",
                "fb_link": "https://www.facebook.com/Stavanger-Forum-116959275039256/?fref=ts"
            },

            {
                "name": "Digitality X",
                "mail": "",
                "logo_link": "http://digitalityx.no/img/digitalityx-logo.svg",
                "web_link": "http://www.digitalityx.no/",
                "fb_link": "https://www.facebook.com/digitalityx/?fref=ts"
            }
        ],
        approved: true
    }
    testEvent2 = {
        "name": "Rogahack 2016",
        "type": ["lan"],
        "fb_link": "https://www.facebook.com/events/1607613266155183/",
        "web_link": "https://www.geekevents.org/rh16/",
        "address": {
            "street": "Asheimveien 45",
            "zip_code": "4318",
            "city": "Sandnes"

        },
        "img": "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xat1/t31.0-8/12038793_732730850191002_5781860754283235036_o.jpg",
        "date_start": "2016-03-18T19:00:00.000Z",
        "date_end": "2016-03-21T12:00:00.000Z",
        "loc": [58.842508, 5.714232],
        "price": 695,
        "uploader": {
            "name": "Simon Jespersen",
            "fb_id": "100000165147511",
            "mail": "simonjespersen1@hotmail.com",
            "phone": "999999"
        },
        "hosts": [
            {
                "name": "Rogahack",
                "mail": "",
                "web_link": "http://www.rogahack.no/2016/",
                "fb_link": "https://www.facebook.com/RogaHack/?fref=ts",
                "logo_link": "http://www.rogahack.no/2014/wp-content/uploads/2014/01/logo_980x156_flashy_blue.png"
            }
        ],
        approved: true
    }

    testEvent3 = {
        "name": "Desucon POP",
        "type": ["cosplay"],
        "fb_link": "https://www.facebook.com/events/1614957118754351/",
        "web_link": "http://desucon.no/pop2016/billetter/",
        "img": "http://desucon.no/pop2016/files/2015/12/desupop_logo.png",
        "address": {
            "street": "Messeveien 8",
            "zip_code": "2004",
            "city": "Lillestrøm"
        },
        "date_start": "2016-06-24T11:00:00.000Z",
        "date_end": "2016-06-26T20:30:00.000Z",
        "loc": [59.949994, 11.055432],
        "price": 450,
        "uploader": {
            "name": "Runar Sunde",
            "fb_id": "731665088",
            "mail": "runisunde@gmail.com",
            "phone": "999999"
        },
        "hosts": [
            {
                "name": "Desucon",
                "mail": "",
                "web_link": "http://desucon.no/pop2016/",
                "fb_link": "https://www.facebook.com/Desucon/?fref=ts",
                "logo_link": "http://desucon.no/pop2016/files/2015/12/desupop_logo.png"
            }
        ],
        approved: false
    }

    testEvent4 = {
        "name": "Desucon POP",
        "type": ["cosplay"],
        "fb_link": "https://www.facebook.com/events/1614957118754351/",
        "web_link": "http://desucon.no/pop2016/billetter/",
        "img": "http://desucon.no/pop2016/files/2015/12/desupop_logo.png",
        "address": {
            "street": "Messeveien 8",
            "zip_code": "2004",
            "city": "Lillestrøm"
        },
        "date_start": "2016-06-24T11:00:00.000Z",
        "date_end": "2016-06-26T20:30:00.000Z",
        "loc": [59.949994, 11.055432],
        "price": 450,
        "uploader": {
            "name": "Simon Jespersen",
            "fb_id": "100000165147511",
            "mail": "runisunde@gmail.com",
            "phone": "999999"
        },
        "hosts": [
            {
                "name": "Desucon",
                "mail": "",
                "web_link": "http://desucon.no/pop2016/",
                "fb_link": "https://www.facebook.com/Desucon/?fref=ts",
                "logo_link": "http://desucon.no/pop2016/files/2015/12/desupop_logo.png"
            }
        ],
        approved: true
    }

    it('adds a new event', function(done) {
        db.addEvent(testEvent1, function(err, result) {
            assert(testEvent1.name === result.name, "Could not add event, expected: " + testEvent1.name + ", got: " + result.name);
            done();
        });
    });

    it('get an event', function(done) {
        db.addEvent(testEvent1, function(err, result) {
            db.getEvent(result.id, function(err, event) {
                assert(result.id === event.id, "No the same id, expected: " + result.id + ", got: " + event.id);
                done();
            });

        });
    });

    it('get events by type', function(done) {
        db.addEvent(testEvent3, function() {
            db.addEvent(testEvent1, function(err, firstEvent) {
                db.addEvent(testEvent2, function(err, secondEvent) {
                    db.addEvent(testEvent1, function(err, thirdEvent) {
                        db.getEventsByType("lan", function(err, result) {
                            assert(result.length >= 2, "Length was wrong, Expected: 2 or more, got: " + result.length);
                            result.forEach(function(item) {
                                assert(firstEvent.type.indexOf("lan") === 0 && thirdEvent.type.indexOf("lan") === 0, "Not the same type, Expected: 0, got: " + firstEvent.type.indexOf(item.type) + ", " + thirdEvent.type.indexOf(item.type));
                            });
                            done();
                        });
                    });
                });
            })
        });
    });

    it('get nearby events', function(done) {
        db.addEvent(testEvent1, function() {
            db.addEvent(testEvent2, function() {
                db.addEvent(testEvent4, function() {
                    db.getLocalEvents({ lng: 59.8939529, lat: 10.6450359 }, function(err, result) {
                        console.log(result);
                        assert(result.length === 1, "Got more than one event: " + result.length);

                        done();
                    });
                });
            });
        });
    });

    describe('get all events in database', function() {
        before(function(done) {
            mongoose.connection.db.dropDatabase(function(err, result) {
                db.addEvent(testEvent1, function() {
                    db.addEvent(testEvent2, function() {
                        db.addEvent(testEvent3, function() {
                            done();
                        })
                    });
                });
            });
        });

        it('get all events', function(done) {
            db.getAllEvents(function(err, result) {
                assert(result.length === 2, "Did not get correct amount of events, expected: " + 2 + ", got: " + result.length);
                done();
            });
        });
    });

});
