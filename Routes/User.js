const express = require("express");
const {
  checkNewUser,
  generateOtp,
  addUser,
  signIn,
  getUserById,
  updateUserData,
  getStudentData,
  addEducationForStudenr,
  addWEForStudenr,
  addCertificateForStudenr,
  getAllUsers,
} = require("../Controller/User");
const { sendExcelFile } = require("../Services/ExcelService");

const router = express.Router();

router.get("/userExists", checkNewUser);
router.get("/getOtp", generateOtp);
router.post("/createLogin", addUser);
router.post("/login", signIn);

router.param("id", getUserById);
router.put("/user/:id", updateUserData);
router.get("/user/:id", getStudentData);
router.put("/user/cer/:id", addCertificateForStudenr);
router.put("/user/workexp/:id", addWEForStudenr);
router.put("/user/edu/:id", addEducationForStudenr);

router.get("/users/:id", getAllUsers);

module.exports = router;
