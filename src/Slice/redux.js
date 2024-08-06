import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Tablemanuplation: {
    seatnumber: null,
    date: null,
  },
};
const InputSlice = createSlice({
  name: "inputs",
  initialState,
  reducers: {
    setSeatNumber: (state, action) => {
      state.Tablemanuplation.data = action.payload;
    },
    setDate: (state, action) => {
      state.Tablemanuplation.date = action.payload;
    },
  },
});

// Export actions
export const { setSeatNumber, setDate } = InputSlice.actions;

// Export reducer
export default InputSlice.reducer;
