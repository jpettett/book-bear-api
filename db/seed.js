const Book = require('../models/BookSchema');
const seedData = require('./seeds.json');

// remove full dataset and repopulate with seed data
Book.remove({})
  .then(() => Book.collection.insert(seedData))
  .then(() => process.exit());
