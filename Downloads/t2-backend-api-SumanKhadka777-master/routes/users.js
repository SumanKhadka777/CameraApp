const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const router = express.Router();
const auth = require('../auth');
//register user 
router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
		err.status = 500;
		return next(err);
        }
        User.create({
            username: req.body.username,
            // gender:req.body.gender,
            email:req.body.email,
            password: hash,
            address:req.body.address,
                    
            
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

//Login user 
router.post('/login', (req, res, next) => {
    console.log(req.body.username )
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.status(200  )
                        res.json({code:200, status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);     
});

// get user data
router.get('/me', auth.verifyUser, (req, res, next) => {
    console.log(req.user)
    res.json({ _id: req.user._id,username: req.user.username,email:req.user.email,password: req.user.password,address: req.user.address });
        //gender: req.user.gender,
});


module.exports = router;

