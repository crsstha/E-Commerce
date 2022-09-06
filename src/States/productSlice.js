import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = {
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
};
export const getProducts = createAsyncThunk("products/", async () => {
    const data = await axios.get('https://fakestoreapi.com/products').then((res) => {
        return res.data
    });
  return data;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: [],
    status: STATUSES.IDLE
  },
  extraReducers: (builder) =>{
    builder
    .addCase(getProducts.pending, (state, action ) =>{
        state.status =STATUSES.LOADING
    })
    .addCase(getProducts.fulfilled, (state, action ) =>{
        state.allProducts = action.payload
        state.status =STATUSES.IDLE
    })
    .addCase(getProducts.rejected, (state, action ) =>{
        state.status =STATUSES.ERROR
    })
  },
});
export default productSlice.reducer;