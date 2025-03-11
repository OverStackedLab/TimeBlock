import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  CalendarKitHandle,
  EventItem,
  OnCreateEventResponse,
  SelectedEventType,
} from '@howljs/calendar-kit';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addEvent, updateEvent } from '@/store/slices/calendarSlice';
import { useTheme } from '@rneui/themed';
import BottomSheet from '@gorhom/bottom-sheet';
import EventBottomSheet from './EventBottomSheet';
import Header from './Header';
import { useSharedValue } from 'react-native-reanimated';
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
      primary: '#f57c00',
      onPrimary: '#fff',
      background: '#fff',
      onBackground: '#000',
      border: '#dadce0',
      text: '#000',
      surface: '#ECECEC',
    },
    nowIndicatorColor: '#d32f2f',
    eventTitleStyle: {
      color: '#fff',
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
  const currentDate = useSharedValue(INITIAL_DATE);
  const calendarRef = useRef<CalendarKitHandle>(null);
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const [calendarWidth] = useState(Dimensions.get('window').width);
  const numberOfDays = useAppSelector(state => state.calendar.numberOfDays);
  const events = useAppSelector(state => state.calendar.events);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem>();
  const [activeEvent, setActiveEvent] = useState<EventItem>();

  const _onPressToday = useCallback(() => {
    calendarRef.current?.goToDate({
      date: new Date().toISOString(),
      animatedDate: true,
      hourScroll: true,
    });
  }, []);

  const _onDragCreateEventEnd = (event: OnCreateEventResponse) => {
    const newEvent: EventItem = {
      ...event,
      id: generateId(),
      title: 'New Block',
      color: theme.colors.primary,
      extendedProps: {
        description: '',
      },
    };

    dispatch(addEvent(newEvent));
    setSelectedEvent(undefined);
  };

  const _onLongPressEvent = useCallback((event: EventItem) => {
    setActiveEvent(event);
    bottomSheetRef.current?.snapToIndex(0);
    setSelectedEvent(undefined);
  }, []);

  const _onPressEvent = useCallback((event: EventItem) => {
    setSelectedEvent(event);
  }, []);

  const _onDragSelectedEventEnd = useCallback(
    (event: SelectedEventType) => {
      if (event.id) {
        const updatedEvent: EventItem = {
          ...event,
          id: event.id,
          title: event.title || 'New Block',
          start: event.start,
          end: event.end,
          color: event.color || theme.colors.primary,
        };
        dispatch(updateEvent(updatedEvent));
        setSelectedEvent(undefined);
      }
    },
    [theme.colors.primary],
  );

  return (
    <View style={{ flex: 1 }}>
      <Header currentDate={currentDate} onPressToday={_onPressToday} />
      <CalendarContainer
        ref={calendarRef}
        locale="en"
        theme={CALENDAR_THEME.light}
        initialDate={INITIAL_DATE}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        numberOfDays={numberOfDays}
        calendarWidth={calendarWidth}
        initialLocales={initialLocales}
        defaultDuration={30}
        dragStep={5}
        firstDay={1}
        minRegularEventMinutes={30}
        initialTimeIntervalHeight={80}
        showWeekNumber
        scrollByDay
        allowDragToCreate
        allowDragToEdit
        events={events}
        selectedEvent={selectedEvent}
        onPressBackground={() => {
          setSelectedEvent(undefined);
        }}
        onLongPressEvent={_onLongPressEvent}
        onPressEvent={_onPressEvent}
        onDragCreateEventEnd={_onDragCreateEventEnd}
        onDragSelectedEventEnd={_onDragSelectedEventEnd}>
        <CalendarHeader />
        <CalendarBody />
      </CalendarContainer>
      {/* <EventBottomSheet
        event={activeEvent}
        bottomSheetRef={bottomSheetRef}
        setSelectedEvent={setSelectedEvent}
      /> */}
    </View>
  );
}
