import mongoose from 'mongoose';
import { sample_users } from '../OurProductData.js';
import { UserModel } from '../models/user.model.js';
import { ProductModel } from '../models/product.model.js';
import { CartItemModel } from '../models/cart.model.js';
import { Available_products } from '../OurProductData.js';
import bcrypt from 'bcryptjs';

const PASSWORD_HASH_SALT_ROUNDS = 10;

export const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });



    console.log('Connected to the database successfully.');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log('User seed is already done!');
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }

  console.log('User seed is done!');
}

async function seedProducts() {
  const productsCount = await ProductModel.countDocuments();
  if (productsCount > 0) {
    console.log('Product seed is already done!');
    return;s
  }

  for (const product of Available_products) {
    product.imageUrl = `/products/${product.imageUrl}`;
    await ProductModel.create(product);
  }

  console.log('Product seed is done!');
}

async function seedCartItems() {
  const cartItemsCount = await CartItemModel.countDocuments();
  if (cartItemsCount > 0) {
    console.log('Cart item seed is already done!');
    return;
  }

  for (let cartItem of sample_cart_items) {

    
    await CartItemModel.create(cartItem);
  }

  console.log('Cart item seed is done!');
}
