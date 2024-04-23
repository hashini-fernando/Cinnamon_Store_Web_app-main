import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Productsadd() {
  const [formData, setFormData] = useState({
    productid: '',
    name: '',
    volume: '',
    price: '',
    favourite: false,
    stars: '',
    imageUrl: '',
    description: '',
    tag: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const {
      productid,
      name,
      volume,
      price,
      favourite,
      stars,
      imageUrl,
      description,
      tag,
    } = formData;

    const data = {
      productid,
      name,
      volume,
      price,
      favourite,
      stars,
      imageUrl,
      description,
      tag,
    };

    axios
      .post('/api/products/add', data)
      .then((res) => {
        if (res.data.success) {
          setFormData({
            productid: '',
            name: '',
            volume: '',
            price: '',
            favourite: false,
            stars: '',
            imageUrl: '',
            description: '',
            tag: '',
          });
        }
        toast.success('Product Created Successfully');
      })
      .catch((error) => {
        console.error('Error creating product:', error);
      });
  };

  return (
    <div className="page-container">
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal"style={{color:'white', fontWeight :'bold' }}>ADD PRODUCT</h1>
        <form className="needs-validation" noValidate>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px',color:'white' }}>ProductId</label>
            <input
              type="text"
              className="form-control"
              name="productid"
              placeholder="Enter Productid"
              value={formData.productid}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px',color:'white' }}>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px',color:'white' }}>Volume</label>
            <input
              type="text"
              className="form-control"
              name="volume"
              placeholder="Enter Volume"
              value={formData.volume}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px',color:'white' }}>Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              placeholder="Enter Price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' ,color:'white'}}>Favourite</label>
            <input
              type="checkbox"
              className="form-check-input"
              name="favourite"
              checked={formData.favourite}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' ,color:'white'}}>Stars</label>
            <input
              type="text"
              className="form-control"
              name="stars"
              placeholder="Enter Stars"
              value={formData.stars}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px',color:'white' }}>ImageUrl</label>
            <input
              type="text"
              className="form-control"
              name="imageUrl"
              placeholder="Enter ImageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px',color:'white' }}>Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px',color:'white' }}>Tag</label>
            <input
              type="text"
              className="form-control"
              name="tag"
              placeholder="Enter Tag"
              value={formData.tag}
              onChange={handleInputChange}
            />
          </div>

          <button
            className="btn btn-success"
            type="submit"
            style={{ marginBottom: '15px', color:'white' }}
            onClick={onSubmit}
          >
            <i className="far fa-check-square"></i>&nbsp; Save
          </button>

          <div>
          <button className="btn btn-success mb-4"style={{ marginLeft: '85px', marginTop:'-80px' }}>  
        <a href="/productsview" style={{ textDecoration: 'none', color: 'white' }}>
          Go To Products
        </a>
      </button>
      </div>
        </form>
      </div>
    </div>
  );
}

export default Productsadd;
