import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Coming Soon</Text>
      <Text style={styles.description}>
        Customize your preferences and app experience here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#888',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
    maxWidth: 300,
  },
});

export default SettingsScreen;
