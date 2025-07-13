import { Button, makeStyles } from '@rneui/themed';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

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
  const styles = useStyles();

  return (
    <View style={styles.screen}>
      <View style={styles.modal}>
        <Text style={styles.title}>Add a new timer</Text>
        {/* Focus Time Dropdown */}
        <Pressable style={styles.row} onPress={() => setShowFocus(!showFocus)}>
          <Text style={styles.label}>Focus time</Text>
          <Text style={styles.value}>{focus} min</Text>
        </Pressable>
        {showFocus && (
          <View style={styles.dropdown}>
            {FOCUS_OPTIONS.map(opt => (
              <Pressable
                key={opt}
                onPress={() => {
                  setFocus(opt);
                  setShowFocus(false);
                }}>
                <Text
                  style={[
                    styles.dropdownItem,
                    focus === opt && styles.selected,
                  ]}>
                  {opt} min
                </Text>
              </Pressable>
            ))}
          </View>
        )}
        {/* Short Break Dropdown */}
        <Pressable style={styles.row} onPress={() => setShowShort(!showShort)}>
          <Text style={styles.label}>Short break</Text>
          <Text style={styles.value}>{shortBreak} min</Text>
        </Pressable>
        {showShort && (
          <View style={styles.dropdown}>
            {SHORT_BREAK_OPTIONS.map(opt => (
              <Pressable
                key={opt}
                onPress={() => {
                  setShortBreak(opt);
                  setShowShort(false);
                }}>
                <Text
                  style={[
                    styles.dropdownItem,
                    shortBreak === opt && styles.selected,
                  ]}>
                  {opt} min
                </Text>
              </Pressable>
            ))}
          </View>
        )}
        {/* Long Break Dropdown */}
        <Pressable style={styles.row} onPress={() => setShowLong(!showLong)}>
          <Text style={styles.label}>Long break</Text>
          <Text style={styles.value}>{longBreak} min</Text>
        </Pressable>
        {showLong && (
          <View style={styles.dropdown}>
            {LONG_BREAK_OPTIONS.map(opt => (
              <Pressable
                key={opt}
                onPress={() => {
                  setLongBreak(opt);
                  setShowLong(false);
                }}>
                <Text
                  style={[
                    styles.dropdownItem,
                    longBreak === opt && styles.selected,
                  ]}>
                  {opt} min
                </Text>
              </Pressable>
            ))}
          </View>
        )}
        {/* Sections Picker */}
        <Pressable
          style={styles.row}
          onPress={() => setShowSections(!showSections)}>
          <Text style={styles.label}>Sections</Text>
          <Text style={styles.value}>{sections} intervals</Text>
        </Pressable>
        {showSections && (
          <View style={styles.dropdown}>
            {SECTIONS_OPTIONS.map(opt => (
              <Pressable
                key={opt}
                onPress={() => {
                  setSections(opt);
                  setShowSections(false);
                }}>
                <Text
                  style={[
                    styles.dropdownItem,
                    sections === opt && styles.selected,
                  ]}>
                  {opt}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
        {/* Buttons */}
        <View style={styles.buttonRow}>
          <Button
            title="Cancel"
            type="clear"
            titleStyle={styles.cancelText}
            buttonStyle={styles.cancelBtn}
            onPress={() => {
              setShowFocus(false);
              setShowShort(false);
              setShowLong(false);
              setShowSections(false);
            }}
          />
          <Button
            title="Save"
            buttonStyle={styles.saveBtn}
            titleStyle={styles.saveText}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '92%',
    borderRadius: 8,
    padding: 28,
  },
  title: {
    fontSize: 24,
    color: theme.colors.black,
    marginBottom: 28,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.grey1,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  label: {
    color: theme.colors.grey4,
    fontSize: 18,
  },
  value: {
    color: theme.colors.black,
    fontSize: 18,
    fontWeight: '600',
  },
  dropdown: {
    backgroundColor: theme.colors.grey1,
    borderRadius: 18,
    marginBottom: 18,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  dropdownItem: {
    color: theme.colors.grey3,
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
  },
  selected: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelBtn: {
    backgroundColor: 'transparent',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  cancelText: {
    color: theme.colors.black,
    fontSize: 18,
  },
  saveBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  saveText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
}));
