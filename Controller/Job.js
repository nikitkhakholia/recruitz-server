// import { v4 as uuid } from 'uuid';
// const  { v4: uuidv4 } = require("uuid");
const formidable = require("formidable");

// let Jobs = [{    id: 20,
// type: "Intern",
// location: "mumbai",
// company: "wipro",
// role: "frontdev"}];

const async = require("async");
const { readExcelFile } = require("../Services/ExcelService");
const { sendEmail } = require("../Services/EmailService");

exports.getJobs = (req, res) => {
  database.query("SELECT * from job_mst", (err, job_msts) => {
    console.log(job_msts);
    if (err) return res.status(400).json({ success: 0, error: err });
    async.forEachOf(
      job_msts,
      (jmst, index, done) => {
        database.query(
          "SELECT * from job where job_id=" + jmst.id,
          (err, jobs) => {
            job_msts[index].job = jobs[0];
            done();
          }
        );
      },
      (err) => {
        res.json({ data: job_msts, success: 1 });
        // res.json({data:job, success:1})
      }
    );
  });
  // console.log(`Jobs in the database: ${Jobs}`);

  // res.send(Jobs);
};

// module.exports.createJob = (req, res) => {
//      const Job12 = req.body;

//     Jobs.push(Job12);

//      console.log(`Job added to the database.`);
//      res.send(`Job added to the database.`);
//      res.send(Jobs);
//  };

//  exports.findJob = (req, res) => {
//     //  res.send(req.params.id)
//     // find  = req.data;
//      database.query('SELECT * from job_mst where id= '+req.params.id,(err,rows,field)=>{
//          if(!err)
//             res.send(rows);
//         else
//             res.send(err);
//      });
//  };

//  module.exports.findJob: function()

//  module.exports=  deleteJob = (req, res) => {
//      console.log(`Job with id ${req.params.id} has been deleted`);

//      Jobs = Jobs.filter((Job) => Job.id !== req.params.id);
//  };

//  module.exports= updateJob =  (req,res) => {
//      const Job = Jobs.find((Job) => Job.id === req.params.id);

//      Job.Jobname = req.body.Jobname;
//      Job.age = req.body.age;

//      console.log(`Jobname has been updated to ${req.body.Jobname}.age has been updated to ${req.body.age}`)
//  };
//

exports.addJobsByExcel = (req, res) => {
  var success = { result: [] };
  var form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    var data = await readExcelFile(files.file1);
    console.log(data);
    async.forEach(
      data,
      (job, done) => {
        // console.log('inside');
        //insert
        if (!job.Id) {
          //////job or mst
          // console.log(err);
          // console.log("foundError0");
          database.query(
            "INSERT into job_mst(type,location,company,role, company_image) values(?,?,?,?,?);",
            [
              job["Type"],
              job["Location"],
              job["Company"],
              job["Role"],
              job["Company Image"],
            ],
            (err, jobInsert) => {
              // console.log(err);
              // console.log("foundError1");
              if (err) {
                success.result.push({
                  job: job,
                  error: err,
                });
                done();
              } else {
                // console.log(err);
                // console.log("foundError2");
                // console.log(jobInsert);
                database.query(
                  "INSERT INTO job(job_id, status,description) VALUES(?,?,?)",
                  [
                    jobInsert.insertId, ///////
                    job["Status"],
                    job["Description"],
                  ],
                  (err, jobDescInsert) => {
                    if (err) {
                      success.result.push({
                        job: job,
                        error: err, //
                      });
                      done();
                    } else {
                      success.result.push({
                        job: job,
                        error: "Job Added",
                      });
                      done();
                    }
                  }
                );
              }
            }
          );
        }
        // update
        else {
          done();
        }
      },
      async(err) => {
        await sendEmail(
          req.profile.email,"Jobs Created",
          "Jobs created successfully.",
          "noreply@noreply.com",null
        );
        res.json({ success });
      }
    );
  });
};

exports.updateJobs = (req, res) => {
    console.log();
  var query = `UPDATE job SET ${req.query.key} = '${req.query.value}' WHERE id=${req.query.id}`;
  database.query(query, async(err, updateRes) => {
    if (err) return res.status(400).json({ success: 0, error: err });
    await sendEmail(
      req.profile.email,"Job Updated",
      "Job Updated Successfully.",
      "noreply@noreply.com",null
    );
    res.json({ status: 1, data: updateRes });
  });
};
