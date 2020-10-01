const mongoose = require('../database/index');

const profileSchema = new mongoose.Schema({
  name : { type: String, required : true, unique: true, lowercase: true}
},{toJSON: { virtuals: true }});

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;