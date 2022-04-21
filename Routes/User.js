const express = require("express");
const { checkNewUser, generateOtp, addUser, signIn, getUserById, updateUserData } = require("../Controller/User");

const router = express.Router()

router.get("/userExists",checkNewUser)
router.get("/getOtp",generateOtp)
router.post("/createLogin",addUser)
router.post("/login",signIn)

router.param("id", getUserById)
router.put("/user/:id", updateUserData)



module.exports=router