import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './router/AuthRoute.js';
import bookRouter from './router/BookRoute.js';

const app = express();

// Middleware
app.use(express.json()); // Corrected the usage of express.json()
app.use(morgan('tiny'));
app.use(cookieParser())

// Routes
app.use('/api/auth',authRouter);
app.use('/api/books',bookRouter );


app.listen(5000, () => {
  console.log('Server connected on http://localhost:5000/');
});
