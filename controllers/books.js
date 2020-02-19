const express = require('express');
const Book = require('../models/BookSchema');

const router = express.Router();

//get all books
router.get('/', (req, res) => {
  Book.find({})
    .then(books => res.json(books))
    .catch(console.error);
});

//get specified book by id
router.get('/:id', (req, res) => {
  Book.find({ _id: req.params.id }).then(book => {
    res.json(book);
  });
});

//create a new book
router.post('/', (req, res) => {
  const newBook = req.body;
  Book.create(newBook).then(book => {
    res.json(book);
  });
});

//update specified book by id
router.put('/:id/edit', (req, res) => {
  const updatedBook = req.body;
  Book.findOneAndUpdate({ _id: req.params.id }, updatedBook, {
    new: true
  }).then(book => {
    res.json(book);
  });
});

//delete specified book by id
router.delete('/:id', (req, res) => {
  Book.findOneAndDelete({ _id: req.params.id }).then(book => {
    res.json(book);
  });
});

module.exports = router;
