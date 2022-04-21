exports.getApplication = (req, res) => {
  var query = "SELECT * from application_mst WHERE student_id = " + req.profile.student.id;

  database.query(query, (err, application_mst) => {
    if (err) return res.status(400).json({ status: 0, message: err.message });
    if(application_mst.length>0){
      var query =
      "SELECT * FROM application WHERE application_id = " +
      application_mst[0].id;
    database.query(query, (err, application) => {
      console.log(application);
      application_mst.application=application
      if (err) return res.status(400).json({ status: 0, message: err.message });
      res.json({success: 1, data:{application_mst}})
    });
    }
  });
};
