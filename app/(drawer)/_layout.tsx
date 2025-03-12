import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import DrawerContent from '@/components/DrawerContent';
import { Redirect } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function DrawerLayout() {
  const { user } = useAppSelector(state => state.auth);

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
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
