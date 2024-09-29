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
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

export default function HomeScreen() {
  const [calendarWidth, setCalendarWidth] = useState(
    Dimensions.get("window").width
  );
  const currentDate = useSharedValue(INITIAL_DATE);

  return (
    <>
      <Header currentDate={currentDate} />
      <CalendarContainer
        theme={CALENDAR_THEME.dark}
        numberOfDays={7}
        firstDay={1}
        calendarWidth={calendarWidth}
        allowDragToEdit
        allowDragToCreate
        initialLocales={initialLocales}
        locale="en"
        minRegularEventMinutes={5}
        // hideWeekDays={[6, 7]}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        initialDate={INITIAL_DATE}
        timeZone="Europe/Budapest"
        events={[
          {
            id: "event_3xx",
            start: {
              dateTime: "2024-09-28T05:00:00.000",
            },
            end: {
              dateTime: "2024-09-28T06:00:00.000",
            },
            title: "Event 3xx",
            color: "#5428F2",
          },
        ]}
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
});
