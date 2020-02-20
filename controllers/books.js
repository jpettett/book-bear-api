const express = require('express');
const Book = require('../models/BookSchema');
const {
  handleValidateId,
  handleRecordExists,
  handleValidateOwnership
} = require('../middleware/custom_errors');
const { requireToken } = require('../middleware/auth');

const router = express.Router();

//get all books
router.get('/', requireToken, (req, res, next) => {
  Book.find({ owner: req.user._id })
    .then(books => res.json(books))
    .catch(next);
});

//get specified book by id
router.get('/:id', handleValidateId, (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .populate('owner')
    .then(handleRecordExists)
    .then(book => {
      res.json(book);
    })
    .catch(next);
});

//create a new book
router.post('/', requireToken, (req, res, next) => {
  const newBook = req.body;
  Book.create({ ...newBook, owner: req.user._id })
    .then(book => {
      res.json(book);
    })
    .catch(next);
});

//update specified book by id
router.put('/:id/edit', handleValidateId, requireToken, (req, res, next) => {
  const updatedBook = req.body;
  Book.findOneAndUpdate({ _id: req.params.id }, updatedBook, {
    new: true
  })
    .then(handleRecordExists)
    .then(book => handleValidateOwnership(req, book))
    .then(book => {
      res.json(book);
    })
    .catch(next);
});

//delete specified book by id
router.delete('/:id', handleValidateId, (req, res, next) => {
  Book.findOneAndDelete({ _id: req.params.id })
    .then(handleRecordExists)
    .then(book => handleValidateOwnership(req, book))
    .then(book => {
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;
