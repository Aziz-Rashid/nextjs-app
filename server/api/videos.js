const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    let { page = 0, limit = 8 } = req.query;
    page = Number(page) < 0 ? 0 : Number(page);
    limit = Number(limit) < 1 ? 8 : Number(limit);
    const videos = req.app.locals.videos.slice(
      page * limit,
      (page + 1) * limit
    );
    const total = req.app.locals.videos.length;
    res.json({ videos, total, limit, page });
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server error!");
  }
});

router.get("/:slug", (req, res) => {
  try {
    const { slug } = req.params;
    const influencer = slug.split("-").slice(0, 2).join("-");
    const regex = new RegExp(influencer, "i");
    const videos = req.app.locals.videos
      .filter((vid) => regex.test(vid.slug))
      .sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
      if(!videos.length){
        return res.status(404).json({message: 'not found'})
      }
    res.json({ title: influencer.replace("-", " "), videos });
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server error!");
  }
});

module.exports = router;
