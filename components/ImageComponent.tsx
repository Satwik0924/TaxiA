// ImageComponent.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';

// Create a reusable ImageComponent
const ImageComponent = ({ source, width, height, borderRadius, resizeMode = 'cover', style }) => {
    return (
        <Image 
            source={source} 
            style={[styles.image, { width, height, borderRadius, resizeMode }, style]} 
        />
    );
};

const styles = StyleSheet.create({
    image: {
        resizeMode: 'cover',  // Default value if no resizeMode is provided
    },
});

export default ImageComponent;
