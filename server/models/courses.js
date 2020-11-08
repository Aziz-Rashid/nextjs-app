const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  id: String,
  title: String,
  headline: String,
  img: String,
  img_hd: String,
  url: String,
  price: String,
  category: String,
  subcategory: String,
  slug: String,
});


module.exports = mongoose.model('Courses', courseSchema)
