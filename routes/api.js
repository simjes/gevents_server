var express = require('express');
var router = express.Router();
var db = require('../lib/db_com');

router.route('/events')
    .get(function (req, res) {
        var type = req.param('type');
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
    .post(function (req, res) {
        //Check if user is approved to add events. Event is approved if the user is approved.
        db.getUser(req.body.uploader.fb_id, function (err, user) {
            if (user === null) {
                req.body.uploader.approved = false;
                db.addUser(req.body.uploader, function (err, createdUser) {
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

function addEventAndRespond(eventInfo, apiResponse) {
    db.addEvent(eventInfo, function (err, result) {
        console.log(result);
        apiResponse.send(result); //temp response
    });
}

router.route('/events/:event_id')
    .get(function (req, res) {
        db.getEvent(req.params.event_id, function (err, event) {
            res.send(event);
        });
    });

//TODO:
//find events nearby: get user pos, check coords with radius
//find coords for an adresse: do this client side?

module.exports = router;