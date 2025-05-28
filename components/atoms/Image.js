import React from 'react';
import { Image as RNImage, StyleSheet } from 'react-native';

const Image = ({ source, style, resizeMode = 'cover' }) => {
  return (
    <RNImage
      source={source}
      style={[styles.image, style]}
      resizeMode={resizeMode}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Image; 