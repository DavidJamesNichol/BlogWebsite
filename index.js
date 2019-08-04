const express = require('express');
var app = express();
const faker = require('faker');
const mysql = require('mysql');
const path = require('path');
const router = express.Router();
const expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session'); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));  

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/sign_up', require('./routes/api/sign_up'));
app.use('/api/log_in', require('./routes/api/log_in'));


const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'Blog',
	password: ''
});

connection.connect((err) => {
	if(err){
		throw err;
	}
	console.log('MySQL Connected... ');
});

app.get('/', function(req, res) {
	console.log('someone requested us');
	res.render('home', {
		title: '/',
		image: '/images/sequoia.jpeg'
	});
});

app.get('/appleTree', function(req, res) {
	console.log('someone requested /appleTree');
	res.render('appleTree', {
		title: 'Apple Tree Picking',
		image: '../images/apple tree.jpeg'
	});
});

app.get('/cherryBlossoms', function(req, res) {
	console.log('someone requested /cherryBlossoms');
	res.render('cherryBlossoms', {
		title: 'Cherry Blossom', 
		image: '../images/cherry blossom.jpeg'

	});
});

app.get('/coconutTrees', function(req, res) {
	console.log('someone requested /coconutTrees');
	res.render('coconutTrees', {
		title: 'Coconut Trees',
		image: '../images/coconut.jpeg'

	});
});	

app.get('/sakuraTree', function(req, res) {
	console.log('someone requested /sakuraTree');
	res.render('sakuraTree', {
		title: 'Sakura Tree',
		image: '../images/sakura.jpeg'

	});
});	

app.get('/physalisTree', function(req, res) {
	console.log('someone requested /physalisTree');
	res.render('physalisTree', {
		title: 'Physalis Tree',
		image: '../images/physalis.jpeg'

	});
});	

app.get('/orangeTree', function(req, res) {
	console.log('someone requested /orangeTree');
	res.render('orangeTree', {
		title: 'Orange Tree',
		image: '../images/Orange tree.jpeg'

	});
});		

app.get('/treeAge', function(req, res) {
	console.log('someone requested /treeAge');
	res.render('treeAge', {
		title: 'Tree Age',
		image: '../images/stump.jpeg'

	});
});		

app.get('/mapleTree', function(req, res) {
	console.log('someone requested /mapleTree');
	res.render('mapleTree', {
		title: 'Maple Tree',
		image: '../images/Maple.jpeg'

	});
});	

app.get('/sign_up', function(req, res) {
	console.log('someone requested /sign_up');
	res.render('sign_up', {
		title: 'sign_up',
		image: '/images/sequoia.jpeg',
		errors: module.exports.errorsSign_up
	});
});	

app.get('/log_in', function(req, res) {
	console.log('someone requested /log_in');
	res.render('log_in', {
		title: 'log_in',
		image: '/images/sequoia.jpeg'
	});
});	

app.listen(5000, function() {
	console.log('App running on port 3000');
});