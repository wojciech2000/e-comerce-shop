import React, { useEffect, useContext } from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { DataContext } from './Components/DataContext'
import { useDispatch } from 'react-redux'
import { getAllData } from './redux/products/productsOperations'
import cookie from 'js-cookie'
import axios from 'axios'

import Header from './Components/Header'
import Products from './Components/Products'
import Product from './Components/Product'
import Cart from './Components/Cart'
import Login from './Components/Login'
import Register from './Components/Register'
import User from './Components/User'
import Admin from './Components/Admin'
import AddProduct from './Components/AddProduct'
import Footer from './Components/Footer'

function App() {

  const { setLogin, setUsername } = useContext(DataContext)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllData()) 

    axios.get('user/username')
    .then(res => setUsername(res.data))
    .catch(err => console.log(err.response.status))

    if(cookie.get('access_token'))
      setLogin(true) 
  }, [])


  return (
      <Router>
      
        <Header />
      
        <Route path="/" exact component={Products}/>
        <Route path="/product/:id" exact component={Product}/>
        <Route path="/cart" exact component={Cart}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/user" exact component={User}/>
        <Route path="/admin" exact component={Admin}/>
        <Route path="/add-product" exact component={AddProduct}/>

        <Footer />

      </Router>
  );
}

export default App;
