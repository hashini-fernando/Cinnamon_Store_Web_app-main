import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import productRouter from './routers/product.router.js'; 
import userRouter from './routers/user.router.js';
import cartRouter from './routers/cart.router.js';
import { dbconnect } from './config/database.config.js';
import { orderRouter } from './routers/order.router.js';

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/cartItems', cartRouter); 

const PORT = 5000;


async function startServer() {
  try {
    await dbconnect(); 
    app.listen(PORT, () => {
      console.log('Listening on port ' + PORT);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer();
