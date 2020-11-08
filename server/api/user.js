const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const fs = require("fs");
const mime = require("mime");
const sanitize = require("mongo-sanitize");
const checkauth = require("../middleware/checkauth");
const jwt = require("jsonwebtoken");

const { sendEmails } = require("../helpers/index");
// replaced by nodemailer
// const { sendRegistrationMail } = require("../controllers/mailgun");
const email_registration_template = require("../controllers/email_templates/mailgun_register_letter");
//User model
const User = require("../models/user");
const { resolveHref } = require("next/dist/next-server/lib/router/router");
const { update } = require("../models/user");

// Format datetime to DD/MM/YY Date
const formatDate = (datetime) => {
  var dd = datetime.getDate();
  var mm = datetime.getMonth() + 1;
  var yy = datetime.getFullYear();
  const date = dd + "/" + mm + "/" + yy;
  return date;
};

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], "base64");

  return response;
}

// @route   POST api/user
// @desc    Register New User
// @access  Public
router.post("/register", (req, res) => {
  const username = sanitize(req.body.username);
  const firstName = sanitize(req.body.firstName);
  const lastName = sanitize(req.body.lastName);
  const email = sanitize(req.body.email);
  const password = sanitize(req.body.password);
  const token = req.body.token;

  // Simple validation
  if (!username || !firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

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

  // Check for existing username
  User.findOne({ username }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "Username already exists" });
    }
  });

  // Check for existing email and create new user
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ msg: "Email already in use" });
      }
      const newUser = new User({
        username,
        firstName,
        lastName,
        email,
        password,
      });

      // Create salt & hash and save User data to database
      bcrypt.genSalt(12, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            // send registration email
            sendEmails(
              user.email,
              "Your registration at The Moti.com",
              "",
              email_registration_template({ username: user.username })
            );

            // Return User data to front-end
            // Exclude password hash and add formatted register date
            const userObject = user._doc;
            delete userObject.password;
            userObject.formattedRegisterDate = formatDate(user.registerDate);
            res.json(userObject);

            // req.login(user, function (err) {
            //   if (err) {
            //     res.status(400).send();
            //   }

            // });
          });
        });
      });
    })
    .catch((err) => {
      console.log("An error occured: " + err);
    });
});

// @route   POST api/user
// @desc    send account confirmation email
// @access  Public
router.post("/confirm", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) return res.status(500);
          const url = `https://www.themoti.com/api/user/confirm/${token}`;
          const text = `Hello ${user.firstName} ${user.lastName},
          Welcome to the Moti, you are know a member of our comminity. Please activate your link and let the journy begin`;
          const html = `
          <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
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
      style="margin: 2rem auto; width: 70%; font-family: sans-serif"
    >
    <h1 style="text-transform: uppercase;">almost there!</h1>
      <h2>Hello ${user.firstName} ${user.lastName},</h2>
      <p >
        Welcome to the Moti, you are now a member of our community. Please
        activate your account and let the journy begin
      </p>
      <a
        href="${url}"
        style="
          display: block;
          text-decoration: none;
          width: fit-content;
          margin: 4rem auto;
          padding: 16px 15px;
          border-radius: 4px;
          background: linear-gradient(to right,#6717cd,#2871fa);
                    color: #fff;
          font-size: 20px;
        "
        >Click here to join</a
      >

      <p style="text-align: center">
        if you have any problems accessing account, please contact us
      </p>
    </div>
    <!-- START FOOTER -->
            <div class='footer'>
              <table role='presentation' border='0' cellpadding='0' cellspacing='0' style="margin: 10px auto">
                <tr>
                  <td class='content-block powered-by'>
                    <a href='https://twitter.com/themoticom'>@TheMotiCom</a>
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->
  </body>
</html>
          
          `;
          sendEmails(req.body.email, "Confirmation Email", text, html)
            .then(res.status(200).json({ done: true }))
            .catch((err) => {
              res.status(500).json({ err });
              console.log(err);
            });
        }
      );
    })
    .catch((err) => {
      res.status(404).json({ msg: "user does not exist" });
    });
});

// @route   GET api/user/confirm/:token
// @desc    confirme account
// @access  Public
router.get("/confirm/:token", (req, res) => {
  const { token } = req.params;

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      console.log(err);
      return res.status(500);
    }
    console.log(decode);
    User.findByIdAndUpdate(decode._id, { isActive: true })
      .then((user) => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
      });
  });
});

