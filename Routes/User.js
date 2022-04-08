const express = require("express");
const { checkNewUser, generateOtp, addUser } = require("../Controller/User");

const router = express.Router()

router.get("/userExists",checkNewUser)
router.get("/getOtp",generateOtp)
router.post("/createLogin",addUser)





module.exports=router