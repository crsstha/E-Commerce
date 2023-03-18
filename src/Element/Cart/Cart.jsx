import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCart, deleteCart, increaseCart, totals } from "./slice";
import "../../Element/Product/style.css";
import "./style.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const { cartitems, cartTotalPrice } = useSelector((state) => state.cart);
  const [shippingFee, setShippingFee] = useState(0);

  const total = shippingFee + cartTotalPrice;

  useEffect(() => {
    dispatch(totals());
    cartTotalPrice > 500 ? setShippingFee(50) : setShippingFee(0);
  }, [cartitems, cartTotalPrice, dispatch]);

  return (
    <div className="cart__container">
      <div className="cart__header">
        <h1>#Cart</h1>
        <h2>Cart item: {cartitems.length}</h2>
      </div>
      <div className="cartWrapper">
        {cartitems.length === 0 ? (
          <div> No Product in Cart</div>
        ) : (
          <table className="table">
            <thead id="theading">
              <tr>
                <th>Remove</th>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            {cartitems.map((cartitems) => {
              return (
                <tbody>
                  <tr key={cartitems.id}>
                    <td>
                      <button
                        onClick={() => {
                          dispatch(deleteCart(cartitems));
                          toast.error("Product is Removed from Cart");
                        }}
                        className="btn-Remove"
                      >
                        {" "}
                        Remove
                      </button>
                    </td>
                    <td>
                      <img src={cartitems.thumbnail} alt="" />
                    </td>
                    <td>
                      <p>{cartitems.title}</p>
                    </td>
                    <td>रू{cartitems.price}</td>
                    <td>
                      <h5>
                        {" "}
                        <Button
                          onClick={() => {
                            dispatch(decreaseCart(cartitems));
                          }}
                        >
                          -
                        </Button>{" "}
                        {cartitems.cartQuantity}{" "}
                        <Button
                          onClick={() => {
                            dispatch(increaseCart(cartitems));
                          }}
                        >
                          +
                        </Button>{" "}
                      </h5>
                    </td>
                    <td>रू{cartitems.price * cartitems.cartQuantity}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
      </div>

      <div className="cart__bottom">
        <div className=""></div>
        <div className="cart__total">
          <h3>Cart Total</h3>
          <table>
            <tr>
              <td>Cart Subtotal</td>
              <td>रू{cartTotalPrice}</td>
            </tr>
            <tr>
              <td>Shipping Fee</td>
              <td>{shippingFee === 0 ? "Free" : "रू" + shippingFee}</td>
            </tr>
            <tr>
              <td>
                <span>Total</span>
              </td>
              <td>
                <span>रू{total} </span>
              </td>
            </tr>
            <div className="procced">
              <Link id="btn__cart" to={`/checkout`}>
                {" "}
                Procceed to Checkout
              </Link>
            </div>
          </table>
        </div>
      </div>
    </div>
  );
}
