import React, { useCallback, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  CalendarKitHandle,
  DateOrDateTime,
  EventItem,
  OnCreateEventResponse,
} from '@howljs/calendar-kit';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addEvent } from '@/services/calendarSlice';
import { useTheme } from '@react-navigation/native';
import { MD3Colors } from 'react-native-paper';
import dayjs from 'dayjs';

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
      primary: '#ffa726',
      onPrimary: MD3Colors.primary0,
      background: MD3Colors.primary100,
      onBackground: MD3Colors.primary0,
      border: '#dadce0',
      text: MD3Colors.primary0,
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

  const _onDragCreateEventEnd = (event: OnCreateEventResponse) => {
    const newEvent: EventItem = {
      ...event,
      id: generateId(),
      title: 'New Event',
      color: theme.colors.brandPrimary,
    };

    dispatch(addEvent(newEvent));
  };

  const gotoDate = (date: string) => {
    calendarRef.current?.goToDate({
      date: date,
    });
  };

  return (
    <CalendarContainer
      ref={calendarRef}
      locale="en"
      theme={CALENDAR_THEME.light}
      initialDate={INITIAL_DATE}
      minDate={MIN_DATE}
      maxDate={MAX_DATE}
      numberOfDays={numberOfDays}
      firstDay={1}
      calendarWidth={calendarWidth}
      initialLocales={initialLocales}
      minRegularEventMinutes={30}
      initialTimeIntervalHeight={80}
      showWeekNumber
      scrollByDay
      allowDragToCreate
      onDragCreateEventEnd={_onDragCreateEventEnd}>
      <CalendarHeader />
      <CalendarBody />
    </CalendarContainer>
  );
}
