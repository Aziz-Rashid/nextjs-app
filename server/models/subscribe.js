const mongoose = require("mongoose");

//create Schema
const SubSchema = new mongoose.Schema({
  fname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

const Subscribe = mongoose.model("subscribe", SubSchema);

module.exports = Subscribe;