// @route   GET api/user
// @desc    Get current user data
// @access  Private
router.get("/", checkauth, (req, res) => {
  // Get data of current user from the Passport JS User object and send to front-end
  // Exlude password hash and add formatted register date
  const userObject = req.user;
  delete userObject.password;
  userObject.formattedRegisterDate = formatDate(req.user.registerDate);
  res.json(userObject);
});

// @route   PUT api/user
// @desc    Edit user data with ID
// @access  Private, Administrator
router.put("/", checkauth, (req, res) => {
  // Check if admin or user that wants to change own data
  if (!req.user.isAdmin && req.user._id !== req.body.id) {
    return res.status(401).send();
  }

  // Get user input from re.body and sanitize first
  let id = sanitize(req.body.id);
  let username = sanitize(req.body.username);
  let firstName = sanitize(req.body.firstName);
  let lastName = sanitize(req.body.lastName);
  let email = sanitize(req.body.email);
  let password = sanitize(req.body.password);
  let isAdmin = sanitize(req.body.admin);
  let admindefined = false;

  // Use filled in parameters only
  const parameters = [
    id,
    username,
    firstName,
    lastName,
    email,
    password,
    isAdmin,
  ].map((item) => {
    return item == "" ? undefined : item;
  });
  [id, username, firstName, lastName, email, password, isAdmin] = parameters;

  // Wrap update user in function due to bcrypt delay
  function updateUser() {
    // Get original user data by ID
    User.findById(id, function (err, user) {
      // Update user data
      User.updateOne(
        { _id: id },
        {
          $set: {
            username: username ? username : user.username,
            firstName: firstName ? firstName : user.firstName,
            lastName: lastName ? lastName : user.lastName,
            email: email ? email : user.email,
            password: password ? password : user.password,
            isAdmin: isAdmin !== undefined ? isAdmin : user.isAdmin,
          },
        }
      ).then((user) => {
        res.json(user);
      });
    });
  }

  // Hash password
  if (password) {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        password = hash;
        updateUser();
      });
    });
  } else {
    updateUser();
  }
});

// @route   DELETE api/user
// @desc    Delete user with ID
// @access  Private, Administator
router.delete("/", checkauth, (req, res) => {
  let id = sanitize(req.body.id);

  // Check if admin or user that wants to change own data
  if (req.user.isAdmin || req.user._id === req.data.id) {
    // Get original user data by ID
    User.findById(id, function (err, user) {
      // Update user data
      User.deleteOne({ _id: id }).then((user) => {
        res.json(user);
      });
    });
  } else {
    res.status(401).send();
  }
});

// @route   GET api/user
// @desc    Get all users
// @access  Administator
router.get("/all", checkauth, (req, res) => {
  if (req.user.isAdmin) {
    User.find().then((users) => {
      res.json(users);
    });
  } else {
    res.status(401).send();
  }
});

// @route   put api/user/update-image
// @desc    Update image of user
// @access  Private
router.put("/update-image", checkauth, (req, res) => {
  // Check if admin or user that wants to change own data
  // if (!req.user.isAdmin) {
  //  return res.status(401).send();
  // }
  // to declare some path to store your converted image
  var matches = req.body.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  response.type = matches[1];
  response.data = Buffer.from(matches[2], "base64");
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  let extension = mime.getExtension(type);
  let fileName = "image" + new Date().getTime() + "." + extension;
  let fullFileLocation = __dirname + "/media/images/" + fileName;

  if (Buffer.byteLength(req.body.image) > 1000000) {
    return res
      .status(200)
      .json({ status: false, error: { image: "Upload image less than 1MB" } });
  }
  try {
    fs.mkdir(__dirname + "/media/images/", { recursive: true }, (err) => {
      if (err) throw err;
      fs.writeFileSync(fullFileLocation, imageBuffer, "utf8");
      console.log("writing to the file is working now");
      // find user by the id

      User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) throw err;
        //delete the file
        try {
          fs.unlinkSync(__dirname + "/media" + user.image);
        } catch (e) {
          console.log(e);
        }
      });

      // update the image url and save there
      // return the response
      User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { image: "/images/" + fileName } },
        { new: true },
        (err, result) => {
          if (err) {
            res.status(500).json({ error: err });
          }

          //find if file exists and delete the file
          return res.status(200).json(result);
        }
      );
    });
  } catch (e) {
    console.log("Error has been occured", e);
    res.status(500);
  }
});

module.exports = router;
