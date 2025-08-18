import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '@theme/context';
import { ThemedStyle } from '@theme/types';
import { router, Tabs } from 'expo-router';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();
  const {
    themed,
    theme: { colors },
  } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tint,
        tabBarStyle: themed([$tabBar, { height: bottom + 70 }]),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Blocks',
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons
                size={28}
                name="calendar-cursor"
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="pomodoro"
        options={{
          headerShown: true,
          headerTitle: 'Un Pomodoro',
          headerStyle: {
            // backgroundColor: theme.colors.primary,
            // height: 115,
          },
          headerTitleStyle: {
            // color: theme.colors.white,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 5 }}>
              <MaterialCommunityIcons
                name="menu"
                size={24}
                // color={theme.colors.white}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons
                size={28}
                name="timer-outline"
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          headerTitle: 'Settings',
          headerStyle: {
            // backgroundColor: theme.colors.primary,
            // height: 115,
          },
          headerTitleStyle: {
            // color: theme.colors.white,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 5 }}>
              <MaterialCommunityIcons
                name="menu"
                size={24}
                // color={theme.colors.white}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons
                size={28}
                name="timer-outline"
                color={color}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
});
