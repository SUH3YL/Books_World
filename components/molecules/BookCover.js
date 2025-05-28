import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Image from '../atoms/Image';

const BookCover = ({ coverId, style }) => {
  if (coverId) {
    return (
      <Image
        source={{ uri: `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` }}
        style={[styles.cover, style]}
        resizeMode="contain"
      />
    );
  }

  return (
    <View style={[styles.cover, styles.noCover, style]}>
      <Ionicons name="book-outline" size={50} color="#2B6CB0" />
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    width: 180,
    height: 180,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: -30,
    backgroundColor: '#FFFFFF',
  },
  noCover: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4299E1',
  },
});

export default BookCover; 