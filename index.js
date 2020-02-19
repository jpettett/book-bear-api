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

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
