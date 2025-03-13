import 'react-native-reanimated';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '@rneui/themed';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { setUser } from '@/store/slices/authSlice';
import { theme } from '@/theme';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  theme.mode = colorScheme === 'dark' ? 'dark' : 'light';
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
        };
        store.dispatch(setUser(userData));
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ThemeProvider useDarkMode={colorScheme === 'dark'} theme={theme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
