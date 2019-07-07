//requirind dependencies
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const CampModel = require("./models/camp");
const seedDB = require("./seeds");
const CommentM = require("./models/comment");
const ejsLint = require("ejs-lint");
const passport = require("passport");
const localStrategy = require("passport-local");
const UserM = require("./models/user");
//requiring routes
const campgroundRoutes = require("./routes/campgrounds"),
  commentRoutes = require("./routes/comments"),
  indexRoutes = require("./routes/index");

seedDB();

mongoose.connect("mongodb://localhost:27017/mycamp", {
  useNewUrlParser: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

//passport configuration
app.use(
  require("express-session")({
    secret: "kabhi kabhi mere dil mei kuh kuch hota hai",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(UserM.authenticate()));
passport.serializeUser(UserM.serializeUser());
passport.deserializeUser(UserM.deserializeUser());
//passing the current user to the
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
//express router usage
// app.use(campgroundRoutes);
// to shorten comments use {mergeparams: true} insdie express.router()
//we'll shoerten the  campground route because "/camprgound" is common in all the routes in the fileroutes above
app.use(indexRoutes);
app.use("/campground", campgroundRoutes);
app.use(commentRoutes);

app.listen(3000, () => {
  console.log("what the mothaerfucker");
});
