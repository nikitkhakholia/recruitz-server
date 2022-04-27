const async = require("async");
const res = require("express/lib/response");
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
      database.query(query,async (err, applicationFromDB) => {
        apMst.application = applicationFromDB[0];
        data.push(apMst);
        console.log("looping");
        apMst.job =  await getJobMstDataByJobMstId(apMst.job_id)
        loopCompleted()
      });
        },
        (err) => {
          // after loop is complete do this
          if(err) return 
          res.json({ success: 1, data: { application_mst } });
          console.log("Data Sent");
        }
      );      
    }
  });
};

function getJobMstDataByJobMstId(id) {
  return new Promise((data, error)=>{
    var query = "SELECT * FROM job_mst WHERE id =" + id;

  database.query(query, (err, job_mst)=>{
    if (err) error(err);
    job_mst.length<1? data(null) : data(job_mst[0] )    
  })
  })
}