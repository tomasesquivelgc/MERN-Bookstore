import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();


// Create a new book
router.post('/', async (request, response) => {
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
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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
router.put('/:id', async (request, response) => {
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
router.delete('/:id', async (request, response) => {
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

export default router;