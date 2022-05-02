const express = require("express");

const { getJobs, addJobsByExcel,  }  = require('../Controller/Job') ;
const { getUserById } = require("../Controller/User");

const router = express.Router();

router.get('/listJobs', getJobs)

// router.post('/newJob', createJob);

// router.get('/findJob/:id', findJob);

// router.delete('removeJob/:id', deleteJob);

// router.patch('/updJob/:id', updateJob); //do
router.param("id", getUserById)
router.post("/jobs/:id", addJobsByExcel);


module.exports= router