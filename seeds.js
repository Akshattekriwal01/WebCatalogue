const mongoose = require("mongoose");
const CampModel = require("./models/camp");
const Comment = require("./models/comment");

let data = [
  {
    name: "Business one",
    image:
      "https://digitalsynopsis.com/wp-content/uploads/2016/11/famous-brand-logos-hidden-meanings-6.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Business two",
    image:
      "https://image.cnbcfm.com/api/v1/image/102628798-Untitled-4.jpg?v=1430254868&w=630&h=420",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Business three",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCZnIW3-vrIqN1SXa13L28gR_406IFuW-CbWBXiIRfl5O2omjXpw",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Business four",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyrDFUZHP_3P7fynGl-qnbqJMdl371n-SPbtZqw4VI1Uiod2-O",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

let seedDB = () => {
  CampModel.remove({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("CampDB cleared");
      Comment.remove({}, err => {
        if (err) console.log(err);
        else {
          console.log("comments collection cleared");
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
      // wait for db to be cleared and add the stuff.
    }
  });
};

module.exports = seedDB;
