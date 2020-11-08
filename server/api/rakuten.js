const express = require("express")
const router = express.Router()
const fetch = require("isomorphic-unfetch")

// serve rakuten script from this route to avoid adblockers
router.get("/", async (req, res) => {
  try {
    const f = await fetch(
      "https://automate-frontend.linksynergy.com/minified_logic.js"
    ).then((res) => res.text());
    res.writeHead(200, {
      "Content-Type": "text/javascript",
    });
    // console.log('file =', f)
    res.end(f);
  } catch (error) {
    console.error(error.message);
    res.status(500).end();
  }
});

module.exports = router;