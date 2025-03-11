import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { useColorScheme } from '@/hooks/useColorScheme';
import merge from 'deepmerge';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const CombinedLightTheme = merge(
  {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      brandPrimary: '#f57c00',
      primary: '#f57c00',
      white: '#FFF',
      card: '#fafafa',
    },
  },
  NavigationDefaultTheme,
);
const CombinedDarkTheme = merge(
  {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      brandPrimary: '#f57c00',
      primary: '#f57c00',
      white: '#FFF',
      card: '#fafafa',
    },
  },
  NavigationDarkTheme,
);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const paperTheme =
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={paperTheme}>
          <ThemeProvider value={paperTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            </Stack>
          </ThemeProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
