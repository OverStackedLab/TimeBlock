import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useColorScheme } from '@hooks/useColorScheme';
import { useTheme } from '@rneui/themed';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.tint,
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
          title: 'Pomodoro',
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
          title: 'Settings',
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons
                size={28}
                name="cog-outline"
                color={color}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
