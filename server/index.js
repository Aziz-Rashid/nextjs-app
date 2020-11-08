require("dotenv").config();
const express = require("express");
const expressSitemapXml = require("express-sitemap-xml");
const compression = require("compression");
const helmet = require("helmet");
const CronJob = require("cron").CronJob;
const Parser = require("rss-parser");
const { initServer, saveYoutubeVideos } = require("./helpers");
const { sendWeeklyNewsLetter } = require("./controllers/mailchimp");
const { getUrls } = require("./controllers/sitemap");
const Setting = require("../server/models/settings");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

const { router: coursesRoute } = require("./api/courses");
const interviewsRoute = require("./api/interviews");
const videosRoute = require("./api/videos");
const searchRoute = require("./api/search");
const subscribeRoute = require("./api/subscribe");
const rakutenRoute = require("./api/rakuten");
const contactRoute = require("./api/contact");
const hashtagRoute = require("./api/hashtags");
const newsRoute = require("./api/news");

const user = require("./api/user");
const authlocal = require("./api/auth/local");
const auth = require("./api/auth/auth");
const { saveItemsToDB } = require("./helpers/index");

const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect to database and connect database to session
const mongoose = require("./db");
const MongoStore = require("connect-mongo")(session);

// Get passport config
require("./passport_config");

app.prepare().then(() => {
  const server = express();

  //init server
  initServer(server);

  const scheduleDownloadYoutubeVideos = new CronJob(
    "0 0 */5 * * *",
    async function () {
      if (dev) return;
      try {
        await saveYoutubeVideos(server);
      } catch (error) {
        console.error(error);
      }
    }
  );

  const scheduleSendNewsLetter = new CronJob("0 0 14 * * 2", async function () {
    if (dev) return;
    try {
      await sendWeeklyNewsLetter(server);
    } catch (error) {
      console.error(error);
    }
  });

  const scheduleRapidApiHashtagy = new CronJob(
    "40 14 * * *",
    async function () {
      try {
        let settings = await Setting.find();

        if (!settings.length) {
          await Setting.create({ hashtagy_limit: "20" });
        } else {
          await Setting.updateOne(
            { _id: settings[0]._id },
            { hashtagy_limit: "20" }
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  );

  const scheduleGetNews = new CronJob(
    "00 07 * * *",
    function () {
      // 1- get the data from google alert
      const GoogleAlertUrl =
        "https://www.google.com/alerts/feeds/01196612057297161456/148175901192250300";
      // pars the RSS Feed into JSOn
      const parser = new Parser();
      parser.parseURL(GoogleAlertUrl, async function (err, feed) {
        if (err) return;
        try {
          // Save data to our db
          await saveItemsToDB(feed.items);
        } catch (err) {
          console.log(err);
        }
      });
    },
    null,
    true,
    "America/Los_Angeles"
  );

  scheduleDownloadYoutubeVideos.start();
  scheduleSendNewsLetter.start();
  scheduleRapidApiHashtagy.start();
  scheduleGetNews.start();

  server.use(express.static("./server/api/media"));
  server.use(helmet());
  server.use(helmet.hidePoweredBy({ setTo: "PHP 5.1.6" }));

  server.use(compression());

  server.use(
    expressSitemapXml(
      getUrls(server),
      dev ? `http://localhost:${port}` : "https://www.themoti.com"
    )
  );

  server.use(bodyParser.json({ limit: "2mb" }));
  server.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
  server.use(express.json());

  // Logger and extended errorstack during development
  if (dev) {
    console.log("dev mode: activating errorhandler and morgan...");
    const morgan = require("morgan");
    const errorhandler = require("errorhandler");
    server.use(errorhandler());
    server.use(morgan("dev"));
  }

  // Initialize session with existing mongodb-connection
  let secureCookie = true;
  if (dev) {
    secureCookie = false;
  }

  server.use(
    session({
      name: "TheMotiCom",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }), // Use existing mongo-connection for session storage
      proxy: true,
      cookie: {
        httpOnly: true,
        maxAge: 30 * 60 * 1000, // Set max age to 30 minutes
        secure: secureCookie,
      },
    })
  );

  // Initialize authentication and sessions with passport
  server.use(passport.initialize());
  server.use(passport.session());

  server.use("/api/auth/local", authlocal);
  server.use("/api/auth", auth);
  server.use("/api/user", user);
  server.use("/api/courses", coursesRoute);
  server.use("/api/interviews", interviewsRoute);
  server.use("/api/videos", videosRoute);
  server.use("/api/subscribe", subscribeRoute);
  server.use("/api/rakuten", rakutenRoute);
  server.use("/api/search", searchRoute);
  server.use("/api/contact", contactRoute);
  server.use("/api/hashtags", hashtagRoute);
  server.use("/api/news", newsRoute);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    if (!dev) console.log = function () {};
    console.log(`> Ready on http://localhost:${port}`);
  });
});
