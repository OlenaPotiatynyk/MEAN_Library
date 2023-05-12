const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    login: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByLogin = (login) => {
    const query = {login: login};
    return User.findOne(query);
};

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            User.create(newUser)
                .then(item => {
                    console.log(item);
                    callback.json(item);
                })
                .catch(err => {
                    console.log(err);
                });
        })
    })
};

module.exports.comparePass = (enteredPassword, passwordFromDB, callback) => {
    bcrypt.compare(enteredPassword, passwordFromDB, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    })
};