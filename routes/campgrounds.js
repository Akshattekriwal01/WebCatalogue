const CampModel = require("../models/camp");
const CommentM = require("../models/comment");
const express = require("express");
const router = express.Router();
//GET all the campgrounds
router.get("/", isLoggedIn, (req, res) => {
  //we need to get all the camp ground from the db and render that file
  CampModel.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("route hit");
      res.render("campgrounds/Index", {
        campgrounds: result
      });
    }
  });
});

// create new campgrounds
// CREATE Route
router.post("/", isLoggedIn, (req, res) => {
  //get data fromt the forms and the camp to the array
  // get back to .get("/campgrounds")
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let obj = { name: name, image: image, description: desc };
  CampModel.create(obj, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("newly created camp ground");
    }
  });
  //default redirect is to get route
  res.redirect("/");
});

//NEW Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

//SHOW ROUTE orignal route commented before refactoring
//router.get("/campground:id", isLoggedIn, (req, res) => {
router.get("/:id", isLoggedIn, (req, res) => {
  //find the camp ground
  //render the found camp ground
  // id stored in req.params.id

  CampModel.findById(req.params.id)
    .populate("comments")
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        //result.comments.forEach(x => console.log(x.text));
        res.render("campgrounds/show", { campground: result });
      }
    });
});
//middileware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/getin");
}

module.exports = router;
