import Content from '../../Components/Content/Content';
import React, { useReducer, useEffect } from 'react';
import Thumbnails from '../../Components/Thumbnails/Thumbnails';
import { getAll } from '../../NewProducts/AvailableProducts';

const initialState = { products: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'PRODUCTS_LOADED':
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = state;

  useEffect(() => {
    getAll().then((allProducts) => {
     
      const first3Products = allProducts.slice(0, 3);
      dispatch({ type: 'PRODUCTS_LOADED', payload: first3Products });
    });
  }, []);

  return (
    <>
      <Content />
      <Thumbnails products={products} />
    </>
  );
}
