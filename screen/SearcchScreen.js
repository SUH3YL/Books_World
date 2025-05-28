import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    const bookData = {
      title: item.title,
      author: item.author_name ? item.author_name.join(', ') : 'Unknown Author',
      cover: item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg` : null,
      description: 'No description available.',
      details: 'No additional details available.',
      rating: 0,
      review: 'No reviews available.'
    };
    navigation.navigate('BookInfo', { book: bookData });
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
    <TouchableOpacity style={styles.resultItem} onPress={() => navigation.navigate('BookInfo', { workKey: item.key })}>
      <Ionicons name="book-outline" size={20} color="#7a6f6f" style={{marginRight: 10}} />
      <View>
        <Text style={styles.resultTitle}>{item.title}</Text>
        {item.author_name && <Text style={styles.resultAuthor}>{item.author_name.join(', ')}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search</Text>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search-outline" size={20} color="#bdb5b5" style={{marginLeft: 10}} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search For Books"
          value={query}
          onChangeText={text => {
            setQuery(text);
            if (text.length === 0) {
              setShowTrending(true);
              setResults([]);
            }
          }}
          onSubmitEditing={() => handleSearch(query)}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>
      {searching && <ActivityIndicator style={{marginTop: 20}} color="#7a6f6f" />}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3d7d7',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#3d3535'
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3eded',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: '#3d3535',
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
});

export default SearcchScreen;   

