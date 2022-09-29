import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("products/", async (limit) => {
  const data = await axios
    .get(`https://dummyjson.com/products?limit=${limit ? limit : 1000}`)
    .then((res) => {
      return res.data.products;
    });
  return data;
});

export const productSearch = createAsyncThunk(
  "products/search/",
  async (keyword) => {
    const data = await axios
      .get(`https://dummyjson.com/products/search?q=${keyword}`)
      .then((res) => {
        return res.data.products;
      });
    return data;
  }
);

export const productCategories = createAsyncThunk(
  "products/categories",
  async () => {
    const data = await axios
      .get(`https://dummyjson.com/products/categories`)
      .then((res) => {
        return res.data;
      });

    console.log(data);
    return data;
  }
);

export const productCatSearch = createAsyncThunk(
  "products/category",
  async (keyword) => {
    const data = await axios
      .get(`https://dummyjson.com/products/category/${keyword}`)
      .then((res) => {
        return res.data.products;
      });
    return data;
  }
);

export const getSingleProducts = createAsyncThunk("product/", async (id) => {
  const data = await axios
    .get(`https://dummyjson.com/products/${id.id}`)
    .then((res) => {
      return res.data;
    });
  return data;
});
