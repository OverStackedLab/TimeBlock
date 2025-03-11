import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Input, Button } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useForm, Controller } from 'react-hook-form';
import { signUp } from '@/store/slices/authSlice';
type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
};

const SignUpScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(
        signUp({ email: data.email, password: data.password }),
      ).unwrap();
      router.replace('/(drawer)');
    } catch (error) {
      console.error('Sign up failed:', error);
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
      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{
            required: 'Full name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Full Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
              disabled={loading}
              errorMessage={errors.fullName?.message}
              leftIcon={{ type: 'material', name: 'person' }}
              containerStyle={styles.inputContainer}
            />
          )}
          name="fullName"
        />

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
              secureTextEntry
              disabled={loading}
              errorMessage={errors.password?.message}
              leftIcon={{ type: 'material', name: 'lock' }}
              containerStyle={styles.inputContainer}
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Confirm Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              disabled={loading}
              errorMessage={errors.confirmPassword?.message}
              leftIcon={{ type: 'material', name: 'lock' }}
              containerStyle={styles.inputContainer}
            />
          )}
          name="confirmPassword"
        />

        <Button
          title="Sign Up"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
          buttonStyle={[styles.button]}
          containerStyle={styles.buttonContainer}
        />

        <Button
          title="Already have an account? Sign In"
          type="clear"
          size="sm"
          onPress={() => router.back()}
          disabled={loading}
          containerStyle={styles.buttonContainer}
        />
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
});

export default SignUpScreen;
