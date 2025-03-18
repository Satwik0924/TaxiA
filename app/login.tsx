import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font'; // Expo font loading (if using Expo)

const LoginScreen = () => {
  const [fontsLoaded] = useFonts({
    'Raleway': require('../assets/fonts/Raleway.ttf'), // Load custom font
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>; // Display loading text if fonts are not loaded
  }

  return (
    <View style={styles.container}>
   
      <Text style={styles.title}>Welcome Back!</Text>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="black"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="black"
        />

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text style={styles.registerLink}>Register</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width:'100%',
    height: '30%',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Raleway', // Custom font
    color: 'white',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#FDFBEE',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
    fontFamily: 'Raleway',
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#191970', // Dark blue color for the button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Raleway',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#191970',
    fontSize: 14,
    fontFamily: 'Raleway',
  },
  registerText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Raleway',
    color: '#333',
  },
  registerLink: {
    color: '#191970',
    fontWeight: 'bold',
  },
});
