const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    let { page = 0, limit = 8 } = req.query;
    page = Number(page) < 0 ? 0 : Number(page);
    limit = Number(limit) < 1 ? 8 : Number(limit);
    const videos = req.app.locals.playlists
      .slice(page * limit, (page + 1) * limit)
      .map((list) => {
        return {
          ...list,
          slug: `${list.slug}/${list.videos.length ? list.videos[0].slug : ""}`,
          videos: [],
          description: list.description ? list.description.slice(0, 150) : "",
          viewCount: list.videos
            ? list.videos.reduce((acc, el) => acc + Number(el.viewCount), 0)
            : 0,
        };
      });
    const total = req.app.locals.playlists.length;
    
    res.json({ videos, total, limit, page });
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server error!");
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const interview = req.app.locals.playlists.find(
      (list) => list.slug === id.toLowerCase()
    );
    if (interview) {
      return res.json(interview);
    }
    res.status(404).json({ message: "not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error!" });
  }
});

module.exports = router;
