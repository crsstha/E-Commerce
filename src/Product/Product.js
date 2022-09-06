
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { addCart } from "../States/cartSlice";
import { getProducts, STATUSES } from "../States/productSlice";


import "./Product.css";

export default function Product() {
  const dispatch = useDispatch();
  const { allProducts, status } = useSelector((state) => state.product);
  const { cartitems  } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (status === STATUSES.LOADING) {
    return (
        <Loader/>
        )
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }
  return (
    <div>
      <div className="top">
        <h1 className="header" >Products </h1>
        <h4 ><Link className="link" to= "./cart">Cart Item : {cartitems.length} </Link> </h4>
      </div>

      <div className="productsWrapper">
        {allProducts.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt="" />
            <h4>{product.title}</h4>
            <h5>{product.price}</h5>
            <button
              onClick={() => {
                dispatch(addCart(product));
              }}
              className="btn"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
