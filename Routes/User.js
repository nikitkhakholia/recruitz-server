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

router.get("/testexcel", (req, res) => {
  sendExcelFile(
    [
      [1, "Nik", "Blr"],
      [2, "Bijesh", "Blr"],
      [3, "Anush" , "Blr"],
    ],
    ["col1", "col2"],
    res
  );
});

module.exports = router;
