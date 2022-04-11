const express = require("express");
const { checkNewUser, generateOtp, addUser, signIn } = require("../Controller/User");

const router = express.Router()

router.get("/userExists",checkNewUser)
router.get("/getOtp",generateOtp)
router.post("/createLogin",addUser)
router.post("/login",signIn)





module.exports=router