import { colors as colorsLight } from './colors';
import { colors as colorsDark } from './colorsDark';
import type { Theme } from './types';

// Here we define our themes.
export const lightTheme: Theme = {
  colors: colorsLight,
  isDark: false,
};
export const darkTheme: Theme = {
  colors: colorsDark,
  isDark: true,
};
