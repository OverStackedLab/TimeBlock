import React from 'react';
import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Image, StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, ListItem, Icon, Button } from '@rneui/themed';
import { Redirect } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { setNumberOfDays } from '@/store/slices/calendarSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { signOut } from '@/store/slices/authSlice';
import Snackbar from 'react-native-snackbar';
import { useTheme } from '@rneui/themed';
const DAY_OPTIONS = [1, 3, 5, 7];

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const dispatch = useAppDispatch();
  const numberOfDays = useAppSelector(state => state.calendar.numberOfDays);
  const { user } = useAppSelector(state => state.auth);
  const { theme } = useTheme();
  const { top: safeTop, bottom: safeBottom } = useSafeAreaInsets();
  const handleLogout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      return <Redirect href="/sign-in" />;
    } catch (error) {
      Snackbar.show({
        text: 'Sign out failed',
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { marginTop: safeTop }]}>
        <Image
          source={require('@/assets/images/mytimeblock-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      {/* List */}
      <DrawerContentScrollView {...props} style={styles.drawerList}>
        {DAY_OPTIONS.map((option, index) => {
          const icon =
            option === 1
              ? 'calendar-today'
              : option === 3
              ? 'calendar-range'
              : option === 5
              ? 'calendar-week'
              : 'calendar-month';
          return (
            <ListItem
              key={`${option}-${index}`}
              onPress={() => {
                dispatch(setNumberOfDays(option));
                props.navigation.dispatch(DrawerActions.closeDrawer());
              }}
              containerStyle={{
                backgroundColor:
                  numberOfDays === option
                    ? theme.colors.primary
                    : 'transparent',
              }}>
              <Icon
                name={icon}
                type="material-community"
                color={numberOfDays === option ? 'white' : 'grey'}
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    color: numberOfDays === option ? 'white' : 'grey',
                  }}>
                  {`${option} ${option === 1 ? 'Day' : 'Days'}`}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </DrawerContentScrollView>
      {/* Footer */}
      <View style={[styles.footer, { marginBottom: safeBottom }]}>
        <View style={styles.userInfo}>
          <Avatar
            rounded
            title={user?.email?.slice(0, 1).toUpperCase()}
            containerStyle={{ backgroundColor: theme.colors.grey5 }}
          />
          <Text style={styles.userName}>{user?.email}</Text>
        </View>
        <Button
          title="Log Out"
          onPress={handleLogout}
          buttonStyle={styles.logoutButton}
          titleStyle={styles.logoutText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: 76,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  drawerList: { flex: 1 },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 10,
  },
  userName: { fontSize: 16, fontWeight: 'bold' },
  logoutButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
});
