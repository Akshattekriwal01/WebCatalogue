const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const CampModel = require("./models/camp");
const seedDB = require("./seeds");
const CommentM = require("./models/comment");
const ejsLint = require("ejs-lint");
seedDB();

mongoose.connect("mongodb://localhost:27017/mycamp", {
  useNewUrlParser: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//SCHEMA SETUP  and model creation with cpital name

// CampModel.create(
//   {
//     name: "bimb",
//     image:
//       "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg",
//     description: "this is description written mannualy from the backend"
//   },
//   (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("newly created camp ground");
//       print(result);
//     }
//   }
// );

app.get("/", (req, res) => {
  res.render("landing");
});

function print(x) {
  console.log(x);
}

campground = [];
//INDEX Route
app.get("/campground", (req, res) => {
  //we need to get all the camp ground from the db and render that file
  CampModel.find({}, (err, result) => {
    if (err) {
      print(err);
    } else {
      res.render("campgrounds/Index", { campgrounds: result });
    }
  });
});

// create new campgrounds
// CREATE Route
app.post("/campground", (req, res) => {
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
  res.redirect("/campground");
});

//NEW Route
app.get("/campground/new", (req, res) => {
  res.render("campgrounds/new");
});

//SHOW route
app.get("/campground/:id", (req, res) => {
  //find the camp ground
  //render the found camp ground
  // id stored in req.params.id

  CampModel.findById(req.params.id)
    .populate("comments")
    .exec((err, result) => {
      if (err) {
        print(err);
      } else {
        //result.comments.forEach(x => print(x.text));
        res.render("campgrounds/show", { campground: result });
      }
    });
});

//========================================

app.post("/campground/:id/comment", (req, res) => {
  id = req.params.id;
  content = req.body.content;
  CommentM.create(
    { text: content, author: "some author" },
    (err, commentResult) => {
      if (err) print(err);
      else {
        CampModel.findById(id, (err, campResult) => {
          if (err) print(err);
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

app.listen(3000, () => {
  console.log("what the mothaerfucker");
});
