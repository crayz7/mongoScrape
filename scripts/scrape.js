var cheerio = require("cheerio");
var mongoose = require("mongoose");

// A GET route for scraping the reddit news website
app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with request
    axios.get("https://www.reddit.com/r/news/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an Headline tag, and do the following:
        $("p.title").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
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
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        });

        // If we were able to successfully scrape and save an Headline, send a message to the client
        res.send("Scrape Complete");
    });
});

module.exports = Scrape;