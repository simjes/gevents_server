var express = require('express');
var router = express.Router();
var db = require('../lib/db_com');

router.route('/events')
//only get upcomming events, not old! send current date from client, also add to db_com.js
    .get(function (req, res) {
        var type = req.query.type;
        if (type != null) {
            db.getEventsByType(type, function (err, events) {
                res.send(events);
            });
        } else {
            db.getAllEvents(function (err, events) {
                res.send(events);
            });
        }
    })
    .post(function (req, res) { //TODO: check if event allready exists
        handleHosts(req.body.hosts);
        //Check if user is approved to add events. Event is approved if the user is approved.
        db.getUser(req.body.uploader.fb_id, function (err, user) {
            if (user === null) {
                req.body.uploader.approved = false;
                db.addUser(req.body.uploader, function () {
                    req.body.approved = false;
                    addEventAndRespond(req.body, res);
                });
            } else {
                if (user.approved) {
                    req.body.approved = true;
                } else {
                    req.body.approved = false;
                }
                addEventAndRespond(req.body, res);
            }
        });
    });

function handleHosts(hosts) {
    hosts.forEach(function (host) {
        db.getHostInfo(host.name, function (err, hostInfo) {
            if (hostInfo === null) {
                db.addHost(host);
            }
        });
    });
}

function addEventAndRespond(eventInfo, apiResponse) {
    db.addEvent(eventInfo, function (err, result) {
        console.log(result);
        apiResponse.send(result);
    });
}


//Get full details for an event.
router.route('/events/:event_id')
    .get(function (req, res) {
        db.getEvent(req.params.event_id, function (err, event) {
            res.send(event);
        });
    });

//TODO:
//find events nearby: get user pos as params, check coords with radius
//find coords for an adresse: do this client side?
//check errors and respond accordingly? different response when saved?

module.exports = router;