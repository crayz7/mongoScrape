var db = require("../models");
var scrape = require(".../scripts/scrape");

module.exports = {
  scrapeHeadlines: function(req, res) {
    return scrape()
      .then(function(articles) {
        return db.Headline.create(articles);
      })
      .then(function(dbHeadline) {
        //if no new articles
        if (dbHeadline.length === 0) {
          res.json({
            message: "No new articles. Try again later."
          })
        } else {
          //else added articles to db
          res.json({
            message: "Added " + dbHeadline.length + " articles."
          })
        }
      }).catch(function(err) {
        res.json({
          message: "Scrape complete"
        })
      })
  }
}