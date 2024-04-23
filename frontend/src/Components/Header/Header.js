import React from 'react';
import classes from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/OurProducts');
  };

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          CINNAMON STORE
        </Link>

        <Link to="/HomePage" className={classes.Home}>
          HOME
        </Link>
        <Link to="/About Us" className={classes.About_Us}>
          ABOUT US
        </Link>
        <Link to="/OurProducts" className={classes.Our_products}>
          OUR PRODUCTS
        </Link>
        

        <nav>
          <ul>
            <li>
              {user ? (
                <Link to="/OurProducts">{user.name}</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>

            <li>
              <Link to="/cart">
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
            <li>
              {user && (
                <button onClick={handleLogout} className={classes.logoutButton}>
                  Logout
                </button>
              )}
            </li>
           
          </ul>
        </nav>
      </div>
    </header>


    
  );
}
