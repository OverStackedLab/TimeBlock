import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Drawer } from "react-native-paper";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { setNumberOfDays } from "@/services/calendarSlice";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";

const DAY_OPTIONS = [1, 3, 5, 7];

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const numberOfDays = useAppSelector((state) => state.calendar.numberOfDays);

  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section title="Calendar">
        {DAY_OPTIONS.map((option) => (
          <Drawer.Item
            key={option}
            label={`${option} ${option === 1 ? "Day" : "Days"}`}
            icon="circle-medium"
            active={option === numberOfDays || false}
            onPress={() => {
              dispatch(setNumberOfDays(option));
              props.navigation.dispatch(DrawerActions.closeDrawer());
            }}
            theme={{
              colors: {
                secondaryContainer: theme.colors.brandPrimary, // background color
                onSecondaryContainer: theme.colors.white, // text color
              },
            }}
          />
        ))}
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}
