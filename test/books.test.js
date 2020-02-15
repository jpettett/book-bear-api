//dependencies
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
//set up supertest to hit our local server
const api = supertest('http://localhost:4000');

//test will pass if all books are returnes with a 200 ok response
describe('GET /books', () => {
  it('should return a 200 response', done => {
    api
      .get('/books')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});

// //test will pass if book returned matches the specified id
// describe('GET /books/:id', () => {
//   const bookId = '5e4715d0f90e817ffaeb7917';
//   it('should return a book with the specified id', done => {
//     api
//       .get(`/books/${bookId}`)
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         const book = res.body;
//         expect(book._id).to.equal(bookId);
//         done();
//       });
//   });
// });

// //test will pass if book returned matches specified title
// describe('GET /books/:title', () => {
//   const bookTitle = 'little fires everywhere';
//   it('should return a book with the specified title', done => {
//     api
//       .get(`/books/${bookTitle}`)
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.body.title).to.equal(bookTitle);
//         done().catch(console.error);
//       });
//   });
// });

//test will pass if it successfully adds a new book to the database
describe('POST /books', () => {
  const newBook = {
    title: 'blah blah blah',
    author: 'Jay Gatsby'
  };

  //create the new book

  before(done => {
    api
      .post('/books')
      .set('Accept', 'application/json')
      .send(newBook)
      .end(done);
  });

  it('should add a new book and return it', () => {
    api
      .get('/books')
      .set('Accept', 'application/json')
      .end((err, res) => {
        const bookToFind = res.body.find(book => book._id === newBook._id);
        expect(bookToFind).to.be.an('object');
        done();
      });
  });
});
