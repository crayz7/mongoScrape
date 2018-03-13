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

module.exports = router;