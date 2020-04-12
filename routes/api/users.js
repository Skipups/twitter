const express = require('express');
const router = express.Router();
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');

//private auth route
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ id: req.user.handle, email: req.user.email });
  }
);
//validate users input for registration
//check if email already exists
router.post('/register', (req, res) => {
  // console.log('req.body inside users.js /register', req.body);
  // const { errors, isValid } = validateRegisterInput(req.body);
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      //using the validations to send the error
      //errors.email = 'This email is already registered';
      return res
        .status(400)
        .json({ email: 'This email is already registered' });
    } else {
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
      });
      // encrypt newUsers password before saving in db
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((er) => res.status(400).json(400));
        });
      });
    }
  });
});

//validate users input for registration
router.post('/login', (req, res) => {
  //const { errors, isValid } = validateLoginInput(data.req);

  const email = req.body.email;
  const password = req.body.password;

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  User.findOne({ email }).then((user) => {
    if (!user) {
      //errors.email = 'User not found';
      return res.status(404).json({ email: 'This user does not exist' });
    }

    bcrypt.compare(password, user.password).then((isMatched) => {
      if (isMatched) {
        const payload = {
          id: user.id,
          handle: user.handle,
          email: user.email,
        };
        jwt.sign(
          payload,
          process.env.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer' + token,
            });
          }
        );
      } else {
        //errors.password = 'Incorrect password';
        return res.status(400).json({ password: 'Incorrect password' });
      }
    });
  });
});

module.exports = router;
