import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "todolist",
  initialState: {
    cartitems: [],
    cartTotalPrice: 0,
    cartTotalQuantity: 0,
  },
  reducers: {
    addCart: (state, action) => {
      const cartItemIndex = state.cartitems.findIndex(
        (val) => val.id === action.payload.id
      );
      if (cartItemIndex >= 0) {
        state.cartitems[cartItemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartitems.push(tempProduct);
      }
    },

    decreaseCart: (state, action) => {
      const cartItemIndex = state.cartitems.findIndex(
        (val) => val.id === action.payload.id
      );

      if (cartItemIndex >= 0) {
        state.cartitems[cartItemIndex].cartQuantity -= 1;
      } else {
        state.cartitems.push(action.payload);
      }

      if (state.cartitems[cartItemIndex].cartQuantity === 0) {
        console.log("yes");
        state.cartitems = state.cartitems.filter(
          (val) => val.id !== action.payload.id
        );
      }
    },
    increaseCart: (state, action) => {
      const cartItemIndex = state.cartitems.findIndex(
        (val) => val.id === action.payload.id
      );
      if (cartItemIndex >= 0) {
        state.cartitems[cartItemIndex].cartQuantity += 1;
      } else {
        state.cartitems.push(action.payload);
      }
    },
    deleteCart: (state, action) => {
      state.cartitems = state.cartitems.filter(
        (val) => val.id !== action.payload.id
      );
    },

    totals : (state, action) => {
      let { total, quantity } = state.cartitems.reduce(
        (cartTotal, cartitems) => {
          const { price, cartQuantity } = cartitems;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
      
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalPrice = total;
      state.cartTotalQuantity = quantity;
    },
  },
});

export const { addCart, deleteCart, decreaseCart, increaseCart, totals } =
  cartSlice.actions;
export default cartSlice.reducer;
