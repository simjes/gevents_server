var express = require('express');
var router = express.Router();
var db = require('../lib/db_com');

router.route('/events')
    .get(function (req, res) {
        db.getAllEvents(function (err, result) {
            if (err) {
                res.send("Could not get events");
            } else {
                res.send(result);
            }
        });
    })
    .post(function (req, res) {
        //check if uploader is approved, if not save info to file? send to email? 
        //save in another db for review? evt save with approved flag, change flag if ok
        console.log(req.body);
        db.addEvent(req.body, function (err, result) {
           res.send(result); 
        });
    });

module.exports = router;