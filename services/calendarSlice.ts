import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    numberOfDays: 3,
  },
  reducers: {
    setNumberOfDays: (state, action) => {
      state.numberOfDays = action.payload;
    },
  },
});

export const { setNumberOfDays } = calendarSlice.actions;

export const numberOfDays = (state: RootState) => state.calendar.numberOfDays;
export default calendarSlice.reducer;
