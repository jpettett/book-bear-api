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

//test will pass if book returned matches the specified id
describe('GET /books/:id', () => {
  const bookId = '5e4715d0f90e817ffaeb7917';
  it('should return a book with the specified id', done => {
    api
      .get(`/books/${bookId}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        const book = response.body[0];
        expect(book._id).to.equal(bookId);
        done();
      });
  });
});

// test will pass if it successfully adds a new book to the database
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

  it('should add a new book and return it', done => {
    api
      .get('/books')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const bookToFind = response.body.find(book => book.title === newBook.title);
        expect(bookToFind).to.be.an('object');
        done();
      });
  });
});

// test will pass if specified book is updated 
describe('PUT /books/:id/edit', () => {
  let bookToUpdate = {
    title: 'test2',
    author: 'Jay Gatsby',
    _id: '5e471c2a5932571a818586f6'
  };
  before(done => {
    api
      .put(`/books/${bookToUpdate._id}/edit`)
      .set('Accept', 'application/json')
      .send(bookToUpdate)
      .end(done);
  });
  it('should update a book by id', done => {
    api
      .get(`/books`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        const bookToFind = response.body.find(
          book => book.title === bookToUpdate.title
        );
        expect(bookToFind).to.be.an('object');
        done();
      });
  });
});

// test will pass succesfully if specified book is removed from array
describe('DELETE /books/:id', () => {
  let idToDelete = '5e48441e4e0b1310a6634013';
  before(done => {
    api
      .delete(`/books/${idToDelete}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        done();
      });
  });
  it('should remove book from original array', done => {
    api
      .get('/books')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const deletedBook = response.body.find(book => book._id === idToDelete);
        expect(deletedBook).to.equal(undefined);
        done();
      });
  });
});
