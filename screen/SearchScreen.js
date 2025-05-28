import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookContext } from '../context/BookContext';

const CARD_WIDTH = (Dimensions.get('window').width - 60) / 2;
const BG = '#E9E4E0';
const CARD = '#F6F3F1';
const TEXT = '#2D2D2D';
const TEXT_SECONDARY = '#888888';
const ICON = '#6D6D6D';
const PRIMARY = '#2B6CB0';
const SECONDARY = '#4299E1';
const ACCENT = '#F6AD55';
const WHITE = '#FFFFFF';
const TEXT_PRIMARY = '#2D3748';

const BookCard = ({ book, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    {book.cover_id ? (
      <Image source={{ uri: `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` }} style={styles.cover} />
    ) : (
      <View style={[styles.cover, { justifyContent: 'center', alignItems: 'center', backgroundColor: CARD }]}> 
        <Text style={{ color: TEXT_SECONDARY, fontSize: 32 }}>?</Text>
      </View>
    )}
    <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
    <Text style={styles.bookAuthor} numberOfLines={1}>{book.authors && book.authors.length > 0 ? book.authors[0].name : 'Unknown'}</Text>
  </TouchableOpacity>
);

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchBooks } = useContext(BookContext);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const books = await searchBooks(query);
      setResults(books);
    } catch (error) {
      console.error('Search error:', error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Kitap ara..."
          placeholderTextColor={TEXT_SECONDARY}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color={ICON} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={styles.loader} color={PRIMARY} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <BookCard 
              book={item} 
              onPress={() => navigation.navigate('BookInfo', { workKey: item.key })}
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            query ? (
              <Text style={styles.emptyText}>Sonuç bulunamadı.</Text>
            ) : null
          }
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: CARD,
    borderRadius: 16,
    paddingHorizontal: 20,
    color: TEXT,
    fontSize: 16,
    marginRight: 10,
    borderWidth: 0,
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: CARD,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  loader: {
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 10,
    width: CARD_WIDTH,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
    marginHorizontal: 4,
  },
  cover: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: CARD,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: TEXT,
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    marginBottom: 2,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default SearchScreen; 