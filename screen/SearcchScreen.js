import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookContext } from '../context/BookContext';

const TRENDING_KEYWORDS = [
  'Romantic Story',
  'Self-Improvement Books',
  'My Mother\'s Kind',
  'Romance',
  'Love Maybe'
];

const API_URL = 'https://openlibrary.org/search.json';

const SearcchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [trending, setTrending] = useState(TRENDING_KEYWORDS);
  const [showTrending, setShowTrending] = useState(true);
  const [error, setError] = useState(null);
  const { searchBooks, loading, randomBook } = useContext(BookContext);

  const handleSearch = async (searchText) => {
    if (!searchText) return;
    setSearching(true);
    setShowTrending(false);
    setError(null);
    try {
      const url = `${API_URL}?q=${encodeURIComponent(searchText)}&fields=title,author_name,cover_i,key&limit=10`;
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.docs || []);
    } catch (e) {
      setError('An error occurred while searching.');
    }
    setSearching(false);
  };

  const onTrendingPress = (item) => {
    setQuery(item);
    handleSearch(item);
    Keyboard.dismiss();
  };

  const onBookPress = (item) => {
    const workKey = item.key.startsWith('/works/') ? item.key : `/works/${item.key}`;
    navigation.navigate('BookInfo', { workKey });
  };

  const handleRandomBook = async () => {
    const book = await randomBook();
    if (book) {
      navigation.navigate('BookInfo', { workKey: book.key });
    }
  };

  const renderTrending = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Trending</Text>
      {trending.map((item, idx) => (
        <TouchableOpacity key={item} style={styles.trendingItem} onPress={() => onTrendingPress(item)}>
          <Ionicons name="trending-up-outline" size={18} color="#7a6f6f" style={{marginRight: 8}} />
          <Text style={styles.trendingText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderResultItem = ({ item }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => onBookPress(item)}>
      <Ionicons name="book-outline" size={20} color="#7a6f6f" style={{marginRight: 10}} />
      <View>
        <Text style={styles.resultTitle}>{item.title}</Text>
        {item.author_name && <Text style={styles.resultAuthor}>{item.author_name.join(', ')}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={24} color="#7a6f6f" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Kitap ara..."
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => handleSearch(query)}
            returnKeyType="search"
          />
          {query ? (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={24} color="#7a6f6f" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4B3B3B" style={styles.loader} />
      ) : null}

      {error && <Text style={styles.error}>{error}</Text>}
      {showTrending && renderTrending()}
      {!showTrending && !searching && (
        <FlatList
          data={results}
          keyExtractor={item => item.key}
          renderItem={renderResultItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No results found.</Text>}
          contentContainerStyle={{paddingBottom: 40}}
        />
      )}

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.randomButton} onPress={handleRandomBook}>
          <Ionicons name="shuffle" size={24} color="#fff" />
          <Text style={styles.randomButtonText}>Bana Bir Kitap Öner</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#f3eded',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#4B3B3B',
  },
  randomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4B3B3B',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  randomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  loader: {
    marginTop: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e3d7d7',
  },
  resultTitle: {
    fontSize: 16,
    color: '#3d3535',
  },
  resultAuthor: {
    fontSize: 14,   
    color: '#7a6f6f',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3d3535',
    marginBottom: 8,
  },
  trendingItem: {   
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e3d7d7',
  },    
  trendingText: {
    fontSize: 14,
    color: '#7a6f6f',
  },
  emptyText: {
    fontSize: 16,                   
    color: '#7a6f6f',
    textAlign: 'center',
    marginTop: 20,
  },
  error: {
    fontSize: 16,   
    color: '#7a6f6f',
    textAlign: 'center',
    marginTop: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f3eded',
  },
});

export default SearcchScreen;   

