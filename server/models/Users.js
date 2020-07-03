const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
	name: {
		type: String,
		maxlength: 50,
	},
	email: {
		type: String,
		trim: true,
		unique: 1,
	},
	password: {
		type: String,
		minlength: 5,
	},
	lastname: {
		type: String,
		maxlength: 50,
	},
	role: {
		type: Number,
		default: 0,
	},
	image: String,
	token: {
		type: String,
	},
	tokenExp: {
		type: Number,
	},
});

//save 하기전 선행로직
userSchema.pre('save', function (next) {
	var user = this;
	console.log('pre', user);
	//비밀번호 암호화
	if (!user.isModified('password')) next();
	bcrypt.genSalt(saltRounds, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
	bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

userSchema.methods.generateToken = function (cb) {
	// jsonwebtoken 이용하여 token 생성
	var user = this;
	var token = jwt.sign(user._id.toHexString(), 'secretToken');
	user.token = token;
	user.save(function (err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
};
userSchema.statics.findByToken = function (token, cb) {
	var user = this;
	//token decode
	jwt.verify(token, 'secretToken', function (err, decoded) {
		//유저 아이디를 이용해서 유저 매치 후 클라이언트 토근과 db 토큰 매치하는지 확인
		user.findOne({ _id: decoded, token: token }, function (err, user) {
			if (err) return cb(err);
			cb(null, user);
		});
	});
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
