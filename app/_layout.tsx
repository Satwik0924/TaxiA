import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../hooks/useAuth';

export default function Layout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}