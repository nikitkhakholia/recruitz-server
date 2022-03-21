//Nikit Khkaholia
//21/03/2022

// initializing env variables
require("dotenv").config();

// improting mysql library
const mysql = require("mysql2");

// creating database connection and defining it it a global variable 'database'
// so that it can be accessed from any file
global.database = mysql.createConnection(
  {
    host: process.env.HOST,
    // user: process.env.USER,
    user: "root",
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
  }
);
