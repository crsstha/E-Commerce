import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../../utils";
import { loadUser, login, logout } from "./action";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    login_user: [],
    status: STATUSES.IDLE,
    isLogin: false,
    login_failed: [],
  },
  // reducers: {
  //   loginRequest: (state) => {
  //     state.status = STATUSES.LOADING;
  //     state.isLogin = false;
  //   },
  //   loginSuccess: (state, action) => {
  //     state.user = action.payload;
  //     state.status = STATUSES.IDLE;
  //     state.isLogin = true;
  //   },
  //   loginFailed: (state) => {
  //     state.status = STATUSES.ERROR;
  //     state.isLogin = false;
  //   },
  //   loadUserRequest: (state) => {
  //     state.status = STATUSES.LOADING;
  //     state.isLogin = false;
  //   },
  //   loadUserSuccess: (state, action) => {
  //     state.user = action.payload;
  //     state.status = STATUSES.IDLE;
  //     state.isLogin = true;
  //   },
  //   loadUserFailed: (state) => {
  //     state.status = STATUSES.ERROR;
  //     state.isLogin = false;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.isLogin = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login_user = action.payload;
        state.status = STATUSES.IDLE;
        state.isLogin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.login_failed = action.payload;
        state.status = STATUSES.ERROR;
        state.isLogin = false;
      })

      .addCase(loadUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.isLogin = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.login_user = action.payload;
        state.status = STATUSES.IDLE;
        state.isLogin = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.isLogin = false;
      })

      .addCase(logout.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.isLogin = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.login_user = action.payload;
        state.status = STATUSES.IDLE;
        state.isLogin = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.isLogin = false;
      });
  },
});

export default loginSlice.reducer;
