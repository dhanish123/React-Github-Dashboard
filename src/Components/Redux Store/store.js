// Create a Redux Store:

// Set up the Redux store
// in our application by creating a store configuration file (e.g., store.js):

// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import the slice you created
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
