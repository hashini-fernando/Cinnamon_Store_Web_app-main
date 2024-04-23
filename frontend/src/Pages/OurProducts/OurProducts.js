import React, { useReducer, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import NotFound from '../../Components/NotFound/NotFound';


import Thumbnails from '../../Components/Thumbnails/Thumbnails';
import Search from '../../Components/Search/Search';
import Tags from '../../Components/Tags/Tags';
import { getAll, getAllByTag , getAllTags,search } from '../../NewProducts/AvailableProducts';

const initialState = { products: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'PRODUCTS_LOADED':
      return { ...state, products: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    default:
      return state;
  } 
};

export default function OurProducts() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products, tags } = state; 
  const { searchTerm ,tag } = useParams();

  useEffect(() => {
    getAllTags().then(tags=> dispatch({type:'TAGS_LOADED',payload:tags}))
    const loadProuducts =
    tag? getAllByTag (tag )
    : searchTerm
    ?search(searchTerm)
    :getAll();
  
    loadProuducts.then(products=>  dispatch({ type: 'PRODUCTS_LOADED', payload: products }));
    
  }, [searchTerm ,tag]);

  return (
    <>
     <Search />
     <Tags tags={tags} />
     {products.length === 0 && <NotFound linkText="Reset Search"/>}
     <Thumbnails products={products} />
  
    </>
  )
}
