import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
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
    </Tabs>
  );
}
