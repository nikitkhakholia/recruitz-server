const express = require("express");
const {  getApplicationMstData } = require("../Controller/Application");
const { getUserById } = require("../Controller/User");

const router = express.Router()


router.param("userId", getUserById)
router.get("/application/:userId",(req,res,next)=>{
    console.log('eeee');
    req.testdata = 'new'
    next()
},getApplicationMstData)

module.exports=router