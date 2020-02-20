require('dotenv').config();
const express = require('express');
const app = express();
const booksController = require('./controllers/books');
//user controller//
const userController = require('./controllers/users');
const cors = require('cors');
// Require the error handlers
const {
  handleErrors,
  handleValidationErrors
} = require('./middleware/custom_errors');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



//makes the blank page a login or sign up page//
app.use('/', userController);
//navigates to book display
app.use('/books', booksController);

// The catch all for handling database and Mongoose
// validation errors
app.use(handleValidationErrors);

// The catch all for handling errors
app.use(handleErrors);

app.listen(4000, () => {
  console.log('connected to port 4000');
});
