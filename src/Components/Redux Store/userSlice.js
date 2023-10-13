// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "soorajkj",
    userData: null,
    followers: [],
    isLoading: false,
    languageData: [],
    currentPage: 1, // Current page number
    followersPerPage: 5, // Number of followers to display per page
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLanguageData: (state, action) => {
      state.languageData = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setUsername,
  setUserData,
  setFollowers,
  setIsLoading,
  setLanguageData,
  setCurrentPage,
} = userSlice.actions;

export default userSlice.reducer;
