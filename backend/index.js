import express, { response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import bookRouter from './routes/booksRoute.js';

const app = express();

app.use(express.json());

app.use('/books', bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

mongoose.connect(mongoDBURL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));