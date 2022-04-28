const express = require("express");

const { getJobs }  = require('../Controller/Job') ;

const router = express.Router();

router.get('/listJobs', getJobs)

// router.post('/newJob', createJob);

// router.get('/findJob/:id', getJob);

// router.delete('removeJob/:id', deleteJob);

// router.patch('/updJob/:id', updateJob); //do

module.exports= router