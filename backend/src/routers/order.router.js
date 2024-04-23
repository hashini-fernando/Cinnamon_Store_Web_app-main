import { Router } from 'express';
import auth from '../auth.mid.js';
import { OrderModel } from '../models/order.model.js';

const OrderStatus = {
  NEW: 'NEW',
  PAYED: 'PAYED',
  SHIPPED: 'SHIPPED',
  CANCELED: 'CANCELED',
  REFUNDED: 'REFUNDED',
};

const router = Router();
router.use(auth);


router.get('/', async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.post('/create', async (req, res) => {
  try {
    const newOrderData = req.body; 

    
    const newOrder = await OrderModel.create(newOrderData);

   
    await newOrder.save();

    

    res.status(201).json({ message: 'Registration successful', order: newOrder });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});


router.get('/:orderId', async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put('/:orderId', async (req, res) => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.orderId,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:orderId', async (req, res) => {
  try {
    const deletedOrder = await OrderModel.findByIdAndRemove(req.params.orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(deletedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/payment', async (req, res) => {
  try {
   
    const newOrderData = req.body;

 
    const newOrder = await OrderModel.create(newOrderData);

    res.json({ message: 'Payment details added successfully', newOrderId: newOrder._id });
  } catch (error) {
    console.error('Error adding payment details:', error);
    res.status(500).json({ error: 'Could not add payment details to the database' });
  }
});


export { router as orderRouter };
