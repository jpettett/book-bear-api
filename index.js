const express = require('express');
const app = express();
const booksController = require('./controllers/books');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/books', booksController);

app.listen(4000, () => {
  console.log('connected to port 4000');
});
