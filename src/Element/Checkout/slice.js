import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../../utils";
import { orderDetails, postOrder, userOrder } from "./action";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    status: STATUSES.IDLE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(userOrder.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(userOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(userOrder.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(orderDetails.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        state.order = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(orderDetails.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});
export default orderSlice.reducer;
