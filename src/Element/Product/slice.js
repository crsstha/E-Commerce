import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../../utils";
import {
  getProducts,
  getSingleProducts,
  productCategories,
  productCatSearch,
  productSearch,
} from "./action";

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: [],
    singleProduct: [],
    categories: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    decreaseQty: (state, action) => {
      if (state.singleProduct.cartQuantity === 1) {
        state.singleProduct.cartQuantity = 1;
      } else {
        state.singleProduct.cartQuantity -= 1;
      }
    },
    increaseQty: (state, action) => {
      if (state.singleProduct.cartQuantity === state.singleProduct.stock) {
        state.singleProduct.cartQuantity = 1;
      } else {
        state.singleProduct.cartQuantity += 1;
      }
    },
    totalPrice: (state) => {
      const { price, cartQuantity } = state.singleProduct;
      const itemTotal = price * cartQuantity;
      state.singleProduct.TotalPrice = itemTotal;
    },
    deleteSingleProduct: (state, action) => {
      state.singleProduct = state.singleProduct.filter(
        (val) => val.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(getSingleProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getSingleProducts.fulfilled, (state, action) => {
        const tempProduct = {
          ...action.payload,
          cartQuantity: 1,
        };
        state.singleProduct = tempProduct;
        state.status = STATUSES.IDLE;
      })
      .addCase(getSingleProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(productSearch.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(productCategories.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(productCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(productCategories.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(productCatSearch.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(productCatSearch.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(productCatSearch.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { deleteSingleProduct, decreaseQty, increaseQty, totalPrice } =
  productSlice.actions;
export default productSlice.reducer;
