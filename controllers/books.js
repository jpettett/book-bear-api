const express = require('express');
const Book = require('../models/BookSchema');

const router = express.Router();

router.get('/', (req, res) => {
  Book.find({})
    .then(books => res.json(books))
    .catch(console.error);
});

router.get('/:id', (req, res) => {
  Book.find({ _id: req.params.id }).then(book => {
    res.json(book);
  });
});

module.exports = router;
