const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { User } = require('../sequelize');

routes.get('/', (req, res) => {
	res.status(200).json({ message: 'Connected!' });
});

routes.post('/login', (req, res) => {
	User.findOne({
		where: {username: req.body.userName},
	}).then(function(user){
		if(!user){
			res.status(409).json({ message: 'Invalid username and/or password.' });
		}else{
			bcrypt.compare(req.body.password, user.password, function(err, result) {
				if(result){
					res.status(200).json({
						message: 'Logged in succesfully.', 
						token: jwt.sign({ username: user.username }, process.env.JWT_TOKEN_SECRET, { expiresIn: '30 days' }),
						id: user.id,
						name: user.firstName + ' ' + user.lastName,
						user: user
					});
				}else{
					res.status(409).json({ message: 'Invalid username and/or password.' });
				}
			});
		}
	});
});

routes.post('/checkunique', (req, res) => {
	User.findOne({
		where: {
			[req.body.field]: req.body.data
		},
	}).then(function(user){
		res.status(200).json({found: user ? true : false});
	});
});

routes.post('/register', (req, res) => {
	return bcrypt.hash(req.body.password, 10).then(function(hash) {
		return User.create({
			username: req.body.userName,
			password: hash,
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phoneNumber: req.body.phoneNumber,
		}).then(function(user) {
			if (user) {
				res.status(200).json({ message: 'Registration successfull.' });
			} else {
				res.status(409).json({ message: 'Error in inserting new record.' });
			}
		});
	});	
});

module.exports = routes;
