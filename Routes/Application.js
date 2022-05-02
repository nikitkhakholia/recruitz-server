const express = require("express");
const {  getApplicationMstData } = require("../Controller/Application");
const { getUserById } = require("../Controller/User");
const { getAllUserApplications } = require("../Controller/Application");
const { sendExcelFile } = require("../Services/ExcelService");

const {getApplicationsExcel} = require("../Controller/Application");

const router = express.Router()


router.param("userId", getUserById)
router.get("/application/:userId",getApplicationMstData)

router.get("/apps/:userId", (req, res)=>{
    if(req.query.download=='true'){
        console.log(11);
        getApplicationsExcel(req, res)
    }else{
        console.log(22);
        getAllUserApplications(req, res)
    }
});



module.exports=router


