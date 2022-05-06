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
  isAdmin,
  forgotPassword,
  getUser1,
} = require("../Controller/User");
const router = express.Router();

router.get("/userExists", checkNewUser);
router.get("/getOtp", generateOtp);
router.post("/createLogin", addUser);
router.post("/login", signIn);

router.param("id", getUserById);
router.put("/user/:id", checkToken, validateToken, updateUserData);
router.get("/user/:id", checkToken, validateToken, getStudentData);
router.put(
  "/user/cer/:id",
  checkToken,
  validateToken,
  addCertificateForStudenr
);
router.put("/user/workexp/:id", checkToken, validateToken, addWEForStudenr);
router.put("/user/edu/:id", checkToken, validateToken, addEducationForStudenr);
router.get("/users/:id", checkToken, validateToken, isAdmin, getAllUsers);
// router.get("/users/:id", isAdmin, getAllUsers);
router.post("/users/:id", checkToken, validateToken, isAdmin, addUsersByExcel); 
// router.post("/users/:id", isAdmin, addUsersByExcel); 
router.put("/forgotpassword",forgotPassword); 
router.get("/user1/:id", getUser1); 

module.exports = router;
