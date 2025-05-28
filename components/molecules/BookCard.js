import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Image from '../atoms/Image';
import Text from '../atoms/Text';

const BookCard = ({ book, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: book.coverImage }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <Text type="h3" numberOfLines={2} style={styles.title}>
          {book.title}
        </Text>
        <Text type="body" numberOfLines={1} style={styles.author}>
          {book.author}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 12,
  },
  image: {
    borderRadius: 8,
  },
  content: {
    padding: 8,
  },
  title: {
    marginBottom: 4,
  },
  author: {
    color: '#666666',
  },
});

export default BookCard; 