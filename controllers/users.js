const express = require('express');
//bcrypt hashes passwords so sensitive user data isn't stored
const bcrypt = require('bcrypt');
const User = require('../models/UserSchema');
const { createUserToken, requireToken } = require('../middleware/auth');
const router = express.Router();

//sign up new user with promise chain//
router.post('/signup', (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hashPassword => ({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    }))
    .then(user => User.create(user))
    .then(user => res.status(201).json(user))

    .catch(next);
});

//sign in user //
router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    // Pass the user and the request to createUserToken
    .then(user => createUserToken(req, user))
    // createUserToken will either throw an error that
    // will be caught by our error handler or send back
    // a token that we'll in turn send to the client.
    .then(token => res.json({ token }))
    .catch(next);
});

//sign out user//
router.delete('/signout', requireToken, (req, res, next) => {
  res.json({ token: '' });
});

module.exports = router;
