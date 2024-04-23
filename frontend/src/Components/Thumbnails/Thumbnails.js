import React from 'react'
import classes from './Thumbnail.module.css'
import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import Price from '../Price/Price';


export default function Thumbnails({products}) {
  return (
    <ul className= {classes.list}>
    {products.map(product => (
        <li key = {product.id}>
            <Link to = {`/product/${product.id}`}>
            <img 
            className={classes.image}
            src = {`/products/${product.imageUrl}`}
            alt = {products.name}
            />
          
          <div className= {classes.content1}>
            <div className={classes.name}>{product.name}</div>
            <span
              className={`${classes.favourite}${product.favourite?'': classes.not
            }`}
            >
            ❤
            </span>
            <div className= {classes.stars}>
              <StarRating stars = {product.stars}/>
            </div>
            <div className={classes.product_item_footer}>
              <div className= {classes.volumes}>
              {product.volume}
              </div>
            </div>

            <div className ={classes.price}>
            <Price price = {product.price}/>
            </div>

           
            
          </div>
         
          </Link>
        </li> 
        
       ))}
    </ul>
  );
  }


  

