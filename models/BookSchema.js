const mongoose = require('../db/connection');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Click edit to add an author'
  },
  coverPhotoURL: {
    type: String,
    default: 'https://i.imgur.com/liYx7F6.png'
  },
  amazonURL: {
    type: String,
    default: 'http://amazon.com'
  },
  readStatus: {
    type: Boolean,
    default: false
  },
  synopsis: {
    type: String,
    default: 'Click edit to add a synopsis'
  },
  review: {
    type: String,
    default: 'Click edit to add a review'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
