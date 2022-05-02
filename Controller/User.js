const { sendEmail } = require("../Services/EmailService");
const cyrpto = require("crypto");
const async = require("async");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const xl = require("excel4node");
const { sendExcelFile, readExcelFile } = require("../Services/ExcelService");
const formidable = require("formidable");

const encryptPlainPassowrd = (plainpassword, key) => {
  return cyrpto.createHmac("sha256", key).update(plainpassword).digest("hex");
};

// check if user email is registered
exports.checkNewUser = async (req, res) => {
  //validate if email is provided
  if (req.query.email) {
    // select all email from user table
    database.query(
      "SELECT email FROM login WHERE email=?",
      [req.query.email],
      (err, results, fields) => {
        // compare  emails with provided
        if (results.length > 0 && req.query.email == results[0].email) {
          // return if matched
          return res.json({ error: "User Already Registered. Please Login." });
        }

        return res.json({ success: 1 });
      }
    );

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
      // await
      // sendEmail(
      //   req.query.email,
      //   "OTP Requested",
      //   "Otp is " + otp,
      //   "noreply@noreply.com",
      //   null
      // );

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
    database.query(
      "SELECT otp FROM otp WHERE email=? ORDER BY last_changed DESC",
      [req.body.email],
      (err, rows, fields) => {
        //compare current otp with provided otp
        if (rows[0].otp == req.body.otp) {
          const key = uuidv4();
          //save new user in database
          database.query(
            "INSERT into login(email,encry_pass,encry_key,name) values(?,?,?,?);",
            [
              req.body.email,
              encryptPlainPassowrd(req.body.password, key),
              key,
              req.body.name,
              ,
            ],
            (err, loginInsert) => {
              if (err && err.code == "ER_DUP_ENTRY")
                return res
                  .status(400)
                  .json({ status: 0, message: "User Already Exists" });
              if (err) return res.status(400).json({ status: 0, message: err });
              database.query(
                "SELECT * FROM login WHERE id = ? ",
                [loginInsert.insertId],
                (err, login) => {
                  if (err)
                    return res.status(400).json({ status: 0, message: err });
                  if (true) {
                    database.query(
                      "INSERT INTO student(login_id, bio, about, github, linkedin, phone, skills) VALUES(?,?,?,?,?,?,?)",
                      [login[0].id, "", "", "", "", null, ""],
                      (err, student) => {
                        // database.query(
                        //   "INSERT INTO `recruitz`.`education` (`institute_name`, `specialization`, `end_date`, `grade`, `degree`, `student_id`) VALUES ('?', '?', '?', '?', '?', '?')",
                        //   ["", "", "", "", "", student.insertedId]
                        //   //   (err, result)=>{
                        //   //   if (err) return res.status(400).json({status: 0, message: err.message})
                        //   //   res.json({success: 1, message: updated})
                        //   // }
                        // );

                        // database.query(
                        //   "INSERT INTO `recruitz`.`work_experience` (`title`, `start_date`, `end_date`, `location`, `description`, `student_id`, `employment_type`) VALUES ('?', '?', '?', '?', '?', '?', '?')",
                        //   ["", "", "", "", "", student.insertedId, ""]
                        //   // (err, result) => {
                        //   //   if (err)
                        //   //     return res
                        //   //       .status(400)
                        //   //       .json({ status: 0, message: err.message });
                        //   //   res.json({ success: 1, message: updated });
                        //   // }
                        // );

                        // database.query(
                        //   "INSERT INTO `recruitz`.`certificate` (`student_id`, `credential_url`) VALUES ('?', '?')",
                        //   ["", student.insertedId],
                        //   // (err, result) => {
                        //   //   if (err)
                        //   //     return res
                        //   //       .status(400)
                        //   //       .json({ status: 0, message: err.message });
                        //   //   res.json({ success: 1, message: updated });
                        //   // }
                        // );

                        if (err)
                          return res
                            .status(400)
                            .json({ status: 0, message: err });
                        res.json({
                          status: 1,
                          message: "Registered Successfully! Please Login.",
                        });
                      }
                    );
                  }
                  // if (req.query.type == "admin") {
                  //   database.query(
                  //     "INSERT INTO admin(login_id) VALUES(?)",
                  //     [rows[0].id],
                  //     (err, admin) => {
                  //       if (err)
                  //         return res.status(400).json({ status: 0, message: err });
                  //       res.json({
                  //         status: 1,
                  //         message: "Registered Successfully! Please Login.",
                  //       });
                  //     }
                  //   );
                  // }
                }
              );
            }
          );
        }
      }
    );
  }
};

