import React, { useEffect, useState } from 'react';
import classes from './Product.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Price from '../../Components/Price/Price';
import StarRating from '../../Components/StarRating/StarRating';
import Tags from '../../Components/Tags/Tags';
import { useCart } from '../../hooks/useCart';
import NotFound from '../../Components/NotFound/NotFound';
import Axios from 'axios';

export default function Products() {
  const { addToCart } = useCart();
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  useEffect(() => {
    Axios.get(`api/products/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        navigate('/error');
      });
  }, [id]);

  return (
    <>
 
      {!product ? (
        <NotFound message="Product Not Found!" linkText="Back To Our Products Page" />
      ) : (
        <div className={classes.container1}>
        <div className={classes.container}>
          <img className={classes.image} src={`/products/${product.imageUrl}`} alt={product.name} />

          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name} style={{ color:'white'}}>{product.name}</span>
              <span className={`${classes.favorite} ${product.favorite ? '' : classes.not}`}>❤</span>
            </div>
            <div className={classes.rating}>
              <StarRating stars={product.stars} size={25} />
            </div>

            <div className={classes.tags}style={{ color:'black'}}>
              {product.tags && (
                <Tags tags={product.tags.map((tag) => ({ name: tag }))} forProductPage={true} />
              )}
            </div>
            <div className={classes.volume}style={{ color:'white'}}>
              <span>
                <strong>{product.volume}</strong>
              </span>
            </div>

            <div className={classes.description }style={{ color:'white'}}>{product.description}</div>

            <div className={classes.price}style={{fontWeight:'bold'}}>
              <Price price={product.price} />
            </div>

            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
        </div>
       

      )}
    </>
  );
}
