import { Router } from "express";
import { Available_products, Available_tags } from "../OurProductData.js";
const router = Router();
import { ProductModel } from '../models/product.model.js';

router.post('/add', async (req, res) => {
    try {
    
      const newProductData = req.body;
  
      
      const newProduct = await ProductModel.create(newProductData);
  
      res.json({ message: 'New product added successfully', newProductId: newProduct._id });
    } catch (error) {
      console.error('Error adding a new product:', error);
      res.status(500).json({ error: 'Could not add the new product to the database' });
    }
  });

  router.get('/', async (req, res) => {
    try {
       
        const products = await ProductModel.find();

       
        res.json(products);
    } catch (error) {
        console.error("Error while retrieving products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

 
    const product = await ProductModel.findById(productId);

    if (!product) {
     
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

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await ProductModel.findByIdAndDelete(productId);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error while deleting a product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body;


    const product = await ProductModel.findByIdAndUpdate(productId, updatedProductData, { new: true });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully", updatedProduct: product });
  } catch (error) {
    console.error("Error while updating a product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get('/tags', (req, res) => {
    res.send(Available_tags);
});

router.get('/search/:searchTerm', (req, res) => {
    const { searchTerm } = req.params; 
    const decodedSearchTerm = decodeURIComponent(searchTerm); 
    const products = Available_products.filter(item =>
        item.name.toLowerCase().includes(decodedSearchTerm.toLowerCase())
    );
    res.json(products);
});

router.get('/tag/tag', (req, res) => {
  const { tagName } = req.params;

 
  const filteredProducts = Available_products.filter((product) =>
    product.tags?.includes(tagName)
  );

  res.json(filteredProducts);
});




 
export default router;
