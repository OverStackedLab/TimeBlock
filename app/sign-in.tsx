import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Text, HelperText } from 'react-native-paper';
import { Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setLoading, setError, signInSuccess } from '@/store/slices/authSlice';

const SignIn = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  // const { loading, error } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      dispatch(setLoading(true));

      // Add your authentication logic here
      // For demo purposes, we'll just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email && password) {
        dispatch(
          signInSuccess({
            email,
            role: 'Administrator',
          }),
        );
        router.replace('/(app)');
      } else {
        dispatch(setError('Please enter email and password'));
      }
    } catch (err) {
      dispatch(
        setError(err instanceof Error ? err.message : 'An error occurred'),
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/mytimeblock-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          autoCapitalize="none"
          // disabled={loading}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry
          // disabled={loading}
        />
        {/* {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )} */}
        <Button
          mode="contained"
          onPress={handleSignIn}
          style={styles.button}
          buttonColor={theme.colors.brandPrimary}
          // loading={loading}
          // disabled={loading}
        >
          Sign In
        </Button>
        <Button
          mode="text"
          onPress={() => router.push('/(auth)/sign-up')}
          style={styles.button}
          textColor={theme.colors.brandPrimary}
          // disabled={loading}
        >
          Don't have an account? Sign Up
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 0.7,
    justifyContent: 'flex-start',
  },
  logo: {
    width: '90%',
    height: 60,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
});

export default SignIn;
