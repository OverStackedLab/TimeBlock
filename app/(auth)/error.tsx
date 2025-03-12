import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { clearError } from '@/store/slices/authSlice';

type ErrorProps = {
  error: string | null;
};

const ErrorComponent = ({ error }: ErrorProps) => {
  const dispatch = useAppDispatch();

  if (!error) return null;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearError());
    }, 5000); // Clear error after 5 seconds

    return () => clearTimeout(timer);
  }, [error, dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffebee',
    borderRadius: 4,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ef5350',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
});

export default ErrorComponent;
