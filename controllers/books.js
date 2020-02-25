const express = require('express');
const Book = require('../models/BookSchema');

const router = express.Router();

// The only additions here are the addition of next
// to prevent the server from hanging and the
// use of status to set the status for post to 201
// and delete to 204 no content.

//get all books
router.get('/', (req, res, next) => {
  Book.find({})
    .then(books => res.json(books))
    .catch(next);
});

//get specified book by id
router.get('/:id', (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => {
      res.json(book);
    })
    .catch(next);
});

//create a new book
router.post('/', (req, res, next) => {
  const newBook = req.body;
  Book.create(newBook)
    .then(book => {
      res.status(201).json(book);
    })
    .catch(next);
});

//update specified book by id
router.put('/:id/edit', (req, res, next) => {
  const updatedBook = req.body;
  Book.findOneAndUpdate({ _id: req.params.id }, updatedBook, {
    new: true
  })
    .then(book => {
      res.json(book);
    })
    .catch(next);
});

//delete specified book by id
router.delete('/:id', (req, res, next) => {
  Book.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;
