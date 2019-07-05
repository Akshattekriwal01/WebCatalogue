const mongoose = require("mongoose");
const Comment = require("./comment");
let campSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

// @param the name of collection , schema
module.exports = mongoose.model("Camp", campSchema);
