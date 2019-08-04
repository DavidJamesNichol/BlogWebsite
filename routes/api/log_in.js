const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'Blog',
	password: ''
});

const newLog_in = [];

router.post('/', (req, res) => {
	const fromPage = {
		username: req.body.username,  
		password: req.body.password
	};
	if (
		!fromPage.username ||
		!fromPage.password
	   ){
		return res.status(400).json({
			msg: 'Please fill all fields'
		});
	}
	else{
		begin(clearArray);
	}
	
	function begin(callback){
	  callback(pushToNewLog_in);
	}
	
	function clearArray(callback){
	  new Promise((resolve, reject) => {
		newLog_in.length = 0;
		callback(findUsername);
	  });
	}
	
	function pushToNewLog_in(callback){
	  new Promise((resolve, reject) => {
	  	newLog_in.push(fromPage);
		callback(verifyPassword);
	  });
	}
	
	function findUsername(callback){
	  new Promise((resolve, reject) => {
	  var q = `SELECT username FROM users WHERE username = '${fromPage.username}'`;
      connection.query(q, (err, result) => {
        console.log(err);
        console.log(result);

        //checks if error
        if (!err) {
          console.log("database queried");
        }
        //increments if match
        if (result[0] === undefined) {
		  return res.status(400).json({
          msg: 'Username not found'
        });
        }
      });
		callback();
	  });	
	}
	
	function verifyPassword(callback){
	  new Promise((resolve, reject) => {
	  var q = `SELECT password FROM users WHERE username = '${fromPage.username}'`;
      connection.query(q, (err, result) => {
        console.log(err);
        console.log(result);

        //checks if error
        if (!err) {
          console.log("database queried");
	      console.log(q);
		  console.log(result[0].password);
		  console.log(fromPage.password);
        }
        //increments if match
		  if (result[0].password === fromPage.password) {
		    return res.status(400).json({
		    msg: 'You have logged in'
		    });
		  }
		  else {
		    return res.status(400).json({
		    msg: 'Password does not match'
		    });
		  }
		  });
	  });
	}
	
});

module.exports = router; 