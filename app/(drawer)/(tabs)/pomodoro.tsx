import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function PomodoroScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          🍅 Pomodoro Timer
        </ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Coming Soon
        </ThemedText>
        <ThemedText style={styles.description}>
          Focus better with the Pomodoro Technique. Track your productive work
          sessions and breaks.
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.8,
  },
  description: {
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 22,
    maxWidth: 280,
  },
});
