import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserAdd() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    isAdmin: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
   
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, address, isAdmin } = formData;

    const data = {
      name,
      email,
      password,
      address,
      isAdmin,
    };


    axios.post('/api/users/register', data).then((res) => {
      if (res.data.success) {
        alert('User Created Successfully');
        setFormData({
          name: '',
          email: '',
          password: '',
          address: '',
          isAdmin: false, 
        });

        navigate('/users');
      }
    });
    toast.success('User Created Successfully');
  };

  return (
    <div className="page-container">
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal"style={{ marginBottom: '5px',color:'white' }}>CREATE NEW USER</h1>
        <form className="needs-validation" noValidate>
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
            <label style={{ marginBottom: '5px' ,color:'white'}}>Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px',color:'white' }}>Password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' ,color:'white'}}>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px',color:'white' }}>IsAdmin</label>
            <input
              type="checkbox" 
              className="form-check-input"
              name="isAdmin"
              checked={formData.isAdmin} 
              onChange={handleInputChange}
            />
          </div>
          <button
            className="btn btn-success"
            type="submit"
            style={{ marginBottom: '15px'}}
            onClick={onSubmit}
          >
            <i className="far fa-check-square"></i>&nbsp; Save
          </button>
          <div>
          <button className="btn btn-success mb-4"style={{ marginLeft: '85px', marginTop:'-80px' }}>  
        <a href="/users" style={{ textDecoration: 'none', color: 'white' }}>
          Go To Users
        </a>
      </button>
      </div>
        </form>
      </div>
    </div>
  );
}

export default UserAdd;
