import { configureStore } from "@reduxjs/toolkit";
import todolistReducer from "./todoSlice"
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"

const store = configureStore({
  reducer: {
    todolist: todolistReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
export default store;
