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
    default: 'put default url here'
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
    min: 0,
    max: 5
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
