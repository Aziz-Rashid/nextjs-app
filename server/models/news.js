const mongoose = require('mongoose');


const newsSchema = mongoose.Schema({
    title:String,
    link:String,
    date:Date,
    author:String,
    content:String,
});

const News = mongoose.model('News', newsSchema);

module.exports = News