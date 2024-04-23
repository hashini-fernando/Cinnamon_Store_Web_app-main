import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Users() {
  const [users, setUsers] = useState([]);

  const onDelete = (id) => {
    axios.delete(`/api/users/delete/${id}`).then((res) => {
     
      retrieveUsers();
    });
    toast.success('User Delete Successfully');
  };

  const retrieveUsers = () => {
    axios.get('/api/users/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    retrieveUsers();
  }, []);

  
  return (
    <div>
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2"style={{ fontWeight:'bolder',color:'white'}} >
          <h4>All Users</h4>
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
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Address</th>
            <th scope="col">IsAdmin</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.address}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              <td>
                <a className="btn btn-warning" href={`/useredit/${user._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Edit
                </a>
                &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(user._id)}
                >
                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-success mb-4">
        <a href="/useradd" style={{ textDecoration: 'none', color: 'white' }}>
          Create New User
        </a>
      </button>

      <div>
          <button className="btn btn-success mb-4"style={{ marginLeft: '170px', marginTop:'-97px' }}>  
        <a href="/productsview" style={{ textDecoration: 'none', color: 'white' }}>
          Products
        </a>
      </button>
      </div>
    </div>
  );
}

export default Users;
