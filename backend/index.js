import express, { response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();

app.use(express.json());

// Home route
app.get('/', (request, response) => {
  console.log('Request received');
  return response.status(200).send('Hello, World!');
});

// Create a new book
app.post('/books', async (request, response) => {
  try{
    const { title, author, publishYear } = request.body;

    if (!title || !author || !publishYear) {
      return response.status(400).send('Title, author, and publishYear are required');
    }
    const book = new Book({ title, author, publishYear });
    await book.save();
    return response.status(201).send(book);
  }catch(error){
    console.error('Error occurred:', error);
    return response.status(500).send('Internal Server Error');
  }
})

// Get all books
app.get('/books', async (request, response) => {
  try {
    const books = await Book.find();
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
})

// Get a single book
app.get('/books/:id', async (request, response) => {
  try {
    const {id} = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
})

// Update a book
app.put('/books/:id', async (request, response) => {
  try {
    const {title, author, publishYear} = request.body;
    const {id} = request.params;
    if (!title || !author || !publishYear) {
      return response.status(400).send('Title, author, and publishYear are required');
    }
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send('Book not found');
    }
    return response.status(200).send('Book updated successfully');
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
})

// Delete a book
app.delete('/books/:id', async (request, response) => {
  try {
    const {id} = request.params;

    const result = await Book.findByIdAndDelete(id);

    if(!result){
      return response.status(404).send('Book not found');
    }
    return response.status(200).send('Book deleted successfully');
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

mongoose.connect(mongoDBURL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));