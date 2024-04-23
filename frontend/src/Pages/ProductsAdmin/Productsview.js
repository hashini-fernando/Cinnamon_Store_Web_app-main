import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Productsview() {
  const [products, setProducts] = useState([]);

  const onDelete = (id) => {
    axios.delete(`/api/products/delete/${id}`).then((res) => {
      
      retrieveProducts();
    });

    toast.success('Product Delete Successfully');
  };

  const retrieveProducts = () => {
    axios.get('/api/products/').then((response) => {
      setProducts(response.data);
    })
    .catch((error) => {
      console.error('Error fetching product data:', error);
    });
  };

  useEffect(() => {
    retrieveProducts();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2"style={{ fontWeight:'bolder',color:'white'}}>
          <h4>All Products</h4>
        </div>
      </div>

      <table
        className="table table-success table-striped"
        style={{ marginTop: '40px' }}
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Volume</th>
            <th scope="col">Price</th>
            <th scope="col">Stars</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <th scope="row">{index + 1}</th>
              <td>{product.name}</td>
              <td>{product.volume}</td>
              <td>{product.price}</td>
              <td>{product.stars}</td>
              <td>
                <a className="btn btn-warning" href={`/productsedit/${product._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Edit
                </a>
                &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(product._id)}
                >
                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-success mb-4">
        <a href="/productsadd" style={{ textDecoration: 'none', color: 'white' }}>
          Add New Product
        </a>
      </button>

      <div>
          <button className="btn btn-success mb-4"style={{ marginLeft: '180px', marginTop:'-97px' }}>  
        <a href="/users" style={{ textDecoration: 'none', color: 'white' }}>
          Users
        </a>
      </button>
      </div>
    </div>

  );
}

export default Productsview;
