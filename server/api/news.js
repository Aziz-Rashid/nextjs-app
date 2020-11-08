const express = require('express');
const {getNews} = require('../controllers/newsController');
const Router = express.Router();



Router.route('/').get(getNews)





module.exports = Router;