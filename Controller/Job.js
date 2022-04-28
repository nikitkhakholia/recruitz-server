// import { v4 as uuid } from 'uuid';
// const  { v4: uuidv4 } = require("uuid");
let Jobs = [{xxx:'ddd',vh:'abc'}];

exports.getJobs = (req, res) => {
    database.query("SELECT * from job_mst", (err, job_msts)=>{
        if(err) return res.status(400).json({success:0, error: err})
        for (let index = 0; index < job_msts.length; index++) {
            database.query("SELECT * from job where job_id="+job_msts[index].id, (err, jobs)=>{
                job_msts[index].job=jobs[0]
            })
            
        }
        res.json(job_msts)
    })
    // console.log(`Jobs in the database: ${Jobs}`);

    // res.send(Jobs);
}

module.exports.createJob = (req, res) => {   
     const Job = req.body;

    //  Jobs.push({...Job, id: uuid()});
    
     console.log(`Job [${Job.Jobname}] added to the database.`);
 };

 module.exports.getJob = (req, res) => {
     res.send(req.params.id)

     console.log(`Jobs in the database: ${Jobs}`);
 };

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