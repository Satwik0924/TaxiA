import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import Imagecard from '@/components/Card';

export default function Tab3() {
  const [name, setName] = useState('');  
  const [isUppercase, setIsUppercase] = useState(false);  // Fixed Naming Issue

  // Moved function outside JSX
  const toggleCase = () => {
    if (isUppercase) {
      setName('2');  
    } else {
      setName('5');  
    }
    setIsUppercase(!isUppercase);
  };

  return (
    <View style={styles.background}>
      <Text style={styles.text}>Welcome</Text>
      
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => {
          setName(text);
          setIsUppercase(false);  // Fix: Wrapped in {}
        }}
      />

      {/* Button to toggle uppercase/lowercase */}
      <Button title="Toggle Case"  onPress={toggleCase} />

      {/* Using the Imagecard component */}
      {/* <Imagecard 
        title="Sample Card"
        src={require('@/assets/images/dudde.jpeg')}  // Local image path using require
        description="This is a sample description for the card."
      /> */}
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  background: {
    justifyContent: 'center',
    backgroundColor: '#191970',
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    color: 'white',
    borderColor: 'white',
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
});

