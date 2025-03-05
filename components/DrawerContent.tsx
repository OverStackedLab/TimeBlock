import React from 'react';
import {
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Drawer } from 'react-native-paper';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setNumberOfDays } from '@/services/calendarSlice';
import { useTheme } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { signOutSuccess } from '@/store/slices/authSlice';

const DAY_OPTIONS = [1, 3, 5, 7];

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const numberOfDays = useAppSelector(state => state.calendar.numberOfDays);
  // const { user } = useAppSelector(state => state.auth);

  const handleLogout = async () => {
    dispatch(signOutSuccess());
    router.replace('/(auth)/sign-in');
  };

  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section style={styles.logoSection}>
        <Image
          source={require('@/assets/images/mytimeblock-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Drawer.Section>
      <View style={styles.sidebar}>
        <Drawer.Section style={styles.menuSection} showDivider={false}>
          {DAY_OPTIONS.map(option => {
            const icon =
              option === 1
                ? 'calendar-today'
                : option === 3
                ? 'calendar-range'
                : option === 5
                ? 'calendar-week'
                : 'calendar-month';
            return (
              <Drawer.Item
                key={option}
                label={`${option} ${option === 1 ? 'Day' : 'Days'}`}
                icon={icon}
                active={option === numberOfDays || false}
                onPress={() => {
                  dispatch(setNumberOfDays(option));
                  props.navigation.dispatch(DrawerActions.closeDrawer());
                }}
                theme={{
                  colors: {
                    secondaryContainer: theme.colors.brandPrimary, // background color
                    onSecondaryContainer: theme.colors.white, // text color
                  },
                }}
              />
            );
          })}
        </Drawer.Section>
      </View>
      <Drawer.Section style={styles.footer} showDivider={false}>
        <View style={styles.userInfo}>
          <Avatar.Icon
            size={40}
            icon="account"
            color={theme.colors.white}
            theme={{
              colors: {
                primary: theme.colors.brandPrimary,
              },
            }}
          />
          <View style={styles.userTextContainer}>
            <Text style={styles.userEmail}>user@example.com</Text>
            <Text style={styles.userRole}>Administrator</Text>
          </View>
        </View>

        <Button
          mode="outlined"
          icon="logout"
          compact
          uppercase
          buttonColor={theme.colors.brandPrimary}
          textColor={theme.colors.white}
          onPress={handleLogout}
          style={styles.logoutButton}>
          Log Out
        </Button>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    height: '100%',
  },
  logoSection: {
    flex: 1,
    paddingBottom: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logo: {
    width: '80%',
    height: 60,
  },
  menuSection: {
    marginBottom: 20,
  },
  footer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  userTextContainer: {
    marginLeft: 12,
  },
  userEmail: {
    fontSize: 14,
    color: '#333',
  },
  userRole: {
    fontSize: 12,
    color: '#666',
  },
  logoutButton: {
    marginTop: 8,
  },
});
