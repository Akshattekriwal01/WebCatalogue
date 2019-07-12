const CampModel = require("../models/camp");
const CommentM = require("../models/comment");
//const PartnerM = require("../models/partner");
const UserM = require("../models/user");
const passport = require("passport");
const express = require("express");
const router = express.Router();
const PartnerM = require("../models/partner");
// landing page route
router.get("/", (req, res) => {
  res.render("landing");
});
//getin page route
router.get("/getin", (req, res) => {
  res.render("getin");
});
//==============partner login======================
partnerarr = [];
router.get("/getin/partner", (req, res) => {
  res.render("getin_partner");
});
//partner sign up
router.post("/getin/partner/register", (req, res) => {
  let newPartner = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  };

  PartnerM.create(newPartner, (err, partnerResult) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/getin/partner/register/" + partnerResult._id);
    }
  });
  router.get("/getin/partner/register/:id", (req, res) => {
    partnerR = { id: req.params.id, lass: "lass" };
    console.log(partnerR);
    res.render("business/signup_form.ejs", { partner: partnerR });
  });
  //res.render("getin_partner");
});
router.post("/getin/partner/login", (req, res) => {
  res.render("getin_partner");
});
//==============Dashboard================
router.post("/dashboard/:id", (req, res) => {
  console.log(req.body.profile);
  // PartnerM.findByIdAndUpdate(req.params.id, req.body.profile, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     // return res.redirect("");
  //   } else res.resnder(result);
  // });
  PartnerM.findById(req.params.id, (err, partner) => {
    if (err) {
      console.log(err);
    } else {
      partner.profile = req.body.profile;
      partner.save(err => {
        if (err) console.log(err);
        else res.send("looks like it worked");
      });
    }
  });
  // PartnerM.updateOne(
  //   { _id: req.params.id },
  //   { address: req.body.profile.address },
  //   (err, rest) => {
  //     if (err) {
  //       console.log(err);
  //     } else res.send("chootiya");
  //   }
  // );
});
// sign-up route=================USER=================
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
