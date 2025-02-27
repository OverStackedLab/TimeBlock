import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
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
import { MD3Colors } from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';
import EventBottomSheet from './EventBottomSheet';

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
    nowIndicatorColor: MD3Colors.error50,
    eventTitleStyle: {
      color: MD3Colors.primary100,
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
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const _onDragCreateEventEnd = (event: OnCreateEventResponse) => {
    const newEvent: EventItem = {
      ...event,
      id: generateId(),
      title: 'New Event',
      color: theme.colors.brandPrimary,
      extendedProps: {
        description: '',
      },
    };

    dispatch(addEvent(newEvent));
  };

  const gotoDate = (date: string) => {
    calendarRef.current?.goToDate({
      date: date,
    });
  };

  const _onPressEvent = useCallback((event: EventItem) => {
    setSelectedEvent(event);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
        events={events}
        onDragCreateEventEnd={_onDragCreateEventEnd}
        onPressEvent={_onPressEvent}>
        <CalendarHeader />
        <CalendarBody />
      </CalendarContainer>
      <EventBottomSheet event={selectedEvent} bottomSheetRef={bottomSheetRef} />
    </View>
  );
}
