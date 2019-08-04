const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'Blog',
  password: ''
});




  //array for info from page
  var newSign_up =[];

//handles post request
router.post('/', (req, res) => {
  //true/false variable for below
  var checked = 0;
	
	
	  //retreive data from page
  var fromPage = {
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };

  //verifies fields
  if (
    !fromPage.fName ||
    !fromPage.lName ||
    !fromPage.email ||
    !fromPage.username ||
    !fromPage.password
  ) {
    return res.status(400).json({
      msg: 'Please fill all fields'
    });
  }
  //verifies passwords
  else if (req.body.password !== req.body.password1) {
    return res.status(400).json({
      msg: 'Passwords do not match'
    });
  } else {
    begin(clearNewSign_up);
  }
  


  //initializer
  function begin(callback){
	  callback(pushToNewSign_up);
  }
	
  //clears newSign_up
  function clearNewSign_up(callback){
    new Promise((resolve, reject) => {
		newSign_up.length = 0;
		checked = 0;
		console.log('emptied array');
		callback(checkForDuplicateEmail);
	});
  }
	
  function pushToNewSign_up(callback){
    new Promise((resolve, reject) => {
	  newSign_up.push(fromPage);
	  console.log('pushed');
	  callback(checkForDuplicatUsername);
	});
  }
	







  //checks for duplicate email
  function checkForDuplicateEmail(callback) {
    new Promise((resolve, reject) => {
      var q = `SELECT email FROM users WHERE email = '${fromPage.email}'`;
      connection.query(q, (err, result) => {
        console.log(err);
        console.log(result);
		  console.log(q);

        //checks if error
        if (!err) {
          console.log("database queried");
        }
        //increments if match
        if (result[0] !== undefined) {
		  return res.status(400).json({
          msg: 'Email already in use'
        });
        } else {
      callback(insertToDB);
		}
      });
      checked++;
    });
  }






  //checks for duplocate username
  function checkForDuplicatUsername(callback) {
    new Promise((resolve, reject) => {
      var q = `SELECT email FROM users WHERE username = '${fromPage.username}'`;
      connection.query(q, (err, result) => {
        console.log(err);
        console.log(result);

        //checks if error
        if (!err) {
          console.log("database queried 1");
        }
        //increments if match
        if (result[0] !== undefined) {
          return res.status(400).json({
          msg: 'Username already in use'
        });
        } else {
        callback();
		}
      });
      checked++;
    });
  }







  function insertToDB() {
    new Promise((resolve, reject) => {
      if (checked === 2) {
        turnNewSign_upSQL(newSign_up);
      } 
    });
  }
	
	
	//adds info to db
  function turnNewSign_upSQL(newSign_up) {
    let newSign_upSQL = newSign_up;
    var q = 'INSERT INTO users SET ?';
    connection.query(q, newSign_upSQL, (err, result) => {
  	  console.log(err);
	  console.log(result);
	  if (!err) {
	    console.log("info transpiled into database");
	    res.status(400).json({
	  	  msg: 'Thank you for signing up!'
  	  });
  	}
  });
  }
	
});



module.exports = router;