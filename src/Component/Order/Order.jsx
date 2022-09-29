import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { STATUSES } from "../../utils";

import { userOrder } from "../../Element/Checkout/action";

import "./style.css";

export default function Order() {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.order.order);

  useEffect(() => {
    dispatch(userOrder());
  }, [dispatch, status]);

  if (status === STATUSES.LOADING) {
    return <Loader />;
  }
  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }
  return (
    <div>
      <div className="checkout__header">
        <h1>#Your Orders</h1>
      </div>
      <div className="order__list">
        <div className="order__header">
          <h2 id="onum">Order Number</h2>
          <h2>Order Status</h2>
          <h2>Total Price</h2>
          <h2>Items</h2>
        </div>
        {orders &&
          orders.map((order) => (
            <div key={order.id}>
              <Link to={`/order/${order._id}`} className="orders">
                <h3 id="oid">#{order._id}</h3>
                <h3>{order.orderStatus}</h3>
                <h3>रू{order.totalPrice}</h3>
                <h3>{order.orderItems.length}</h3>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
