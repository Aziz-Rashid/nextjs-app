const email_template = require("./email_templates/mailgun_contact_form");
const email_registration_template = require("./email_templates/mailgun_register_letter");
var MAILGUN_API_KEY = "b77f70079f6b3bc4197869c279998e4b-07e45e2a-573b18dc";
var MAILGUN_DOMAIN = "sandboxb87a5baa31e64254a59f49ecec8facf7.mailgun.org";
var mailgun = require("mailgun-js")({
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN,
});

const sendContactForm = async ({ name, email, social, message }) => {
  try {
    const html = email_template({ name, social, email, message });

    const data = {
      from: "The Moti Website Contact Form info@themoti.com",
      to: "info@themoti.com",
      subject: "The Moti Contact Form",
      html,
    };

    const response = await mailgun.messages().send(data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// User emails have to be added to authorized recipients in Mailgun Account Settings
const sendRegistrationMail = async ({ username, userEmail }) => {
  try {
    console.log("User email: ");
    console.log(userEmail);
    const html = email_registration_template({ username });

    const data = {
      from: "The Moti Website info@themoti.com",
      to: userEmail,
      subject: "Your registration at The Moti.com",
      html,
    };

    const response = await mailgun.messages().send(data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendContactForm, sendRegistrationMail };
