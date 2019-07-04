const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("landing");
});

function print(x) {
  console.log(x);
}

let campground = [
  {
    name: "bimb",
    image:
      "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg"
  },
  {
    name: "bimb4",
    image:
      "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg"
  },
  {
    name: "bimb3",
    image:
      "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg"
  }
];

app.get("/campground", (req, res) => {
  res.render("campground", { campgrounds: campground });
});

// create new campgrounds
app.post("/campground", (req, res) => {
  //get data fromt the forms and the camp to the array
  // get back to .get("/campgrounds")
  let name = req.body.name;
  let image = req.body.image;
  let obj = { name: name, image: image };
  campground.push(obj);
  //default redirect is to get route
  res.redirect("/campground");
});

//rest to make new campground
app.get("/campground/new", (req, res) => {
  res.render("new.ejs");
});

app.listen(3000, () => {
  console.log("what the mothaerfucker");
});
