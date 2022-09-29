import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postOrder = createAsyncThunk("orders/", async (order) => {
  console.log(order);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.post("order/order/new", order, config);

  return data;
});

export const userOrder = createAsyncThunk("myOrder/", async () => {
  const data = await axios.get(`order/orders/me`).then((res) => {
    return res.data;
  });
  return data;
});

export const orderDetails = createAsyncThunk("orderDetails/", async (id) => {
  const data = await axios.get(`order/${id}`).then((res) => {
    return res.data;
  });
  return data;
});
