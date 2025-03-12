import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Input, Button, Text } from '@rneui/themed';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useForm, Controller } from 'react-hook-form';
import { signIn } from '@/store/slices/authSlice';
import Snackbar from 'react-native-snackbar';

type FormData = {
  email: string;
  password: string;
};

const SignInScreen = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(
        signIn({ email: data.email, password: data.password }),
      ).unwrap();
      router.replace('/(drawer)');
    } catch (error) {
      Snackbar.show({
        text: 'Sign in failed',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/mytimeblock-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      {error && <Text style={styles.error}>Sign in failed</Text>}
      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              disabled={loading}
              errorMessage={errors.email?.message}
              leftIcon={{ type: 'material', name: 'email' }}
              containerStyle={styles.inputContainer}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={!showPassword}
              disabled={loading}
              errorMessage={errors.password?.message}
              leftIcon={{ type: 'material', name: 'lock' }}
              rightIcon={{
                type: 'material',
                name: showPassword ? 'visibility' : 'visibility-off',
                onPress: () => setShowPassword(!showPassword),
              }}
              containerStyle={styles.inputContainer}
            />
          )}
          name="password"
        />

        <Button
          title="Sign In"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
          buttonStyle={[styles.button]}
          containerStyle={styles.buttonContainer}
        />

        <Button
          title="Don't have an account? Sign Up"
          type="clear"
          size="sm"
          onPress={() => router.push('/(auth)/sign-up')}
          disabled={loading}
          containerStyle={styles.buttonContainer}
        />

        <Button
          title="Forgot Password?"
          type="clear"
          size="sm"
          onPress={() => router.push('/(auth)/forgot-password')}
          disabled={loading}
          containerStyle={styles.buttonContainer}
        />
      </View>
      <View style={styles.footer}>
        <Text>
          Powered by <Text style={styles.bold}>OverStacked</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  formContainer: {
    flex: 0.7,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  logo: {
    width: '90%',
    height: 60,
  },
  inputContainer: {
    paddingHorizontal: 0,
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 5,
    borderRadius: 8,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
  },
  link: {
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {
    fontWeight: 'bold',
    color: '#f57c00',
  },
  error: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 20,
  },
});

export default SignInScreen;
