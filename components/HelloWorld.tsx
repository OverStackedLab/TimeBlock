import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface HelloWorldProps {
  name?: string;
}

export default function HelloWorld({ name = "World" }: HelloWorldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
