import { configureStore } from "@reduxjs/toolkit";
// import inputReducer from './slice'; // Adjust path if necessary
import inputReducer from "./Slice/redux";

const store = configureStore({
  reducer: {
    inputs: inputReducer,
  },
});

export default store;
// const editapi = "https://busbackend.vercel.app/seats/update/:id";
// const deleteapi = "https://busbackend.vercel.app/seats/delete/:id";
// const addapi = "https://busbackend.vercel.app/seats/create";
// const searchapi = "https://busbackend.vercel.app/seats/search";
// const readapi = "https://busbackend.vercel.app/seats/read";
