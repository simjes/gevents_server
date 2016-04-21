var express = require('express');
var router = express.Router();
var db = require('../lib/db_com');

router.route('/events')
	.get(function(req, res) {
		if (req.query.type != null) {
			db.getEventsByType(req.query.type, function(err, events) {
				res.send(events);
			});
		} else if (req.query.lng != null && req.query.lat != null) {
			db.getLocalEvents({
				lng: req.query.lng,
				lat: req.query.lat
			}, function(err, events) {
				res.send(events);
			});
		} else {
			db.getAllEvents(function(err, events) {
				res.send(events);
			});
		}
	})
	.post(function(req, res) { //TODO: check if event allready exists
		if (eventExists(req.body)) {
			res.send({
				lel: "alrdy exists"
			});
		} else {
			saveEvent(req.body, res);
		}
	});

function eventExists(event) {
	//TODO: check if event allready exists
	//check name of event and fbid?
	return false;
}

function saveEvent(event, apiResponse) {
	handleHosts(event.hosts);
	//Check if user is approved to add events. Event is approved if the user is approved.
	db.getUser(event.uploader.fb_id, function(err, user) {
		if (user === null) {
			event.uploader.approved = false;
			db.addUser(event.uploader, function() {
				event.approved = false;
			});
		} else {
			if (user.approved) {
				event.approved = true;
			} else {
				event.approved = false;
			}
		}
		addEventAndRespond(event, apiResponse);
	});
}

function handleHosts(hosts) {
	hosts.forEach(function(host) {
		db.getHostInfo(host.name, function(err, hostInfo) {
			if (hostInfo === null) {
				db.addHost(host);
			}
		});
	});
}

function addEventAndRespond(eventInfo, apiResponse) {
	db.addEvent(eventInfo, function(err, result) {
		console.log(result);
		console.log(err);
		apiResponse.send(result);
	});
}


//Get full details for an event.
router.route('/events/:event_id')
	.get(function(req, res) {
		db.getEvent(req.params.event_id, function(err, event) {
			res.send(event);
		});
	});

//TODO:
//check errors and respond accordingly? different response when saved?

module.exports = router;