const { sendEmail } = require("../Services/EmailService");
const cyrpto = require("crypto")
const { v4: uuidv4 } = require('uuid');

const encryptPlainPassowrd=(plainpassword)=>{
  return cyrpto.createHmac("sha256", uuidv4())
  .update(plainpassword)
  .digest("hex");
}

// check if user email is registered
exports.checkNewUser = async (req, res) => {
  //validate if email is provided
  if (req.query.email) {
    // select all email from user table
    database.query("SELECT email FROM login;", (err, results, fields) => {
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

      //save new user in database
      const [rows, fields] = await database.query(
        "INSERT into login(email,encry_pass,key,name) values(?,?,?,?);",
        [req.body.email, encryptPlainPassowrd(req.body.password), req.body.email, uuidv4()]
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
