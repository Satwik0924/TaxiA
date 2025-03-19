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
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  // State for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Font loading
  const [fontsLoaded] = useFonts({
    'Raleway': require('../assets/fonts/Raleway.ttf'),
  });

  // Google Authentication Hook
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: '113843530766-sccb96hqglk49vu7ul3kao5lg0bhq3o9.apps.googleusercontent.com',
    iosClientId: '113843530766-0sl21d36boo89oa5utj8al5md6gopcl0.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    useProxy: true
  });

  // Logging redirect URIs
  useEffect(() => {
    const logRedirectDetails = () => {
      const proxyRedirectUri = AuthSession.makeRedirectUri({ useProxy: true });
      const directRedirectUri = AuthSession.makeRedirectUri({ useProxy: false });
      
      console.log('Redirect Configuration:', {
        proxyRedirectUri,
        directRedirectUri
      });
    };

    logRedirectDetails();
  }, []);

  // Handle Google Authentication Response
  useEffect(() => {
    const handleAuthResponse = async () => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        
        try {
          // Verify token with backend or Google
          const userInfo = await fetchUserInfo(id_token);
          
          if (userInfo) {
            // Store token securely
            await SecureStore.setItemAsync('user_token', id_token);
            
            // Navigate or update app state
            Alert.alert(
              "Success", 
              `Welcome, ${userInfo.name}!`,
              [{ text: "OK", onPress: () => navigation.replace('Home') }]
            );
          }
        } catch (error) {
          console.error("Token verification error:", error);
          Alert.alert("Error", "Failed to verify authentication");
        }
      } else if (response?.type === 'error') {
        console.error("Authentication error:", response.error);
        Alert.alert(
          "Error", 
          response.error?.description || 'Authentication failed'
        );
      }
    };

    handleAuthResponse();
  }, [response, navigation]);

  // Fetch user info from Google
  const fetchUserInfo = async (idToken) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  };

  // Handle standard email/password login
  const handleStandardLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    // TODO: Implement actual login logic
    console.log("Attempting login with:", email);
    Alert.alert("Login", "Standard login functionality to be implemented");
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    console.log("Starting Google Sign-In...");
    try {
      await promptAsync();
    } catch (error) {
      console.error("Sign-in error:", error);
      Alert.alert("Error", "Failed to start Google Sign-In: " + error.message);
    }
  };

  // Navigate to registration
  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  // Prevent rendering until fonts are loaded
  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

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
          onPress={handleStandardLogin}
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
          onPress={handleGoogleSignIn}
          disabled={!request}
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
            onPress={navigateToRegister}
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