import React from "react";
import Header from "@/components/Header";
import Calendar, { INITIAL_DATE } from "@/components/Calendar";
import { useSharedValue } from "react-native-reanimated";

export default function HomeScreen() {
  const currentDate = useSharedValue(INITIAL_DATE);

  return (
    <>
      <Header currentDate={currentDate} />
      <Calendar />
    </>
  );
}
