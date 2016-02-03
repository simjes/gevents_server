var mongoose = require('mongoose');
var assert = require('chai').assert;
var db = require('../lib/db_com');
var Event = require('../lib/models/event');
var User = require('../lib/models/user');
var Host = require('../lib/models/host');

describe('database testing', function () {
    var testEvent1 = new Event({
        name: "test"
    });
    before(function () {
        mongoose.connect('mongodb://localhost/db_test');
        
        //db.addEvent();
    });

    describe('add event to db', function () {
        it('should add event', function () {
            var event = db.addEvent(testEvent1);
            console.log("-------------------------test");
            //assert.equal(event.name, testEvent1.name, "same");
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

