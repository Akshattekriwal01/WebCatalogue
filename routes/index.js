const CampModel = require("../models/camp");
const CommentM = require("../models/comment");
const UserM = require("../models/user");
const passport = require("passport");
const express = require("express");
const router = express.Router();
// landing page route
router.get("/", (req, res) => {
  res.render("landing");
});
//getin page route
router.get("/getin", (req, res) => {
  res.render("getin");
});
// sign-up route
router.post("/getin/register", (req, res) => {
  let name = req.body.name;
  name = name.charAt(0).toUpperCase() + name.slice(1);
  let newUser = new UserM({
    name: name,
    username: req.body.username
  });
  UserM.register(newUser, req.body.password, (err, userResult) => {
    if (err) {
      console.log(err);
      return res.render("getin");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/campground");
    });
  });
});
//login route
router.post(
  "/getin/login",
  passport.authenticate("local", {
    successRedirect: "/campground",
    failureRedirect: "/getin"
  }),
  (req, res) => {}
);
//logout route
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.redirect("/getin");
});
//middileware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("getin");
}

module.exports = router;
