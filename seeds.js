const mongoose = require("mongoose");
const CampModel = require("./models/camp");
const Comment = require("./models/comment");

let data = [
  {
    name: "Business one",
    image:
      "https://digitalsynopsis.com/wp-content/uploads/2016/11/famous-brand-logos-hidden-meanings-6.jpg",
    description: "blah blah blah"
  },
  {
    name: "Business two",
    image:
      "https://image.cnbcfm.com/api/v1/image/102628798-Untitled-4.jpg?v=1430254868&w=630&h=420",
    description: "blah blah blah"
  },
  {
    name: "Business three",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCZnIW3-vrIqN1SXa13L28gR_406IFuW-CbWBXiIRfl5O2omjXpw",
    description: "blah blah blah"
  },
  {
    name: "Business four",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyrDFUZHP_3P7fynGl-qnbqJMdl371n-SPbtZqw4VI1Uiod2-O",
    description: "blah blah blah"
  }
];

let seedDB = () => {
  CampModel.remove({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("CampDB cleared");
      // wait for db to be cleared and add the stuff.
      data.forEach(x => {
        CampModel.create(x, (err, campResult) => {
          if (err) console.log(err);
          else {
            console.log(campResult);
            Comment.create(
              {
                text: "this place is good",
                author: "IITian"
              },
              (err, commentResult) => {
                if (err) console.log(err);
                else {
                  campResult.comments.push(commentResult);
                  campResult.save();
                  console.log("Create new comment");
                }
              }
            );
          }
        });
      });
    }
  });
};

module.exports = seedDB;
