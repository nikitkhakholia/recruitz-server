const { sendEmail } = require("../Services/EmailService");
const User = require("../Models/User");

// check if user email is registered
exports.checkNewUser = async (req, res) => {
  //validate if email is provided
  if (req.query.email) {
    // select all email from user table
    database.query("SELECT email FROM user;", (err, results, fields) => {
      // compare all emails with provided
      for (const element of results) {
        if (req.query.email == element) {
          // return if matched
          return res.json({ error: "User Already Registered. Please Login." });
        }
      }
      return res.json({ success: 1 });
    });

    // return success
  } else {
    // return error
    res.json({ success: 0 });
  }
};

// gerenate new otp for a email
exports.generateOtp = async (req, res) => {
  //validate if mail is available
  if (req.query.email) {
    //   create new otp
    var otp = Math.floor(100000 + Math.random() * 900000);
    // save otp in database
    var query = `INSERT INTO otp(email,otp) VALUES ('${req.query.email}',${otp});`;
    database.query(query, async (err, result, fields) => {
      if (err) return res.json({ error: err });
      // notify user with email
      await sendEmail(
        req.query.email,
        "OTP Requested",
        "Otp is " + otp,
        "noreply@noreply.com",
        null
      );

      // return success response
      res.json({ success: 1 });
    });
  }
};

//register new user to database
exports.addUser = async (req, res) => {
  // validating if otp and email are present
  if (req.body.otp && req.body.email) {
    //select current otp from database
    const [rows, fields] = await database.query(
      "SELECT otp FROM otp WHERE email=?",
      [req.body.email]
    );

    //compare current otp with provided otp
    if (rows[0] == req.body.otp) {
      // create and initialize new user
      var user = new User(req.body);

      //save new user in database
      const [rows, fields] = await database.query(
        "INSERT into USER(name,dob,email,salt) values(?,?,?,?);",
        [user.name, user.dob, user.email, user.salt]
      );
    }
  }
};

exports.checkUserRole = (role) => {
  return (req, res, next) => {
    if (req.profile.roles.indexOf(role) > -1) {
      next();
    } else {
      return res.json({ error: "You are not an admin" });
    }
  };
};
