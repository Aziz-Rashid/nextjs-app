// const Mailchimp = require("mailchimp-api-v3");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Subscribe = require("../models/subscribe");

// const api_key = "351f56301e94ca74ced80ed5739a6091-us18";
// const id = "1ce3e63c4a";

const md5 = (data) => {
  return crypto.createHash("md5").update(data).digest("hex");
};

// const mailchimp = new Mailchimp(api_key);

// mailchimp subscirbe

const checkContactStatus = async (email) => {
  const emailToMd5 = md5(email);
  try {
    const results = await mailchimp
      .get(`/lists/${id}/members/${emailToMd5}`)
      .then((res) => res);
    return results.status;
  } catch (error) {
    return error.status;
  }
};

const subscribe = async ({ email, fname }) => {
  try {
    const results = await mailchimp
      .post(`/lists/${id}/members`, {
        email_address: email,
        FNAM: fname,
        status: "pending",
      })
      .then((res) => res);
    return results.status;
  } catch (error) {
    return error.status;
  }
};

const updateContact = async ({ email, status }) => {
  const emailToMd5 = md5(email);
  try {
    const results = await mailchimp
      .patch(`/lists/${id}/members/${emailToMd5}`, { status })
      .then((res) => res);
    return results.status;
  } catch (error) {
    return error.status;
  }
};

// mailchimp send weekly news letter

const { getTemplate } = require("./email_templates/mailchimp_news_letter");
const { getCoursesSample } = require("../api/courses");

const addTemplate = async (videos, courses) => {
  const html = getTemplate(videos, courses);
  try {
    const result = await mailchimp.post("/templates", {
      name: "weekly-news-letter-" + Date.now(),
      html,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

const addCampaigns = async (template_id, preview_text) => {
  try {
    const results = await mailchimp.post("/campaigns", {
      type: "regular",
      recipients: {
        list_id: "1ce3e63c4a",
      },
      settings: {
        subject_line: "The Moti Source of Influencer",
        title: "The Moti Weekly News Letter",
        template_id,
        auto_footer: false,
        from_name: "The Moti",
        reply_to: "info@themoti.com",
        to_name: "*|FNAME|*",
        preview_text,
      },
    });
    return results;
  } catch (error) {
    console.error(error);
  }
};
const sendCampaigns = async (campaign_id) => {
  try {
    const results = await mailchimp.post(
      `/campaigns/${campaign_id}/actions/send`
    );
    return results;
  } catch (error) {
    console.error(error);
  }
};
const campaignChecklist = async (campaign_id) => {
  console.log("compaing checklist id", campaign_id);
  try {
    const results = await mailchimp.get(
      `/campaigns/${campaign_id}/send-checklist`
    );
    console.log(results);
  } catch (error) {
    console.log(error);
  }
};
const getCampaigns = async () => {
  try {
    const result = await mailchimp.get("/campaigns");
    console.log("result =", result);
  } catch (error) {
    console.error(error);
  }
};
const sendTestEmail = async (campaign_id, test_emails, send_type) => {
  try {
    const results = await mailchimp.post(
      `/campaigns/${campaign_id}/actions/test`,
      { test_emails, send_type }
    );
    return results;
  } catch (error) {
    console.error(error);
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

const sendWeeklyNewsLetter = async (server) => {
  const videos = server.locals.videos.slice(0, 6);
  const preview_text = videos[0] ? videos[0].title : "";
  const selectedCourses = require("./mailchimp_courses").map((el) =>
    el.toLowerCase()
  );
  const courses = [];
  let i = 0; //avoid an infinit loop
  while (courses.length < 6 && i < 100) {
    // returns an object of a category name and a list of courses
    const res = getCoursesSample({ query: { limit: 1 }, app: server });
    const [c] = res.sample;
    // console.log("c =", c);
    if (selectedCourses.includes(c.subcategory.toLowerCase())) {
      courses.push(c);
    }
    i++;
  }
  // console.log(courses);
  // return;
  try {
    // const template = await addTemplate(videos, courses);
    // if (!template.id) throw "there was an error creating the email template";
    // const campaing = await addCampaigns(template.id, preview_text);
    // if (!campaing.id) throw "there was an error creating mailchimp campaing";
    // await sendCampaigns(campaing.id);

    console.log("sending email");
    const subs = await Subscribe.find({});

    for await (const { email } of subs) {
      let mailDetails = {
        from: `The Moti <info@themoti.com>`,
        to: email,
        subject: preview_text,
        html: getTemplate(videos, courses),
      };
      mailTransporter.sendMail(mailDetails, (err, data) => {
        if (err) {
          console.log("there is a problem with the news letter");
        }
      });
    }

    // const result = await sendTestEmail(
    //   campaing.id,
    //   ["meddeb2468@gmail.com", info],
    //   "html"
    // );
    console.log("campaing sent success.........:");
    return "newsletter send";
  } catch (error) {
    console.error(error);
  }
};

const getAudianceList = async () => {
  try {
    const result = await mailchimp.get("/lists");
    console.log("lists =", result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  // checkContactStatus,
  subscribe,
  updateContact,
  sendWeeklyNewsLetter,
};
