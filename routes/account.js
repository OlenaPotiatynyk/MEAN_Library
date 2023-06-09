const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.post('/reg', async(req, res) => {
    const login = req.body.login;
    User.getUserByLogin(login).then(user => {
        if(user) {
            return res.json({success: false, msg: "User with this login already exist. Try another login."});
        }});

    await User.addUser({
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        role: req.body.role,
        password: req.body.password
    }, res);
    return res.status(200);
});

router.post('/auth', (req, res) => {
    try {
        const login = req.body.login;
        const password = req.body.password;

        User.getUserByLogin(login).then(user => {
            // if(err) throw err;

            if(!user) {
                return res.json({success: false, msg: "User not found"});
            }

            User.comparePass(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    const token = jwt.sign({user}, config.secretAccessKey, {
                        expiresIn: 3600 * 24
                    })

                    res.json({
                        success: true,
                        token: 'JWT' + token,
                        user: {
                            id: user._id,
                            name: user.name,
                            login: user.login,
                            email: user.email,
                            role: user.role
                        }
                    })
                } else {
                    return res.json({success: false, msg: "Wrong password"});
                }
            });
        });
    } catch (err) {
        console.log(err);
    }

});

router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('Dashboard page');
});

module.exports = router;