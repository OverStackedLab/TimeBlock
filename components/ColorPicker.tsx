import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-paper';

const COLORS = [
  // First row
  '#f44336', // Red
  '#f57c00', // Orange
  '#fdd835', // Yellow
  '#4caf50', // Green
  '#2196f3', // Blue
  '#ab47bc', // Purple
  '#9e9e9e', // Gray

  // Second row
  '#6d4c41', // Brown
  '#e91e63', // Pink
  '#e64a19', // Deep Orange
  '#673ab7', // Deep Purple
  '#607d8b', // Blue Grey
  '#3f51b5', // Indigo
  '#00bcd4', // Cyan
  '#009688', // Teal
  '#8bc34a', // Light Green
  '#cddc39', // Lime
];

type ColorPickerProps = {
  selectedColor: string;
  onSelectColor: (color: string) => void;
};

export default function ColorPicker({
  selectedColor,
  onSelectColor,
}: ColorPickerProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {COLORS.map((color, index) => {
          if (selectedColor === color) {
            return (
              <Pressable
                key={`color-${color}-${index}`}
                onPress={() => onSelectColor(color)}>
                <Icon source="checkbox-marked-circle" size={28} color={color} />
              </Pressable>
            );
          }

          return (
            <Pressable
              key={`color-${color}-${index}`}
              onPress={() => onSelectColor(color)}>
              <Icon source="checkbox-blank-circle" size={28} color={color} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
  },
  colorButton: {
    width: 24,
    height: 24,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  checkmarkStem: {
    position: 'absolute',
    width: 2,
    height: 10,
    backgroundColor: 'white',
    bottom: 5,
    left: 8,
    transform: [{ rotate: '45deg' }],
  },
  checkmarkKick: {
    position: 'absolute',
    width: 2,
    height: 6,
    backgroundColor: 'white',
    bottom: 7,
    left: 4,
    transform: [{ rotate: '-45deg' }],
  },
});
