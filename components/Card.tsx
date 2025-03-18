import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

type CardProps = {
  title: string;
  src: any;  // Use 'any' to handle both local (require) and remote (uri) images
  description: string;
};

const Imagecard = ({ title, src, description }: CardProps) => {
  return (
    <View style={cardStyles.card}>
      {/* The Image component is using the src prop */}
      <Image source={src} style={cardStyles.image} />
      <View style={cardStyles.content}>
        <Text style={cardStyles.title}>{title}</Text> {/* Optional: Display title */}
        <Text style={cardStyles.text}>{description}</Text>
      </View>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    shadowColor: '#000',  // Shadow color for iOS
    shadowOffset: { width: 0, height: 4 },  // Vertical shadow offset
    shadowOpacity: 0.2,  // Shadow opacity (depth of shadow)
    shadowRadius: 8,  // Blurring effect for the shadow
    elevation: 5,  // Elevation for Android (similar to shadow)
    borderRadius: 12,  // Rounded corners
    margin: 15,  // Space around the card
    overflow: 'hidden',  // Ensures content stays inside the rounded corners
    backgroundColor: 'white',  // Card background color
    alignItems: 'center',  // Centers the content horizontally
    maxWidth: 400,  // Optional: Restricts card size to a max width
    paddingBottom: 20,  // Extra space at the bottom of the card
  },
  image: {
    width:300,// Makes the image take the full width of the card
    height:300,  // Fixed height for the image
    resizeMode: 'cover',  // Ensures the image covers the space without stretching
  },
  content: {
    padding: 15,  // Adds space around the text inside the card
    width: '100%',  // Makes sure the content area fills the width of the card
    justifyContent: 'center',  // Vertically centers the content
    alignItems: 'center',  // Centers the text horizontally
  },
  title: {
    fontSize: 18,  // Size of the title text
    fontWeight: 'bold',  // Bold font for the title
    color: '#333',  // Dark gray color for the title
    marginBottom: 10,  // Space between title and description
  },
  text: {
    fontSize: 14,  // Size of the description text
    color: '#666',  // Lighter gray color for the text
    textAlign: 'center',  // Center-align the description text
  },
});

export default Imagecard;
