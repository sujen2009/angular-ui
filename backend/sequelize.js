const Sequelize = require('sequelize');
const UserModel = require('./models/User');
require('dotenv').config();

//Database connection...
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	dialectOptions: {
		connectTimeout: 1000
	}
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
	console.log(`Database & tables created!`);
});

module.exports = {
	User
};
