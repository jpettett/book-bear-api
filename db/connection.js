const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/books', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .catch(console.error);

module.exports = mongoose;
