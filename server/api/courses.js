const express = require("express");
const router = express.Router();

const { decodePercentEncode, SORT } = require("../../lib");

// router.get("/", (req, res) => {
//   res.json(req.app.locals.courses);
// });

router.post("/", (req, res) => {
  try {
    let page = Number(req.body.page);
    let limit = Number(req.body.limit);
    let {
      categories,
      sub_categories = [],
      sort_by_date = SORT.ASC,
      sort_by_price = SORT.ASC,
    } = req.body;

    page = !Number.isNaN(page) ? (page < 0 ? 0 : page) : 0;
    limit = !Number.isNaN(limit) ? (limit < 1 ? 6 : limit) : 6;

    let courses = req.app.locals.courses;
    let result = [];
    if (categories) {
      const cat = categories
        .map((c) => c.toLowerCase())
        .filter((cat) => Object.keys(courses).includes(cat));

      cat.forEach((el) => {
        result = [...result, ...courses[el]];
      });
    } else {
      result = Object.keys(courses).reduce((acc, c) => {
        return [...acc, ...courses[c]];
      }, []);
    }

    if (sub_categories.length) {
      const sub = sub_categories.map((c) => c.toLowerCase());
      result = result.filter((r) => sub.includes(r.subcategory));
    }
    if (sort_by_date === SORT.ASC) {
      result = result.sort((a, b) => a.id - b.id);
    } else {
      result = result.sort((a, b) => b.id - a.id);
    }

    if (sort_by_price === SORT.ASC) {
      result = result.sort(
        (a, b) => Number(a.price.slice(1)) - Number(b.price.slice(1))
      );
    } else {
      result = result.sort(
        (a, b) => Number(b.price.slice(1)) - Number(a.price.slice(1))
      );
    }

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

    res.json({
      courses: limit_result,
      total,
      sort_by_date: sort_by_date === SORT.ASC ? SORT.ASC : SORT.DESC,
      sort_by_price: sort_by_price === SORT.ASC ? SORT.ASC : SORT.DESC,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server error!");
  }
});

router.get("/sample", (req, res) => {
  try {
    const courses = getCoursesSample(req);
    if (!courses) res.status(404).send("not found");
    res.json(courses);
  } catch (error) {
    res.status(500).send("internal server errror!");
  }
});

router.post("/course", (req, res) => {
  const { slug } = req.body;
  if (!slug) return res.status(401).send("no slug");
  try {
    const course = req.app.locals.coursesList.find(
      (el) => el.slug === slug.toLowerCase()
    );
    if (!course) return res.status(404).send("not found");
    return res.json({
      id: course.id,
      title: course.title,
      headline: course.headline,
      img: course.img_hd,
      price: course.price,
      category: course.category,
      subcategory: course.subcategory,
      url: course.url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("internal server error!");
  }
});

const getCoursesSample = (req) => {
  try {
    let { category } = req.query;
    let limit = Number(req.query.limit);
    limit = !Number.isNaN(limit) ? (limit < 1 ? 4 : limit) : 4;

    const categories = Object.keys(req.app.locals.courses);

    if (!categories.length) return null;

    let selectedCategory;
    if (category) {
      category = decodePercentEncode(category).toLowerCase();
    }
    // Chose a selected Category
    if (category && categories.includes(category)) {
      selectedCategory = category;
    } else {
      selectedCategory =
        categories.length > 2
          ? categories[Math.floor(Math.random() * (categories.length - 1))]
          : categories[0];
    }

    const courses = req.app.locals.courses[selectedCategory];
    const ran = Math.floor(Math.random() * (courses.length - (limit + 1)));
    const sample =
      courses.length > limit ? courses.slice(ran, ran + limit) : courses;

    return {
      category: selectedCategory,
      sample: sample.map((c) => {
        return {
          id: c.id,
          title: c.title,
          headline: c.headline,
          img: c.img_hd,
          price: c.price,
          category: c.category,
          subcategory: c.subcategory,
          url: c.url,
          slug: c.slug,
        };
      }),
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = { router, getCoursesSample };
