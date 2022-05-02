// import { v4 as uuid } from 'uuid';
// const  { v4: uuidv4 } = require("uuid");
// let Jobs = [{    id: 20,
// type: "Intern",
// location: "mumbai",
// company: "wipro",
// role: "frontdev"}];

const async = require("async")

exports.getJobs = (req, res) => {
    database.query("SELECT * from job_mst", (err, job_msts)=>{
        console.log(job_msts);
        if(err) return res.status(400).json({success:0, error: err})
        async.forEachOf(job_msts, (jmst,index, done)=>{
            database.query("SELECT * from job where job_id="+jmst.id, (err, jobs)=>{
                job_msts[index].job=jobs[0]
                done()
            })
        }, (err)=>{
            res.json({data:job_msts, success:1})
        })
        
    })
    // console.log(`Jobs in the database: ${Jobs}`);

    // res.send(Jobs);
}

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