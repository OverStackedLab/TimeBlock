import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setLoading, setError, signInSuccess } from '@/store/slices/authSlice';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

const SignInScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  // const { loading, error } = useAppSelector(state => state.auth);
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
      dispatch(setLoading(true));
      await new Promise(resolve => setTimeout(resolve, 1000));

      dispatch(
        signInSuccess({
          email: data.email,
          role: 'Administrator',
        }),
      );
      router.replace('/(drawer)');
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
            <>
              <TextInput
                label="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                style={styles.input}
                autoCapitalize="none"
                // disabled={loading}
                error={!!errors.email}
              />
              {errors.email && (
                <HelperText type="error">{errors.email.message}</HelperText>
              )}
            </>
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
            <>
              <TextInput
                label="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                style={styles.input}
                secureTextEntry
                // disabled={loading}
                error={!!errors.password}
              />
              {errors.password && (
                <HelperText type="error">{errors.password.message}</HelperText>
              )}
            </>
          )}
          name="password"
        />

        {/* {error && <HelperText type="error">{error}</HelperText>} */}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
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

export default SignInScreen;
