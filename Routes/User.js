const express = require("express");
const { checkNewUser, generateOtp, addUser, signIn, getUserById, updateUserData, getStudentData, addEducationForStudenr, addWEForStudenr } = require("../Controller/User");

const router = express.Router()

router.get("/userExists",checkNewUser)
router.get("/getOtp",generateOtp)
router.post("/createLogin",addUser)
router.post("/login",signIn)

router.param("id", getUserById)
router.put("/user/:id", updateUserData)
router.get("/user/:id", getStudentData)
router.put("/user/cer/:id", addEducationForStudenr)
router.put("/user/workexp/:id", addWEForStudenr)
router.put("/user/edu/:id", addEducationForStudenr)


module.exports=router