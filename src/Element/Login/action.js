import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("login/", async (action) => {
  const { email, password } = action;
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(
    "user/auth/login",
    { email, password },
    config
  );
  return data;
});

export const loadUser = createAsyncThunk("user/", async () => {
  const { data } = await axios.get("user/me");
  return data;
});

export const logout = createAsyncThunk("logout/", async () => {
  const { data } = await axios.get("user/auth/logout");
  return data;
});
