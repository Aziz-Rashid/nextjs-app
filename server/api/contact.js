const express = require("express");
const router = express.Router();
const fetch = require("isomorphic-unfetch");
const { body, validationResult } = require("express-validator");
// replaced by nodemailer
// const { sendContactForm } = require("../controllers/mailgun");
const { sendEmails } = require("../helpers/index");
const email_template = require("../controllers/email_templates/mailgun_contact_form");

router.post(
  "/",
  [
    body("email").isEmail().normalizeEmail(),
    body("name").not().isEmpty().trim().escape(),
    body("message").not().isEmpty().trim().escape(),
    body("token").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, email, message, social = "", token } = req.body;
      const secret = process.env.RECAPTCHA_SITE_KEY;
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
        }
      );
      const json = await response.json();
      if (!json.success)
        return res.status(403).send("recatcha failed to verify");
      const sendContact = await sendEmails(
        process.env.USER,
        "The Moti Contact Form",
        "",
        email_template({ name, email, message, social }),
        email
      );
      // const sendContact = await sendContactForm({name, email, message, social})
      if (sendContact.accepted.length() !== 0) {
        res.send("contact form sent success");
      } else {
        res
          .status(403)
          .send(
            "there was an error from mailgun, faild to send the contact form"
          );
      }
    } catch (error) {
      res.json({ error });
    }
  }
);

module.exports = router;
