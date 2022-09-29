import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Element/Product/slice";
import cartReducer from "./Element/Cart/slice";
import loginReducer from "./Element/Login/slice";
import orderReducer from "./Element/Checkout/slice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: loginReducer,
    order: orderReducer,
  },
});
export default store;
