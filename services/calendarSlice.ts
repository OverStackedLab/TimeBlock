import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventItem } from '@howljs/calendar-kit';

type CalendarState = {
  numberOfDays: number;
  events: EventItem[];
};

const initialState: CalendarState = {
  numberOfDays: 1,
  events: [],
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setNumberOfDays: (state, action: PayloadAction<number>) => {
      state.numberOfDays = action.payload;
    },
    addEvent: (state, action: PayloadAction<EventItem>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<EventItem>) => {
      const index = state.events.findIndex(
        event => event.id === action.payload.id,
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
  },
});

export const { setNumberOfDays, addEvent, updateEvent, deleteEvent } =
  calendarSlice.actions;

export const selectNumberOfDays = (state: RootState) =>
  state.calendar.numberOfDays;
export const selectEvents = (state: RootState) => state.calendar.events;

export const selectEventById = (state: RootState, eventId: string) =>
  state.calendar.events.find(event => event.id === eventId);

export default calendarSlice.reducer;
