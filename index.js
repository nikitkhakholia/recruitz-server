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
  updateUserData,
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

const cors = require("cors")
app.use(cors())

app.use(require("body-parser").json())
// app.use((req, res, next)=>{
//   setTimeout(()=>{
//     next()
//   }, 2000)
// })
app.use(require("./Routes/User"));
app.use(require("./Routes/Application"))
app.use(require("./Routes/Job"));

app.listen(process.env.PORT, async () => {
  console.log(`*** SERVER STARTED AT PORT ${process.env.PORT} ***`);
});
