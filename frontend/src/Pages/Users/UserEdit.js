import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserEdit() {
  const { id } = useParams(); // Get the user ID from the URL parameter
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    isAdmin: false,
  });

  useEffect(() => {
    // Fetch user data for editing when the component mounts
    axios.get(`/api/users/users/${id}`).then((response) => {
      const userData = response.data;
      setFormData(userData);
    });
  }, [id]);

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

   
    axios.put(`/api/users/users/${id}`, data).then((res) => {
      if (res.data.success) {
        alert('User Updated Successfully');
        navigate('/users');
      }
      
    });
    toast.success('User Edited Successfully');
    
  };

  return (
    <div className="page-container">
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal"style={{ marginBottom: '5px',color:'white' }}>EDIT USER</h1>
        <form className="needs-validation" noValidate>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' ,color:'white'}}>Name</label>
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
            <label style={{ marginBottom: '5px' ,color:'white'}}>Password</label>
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
            <label style={{ marginBottom: '5px',color:'white' }}>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '15px',color:'white' }}>
            <label style={{ marginBottom: '5px' }}>IsAdmin</label>
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
            style={{ marginBottom: '15px' ,color:'white'}}
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

export default UserEdit;
