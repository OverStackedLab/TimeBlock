import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import DrawerContent from '@/components/DrawerContent';
import { useTheme } from '@react-navigation/native';
import { useSession } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';

export default function DrawerLayout() {
  const theme = useTheme();
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: theme.colors.card,
          },
        }}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'overview',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
