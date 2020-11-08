const getCoursesUrls = (server) => {
  const courses = server.locals.coursesList.map((c) => ({
    url: `/courses/${c.slug}`,
    changeFreq: "monthly",
  }));
  return courses;
};

const getVideosUrls = (server) => {
  const videos = server.locals.videos.map((v) => ({
    url: `/influencer/${v.playlistId || "video"}/${v.slug}`,
    changeFreq: "monthly",
  }));
  return videos;
};

const getUrls = (server) => {
  return () => {
    try {
      const coursesUrl = getCoursesUrls(server);
      const videosUrl = getVideosUrls(server);
      return [
        {
          url: "/",
          changeFreq: "weekly",
        },
        {
          url: "/interviews",
          changeFreq: "weekly",
        },
        {
          url: "/our-story",
          changeFreq: "yearly",
        },
        {
          url: "/contact",
          changeFreq: "yearly",
        },
        {
          url: "/hashtag",
          changeFreq: "yearly",
        },
        {
          url: "/privacy-policy",
          changeFreq: "yearly",
        },
        {
          url: "/terms-of-service",
          changeFreq: "yearly",
        },
        ...coursesUrl,
        ...videosUrl,
      ];
    } catch (error) {
      console.error(error);
    }
  };
};

module.exports = { getUrls };
