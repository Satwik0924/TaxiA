import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useFonts } from 'expo-font';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';

// Make sure the redirect is handled properly


const LoginScreen = ({ navigation }) => {
  // State for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Font loading
  const [fontsLoaded] = useFonts({
    'Raleway': require('../assets/fonts/Raleway.ttf'),
  });

  // Google Authentication Hook


  // Logging redirect UR
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Welcome Back!</Text>

      <View style={styles.formContainer}>
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
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Google Sign-In Button */}
        <TouchableOpacity 
          style={styles.googleButton}
         
        >
          <View style={styles.googleIcon}>
            <Text style={{ color: '#4285F4', fontWeight: 'bold' }}>G</Text>
          </View>
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text 
            style={styles.registerLink}
          >
            Register
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: 25,
    fontFamily: 'Raleway',
    color: 'black',
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
  }
});

export default LoginScreen;