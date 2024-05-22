import express, { response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  console.log('Request received');
  return response.status(200).send('Hello, World!');
});

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

mongoose.connect(mongoDBURL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));