import { configureStore } from "@reduxjs/toolkit";
// import inputReducer from './slice'; // Adjust path if necessary
import inputReducer from "./Slice/redux";

const store = configureStore({
  reducer: {
    inputs: inputReducer,
  },
});

export default store;
