var mongoose = require('mongoose');
var assert = require('chai').assert;
var Event = require('../lib/models/event');
var User = require('../lib/models/user');
var Host = require('../lib/models/host');
var testEvent1;

describe('database testing', function () {

    before(function () {
        mongoose.connect('mongodb://localhost/db_test');
        
        //db.addEvent();
    });

    after(function () {
        mongoose.connection.db.dropDatabase(function (err, result) {
            console.log(result);
        });
    })

    describe('event', function () {
        testEvent1 = new Event({
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
        });

        it('adds a new event', function (done) {
            testEvent1.save(function (err, event) {
                assert(testEvent1.name == event.name, "names are not equal");
                done();
            });
        });

    });
});;

/*describe('get all events from db', function() {
  it('should give all events', function() {
      var allEvents = db.getAllEvents();
      assert.equal(allEvents.length, 2, "length ok");
      assert.equal(allEvents[0].name, "test1", "first event ok");
  });
});

describe('get single event from db', function() {
  it('should give one event', function() {
      //var allEvents = db.getEvent();
  });
});*/

