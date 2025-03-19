import { useRouter } from 'expo-router';
import { View, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function HomeScreen() {
  const router = useRouter();
  const { isSignedIn, isLoading } = useAuth();

  // If still checking authentication state, show loading
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // If already signed in, push to tabs, otherwise stay here
  // You could also automatically redirect to login if not signed in

  return (
    <View style={styles.container}>
      <Button title="Go to Login" onPress={() => router.push('./login')} />
      {isSignedIn && (
        <Button title="Go to App" onPress={() => router.push('/(tabs)')} color="green" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    gap: 20,
  },
});