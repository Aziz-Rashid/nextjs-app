const fetch = require("isomorphic-unfetch");
const Course = require("../models/courses");
const { slugify } = require("../../lib");
const LanguageDetect = require("languagedetect");
const { categories, encodeString } = require("../../lib");

const saveCourses = async () => {
  console.log("begin init courses................");

  let data =
    process.env.UDEMY_CLIENT_ID + ":" + process.env.UDEMY_CLIENT_SECRET;
  let buff = new Buffer.from(data);
  let base64data = buff.toString("base64");
  const auth = "Basic " + base64data;

  try {
    for (const key of Object.keys(categories)) {
      console.log("key =", key);
      for (const subcategory of categories[key]) {
        const category = key;

        console.log(category, subcategory);
        const r = await fetch(
          `https://www.udemy.com/api-2.0/courses/?page_size=100&category=${encodeString(
            category
          )}&price=price-paid&is_affiliate_agreed=True&language=en&ordering=relevance&ratings=4.5&subcategory=${encodeString(
            subcategory
          )}`,
          {
            headers: {
              Accept: "application/json, text/plain, */*",
              Authorization: auth,
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        );
        const json = await r.json();
        // console.log(key, json.results);
        const lngDetector = new LanguageDetect();
        const filter = json.results.filter(
          (course) => lngDetector.detect(course.title, 2)[0][0] !== "arabic"
        );
        const result = [];
        for (const course of filter) {
          const f = await Course.findOne({ id: course.id });
          // console.log('f =', f)
          if (!f) {
            result.push(course);
          }
        }
        const courses = result.map((el) => ({
          id: el.id,
          title: el.title,
          headline: el.headline,
          img: el.image_240x135,
          img_hd: el.image_480x270,
          url: "https://www.udemy.com" + el.url,
          price: "$" + el.price_detail.amount,
          category: category.toLowerCase(),
          subcategory: subcategory.toLowerCase(),
          slug: `${slugify(category)}/${slugify(subcategory)}/${
            el.published_title
          }`,
        }));

        if (courses.length) {
          await Course.insertMany(courses);
          console.log("courses saved to db");
        }
      }
    }
    // return {courses, coursesList};
  } catch (error) {
    console.error(error);
  }
  console.log("end init courses..............");
};

const getCourses = async () => {
  try {
    const courses = await Course.find();
    return courses;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { saveCourses, getCourses };

// coursesList = [...coursesList, ...filter.map((el) => ({
//   id: el.id,
//   title: el.title,
//   img: el.image_480x270,
//   url: "https://www.udemy.com" + el.url,
//   price: el.price,
//   category: category.toLowerCase(),
//   subcategory: subcategory.toLowerCase(),
//   slug: `${slugify(category)}/${slugify(subcategory)}/${
//     el.published_title
//   }`,
//   headline: el.headline,
// }))]
// const cat = category.toLowerCase();
// if (courses[cat]) {
// courses[cat] = [ ...courses[cat], ...result ];
// } else {
// courses[cat] = [...result] ;
// }
