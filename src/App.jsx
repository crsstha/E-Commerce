import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Component/Navbar/Navbar";

import { ToastContainer } from "react-toastify";
import store from "./store";
import { loadUser } from "./Element/Login/action";
import Home from "./Component/Home/Home";
import Login from "./Element/Login";
import Cart from "./Element/Cart/Cart";
import Footer from "./Component/Footer/Footer";
import ProductDetails from "./Element/Product/ProductDetails";
import Checkout from "./Element/Checkout/Checkout";
import Order from "./Component/Order/Order";
import OrderDetail from "./Component/Order/OrderDetail";
import CheckoutBuy from "./Element/Checkout/CheckoutBuy";
import AllProduct from "./Element/Product/AllProduct";
import Profile from "./Component/Profile";
import Contact from "./Component/Contact";

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<AllProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkoutBuy" element={<CheckoutBuy />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer />
    </BrowserRouter>
  );
}
