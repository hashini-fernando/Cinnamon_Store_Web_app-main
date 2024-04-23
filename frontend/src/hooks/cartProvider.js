import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests


const CartContext = createContext(null);
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

      const removeFromCart = async productId => {
        try {
          await axios.delete(`/api/cart/remove/${productId}`); // Make DELETE request to remove item from cart
          setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      };
    
      const changeQuantity = async (cartItem, newQuantity) => {
        try {
          const { product } = cartItem;
          await axios.put(`/api/cart/update/${product.id}`, { quantity: newQuantity }); // Make PUT request to update item quantity
          const updatedItems = cartItems.map(item =>
            item.product.id === product.id ? { ...item, quantity: newQuantity } : item
          );
          setCartItems(updatedItems);
        } catch (error) {
          console.error('Error updating item quantity:', error);
        }
      };
    
      const addToCart = async product => {
        try {
          const existingItem = cartItems.find(item => item.product.id === product.id);
          if (existingItem) {
            await changeQuantity(existingItem, existingItem.quantity + 1);
          } else {
            await axios.post('/api/cart/add', { productId: product.id, quantity: 1 }); // Make POST request to add item to cart
            setCartItems(prevItems => [...prevItems, { product, quantity: 1, price: product.price }]);
          }
        } catch (error) {
          console.error('Error adding item to cart:', error);
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
    };

    export { CartProvider, CartContext };
