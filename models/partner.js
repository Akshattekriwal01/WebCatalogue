const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
let partnerSchema = new mongoose.Schema(
  {
    name: { type: String, default: "nalla" },
    username: { type: String, default: "unaam" },
    password: { type: String, default: "upass" },
    profile: {}
  },
  { strict: false }
);

//partnerSchema.plugin(passportLocalMongoose);
// @param the name of collection , schema
module.exports = mongoose.model("Partner", partnerSchema);
