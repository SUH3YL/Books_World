import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import { BookContext } from '../context/BookContext';

const popularCategories = [
  'Fiction',
  'Romance',
  'Poetry',
  'Science',
  'History',
  'Fantasy',
  'Mystery',
  'Biography',
  'Children',
  'Art',
  'Religion',
  'Health',
  'Business',
  'Technology',
  'Education',
  'Travel',
  'Music',
  'Sports',
  'Cooking',
  'Comics',
];

const CARD_WIDTH = (Dimensions.get('window').width - 60) / 2;
const ORANGE = '#FF9800';
const LIGHT_ORANGE = '#FFE0B2';
const BG = '#E9E4E0';
const WHITE = '#FFFFFF';
const DARK = '#333';
const CARD = '#F6F3F1';
const TEXT = '#2D2D2D';
const TEXT_SECONDARY = '#888888';
const ICON = '#6D6D6D';

const BookCard = ({ book, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    {book.cover_id ? (
      <Image source={{ uri: `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` }} style={styles.cover} />
    ) : (
      <View style={[styles.cover, { justifyContent: 'center', alignItems: 'center', backgroundColor: LIGHT_ORANGE }]}> 
        <Text style={{ color: ORANGE, fontSize: 32 }}>?</Text>
      </View>
    )}
    <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
    <Text style={styles.bookAuthor} numberOfLines={1}>{book.authors && book.authors.length > 0 ? book.authors[0].name : 'Unknown'}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const { categoryBooks, loading, fetchBooksForCategories } = useContext(BookContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBooksForCategories(popularCategories);
  }, [fetchBooksForCategories]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBooksForCategories(popularCategories);
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#DB8606"]} />
      }
    >
      
      
      {popularCategories.map((cat) => (
        <View key={cat} style={styles.categorySection}>
          <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate('CategoryBooks', { category: cat })}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
          {loading[cat] ? (
            <ActivityIndicator size="small" color="#7a6f6f" style={{ marginVertical: 10 }} />
          ) : (
            <View style={styles.booksRow}>
              {(categoryBooks[cat] || []).map((book) => (
                <BookCard key={book.key} book={book} onPress={() => navigation.navigate('BookInfo', { workKey: book.key })} />
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: ORANGE,
    marginBottom: 18,
    textAlign: 'center',
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryBox: {
    backgroundColor: CARD,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  categoryText: {
    fontSize: 18,
    color: TEXT,
    fontWeight: 'bold',
  },
  booksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 10,
    width: CARD_WIDTH,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
  },
  cover: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: LIGHT_ORANGE,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: DARK,
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 13,
    color: ORANGE,
    marginBottom: 2,
    textAlign: 'center',
  },
});

export default HomeScreen; 