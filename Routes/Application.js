const express = require("express");
const { getApplication } = require("../Controller/Application");
const { getUserById } = require("../Controller/User");

const router = express.Router()


router.param("userId", getUserById)
router.get("/application/:userId",getApplication)

module.exports=router