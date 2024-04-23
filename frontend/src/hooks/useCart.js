
import {CartContext} from '../hooks/cartProvider.js';


import React, { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';


const CART_KEY = 'cart';
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const CartProvider = ({ children }) => {
    const initCart = getCartFromLocalStorage();
    const [cartItems, setCartItems] = useState(initCart.items);
    
    const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
    const [totalCount, setTotalCount] = useState(initCart.totalCount);

  useEffect(() => {
    const totalPrice = sum(cartItems.map(item => item.price));
    const totalCount = sum(cartItems.map(item => item.quantity));
    setTotalPrice(totalPrice);
    setTotalCount(totalCount);

    localStorage.setItem(CART_KEY, JSON.stringify({
        items: cartItems,
        totalPrice,
        totalCount,
      }));
      
  }, [cartItems]);

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
  
    try {
      
      return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
    } catch (error) {
      console.error('Error parsing JSON data from local storage:', error);
     
      return EMPTY_CART;
    }
  }
  
  const sum = items => {
    return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
  };

  const removeFromCart = productId => {
    const filteredCartItems = cartItems.filter(item => item.product.id !== productId);
    setCartItems(filteredCartItems);
  };

  const changeQuantity = (cartItem, newQuantity) => {
    const { product } = cartItem;

    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: product.price * newQuantity,
    };

    setCartItems(
      cartItems.map(item => (item.product.id === product.id ? changedCartItem : item))
    );
  };

  const addToCart = product => {
    const cartItem = cartItems.find(item => item.product.id === product.id);
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { product, quantity: 1, price: product.price }]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
export default CartProvider;
