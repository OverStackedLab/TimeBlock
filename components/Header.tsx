import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  runOnJS,
  useAnimatedReaction,
  type SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@rneui/themed';

type HeaderProps = {
  currentDate: SharedValue<string>;
  onPressToday?: () => void;
};

const Header = ({ currentDate, onPressToday }: HeaderProps) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { top: safeTop } = useSafeAreaInsets();
  const [title, setTitle] = useState('');

  const updateTitle = (date: string) => {
    const formatted = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
    setTitle(formatted);
  };

  useAnimatedReaction(
    () => currentDate.value,
    value => {
      runOnJS(updateTitle)(value);
    },
    [],
  );

  const _onPressMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: safeTop + 16,
          backgroundColor: theme.colors.primary,
        },
      ]}>
      <StatusBar style="light" />
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.menuBtn}
        onPress={_onPressMenu}>
        <MaterialCommunityIcons
          name="menu"
          size={24}
          color={theme.colors.white}
        />
      </TouchableOpacity>
      <View style={styles.headerRightContent}>
        <Text style={[styles.headerTitle, { color: theme.colors.white }]}>
          {title}
        </Text>
        <TouchableOpacity
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          activeOpacity={0.6}
          onPress={onPressToday}>
          <MaterialCommunityIcons
            name="calendar"
            size={24}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    paddingHorizontal: 12,
  },
  menuBtn: { paddingRight: 12 },
  headerRightContent: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    flexShrink: 1,
  },
  headerTitle: { flexGrow: 1, flexShrink: 1, fontSize: 16, fontWeight: '500' },
});
