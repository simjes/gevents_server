var mongoose = require('mongoose');
var assert = require('chai').assert;
var db = require('../lib/db_com');
var fs = require('fs');
var testEvents = JSON.parse(fs.readFileSync('./test/test_events.json').toString());
var digXApproved, everyEventApprovedLocal;
var promises = [];

describe('database testing for events', function() {
	var usedEvents = [testEvents[0], testEvents[1], testEvents[2], testEvents[4]];
	digXApproved = testEvents[0];
	everyEventApprovedLocal = testEvents[4];

	before(function(done) {
		mongoose.connect('mongodb://localhost/db_test');

		usedEvents.forEach(function(event) {
			promises.push(new Promise(function(resolve, reject) {
				db.addEvent(event, function(err, result) {
					resolve(result);
				});
			}))
		});
		done();
	});

	after(function(done) {
		mongoose.connection.db.dropDatabase(function(err, result) {
			mongoose.connection.close();
			done();
		});
	});

	it('adds a new event', function(done) {
		db.addEvent(digXApproved, function(err, result) {
			assert(digXApproved.name === result.name, "Could not add event, expected: " + digXApproved.name + ", got: " + result.name);
			done();
		});
	});

	it('get an event', function(done) {
		db.addEvent(digXApproved, function(err, result) {
			db.getEvent(result.id, function(err, event) {
				assert(result.id === event.id, "No the same id, expected: " + result.id + ", got: " + event.id);
				done();
			});

		});
	});

	it('get events by type', function(done) {
		Promise.all(promises).then(function() {
			db.getEventsByType("lan", function(err, result) {
				assert(result.length >= 2, "Length was wrong, Expected: 2 or more, got: " + result.length);
				result.forEach(function(item) {
					assert(item.type.indexOf("lan") === 0, "Not the same type, Expected: 0, got: " + item.type.indexOf("lan"));
				});
				done();
			});
		});
	});

	it('get nearby events', function(done) {
		Promise.all(promises).then(function() {
			db.getLocalEvents({
				lng: 2,
				lat: 2
			}, function(err, result) {
				assert(result.length === 1, "Got more than one event: " + result.length);
				assert(result[0].name === everyEventApprovedLocal.name, "Not the same event, Expected: " + everyEventApprovedLocal.name + ", got: " + result[0].name)
				done();
			});
		});
	});

	it('get all events', function(done) {
		db.getAllEvents(function(err, result) {
			assert(result.length >= 3, "Did not get correct amount of events, expected: " + 3 + " or more, got: " + result.length);
			done();
		});
	});

});