var express = require("express");

var router = express.Router();

// Route for saving/updating an Headline's associated Note
router.post("/headlines/:id", function (req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
        .then(function (dbNote) {

            return db.Headline.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbHeadline) {
            // If we were able to successfully update an Headline, send it back to the client
            res.json(dbHeadline);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

module.exports = router;