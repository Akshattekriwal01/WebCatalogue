const mongoose = require("mongoose");
const CampModel = require("./models/camp");
const Comment = require("./models/comment");

let data = [
  {
    name: "Business one",
    image:
      "https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Business two",
    image:
      "https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Business three",
    image:
      "https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Business four",
    image:
      "https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg",
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
