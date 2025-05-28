import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
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
const ORANGE = '#FF9800';
const LIGHT_ORANGE = '#FFE0B2';
const DARK = '#333';

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

const CategoryBooksScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const { fetchBooksByCategory } = useContext(BookContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 20;

  const fetchBooks = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const offset = page * PAGE_SIZE;
    const newBooks = await fetchBooksByCategory(category, PAGE_SIZE, offset);
    setBooks(prev => [...prev, ...newBooks]);
    setHasMore(newBooks.length === PAGE_SIZE);
    setPage(prev => prev + 1);
    setLoading(false);
  }, [category, page, loading, hasMore, fetchBooksByCategory]);

  useEffect(() => {
    setBooks([]);
    setPage(0);
    setHasMore(true);
  }, [category]);

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, [category]);

  const renderItem = ({ item }) => (
    <BookCard 
      book={item} 
      onPress={() => navigation.navigate('BookInfo', { workKey: item.key })} 
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category} Books</Text>
      <FlatList
        data={books}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 8 }}
        onEndReached={fetchBooks}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator style={{ marginVertical: 16 }} color={PRIMARY} /> : null}
      />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
});

export default CategoryBooksScreen; 