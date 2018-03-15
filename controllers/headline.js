var express = require("express");

var router = express.Router();

var request = require("request");

var cheerio = require("cheerio");

var mongoose = require("mongoose");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var Note = require("../models/Note.js");
var Headline = require("../models/Headline.js");

router.get("/savedheadlines"), function (req, res) {
    Headline.find({}, function (error, doc) {

        if (err) return res.status(500).send('Something broke!');

        var hbsHeadlineObject = {
            headlines: doc
        }

        res.render("saved", hbsHeadlineObject)
    })
}

router.post("/saveheadline", function (req, res) {

    var newHeadlineObject = {};

    newHeadlineObject.title = req.body.title;

    newHeadlineObject.link = req.body.link;

    var entry = new Article(newHeadlineObject);

    console.log("Headline saved: " + entry);

    // Save headline to the db
    entr.save(function (err, doc) {
        // Log any errors
        if (err) {
            console.log(err);
        }
        // Or log the doc
        else {
            console.log(doc);
        }
    });

    res.redirect("/savedarticles");

});

module.exports = router;