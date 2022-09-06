
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCart, deleteCart, increaseCart, totals } from "../States/cartSlice";
import "./Product.css";

export default function Cart() {
  const dispatch = useDispatch();
  const { cartitems , cartTotalPrice } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(totals())
},[cartitems, dispatch])

  return (
    <div>
      <h1 className="heading">Cart</h1>
      <h2 className="heading">Cart item: {cartitems.length}</h2>
      <div className="cartWrapper">
        {cartitems.map((cartitems) => (
          <div className="cartCard" key={cartitems.id}>
            <img src={cartitems.image} alt="" />
            <h4>{cartitems.title}</h4>
            <h5>{cartitems.price * cartitems.cartQuantity}</h5>
            <h5> <Button onClick={()=>{ dispatch(decreaseCart(cartitems))}} >-</Button> {cartitems.cartQuantity} <Button onClick={()=>{ dispatch(increaseCart(cartitems))}}>+</Button> </h5>
            <button onClick={()=>{ dispatch(deleteCart(cartitems))}} className="btn-Remove">Remove</button>
          </div>
        ))}
      </div>
      <div className="heading_total">Total : {cartTotalPrice}</div>
    </div>
  );
}
