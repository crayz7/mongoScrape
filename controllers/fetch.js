import { model } from "mongoose";

var express = require("express");

var router = express.Router();

var request = require("request");

var cheerio = require("cheerio");

var mongoose = require("mongoose");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var Note = require("../models/Note.js");
var Headline = require("../models/Headline.js");

router.get("/", function(req, res) {
    res.render("index");
  });

// A GET route for scraping the reddit news website
router.get("/scrape", function (req, res) {
  request.get("https://www.reddit.com/r/news/").then(function (response) {
    
    var $ = cheerio.load(response.data);

    $("p.title").each(function (i, element) {
      
      var result = {};

      result.title = $(this)
        .text();
      result.link = $(this)
        .children()
        .attr("href");

      // Create a new Headline using the `result` object built from scraping
      db.Headline.create(result)
        .then(function (dbHeadline) {
          // View the added result in the console
          console.log(dbHeadline);
        })
          if (err) return res.status(500).send('Something broke!');
        });
    });
    var hbsHeadlineObject = {
      headlines: scrapedheadlines
    };
    res.render("home", hbsHeadlineObject);
  });

module.exports = router;