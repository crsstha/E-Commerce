import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { orderDetails } from "../../Element/Checkout/action";
import Moment from "moment";
export default function OrderDetail() {
  const id = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order.order);

  useEffect(() => {
    dispatch(orderDetails(id.id));
  }, [dispatch, id]);
  return (
    <Fragment>
      <div className="checkout__header">
        <h1>#Order Detail</h1>
      </div>
      <div className="order__container">
        <h1>
          Order Number{" "}
          <span style={{ color: "#017b8e" }}>#{order && order._id}</span>
        </h1>

        <div className="order__detail">
          <div className="item__summary">
            <div className="summary__header">
              <h4 id="item">Item Summary</h4>
              <h4>QTY</h4>
              <h4>Price</h4>
              <h4>Total Price</h4>
            </div>

            {order &&
              order.orderItems.map((item) => (
                <div className="summary__items">
                  <div id="item">
                    <img src={item.thumbnail} alt="" />
                    <h5> {item.title}</h5>
                  </div>

                  <h5>{item.cartQuantity}</h5>
                  <h5>{item.price}</h5>
                  <h5>{item.price * item.cartQuantity}</h5>
                </div>
              ))}
          </div>
          <div className="order__summary">
            <div className="order__info">
              <div>
                <h4 style={{ padding: "10px" }}>Order Summary</h4>
                <h5>Order Created</h5>
                <h5>Order Time</h5>
                <h5>Subtotal</h5>
                <h5>Shipping Charge</h5>
              </div>
              <div>
                <h4
                  style={{
                    background: "rgb(240, 174, 174 ,0.2)",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  {order && order.orderStatus}
                </h4>
                <h5>{Moment(order && order.createdAt).format("YYYY-MM-DD")}</h5>
                <h5>{Moment(order && order.createdAt).format("LT")}</h5>
                <h5>
                  रू
                  {(order && order.totalPrice) - (order && order.shippingPrice)}
                </h5>
                <h5>रू{order && order.shippingPrice}</h5>
              </div>
            </div>
            <div className="order__total">
              <h2>Total</h2>
              <h2>रू{order && order.totalPrice}</h2>
            </div>
            <div className="shipping__address">
              <h4>Delivery Address</h4>
              <h5>
                Address : <span>{order && order.shippingInfo.address}</span>
              </h5>
              <h5>
                City : <span>{order && order.shippingInfo.city}</span>
              </h5>
              <h5>
                State : <span>{order && order.shippingInfo.state}</span>
              </h5>
              <h5>
                Country :<span>{order && order.shippingInfo.country}</span>
              </h5>
              <h5>
                Phone Number:<span>{order && order.shippingInfo.phoneNo}</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
