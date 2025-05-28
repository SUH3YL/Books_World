import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Text from '../atoms/Text';

const FavoriteButton = ({ onPress, isFavorite, isAdding }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isFavorite ? styles.buttonAdded : null]}
      onPress={onPress}
      disabled={isFavorite || isAdding}
    >
      <Text style={styles.text}>
        {isFavorite ? 'Favorilere Eklendi' : 'Favorilere Ekle'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2B6CB0',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  buttonAdded: {
    backgroundColor: '#4299E1',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FavoriteButton; 