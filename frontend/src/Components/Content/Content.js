import React from 'react'
import classes from './Content.module.css';
import { Link } from 'react-router-dom';


export default function Content() {

    const shopnow = ()=> {}
  return (
    <>
   
    <div className = {classes.container_1}>
        <p className= {classes.para_1}>FIND THE WORLD BEST CINNAMON PRODUCTS</p>
        <p className={classes.para_2}>Organic and Conventional Cinnamon and other spices from Sri Lanka</p>
        


        <nav>
        <ul>
           <li className={classes.shopnow}>
              
              <Link to = "/ourproducts"> {shopnow} </Link> 
              <div className= {classes.button}>
              <Link to = "/ourproducts"> SHOP NOW </Link> 

              </div>
            </li>
        </ul>
      </nav>

    <div className= {classes.container_2}>
        <p className={classes.para_3}> Welcome to <span className= {classes.cinnamon}>CINNAMON STORE</span>,your premium destination for exquisite cinnamon products! We are dedicated to bringing the warmth and richness of cinnamon to your life in the most delightful ways. With a passion for quality and a commitment to your satisfaction, we offer an enticing range of handcrafted cinnamon treats that elevate your culinary experiences.Join us on a delectable adventure as we reimagine cinnamon beyond its traditional uses. Explore our online store to discover a curated selection of cinnamon-infused delights, perfect for indulging yourself or gifting to loved ones. Elevate your everyday moments with the comforting embrace of cinnamon – experience CINNAMON STORE today.</p>
    </div>
    <img src='/products/cinnamonbacground.jpg' alt='Cinnamon Background' className={classes.imageClass} />
    

  <div className = {classes.container_3}>
        <p className= {classes.para_4}>OUR NEWEST PRODUCTS</p>
       
        <p className= {classes.para_5}>Find the world best products</p>
        <hr />
    </div>
    
    </div>

   
    </>
  )
}


