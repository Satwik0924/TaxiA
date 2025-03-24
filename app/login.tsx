import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, Image } from 'react-native';
import * as Google from 'expo-auth-session';
import { useFonts } from 'expo-font';


const LoginScreen = ({ navigation }) => {
  // State for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userDetails, setUserDetails] = useState(null); // To store authenticated user's info
  const [loading, setLoading] = useState(false); // To handle loading state

  // Font loading
  const [fontsLoaded] = useFonts({
    'Raleway': require('../assets/fonts/Raleway.ttf'),
  });

  // Google OAuth Hook for Authentication
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <View style={styles.formContainer}>
        {/* Email and Password inputs */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor="black"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="black"
        />

        <TouchableOpacity 
          style={styles.loginButton}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Google Sign-In Button */}
        <TouchableOpacity 
          style={styles.googleButton} 
          onPress={() => promptAsync()} // This triggers the browser redirection for Google login
          disabled={loading}
        >
          <View style={styles.googleIcon}>
            <Text style={{ color: '#4285F4', fontWeight: 'bold' }}>G</Text>
          </View>
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        {/* Loading Indicator */}
        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Signing you in...</Text>
          </View>
        )}

        {/* Display User Information */}
        {userDetails && (
          <View style={styles.userDetailsContainer}>
            <Image 
              source={{ uri: userDetails.picture }} 
              style={styles.userProfileImage} 
            />
            <Text style={styles.userInfoText}>Name: {userDetails.name}</Text>
            <Text style={styles.userInfoText}>Email: {userDetails.email}</Text>
          </View>
        )}

        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text 
            style={styles.registerLink}>
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};

// Styles remain consistent with previous implementation
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Raleway',
    color: '#333',
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
    marginBottom: 25,
    fontFamily: 'Raleway',
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#191970',
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
  googleButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Raleway',
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#4285F4',
  },
  userDetailsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  userProfileImage: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
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

export default LoginScreen;
