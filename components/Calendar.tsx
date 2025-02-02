import React, { useCallback, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  CalendarKitHandle,
  EventItem,
  OnCreateEventResponse,
} from '@howljs/calendar-kit';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addEvent } from '@/services/calendarSlice';
import { useTheme } from '@react-navigation/native';

const generateId = () => (Math.floor(Math.random() * 10000) + 1).toString();

const MIN_DATE = new Date(
  new Date().getFullYear() - 2,
  new Date().getMonth(),
  new Date().getDate(),
).toISOString();

const MAX_DATE = new Date(
  new Date().getFullYear() + 2,
  new Date().getMonth(),
  new Date().getDate(),
).toISOString();

export const INITIAL_DATE = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate(),
).toISOString();

const CALENDAR_THEME = {
  light: {
    colors: {
      primary: '#1a73e8',
      onPrimary: '#fff',
      background: '#fff',
      onBackground: '#000',
      border: '#dadce0',
      text: '#000',
      surface: '#ECECEC',
    },
  },
};

const initialLocales = {
  en: {
    weekDayShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    meridiem: { ante: 'am', post: 'pm' },
  },
};

export default function Calendar() {
  const calendarRef = useRef<CalendarKitHandle>(null);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [calendarWidth] = useState(Dimensions.get('window').width);
  const numberOfDays = useAppSelector(state => state.calendar.numberOfDays);
  const events = useAppSelector(state => state.calendar.events);
  const [firstDay, setFirstDay] = useState(1);
  // const [date, setDate] = useState(INITIAL_DATE);
  const handleDragCreateEventEnd = useCallback(
    (event: OnCreateEventResponse) => {
      const newEvent: EventItem = {
        ...event,
        id: generateId(),
        title: 'New Event',
        color: theme.colors.brandPrimary,
      };

      dispatch(addEvent(newEvent));
    },
    [dispatch],
  );

  const gotoDate = (date: string) => {
    calendarRef.current?.goToDate({
      date: date,
    });
  };

  return (
    <CalendarContainer
      ref={calendarRef}
      theme={CALENDAR_THEME.light}
      numberOfDays={numberOfDays}
      firstDay={7}
      calendarWidth={calendarWidth}
      initialLocales={initialLocales}
      locale="en"
      minRegularEventMinutes={30}
      initialTimeIntervalHeight={80}
      showWeekNumber={true}
      scrollToNow
      scrollByDay
      initialDate={INITIAL_DATE}
      minDate={MIN_DATE}
      maxDate={MAX_DATE}
      timeZone="Europe/Budapest"
      allowDragToEdit
      allowDragToCreate
      useAllDayEvent
      rightEdgeSpacing={4}
      overlapEventsSpacing={1}
      events={events}
      onDragCreateEventEnd={handleDragCreateEventEnd}>
      <CalendarHeader />
      <CalendarBody />
    </CalendarContainer>
  );
}
