import { Router } from "express";
const router = Router();
import {CartItemModel} from '../models/cart.model.js';


router.get('/products', async (req, res) => {
    try {
       
        const cartitems = await CartItemModel.find();

       
        res.json(cartitems);
    } catch (error) {
        console.error("Error while retrieving products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
  
   
      const cartitem = await CartItemModel.findById(productId);
  
      if (!cartitem) {
       
        return res.status(404).json({ error: 'Product not found' });
      }
  
    
      res.status(200).json(product);
    } catch (error) {
      console.error('Error retrieving product by ID:', error);
      res.status(500).json({ error: 'Failed to retrieve product' });
    }
  });

  router.delete('/delete/:id', async (req, res) => {
    try {
      const productId = req.params.id;
  
      const cartitem = await CartItemModel.findById(productId);
  
      if (!cartitem) {
        return res.status(404).json({ error: "cartitem not found" });
      }
  
      await CartItemModel.findByIdAndDelete(productId);
  
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error while deleting a product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

export default router;