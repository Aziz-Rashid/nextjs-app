const express = require("express");
const router = express.Router();

//GET

router.get("/", (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json({});

  const searchTerms = q.trim().toLowerCase().split(" ");

  const arr = [...req.app.locals.videos, ...req.app.locals.coursesList];

  let result = [];

  for (const el of arr) {
    if (searchTerms.every((w) => el.title.toLowerCase().includes(w))) {
      const type = "thumbnail" in el ? "video" : "course";
      const url =
        type === "video"
          ? `/influencer/${el.playlistId || "video"}/${el.slug}`
          : `/courses/${el.slug}`;
      result.push({
        id: el.id,
        title: el.title,
        url,
        type,
      });
    }
    if (result.length >= 20) {
      break;
    }
  }
  res.json(result);
});

router.get("/videos", (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json({});

  const searchTerms = q.trim().toLowerCase().split(" ");

  const videos = req.app.locals.videos;

  let vid_res = [];

  for (const vid of videos) {
    if (searchTerms.every((w) => vid.title.toLowerCase().includes(w))) {
      vid_res.push({
        name: vid.title,
        url: `/influencer/${vid.playlistId || "video"}/${vid.slug}`,
      });
    }
    if (vid_res.length >= 20) {
      break;
    }
  }
  res.json(vid_res);
});

router.get("/courses", (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json({});

  const searchTerms = q.trim().toLowerCase().split(" ");
  const courses = req.app.locals.coursesList;
  let course_res = [];

  for (const course of courses) {
    if (searchTerms.every((w) => course.title.toLowerCase().includes(w))) {
      course_res.push({
        id: course.id,
        title: course.title,
        url: `/courses/${course.slug}`,
      });
    }
    if (course_res.length >= 20) {
      break;
    }
  }
  res.json(course_res);
});

//POST

router.post("/courses", (req, res) => {
  const { q } = req.body;
  if (!q || q.length < 2) return res.json({});
  let page = Number(req.body.page);
  let limit = Number(req.body.limit);

  page = !Number.isNaN(page) ? (page < 0 ? 0 : page) : 0;
  limit = !Number.isNaN(limit) ? (limit < 1 ? 20 : limit) : 20;

  try {
    const searchTerms = q.trim().toLowerCase().split(" ");
    const courses = req.app.locals.coursesList;

    const result = courses.filter((course) =>
      searchTerms.every((w) => course.title.toLowerCase().includes(w))
    );
    const limit_result = result
      .slice(page * limit, (page + 1) * limit)
      .map((c) => {
        return {
          id: c.id,
          title: c.title,
          img: c.img,
          price: c.price,
          category: c.category,
          subcategory: c.subcategory,
          slug: c.slug,
        };
      });
    const total = result.length;

    res.json({ courses: limit_result, total });
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server error!");
  }
});

router.post("/videos", (req, res) => {
  const { q } = req.body;
  if (!q || q.length < 2) return res.json({});
  let page = Number(req.body.page);
  let limit = Number(req.body.limit);

  page = !Number.isNaN(page) ? (page < 0 ? 0 : page) : 0;
  limit = !Number.isNaN(limit) ? (limit < 1 ? 20 : limit) : 20;

  try {
    const searchTerms = q.trim().toLowerCase().split(" ");

    const videos = req.app.locals.videos;

    const result = videos.filter((vid) =>
      searchTerms.every((w) => vid.title.toLowerCase().includes(w))
    );
    const limit_result = result.slice(page * limit, (page + 1) * limit);

    const total = result.length;

    res.json({ videos: limit_result, total });
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server error!");
  }
});

module.exports = router;
