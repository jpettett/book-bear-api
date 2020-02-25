const express = require('express');
const app = express();
const booksController = require('./controllers/books');
const cors = require('cors');
// const bodyParser = require('body-parser'); NOT NEEDED
// const methodOverride = require('method-override'); NOT NEEDED

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method')); NEVER USED WITH APIs
app.use(cors());
// app.use(bodyParser.json()); DON'T USE WITH express.json()
// app.use(bodyParser.urlencoded({ extended: true })); DON'T USE WITH express.urlencoded()

app.use('/books', booksController);

// I know this was in one of the examples, but it's really not
// good practice.  Just use a variable here to store the port value.
app.set('port', process.env.PORT || 4000);
// Use app.set if you're creating an application setting that
// you'll need to use elsewhere, such as in a route/controller file.

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
