const mongoose = require("mongoose");
const { Schema } = mongoose;

const settingSchema = new Schema({
  hashtagy_limit: String,
});


module.exports = mongoose.model('Settings', settingSchema)
