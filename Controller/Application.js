const async = require("async");
const res = require("express/lib/response");

const xl = require("excel4node");
const { sendExcelFile } = require("../Services/ExcelService");
const { sendEmail } = require("../Services/EmailService");

exports.getApplicationMstData = (req, res) => {
  var query =
    "SELECT * from application_mst WHERE student_id = " +
    req.profile.student.id;

  database.query(query, async (err, application_mst) => {
    if (err) return res.status(400).json({ status: 0, message: err.message });

    if (application_mst.length > 0) {
      // async.forEach(application_mst, (apMst, key, loopCompleted)=>{},(err)=>{})
      var data = [];
      async.forEachOf(
        application_mst,
        (apMst, key, loopCompleted) => {
          // for each item in loop do this
          var query =
            "SELECT * FROM application WHERE application_id = " + apMst.id;
          database.query(query, async (err, applicationFromDB) => {
            apMst.application = applicationFromDB[0];
            data.push(apMst);
            //console.log("looping");
            apMst.job = await getJobMstDataByJobMstId(apMst.job_id);
            loopCompleted();
          });
        },
        (err) => {
          // after loop is complete do this
          if (err) return;
          res.json({ success: 1, data: { application_mst } });
          //console.log("Data Sent");
        }
      );
    }
  });
};

function getJobMstDataByJobMstId(id) {
  return new Promise((data, error) => {
    var query = "SELECT * FROM job_mst WHERE id =" + id;

    database.query(query, (err, job_mst) => {
      if (err) error(err);
      job_mst.length < 1 ? data(null) : data(job_mst[0]);
    });
  });
}

function getStudentDetails(id) {
  return new Promise((data, error) => {
    var query = "SELECT * FROM student WHERE  id =" + id;
    database.query(query, (err, student) => {
      if (err) error(err);
      var query = "SELECT * FROM login WHERE id = " + student[0].login_id;
      database.query(query, async (err, dataFromDB) => {
        student[0].login = dataFromDB[0];
        data(student[0]);
      });
    });
  });
}

// exports.saveNewApplication=(req, res)=>{
//   // get data from client and put into application table
//   INSERT INTO `recruitz`.`application_mst` (`student_id`, `job_id`) VALUES ('2', '2');
//   INSERT INTO `recruitz`.`application` (`application_id`, `status`) VALUES ('2', 'w');

// }

exports.getAllUserApplications = (req, res) => {
  const wb = new xl.Workbook();

  // all application mst order by date created desc
  database.query("SELECT * FROM application_mst", (err, application_msts) => {
    // var data = [];
    async.forEach(
      application_msts,
      (application_mst, done) => {
        // for each item in loop do this
        var query =
          "SELECT * FROM application WHERE application_id = " +
          application_mst.id;
        database.query(query, async (err, applicationFromDB) => {
          application_mst.application = applicationFromDB[0];
          // data.push(application_mst);
          //console.log("looping");
          application_mst.job = await getJobMstDataByJobMstId(
            application_mst.job_id
          );
          application_mst.student = await getStudentDetails(
            application_mst.student_id
          );

          done();
        });
      },
      (err) => {
        // after loop is complete do this
        if (err) return;
        res.json({ success: 1, data: application_msts });
        //console.log("Data Sent");
      }
    );
  });
};

exports.getApplicationsExcel = (req, res) => {
  const wb = new xl.Workbook();

  // all application mst order by date created desc
  database.query("SELECT * FROM application_mst", (err, application_msts) => {
    // var data = [];
    var data = [];
    var cols = [
      "Login Id",
      "Login Email",
      "Name",
      "Role",
      "Company",
      "Type",
      "Location",
      "Status",
    ];
    async.forEach(
      application_msts,
      (application_mst, done) => {
        // for each item in loop do this
        var query =
          "SELECT * FROM application WHERE application_id = " +
          application_mst.id;
        database.query(query, async (err, applicationFromDB) => {
          application_mst.application = applicationFromDB[0];

          //console.log("looping");
          application_mst.job = await getJobMstDataByJobMstId(
            application_mst.job_id
          );
          application_mst.student = await getStudentDetails(
            application_mst.student_id
          );
          data.push([
            application_mst.id,
            application_mst.student.login.email,
            application_mst.student.login.name,
            application_mst.job.role,
            application_mst.job.company,
            application_mst.job.type,
            application_mst.job.location,
            application_mst.application.status,
          ]);
          done();
        });
      },
      (err) => {
        // after loop is complete do this
        if (err) return;
        if (req.query.download == "true")
          sendExcelFile(
            data,
            cols,
            res,
            "StudentApplication@" + new Date().toLocaleString()
          );
        else res.json({ data: data, success: 1 });
        //console.log("Data Sent");
      }
    );
  });
};

// exports.getApplicationsExcel = (req, res) => {
//   const wb = new xl.Workbook();
//   database.query("SELECT * from login", (err, logins) => {
//     if (err) res.status(400).json({ success: 0, error: err });
//     var data = [];
//     var cols = [
//       "Login Id",
//       "Login Email",
//       "Name",
//       "Role",
//       "Company",
//       "Type",
//       "Location",
//       "Status",
//     ];
//     async.forEach(
//       logins,
//       (login, done) => {
//         database.query(
//           "SELECT * from student WHERE login_id=" + login.id,
//           (err, student) => {
//             // console.log(student);
//             student = student[0];
//             data.push([
//               login.id,
//               login.email,
//               login.name,
//               student.bio,
//               student.about,
//               student.github,
//               student.linkedin,
//               student.phone,
//               student.skills,
//             ]);
//             done();
//           }
//         );
//       },
//       (err) => {
//         if (err) console.log(err);
//         if (req.query.download == "true")
//           sendExcelFile(
//             data,
//             cols,
//             res,
//             "StudentApplication@" + new Date().toLocaleString()
//           );
//         else res.json({ data: data, success: 1 });
//       }
//     );
//   });
// };

exports.createApplication = (req, res) => {
  database.query(
    "INSERT INTO application_mst(student_id, job_id) VALUES(?,?)",
    [req.profile.student.id, req.query.jobid],
    (err, insert) => {
      if (err)
        return res.status(400).json({ success: 0, message: err.message });
      database.query(
        "INSERT into application(application_id,status)VALUES(?,?)",
        [insert.insertId, "Applied"],
        async (err, insert1) => {
          if (err) {
            return res.status(400).json({ success: 0, message: err.message });
          }

          await sendEmail(
            req.profile.email,
            "Application Submitted.",
            "Hii, Your application has been successfully submitted.",
            "noreply@noreply.com",
            null
          );
          res.json({ success: 1 });
        }
      );
    }
  );
};
