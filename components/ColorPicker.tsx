import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-paper';

const COLORS = [
  // First row
  '#FF4B4B', // Red
  '#FF9500', // Orange
  '#FFD60A', // Yellow
  '#4CD964', // Green
  '#0A84FF', // Blue
  '#BF5AF2', // Purple
  '#8E8E93', // Gray

  // Second row
  '#65432F', // Brown
  '#FF2D55', // Pink
  '#00A699', // Teal
  '#D4E157', // Lime
  '#FF3D00', // Deep Orange
  '#00BCD4', // Cyan
  '#673AB7', // Deep Purple
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
              <Icon
                key={`color-${color}-${index}`}
                source="checkbox-marked-circle"
                size={28}
                color={color}
              />
            );
          }

          return (
            <Icon
              key={`color-${color}-${index}`}
              source="checkbox-blank-circle"
              size={28}
              color={color}
            />
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
