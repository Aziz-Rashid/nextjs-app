const fs = require("fs");
const path = require("path");
const htmlToText = require("html-to-text");
const { getYoutubeVideos } = require("../controllers/videos");
const { saveCourses, getCourses } = require("../controllers/courses");
const { categories } = require("../../lib");
const News = require("../models/news");
const nodemailer = require("nodemailer");

const dev = process.env.NODE_ENV !== "production";

const playListFileName = path.join(process.cwd(), "/playlist.json");
const videosFileName = path.join(process.cwd(), "/videos.json");

const saveYoutubeVideos = async (server) => {
  try {
    const { playlist, videos } = await getYoutubeVideos();
    if (
      Array.isArray(playlist) &&
      playlist.length >= server.locals.playlists.length
    ) {
      server.locals.playlists = playlist;
      if (dev)
        fs.writeFile(
          playListFileName,
          JSON.stringify(playlist, null, 2),
          (err) => {
            if (!err) console.log("Playlist has been saved!");
          }
        );
    }

    if (Array.isArray(videos) && videos.length >= server.locals.videos.length) {
      server.locals.videos = videos;
      if (dev)
        fs.writeFile(videosFileName, JSON.stringify(videos, null, 2), (err) => {
          if (!err) console.log("Videos has been saved!");
        });
    }
  } catch (error) {
    console.error(error);
  }
};

const initServer = async (server) => {
  server.locals = {
    playlists: [],
    videos: [],
    courses: {},
    coursesList: [],
  };
  try {
    if (fs.existsSync(playListFileName)) {
      const playlists = fs.readFileSync(playListFileName);
      server.locals.playlists = JSON.parse(playlists);
    } else {
      console.log("palylist json file does not exist..............");
    }
  } catch (err) {
    console.error(err);
  }

  try {
    if (fs.existsSync(videosFileName)) {
      const videos = fs.readFileSync(videosFileName);
      server.locals.videos = JSON.parse(videos);
    } else [console.log("videos json file does not exist.........")];
  } catch (err) {
    console.error(err);
  }

  try {
    const courses = await getCourses();

    server.locals.coursesList = [...courses];
    server.locals.courses = Object.keys(categories).reduce((acc, el) => {
      return {
        ...acc,
        [el.toLowerCase()]: courses.filter(
          (c) => c.category.toLowerCase() === el.toLowerCase()
        ),
      };
    }, {});
  } catch (err) {
    console.error(err);
  }

  if (dev) return;
  await saveYoutubeVideos(server);
  await saveCourses(server);
};

// Save News To DB
const saveItemsToDB = async (items) => {
  try {
    let allNews = [];
    if (items) {
      items.forEach((el) => {
        Object.keys(el).forEach((e) => {
          el[e] = htmlToText.fromString(el[e]);
        });

        allNews.push({
          date: new Date(el.pubDate),
          title: el.title,
          link: el.link,
          author: el.author,
          content: el.content,
        });
      });
      // create  the data to our db
      await News.insertMany(allNews)
        .then(function () {
          console.log("done");
        })
        .catch(function (err) {
          console.log("err", err);
        });
    }
  } catch (err) {
    console.log(err);
  }
};
// init node mailer
let mailTransporter = nodemailer.createTransport({
  host: "smtp.themoti.com",
  port: 587,
  auth: {
    user: "info@themoti.com",
    pass: "Chemeyole",
  },
  secure: false,
  tls: { rejectUnauthorized: false },
  pool: true,
  maxConnections: 5, // Default to 5
  rateDelta: 10000,
});

const sendEmails = (to, subject, text, html, from) => {
  let mailDetails = {
    // from: process.env.USER,
    from: from || `The Moti <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  };
  // console.log(mailDetails.to, mailDetails.subject);
  return new Promise((resolve, reject) => {
    mailTransporter.sendMail(mailDetails, (err, data) => {
      if (err) {
        reject(err);
      }
      console.log(data);
      resolve(data);
    });
  });
};

module.exports = {
  saveCourses,
  saveYoutubeVideos,
  initServer,
  saveItemsToDB,
  sendEmails,
};
