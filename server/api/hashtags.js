const express = require("express");
const router = express.Router();
const fetch = require("isomorphic-unfetch");
const Setting = require("../models/settings");

router.post("/", async (req, res) => {
    try {
        let settings = await Setting.find()
        let currentLimit = 0

        if (!settings.length) {
            await Setting.create({ hashtagy_limit: "19" }, function (err) {
                if (err) throw err;
            });
            currentLimit = "19"
        } else {
            currentLimit = settings[0].hashtagy_limit
        }

        if (currentLimit === "0") {
            return res.status(400).json({
                success: false,
                message: "Oops, we've ran out of resources, try again tomorrow!"
            })
        }

        fetch("https://hashtagy-generate-hashtags.p.rapidapi.com/v1/comprehensive/tags?filter=top&keyword=" + req.body.search, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "hashtagy-generate-hashtags.p.rapidapi.com",
                "x-rapidapi-key": "1235fed1fdmshcd7690ab748c2a6p1e630cjsn79b5763a8ee0"
            }
        })
            .then(response => response.json())
            .then(async (data) => {
                const updatedLimit = currentLimit - 1
                await Setting.updateOne({ _id: settings[0]._id }, { hashtagy_limit: updatedLimit }, function (err) {
                    if (err) throw err;
                    return res.json({
                        success: true,
                        message: "Hashtags generated successfully!",
                        data
                    })
                });
            })
            .catch(async () => {
                res.status(400).json({ success: false, message: "Oops! Something went wrong, please try again." })
            })
    } catch (error) {
        res.json({ error });
    }
});

module.exports = router;