const News = require('../models/news');


exports.getNews = async (req, res) => {
    try{
    const queryString = req.query
    // get all news or the filtered by date 
    let  query = News.find()
    const total = (await News.find()).length
    //sorting
    query = query.sort('-date')
    
    //pagination
    if( queryString.page  || queryString.limit){
        const page = queryString.page * 1 || 1;
        const limit = queryString.limit * 1 || 20;
        const skip = (page  - 1) * limit;
        query  = query.skip(skip).limit(limit)
    }
    
   
    const news = await query
    res.status(200).json({
         status:'success',
         size:news.length,
         total,
         news:news
     })
    }catch(err){
     res.status(400).json({
         status:'fail',
         message:err
     })
    }
 }

 
 