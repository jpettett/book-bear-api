const express = require('express');
const Book = require('../models/BookSchema');

const router = express.Router();

router.get('/', (req, res) => {
  Book.find({})
    .then(books => res.json(books))
    .catch(console.error);
});

module.exports = router;
