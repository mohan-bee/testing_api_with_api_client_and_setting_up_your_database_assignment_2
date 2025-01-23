const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const books = []

app.post('/books', (req, res) =>{
  const {book_id, title, author, genre, year, copies} = req.body
  if(!book_id || !title || !author || !genre || !year || !copies){
    res.status(400).send("Error Creating Book")
  }

  let isExist = books.some(book => book.book_id == book_id)
  if(isExist){
    res.status(400).send("This Book with this ID Already Exists")
  }

  const newBook = {book_id, title, author, genre, year, copies}
  books.push(newBook)
  res.status(200).send("Book Added Successfully")
})

app.get('/books', (req, res) =>{
  res.status(200).send(books)
})

app.get('/books/:id', (req, res) =>{
  const book = books.find(book => book.book_id === req.params.id)
  if(!book){
    res.status(200).send("Book Not Found")
  }
  res.status(200).json(book)
})

app.put('/books/:id', (req, res) =>{
  const editBook = books.find(book => book.book_id === req.params.id)
  const {book_id, title, author, genre, year, copies} = req.body
  editBook.book_id = book_id
  editBook.title = title
  editBook.author = author
  editBook.genre = genre
  editBook.year = year
  editBook.copies = copies

  res.status(200).send("Book Edited Successfully")
})
app.delete('/books/:id', (req, res) =>{
  const bookIndex = books.findIndex(book => book.book_id === req.params.id)
  books.splice(bookIndex, 1)
  res.status(200).send("Book Deleted Successfully")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