exports.signIn = async (req, res) => {
  if (req.body.email && req.body.password) {
    database.query(
      "SELECT * FROM login WHERE email = ? ",
      [req.body.email],
      (err, login) => {
        if (err) return;
        if (!login[0])
          return res
            .status(400)
            .json({ status: 0, message: "Please Register First." });
        if (
          encryptPlainPassowrd(req.body.password, login[0].encry_key) ==
          login[0].encry_pass
        ) {
          var token = jwt.sign(
            { id: login[0].id, email: login[0].email, name: login[0].name },
            process.env.TOKEN_KEY
          );
          database.query(
            "SELECT * FROM admin WHERE login_id=?",
            [login[0].id],
            (err, admin) => {
              if (admin[0])
                return res.json({
                  status: 1,
                  token: token,
                  email: login[0].email,
                  id: login[0].id,
                  name: login[0].name,
                });
              else {
                database.query(
                  "SELECT * FROM student WHERE login_id=?",
                  [login[0].id],
                  (err, student) => {
                    if (err)
                      return res.status(400).json({ status: 0, message: err });
                    res.json({
                      status: 1,
                      token: token,
                      email: login[0].email,
                      id: login[0].id,
                      name: login[0].name,
                      data: student[0],
                    });
                  }
                );
              }
            }
          );
        } else {
          return res
            .status(400)
            .json({ status: 0, message: "Password or Email does not match." });
        }
      }
    );
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

exports.updateUserData = (req, res) => {
  var query = `UPDATE student SET ${req.query.field} = "${req.query.data}" WHERE login_id = ${req.profile.id}`;
  database.query(query, (err, updated) => {
    if (err) return res.status(400).json({ status: 0, message: err.message });
    res.json({ success: 1, message: updated });
  });
};
exports.getUserById = (req, res, next, id) => {
  var query = "SELECT * from login WHERE id = " + id;
  database.query(query, (err, login) => {
    if (!err) {
      var query = "SELECT * FROM student WHERE login_id = " + login[0].id;
      database.query(query, (err, student) => {
        if (err)
          return res.status(400).json({ status: 0, message: err.message });
        if (student[0]) {
          req.profile = login[0];
          req.profile.student = student[0];
          var query = `SELECT * FROM recruitz.certificate WHERE student_id = ${student[0].id};`;
          database.query(query, (err, certificate) => {
            if (certificate.length > 0)
              req.profile.student.certificates = certificate;
            database.query(
              "SELECT * FROM recruitz.work_experience WHERE student_id=" +
                student[0].id,
              (err, workExperience) => {
                if (workExperience.length > 0)
                  req.profile.student.workExperiences = workExperience;
                database.query(
                  "SELECT * FROM recruitz.education WHERE student_id=" +
                    student[0].id,
                  (err, education) => {
                    if (education.length > 0)
                      req.profile.student.educations = education;
                    next();
                  }
                );
              }
            );
          });
        }
      });
    } else {
      return res.status(400).json({ status: 0, message: err.message });
    }
  });
};
exports.getStudentData = (req, res) => {
  delete req.profile.encry_pass;
  delete req.profile.encry_key;
  res.json({ success: 1, data: req.profile });
};
exports.addEducationForStudenr = (req, res) => {
  var query =
    "INSERT INTO `recruitz`.`education` (`institute_name`, `specialization`, `end_date`, `grade`, `degree`, `student_id`,`start_date`) VALUES (?, ?, ?, ?, ?, ?,?)";
  database.query(
    query,
    [
      req.body.insName,
      req.body.spe,
      req.body.ed ? req.body.ed : null,
      req.body.gd,
      req.body.deg,
      req.profile.student.id,
      req.body.sd,
    ],
    (err, result) => {
      if (err) return res.status(400).json({ status: 0, message: err.message });
      res.json({ success: 1 });
    }
  );
};
exports.addWEForStudenr = (req, res) => {
  var query =
    "INSERT INTO `recruitz`.`work_experience` (`title`, `start_date`, `end_date`, `location`, `description`, `student_id`, `employment_type`, `company`) VALUES (?, ?, ?, ?, ?, ?, ?,?)";
  database.query(
    query,
    [
      req.body.title,
      req.body.sd,
      req.body.ed ? req.body.ed : null,
      req.body.loc,
      req.body.dec,
      req.profile.student.id,
      req.body.et,
      req.body.com,
    ],
    (err, result) => {
      if (err) return res.status(400).json({ status: 0, message: err.message });
      res.json({ success: 1 });
    }
  );
};
exports.addCertificateForStudenr = (req, res) => {
  var query = `INSERT INTO recruitz.certificate (student_id, credential_url) VALUES (${req.profile.student.id}, '${req.body.link}')`;
  database.query(
    query,
    [req.profile.student.id, req.body.link],
    (err, result) => {
      if (err) return res.status(400).json({ status: 0, message: err.message });
      res.json({ success: 1 });
    }
  );
};

exports.getAllUsers = (req, res) => {
  const wb = new xl.Workbook();
  database.query("SELECT * from login", (err, logins) => {
    if (err) res.status(400).json({ success: 0, error: err });
    var data = [];
    var cols = [
      "Login Id",
      "Login Email",
      "Name",
      "Bio",
      "About",
      "Github",
      "Linked In",
      "Phone",
      "Skills",
    ];
    async.forEach(
      logins,
      (login, done) => {
        database.query(
          "SELECT * from student WHERE login_id=" + login.id,
          (err, student) => {
            // console.log(student);
            student = student[0];
            console.log("wq"+student);

            data.push([
              login.id,
              login.email,
              login.name,
              student.bio,
              student.about,
              student.github,
              student.linkedin,
              student.phone,
              student.skills,
            ]);
            done();
          }
        );
      },
      (err) => {
        if (err) console.log(err);
        if (req.query.download == "true")
          sendExcelFile(
            data,
            cols,
            res,
            "Student@" + new Date().toLocaleString()
          );
        else res.json({ data: data, success: 1 });
      }
    );
  });
};
exports.addUsersByExcel = (req, res) => {
  var success = { result: [] };
  var form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    var data = await readExcelFile(files.file1);
    async.forEach(
      data,
      (user, done) => {
        var key = uuidv4();
        database.query(
          "INSERT into login(email,encry_pass,encry_key,name) values(?,?,?,?);",
          [
            user["Login Email"],
            encryptPlainPassowrd("12345678", key),
            key,
            user["Name"],
          ],
          (err, loginInsert) => {
            if (err && err.code == "ER_DUP_ENTRY") {
              success.result.push({
                user: user["Login Email"],
                error: "User Already Exists.",
              });
              done();
            } else if (err) {
              success.result.push({ user: user["Login Email"], error: err });
              done();
            } else {
              database.query(
                "INSERT INTO student(login_id, bio, about, github, linkedin, phone, skills) VALUES(?,?,?,?,?,?,?)",
                [
                  loginInsert.insertId,
                  user["Bio"],
                  user["About"],
                  user["Github"],
                  user["Linked In"],
                  parseInt(user["Phone"]),
                  user["Skills"],
                ],
                (err, student) => {
                  if (err) {
                    success.result.push({
                      user: user["Login Email"],
                      error: err,
                    });
                    done();
                  } else {
                    success.result.push({
                      user: user["Login Email"],
                      error: "Added Successfully.",
                    });
                    done();
                  }
                }
              );
            }
          }
        );
      },
      (err) => {
        res.json({ success });
      }
    );
  });
};
