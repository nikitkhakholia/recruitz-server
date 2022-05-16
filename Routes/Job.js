const express = require("express");

const { getJobs, addJobsByExcel, updateJobs,  }  = require('../Controller/Job') ;
const { getUserById, checkToken, validateToken, isAdmin } = require("../Controller/User");

const router = express.Router();

router.get('/listJobs', getJobs)

// router.post('/newJob', createJob);

// router.get('/findJob/:id', findJob);

// router.delete('removeJob/:id', deleteJob);

// router.patch('/updJob/:id', updateJob); //do
router.param("id", getUserById)
router.post("/jobs/:id", addJobsByExcel);
router.put("/jobs/:id", checkToken, validateToken, isAdmin, updateJobs);


module.exports= router