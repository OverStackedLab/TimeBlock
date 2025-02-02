import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventItem } from "@howljs/calendar-kit";

type CalendarState = {
  numberOfDays: number;
  events: EventItem[];
};

const initialState: CalendarState = {
  numberOfDays: 1,
  events: [],
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setNumberOfDays: (state, action: PayloadAction<number>) => {
      state.numberOfDays = action.payload;
    },
    addEvent: (state, action: PayloadAction<EventItem>) => {
      state.events.push(action.payload);
    },
  },
});

export const { setNumberOfDays, addEvent } = calendarSlice.actions;

export const selectNumberOfDays = (state: RootState) =>
  state.calendar.numberOfDays;
export const selectEvents = (state: RootState) => state.calendar.events;

export default calendarSlice.reducer;
