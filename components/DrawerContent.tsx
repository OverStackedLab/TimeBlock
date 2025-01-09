import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import TrippleColumnIcon from "./icons/TrippleColumnIcon";
import DoubleColumnIcon from "./icons/DoubleColumnIcon";
import SingleColumnIcon from "./icons/SingleColumnIcon";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setNumberOfDays } from "@/services/calendarSlice";

const DAY_OPTIONS = [1, 2, 3];

export default function CustomDrawerContent(props: any) {
  const dispatch = useAppDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.title}>Calendar Settings</Text>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Options</Text>
          </View>
          <View style={styles.optionsContainer}>
            {DAY_OPTIONS.map((days) => (
              <TouchableOpacity
                key={days}
                style={[styles.option]}
                onPress={() => dispatch(setNumberOfDays(days))}
              >
                {days === 1 ? (
                  <SingleColumnIcon size={20} />
                ) : days === 2 ? (
                  <DoubleColumnIcon size={20} />
                ) : (
                  <TrippleColumnIcon size={20} />
                )}
                <Text style={styles.optionText}>{`${days} Day`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  optionsContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 2,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectedOption: {
    backgroundColor: "#1a73e8",
  },
  optionText: {
    fontSize: 14,
    color: "#666",
  },
  selectedOptionText: {
    color: "#fff",
  },
});
