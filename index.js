//Nikit Khkaholia
//21/03/2022

// initializing env variables
require("dotenv").config();

// importing mysql library
const mysql = require("mysql2");
const {
  addUser,
  checkNewUser,
  generateOtp,
  checkUserRole,
} = require("./Controller/User");
// creating database connection and defining it it a global variable 'database'
// so that it can be accessed from any file
global.database = mysql.createConnection({
  host: process.env.HOST,
  // user: process.env.USER,
  user: "root",
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

const express = require("express");
const app = express();
app.use("/newuser", (req, res, next) => {
  if (checkNewUser({ query: { email: "khakholia.nk@gmail.com" } }, res)) {
    generateOtp({ query: { email: "khakholia.nk@gmail.com" } }, res);
  }
});

app.use(
  "/addCompany/:userId",
  (req, res, next) => {
    req.body = { name: "", adress: "" };
    req.profile = {
      id: 1,
      email: "khakholia.nk@gmail.com",
      roles: ["ROLE_ADMIN"],
    };
    next()
  },

  checkUserRole("ROLE_ADMIN"),

  (req, res) => {
    //add company
    database.query(
      "INSERT INTO company VALUES(1,'Google','Blr')",
      (err, result, fields) => {
        if (!err) {
          res.json({ status: 1 });
        } else {
          res.json({ error: err });
        }
      }
    );
  }
);
app.listen(process.env.PORT, async () => {
  console.log(`*** SERVER STARTED AT PORT ${process.env.PORT} ***`);
});

// checkNewUser()
