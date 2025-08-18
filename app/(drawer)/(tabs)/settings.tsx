import { useAppTheme } from '@theme/context';
import React, { useCallback, useState } from 'react';
import { Button, LayoutAnimation, ScrollView } from 'react-native';

const FOCUS_OPTIONS = [15, 20, 25, 30, 35, 40];
const SHORT_BREAK_OPTIONS = [3, 5, 7, 10];
const LONG_BREAK_OPTIONS = [10, 15, 20, 25];
const SECTIONS_OPTIONS = [2, 3, 4, 5, 6];

export default function SettingsScreen() {
  const [focus, setFocus] = useState(20);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [sections, setSections] = useState(4);
  const [showFocus, setShowFocus] = useState(false);
  const [showShort, setShowShort] = useState(false);
  const [showLong, setShowLong] = useState(false);
  const [showSections, setShowSections] = useState(false);

  const { themeContext, setThemeContextOverride } = useAppTheme();

  const toggleTheme = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate the transition
    setThemeContextOverride(themeContext === 'dark' ? 'light' : 'dark');
  }, [themeContext, setThemeContextOverride]);

  return (
    <ScrollView style={{ backgroundColor: 'white', paddingBottom: 100 }}>
      <Button
        onPress={toggleTheme}
        title="Toggle theme"
        color="#841584"
        accessibilityLabel="Toggle theme"
      />
    </ScrollView>
  );
}
