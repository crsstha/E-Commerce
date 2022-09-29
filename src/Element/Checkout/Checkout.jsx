import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import KhaltiCheckout from "khalti-checkout-web";
import config from "../../Component/Payment/khaltiConfig";
import { toast } from "react-toastify";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import {
  clear,
  decreaseCart,
  deleteCart,
  increaseCart,
  saveShippingInfo,
  totals,
} from "../Cart/slice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { postOrder } from "./action";

export default function Checkout() {
  let checkout = new KhaltiCheckout(config);
  const history = useNavigate();
  const dispatch = useDispatch();
  const { cartitems, cartTotalPrice, shippingInfo, status } = useSelector(
    (state) => state.cart
  );
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [paymentMode, setPaymentMode] = useState(shippingInfo.paymentMode);
  const [shippingFee, setShippingFee] = useState(0);
  const total = shippingFee + cartTotalPrice;

  const khalti = () => checkout.show({ amount: total * 100 });
  useEffect(() => {
    dispatch(totals());
    cartTotalPrice > 500 ? setShippingFee(50) : setShippingFee(0);
  }, [cartitems, cartTotalPrice, dispatch]);

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
        paymentMode,
      })
    );
    handleClickOpen();
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleOrder();
  };

  const handleCloses = () => {
    setOpen(false);
  };

  const handleOrder = () => {
    if (cartitems.length !== 0) {
      if (paymentMode === "Cash on Delivery") {
        const order = {
          shippingInfo: shippingInfo && shippingInfo,
          orderItems: cartitems,
          itemsPrice: cartTotalPrice,
          shippingPrice: shippingFee,
          totalPrice: total,
          paymentStatus: paymentMode,
        };
        console.log(order);
        if (status === "addressLoaded") {
          toast.success("Order has been Placed");
          dispatch(postOrder(order && order));
          history(`/orders`);
          dispatch(clear());
        } else {
          toast.error("Some Error Occured");
        }
      }
      if (paymentMode === "Online Payment") {
        khalti();
      }
    } else {
      toast.error("Cart is Empty");
    }
  };

  return (
    <div className="checkout__container">
      <div className="checkout__header">
        <h1>#Checkout</h1>
      </div>
      <div>
        <form className="checkout" onSubmit={shippingSubmit}>
          <div className="checkout__left">
            <div className="checkout__address">
              <h1>Shipping Address</h1>
              <div>
                <HomeIcon />
                <TextField
                  type="text"
                  label="Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <LocationCityIcon />
                <TextField
                  type="text"
                  label="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <PinDropIcon />
                <TextField
                  type="number"
                  label="Pin Code"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>

              <div>
                <PhoneIcon />
                <TextField
                  type="number"
                  label="Phone Number"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  size="10"
                />
              </div>

              <div>
                <PublicIcon />
                <FormControl
                  sx={{
                    width: 650,
                  }}
                >
                  <InputLabel id="label1">Country</InputLabel>
                  <Select
                    required
                    labelId="label1"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    label="Country"
                    autoWidth={true}
                  >
                    <MenuItem value="">Country</MenuItem>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <MenuItem key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>

              {country && (
                <div>
                  <TransferWithinAStationIcon />
                  <FormControl
                    sx={{
                      width: 650,
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      label="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <MenuItem value="">State</MenuItem>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <MenuItem
                            id="option"
                            key={item.isoCode}
                            value={item.name}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
              )}
            </div>
            <div className="cart__item">
              <h1>Cart item</h1>

              <table>
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
                            <DeleteIcon />
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
            </div>
          </div>

          <div className="checkout__right">
            <h1>Total</h1>
            <h3>Subtotal: रू{cartTotalPrice}</h3>
            <h3>Shipping Price: रू{shippingFee}</h3>
            <h2>Total Price: रू{total}</h2>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Payment Mode
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Payment Mode"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <MenuItem value={"Cash on Delivery"}>Cash on Delivery</MenuItem>
                <MenuItem value={"Online Payment"}>Online Payment</MenuItem>
              </Select>
            </FormControl>

            {paymentMode === "Cash on Delivery" ? (
              <Button variant="outline" type="submit" value="Continue">
                {" "}
                Order{" "}
              </Button>
            ) : (
              ""
            )}

            {paymentMode === "Online Payment" ? (
              <Button variant="outline" type="submit" value="Continue">
                {" "}
                Pay with Khalti{" "}
              </Button>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Order Request?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please Confirm Your Order
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloses} variant="contained" color="error">
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              color="success"
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
