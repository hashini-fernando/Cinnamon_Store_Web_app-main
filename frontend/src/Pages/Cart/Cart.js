  import React from 'react';
  import { useCart } from '../../hooks/useCart';
  import classes from './Cart.module.css';
  import Title from '../../Components/Title/Title';
  import { Link } from 'react-router-dom';
  import Price from '../../Components/Price/Price';
  import NotFound from '../../Components/NotFound/NotFound';

  export default function Cart() {
    const { cart, removeFromCart, changeQuantity } = useCart();

    return (
      <>
        <Title title="CART PAGE" margin="1.5rem 0 0 2.5rem"   />

        {cart.items.length === 0 ? (
          <NotFound message="Cart Page Is Empty!" />
        ) : (
          <div className={classes.container}>
            <ul className={classes.list}>
              {cart.items.map((item) => (
                <li key={item.product.id}>
                  <div>
                    <img src={`/products/${item.product.imageUrl}`} alt={item.product.name} />
                  </div>
                  <div>
                    <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                  </div>

                  <div>
                    <select
                      value={item.quantity}
                      onChange={(e) => changeQuantity(item, Number(e.target.value))}
                    >
                      {[...Array(10).keys()].map((index) => (
                        <option key={index + 1}>{index + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Price price={item.price} />
                  </div>
                  <div>
                    <button
                      className={classes.remove_button}
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className={classes.checkout}>
              <div>
                <div className={classes.products_count}>{cart.totalCount}</div>
                <div className={classes.total_price}>
                  <Price price={cart.totalPrice} />
                </div>
              </div>

              <Link to="/payment">Proceed To payment</Link>
            </div>
          </div>
        )}
      </>
    );
  }
