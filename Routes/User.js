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
  addUsersByExcel,
  checkToken,
  validateToken,
} = require("../Controller/User");
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
router.post("/users/:id", addUsersByExcel);
router.post("/usertest/:id", checkToken, validateToken,(req,res)=>{
  console.log('here');
  res.json("xxx")
});

module.exports = router;
