import React from 'react'
import Product from './Product/Product'
import ToDo from './ToDo'

import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Cart from './Product/Cart';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element= {<Product/>} />
        <Route path="/todo" element= {<ToDo/>} />
        <Route path="/cart" element= {<Cart/>} />  
    </Routes>
    </BrowserRouter>

      
    
  )
}
