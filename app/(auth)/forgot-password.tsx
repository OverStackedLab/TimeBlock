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
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  email: string;
};

const ForgotPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // TODO: Implement password reset logic here
      console.log('Reset password for:', data.email);
      // Show success message and navigate back
      router.back();
    } catch (error) {
      console.error('Password reset failed:', error);
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
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Enter your email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              keyboardType="email-address"
              errorMessage={errors.email?.message}
              leftIcon={{ type: 'material', name: 'email' }}
              containerStyle={styles.inputContainer}
            />
          )}
          name="email"
        />

        <Button
          title="Reset Password"
          onPress={handleSubmit(onSubmit)}
          buttonStyle={[styles.button]}
          containerStyle={styles.buttonContainer}
        />

        <Button
          title="Back to Sign In"
          type="clear"
          size="sm"
          onPress={() => router.back()}
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
});

export default ForgotPasswordScreen;
