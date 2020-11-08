const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const sanitize = require("mongo-sanitize");

const { sendEmails } = require("../../helpers/index");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

// Format datetime to DD/MM/YY Date
const formatDate = (datetime) => {
  var dd = datetime.getDate();
  var mm = datetime.getMonth() + 1;
  var yy = datetime.getFullYear();
  const date = dd + "/" + mm + "/" + yy;
  return date;
};

// @route   POST api/auth/local
// @desc    Login User
// @access  Public
router.post("/", passport.authenticate("local"), (req, res) => {
  console.log("Login user");
  // Get username from PassportJS User-object and token from request body
  const username = req.user.username;
  const token = req.body.token;

  // Verify recaptcha in production only
  if (process.env.NODE_ENV === "production") {
    const secret = process.env.RECAPTCHA_SITE_KEY;
    fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      if (!res.success)
        return res.status(403).send("recatcha failed to verify");
    });
  }

  // Save login datetime to database and change status to "online"
  User.findOne({ username }).then((user) => {
    user.isOnline = true;
    user.lastLogin = Date.now();
    user.save();

    // Return User object to front-end
    // Exclude password hash and add formatted register date
    const userObject = req.user;
    delete userObject.password;
    userObject.formattedRegisterDate = formatDate(req.user.registerDate);
    res.json(userObject);
  });
});

// @route   POST api/auth/local
// @desc    Send reset password email
// @access  Public
router.post("/forgot", (req, res) => {
  console.log("forgot");
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(404).json({ msg: "user does not exist" });
      jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 30 },
        (err, token) => {
          if (err) return res.status(500).json({ msg: "somthing went wrong" });

          const url = `https://www.themoti.com/reset/${token}`;
          const text = `Hello ${user.firstName} ${user.lastName},
    Please click the link below to reset your password`;
          const html = `<!DOCTYPE html>
         <html lang="en">
           <head>
             <meta charset="UTF-8" />
             <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           </head>
           <body>
             <header
               style="
                 background: #fff;
                 padding: 10px;
                 text-align: center;
                 color: #fff;
               "
             >
               <img src="https://www.themoti.com/img/themoti.png" style="display: block;margin: 10px auto;">
             </header>
             <div
               class="body"
               style="margin: 2rem auto; width: 90%; font-family: sans-serif"
             >
             <h1 style="text-transform: uppercase;">almost there!</h1>
               <h2>Hello ${user.firstName} ${user.lastName},</h2>
               <p >
               Seems like you forgot your password, if this is true, click below to reset your password

               </p>
               <a
                 href="${url}"
                 style="
                   display: block;
                   text-decoration: none;
                   width: fit-content;
                   text-algin: center;
                   margin: 4rem auto;
                   padding: 16px 15px;
                   border-radius: 4px;
                   background: linear-gradient(to right,#6717cd,#2871fa);
                   color: #fff;
                   font-size: 20px;
                 "
                 >Reset Your Psassword</a
               >
         
               <p style="text-align: center">
                 if you have any problems accessing account, please contact us
               </p>
             </div>
             <!-- START FOOTER -->
            <div class='footer'>
              <table role='presentation' border='0' cellpadding='0' cellspacing='0'>
                <tr>
                  <td class='content-block powered-by'>
                    <a href='https://twitter.com/themoticom'>@TheMotiCom</a>
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->
           </body>
         </html>`;
          console.log(url);
          sendEmails(email, "Reset Password", text, html)
            .then((data) => {
              console.log(data);
              res.status(200).json({ done: true });
            })
            .catch((err) => {
              console.log(err);
              res
                .status(500)
                .json({ msg: "Something went wrong, please try again later" });
            });
        }
      );
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "Something went wrong, please try again later" });
    });
});

// @route   POST api/user
// @desc    reset password
// @access  Public
router.post("/reset", (req, res) => {
  const { token } = req.body;
  const password = sanitize(req.body.password);
  const cpassword = sanitize(req.body.cpassword);
  if (!password || !cpassword)
    return res.status(400).json({ msg: "All field required" });
  if (password !== cpassword)
    return res.status(400).json({ msg: "passwords don't match" });

  // verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      console.log(err);
      return res.status(500);
    }
    console.log(decode);
    // Create salt & hash and save User data to database
    bcrypt.genSalt(12, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;

        // Update password
        User.findByIdAndUpdate(decode._id, { password: hash })
          .then((user) => {
            res.redirect("/login");
          })
          .catch((err) => {
            console.log(err);
            res.status(500);
          });
      });
    });
  });
});

module.exports = router;
