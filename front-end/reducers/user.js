import { createSlice } from "@reduxjs/toolkit";
import { signup, login, userinfo, patchUserinfo, myinfo } from "../actions/user";

const initialState = {
  // 내 정보
  me: false,
  // 유저 정보
  userInfo: false,
  // 회원가입
  signupLoading: false,
  signupDone: false,
  signupError: null,
  // 로그인
  loginLoading: false,
  loginDone: false,
  loginError: null,
  // 로그아웃
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  // 내 정보 조회
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  // 유저 정보 수정
  patchUserLoading: false,
  patchUserDone: false,
  patchUserError: null,
  /* By 지의신 Portfolio */
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.me = false;
    },
    addLoginStatus(state, action) {
      state.isLoggedin = action.payload;
    },
    checkLoggedin(state) {
      state.isLoggedinCheck = true;
    },
    /* By 지의신 Portfolio */
    addPortfolioToMe(state, action) {
      state.me.Portfolios.unshift({ id: action.payload });
    },
  },
  extraReducers: (builder) =>
    builder
      // login
      .addCase(login.pending, (state) => {
        console.log("pending");
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginDone = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("rejected");
        state.loginLoading = false;
        state.loginError = action.payload;
      })
      // signup
      .addCase(signup.pending, (state) => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.signupLoading = false;
        state.signupDone = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.payload;
      })
      .addCase(myinfo.pending, (state) => {
        state.loadMyInfoLoading = true;
        state.loadMyInfoDone = false;
        state.loadMyInfoError = null;
      })
      .addCase(myinfo.fulfilled, (state, action) => {
        state.loadMyInfoLoading = false;
        state.me = action.payload;
        state.loadMyInfoDone = true;
      })
      .addCase(myinfo.rejected, (state, action) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoError = action.error.message;
      })
      .addCase(patchUserinfo.pending, (state) => {
        state.patchUserLoading = true;
        state.patchUserDone = false;
        state.patchUserError = null;
      })
      .addCase(patchUserinfo.fulfilled, (state, action) => {
        state.patchUserLoading = false;
        state.patchUserDone = true;
        state.me = action.payload;
      })
      .addCase(patchUserinfo.rejected, (state, action) => {
        state.patchUserLoading = false;
        state.patchUserError = action.payload;
      })
      .addDefaultCase((state) => state),
});

export default userSlice;