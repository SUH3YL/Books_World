import React, { useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { FavoritesContext } from '../context/FavoritesContext';

const CARD_WIDTH = Dimensions.get('window').width - 32;
const CARD_HEIGHT = 100;
const PRIMARY = '#2B6CB0';
const SECONDARY = '#4299E1';
const BG = '#E9E4E0';
const ACCENT = '#F6AD55';
const WHITE = '#FFFFFF';
const TEXT = '#2D2D2D';
const TEXT_SECONDARY = '#888888';
const CARD = '#F6F3F1';
const ICON = '#6D6D6D';

const BookCard = ({ book, onPress, onRemove }) => (
  <View style={styles.card}>
    <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
      <Ionicons name="close-circle" size={26} color="#d11a2a" />
    </TouchableOpacity>
    {book.cover ? (
      <Image source={{ uri: `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg` }} style={styles.cover} />
    ) : (
      <View style={[styles.cover, { justifyContent: 'center', alignItems: 'center', backgroundColor: CARD }]}> 
        <Text style={{ color: TEXT_SECONDARY, fontSize: 32 }}>?</Text>
      </View>
    )}
    <TouchableOpacity style={styles.infoBox} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
      <Text style={styles.bookAuthor} numberOfLines={1}>{book.authors && book.authors.length > 0 ? (book.authors[0].name || book.authors[0].author?.key || 'Unknown') : 'Unknown'}</Text>
    </TouchableOpacity>
  </View>
);

const FavoritesScreen = ({ navigation }) => {
  const { favorites, loading, loadFavorites, removeFavorite } = useContext(FavoritesContext);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} color={PRIMARY} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favori Kitaplar</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Henüz favori kitap eklemediniz.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <BookCard 
              book={item} 
              onPress={() => navigation.navigate('BookInfo', { workKey: item.key })}
              onRemove={() => removeFavorite(item.key)}
            />
          )}
          numColumns={1}
          contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 8 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: TEXT,
    marginBottom: 18,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
    marginHorizontal: 0,
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  cover: {
    width: 70,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
    backgroundColor: CARD,
  },
  infoBox: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT,
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: TEXT_SECONDARY,
  },
  emptyText: {
    fontSize: 16,
    color: TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default FavoritesScreen; 