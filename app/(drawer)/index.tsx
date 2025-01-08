import Header from "@/components/Header";
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  DateOrDateTime,
  EventItem,
  SelectedEventType,
  type CalendarKitHandle,
  type LocaleConfigsProps,
  type OnCreateEventResponse,
} from "@howljs/calendar-kit";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  useColorScheme,
  SafeAreaView,
  Alert,
  Pressable,
  Text,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import dayjs from "dayjs";

const generateId = () => (Math.floor(Math.random() * 10000) + 1).toString();

const MIN_DATE = new Date(
  new Date().getFullYear() - 2,
  new Date().getMonth(),
  new Date().getDate()
).toISOString();

const MAX_DATE = new Date(
  new Date().getFullYear() + 2,
  new Date().getMonth(),
  new Date().getDate()
).toISOString();

const INITIAL_DATE = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
).toISOString();

const CALENDAR_THEME = {
  light: {
    colors: {
      primary: "#1a73e8",
      onPrimary: "#fff",
      background: "#fff",
      onBackground: "#000",
      border: "#dadce0",
      text: "#000",
      surface: "#ECECEC",
    },
  },
  dark: {
    colors: {
      primary: "#4E98FA",
      onPrimary: "#FFF",
      background: "#1A1B21",
      onBackground: "#FFF",
      border: "#46464C",
      text: "#FFF",
      surface: "#545454",
    },
  },
};

const initialLocales: Record<string, Partial<LocaleConfigsProps>> = {
  en: {
    weekDayShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    meridiem: { ante: "am", post: "pm" },
  },
  ja: {
    weekDayShort: "日_月_火_水_木_金_土".split("_"),
    meridiem: { ante: "午前", post: "午後" },
  },
  vi: {
    weekDayShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
    meridiem: { ante: "sa", post: "ch" },
  },
};

const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const minDate = new Date(
  new Date().getFullYear(),
  new Date().getMonth() - 4,
  new Date().getDate()
);

const DAY_OPTIONS = [1, 2, 3, 5, 7];

export default function HomeScreen() {
  const [calendarWidth, setCalendarWidth] = useState(
    Dimensions.get("window").width
  );
  const currentDate = useSharedValue(INITIAL_DATE);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [numberOfDays, setNumberOfDays] = useState(5);

  // const handleLongPressBackground = useCallback((event: DateOrDateTime) => {
  //   console.log("🚀 ~ handleLongPressBackground ~ event:", event);
  //   const newEvent = {
  //     id: generateId(),
  //     start: event,
  //     end: {
  //       dateTime: dayjs(event.dateTime).add(30, "minute").toISOString(),
  //     },
  //     title: "New Event",
  //     color: randomColor(),
  //   };

  //   setEvents((prevEvents) => [...prevEvents, newEvent]);
  // }, []);

  const handleDragCreateEventEnd = useCallback(
    (event: OnCreateEventResponse) => {
      const newEvent: EventItem = {
        ...event,
        id: generateId(),
        title: "New Event",
        color: randomColor(),
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);
    },
    []
  );

  return (
    <>
      <Header currentDate={currentDate} />
      <View style={styles.daySelector}>
        {DAY_OPTIONS.map((days) => (
          <Pressable
            key={days}
            style={[
              styles.dayOption,
              numberOfDays === days && styles.selectedDayOption,
            ]}
            onPress={() => setNumberOfDays(days)}
          >
            <Text
              style={[
                styles.dayOptionText,
                numberOfDays === days && styles.selectedDayOptionText,
              ]}
            >
              {days}D
            </Text>
          </Pressable>
        ))}
      </View>
      <CalendarContainer
        theme={CALENDAR_THEME.light}
        numberOfDays={numberOfDays}
        firstDay={1}
        calendarWidth={calendarWidth}
        initialLocales={initialLocales}
        locale="en"
        minRegularEventMinutes={30}
        initialTimeIntervalHeight={80}
        // hideWeekDays={[6, 7]}
        showWeekNumber={true}
        scrollToNow
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        initialDate={INITIAL_DATE}
        timeZone="Europe/Budapest"
        allowDragToEdit
        allowDragToCreate
        useAllDayEvent
        rightEdgeSpacing={4}
        overlapEventsSpacing={1}
        events={events}
        // onLongPressBackground={handleLongPressBackground}
        onDragCreateEventEnd={handleDragCreateEventEnd}
      >
        <CalendarHeader />
        <CalendarBody />
      </CalendarContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    height: 85,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    height: 45,
    paddingHorizontal: 24,
    backgroundColor: "#1973E7",
    justifyContent: "center",
    borderRadius: 24,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  btnText: { fontSize: 16, color: "#FFF", fontWeight: "bold" },
  daySelector: {
    flexDirection: "row",
    padding: 8,
    gap: 8,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  dayOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  selectedDayOption: {
    backgroundColor: "#1a73e8",
  },
  dayOptionText: {
    fontSize: 14,
    color: "#666",
  },
  selectedDayOptionText: {
    color: "#fff",
  },
});
