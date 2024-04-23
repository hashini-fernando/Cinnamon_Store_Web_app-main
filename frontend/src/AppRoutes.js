import React from 'react';
import {Route,Routes } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage';
import OurProducts from './Pages/OurProducts/OurProducts'
import Products from './Pages/Products/Products';
import Cart from './Pages/Cart/Cart';
import LoginPage from './Pages/Login/LoginPage';
import AboutUs from './Pages/AboutUs/AboutUs'
import Register from './Pages/Register/Register';
import Payment from './Pages/Payment/Payment';
import Order from './Pages/Order/Order';
import Users from './Pages/Users/Users';
import UserEdit from './Pages/Users/UserEdit';
import UserAdd from './Pages/Users/UserAdd';
import  Cinnamon from './Pages/Cinnamon/Cinnamon';
import Productsadd from './Pages/ProductsAdmin/Productsadd';
import Productsveiw from './Pages/ProductsAdmin/Productsview';
import ProductsEdit from './Pages/ProductsAdmin/ProductsEdit'


export default function AppRoute() {
    return ( 
    <Routes>
      <Route path ='/'element = {<Cinnamon/>}/>
      <Route path ='/HomePage'element = {<HomePage/>}/>
      <Route path = "/OurProducts" element = {<OurProducts/>}/>
      <Route path = "/About Us" element = {<AboutUs/>}/>
      <Route path = "/search/:searchTerm" element = {<OurProducts/>}/>
      <Route path = "/tag/:tag" element = {<OurProducts/>}/>
      <Route path = "/product/:id" element = {<Products/>}/>
      <Route path = "/cart" element = {<Cart/>}/>
      <Route path = "/login" element = {<LoginPage/>}/>
      <Route path = "/register" element = {<Register/>}/>
      <Route path = "/users" element = {<Users/>}/>
      <Route path = "/useredit/:id" element = {<UserEdit/>}/>
      <Route path = "/useradd" element = {<UserAdd/>}/>
      <Route path = "/productsadd" element = {<Productsadd/>}/>
      <Route path = "/productsedit/:id" element = {<ProductsEdit/>}/>
      <Route path = "/productsview" element = {<Productsveiw/>}/>
     
      
    
   <Route path = "/payment" element = {<Payment/>}/>
   <Route path = "/orders" element = {<Order/>}/>
    </Routes>

    );
  }