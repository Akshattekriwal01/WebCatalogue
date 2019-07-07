// submiting new comments
const CampModel = require("../models/camp");
const CommentM = require("../models/comment");
const UserM = require("../models/user");
const passport = require("passport");
const express = require("express");
const router = express.Router();

router.post("/campground/:id/comment", isLoggedIn, (req, res) => {
  id = req.params.id;
  content = req.body.content;
  CommentM.create(
    { text: content, author: "some author" },
    (err, commentResult) => {
      if (err) console.log(err);
      else {
        CampModel.findById(id, (err, campResult) => {
          if (err) console.log(err);
          else {
            campResult.comments.push(commentResult);
            campResult.save();
            //commentResult.save();
            console.log(commentResult);
            CommentM.find({ text: content }, (err, r) => {
              console.log(r);
            });
            res.redirect("/campground/" + id);
          }
        });
      }
    }
  );
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("getin");
}

module.exports = router;
