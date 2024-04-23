import React from 'react';
import classes from'./cinnamon.module.css';




export default function Cinnamon() {


  const pageStyle = {
  
    margin: 0,
    padding: 0,
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };
  
  const headingStyle = {
    fontSize: '36px',
    color: '#990000', 
    fontWeight: 'bold', 
    textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    margin: '20px',
    padding: '20px', 
    borderRadius: '10px', 
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', 
  };

  return (
    <div  className = {classes.background} style={pageStyle}>
    <div className="container" style={pageStyle}>
     
      <h1 style={headingStyle}>
        Welcome to <span style={{ color: '#000' }}>CINNAMON STORE</span>
      </h1>
      <button className={classes.button}>  
        <a href="/login ">
     Login 
        </a>
      </button>
    </div>

  
    </div>
  );
}
