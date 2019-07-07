const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
let userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);
// @param the name of collection , schema
module.exports = mongoose.model("User", userSchema);
