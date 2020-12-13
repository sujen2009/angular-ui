module.exports = (sequelize, type) => {
	var user = sequelize.define('users', {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: type.STRING,
			unique: true,
			allowNULL: false
		},
		password: {
			type: type.STRING
		},
		email: {
			type: type.STRING
		},
		firstName: {
			type: type.STRING
		},
		lastName: {
			type: type.STRING
		},
		phoneNumber: {
			type: type.STRING
		}
	});

	return user;
};
