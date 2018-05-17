// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(methodOverride('_method'));

// Our scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  
});

// Require all models
var db = require("./models");

var PORT = 3000;
// Set Handlebars as the view engine
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Require routes
var routes = require('./controllers/fetch.js');
var routes = require('./controllers/headline.js');
var routes = require('./controllers/note.js');
app.use('/', routes);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + ".");
});