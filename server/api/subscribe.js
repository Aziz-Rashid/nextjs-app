const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetch = require("isomorphic-unfetch");
const Subscribe = require("../models/subscribe");
const {
  // checkContactStatus,
  subscribe,
  updateContact,
} = require("../controllers/mailchimp");

router.post(
  "/",
  [
    body("email").isEmail().normalizeEmail(),
    body("fname").not().isEmpty().trim().escape(),
    // body("token").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { fname, email, token } = req.body;
      const secret = process.env.RECAPTCHA_SITE_KEY;

      // const response = await fetch(
      //   `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      //   {
      //     method: "post",
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );
      // const json = await response.json();
      // if (!json.success)
      //   return res.status(403).send("recatcha failed to verify");
      // let status = await checkContactStatus(email);
      // if (status !== 404) {
      //   if (status === "subscribed") return res.json({ status });
      //   status = await updateContact({ email, status: "pending" });
      //   return res.json({ status });
      // }
      // status = await subscribe({ email, fname });
      // return res.json({ status });
      let sub = await Subscribe.findOne({ email });
      if (sub) return res.status(200).json({ status: "subscribed" });
      let newSub = new Subscribe({
        fname,
        email,
      });
      const savedSub = await newSub.save();
      if (!savedSub)
        return res.status(500).json({ msg: "something went wrong" });
      return res.status(200).json({ status: "subscribed" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }
);

module.exports = router;
