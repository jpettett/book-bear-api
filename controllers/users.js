const express = require('express');
//bcrypt hashes passwords so sensitive user data isn't stored
const bcrypt = require('bcrypt');
const User = require('../models/UserSchema');
const router = express.Router();

//sign up new user with promise chain//
router.post('/', (req, res, next) => {
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
  //
});

//sign out user//
router.post('/signout', (req, res, next) => {
  //
});

module.exports = router;
