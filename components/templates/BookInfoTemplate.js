import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const BookInfoTemplate = ({ book, loading, onBackPress, onFavoritePress, isFavorite, isAdding }) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4B3B3B" />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Kitap bilgileri yüklenemedi.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4B3B3B" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.coverContainer}>
          {book.covers && book.covers[0] ? (
            <Image 
              source={{ uri: `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg` }}
              style={styles.cover}
            />
          ) : (
            <View style={[styles.cover, styles.placeholderCover]}>
              <Ionicons name="book" size={50} color="#7a6f6f" />
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{book.title}</Text>
          {book.authors && (
            <Text style={styles.author}>
              {book.authors.map(author => author.name).join(', ')}
            </Text>
          )}

          <TouchableOpacity 
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]} 
            onPress={onFavoritePress}
            disabled={isAdding}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#fff" : "#4B3B3B"} 
            />
            <Text style={[styles.favoriteButtonText, isFavorite && styles.favoriteButtonTextActive]}>
              {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
            </Text>
          </TouchableOpacity>
          
          {book.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Açıklama</Text>
              <Text style={styles.description}>
                {typeof book.description === 'string' 
                  ? book.description 
                  : book.description?.value || 'Açıklama bulunamadı.'}
              </Text>
            </View>
          )}

          {book.subjects && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Konular</Text>
              <View style={styles.subjectsContainer}>
                {book.subjects.slice(0, 5).map((subject, index) => (
                  <View key={index} style={styles.subjectTag}>
                    <Text style={styles.subjectText}>{subject}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {book.excerpts && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Alıntılar</Text>
              {book.excerpts.map((excerpt, index) => (
                <Text key={index} style={styles.excerpt}>{excerpt.text}</Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#7a6f6f',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3eded',
  },
  backButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  coverContainer: {
    alignItems: 'center',
    padding: 20,
  },
  cover: {
    width: 200,
    height: 300,
    borderRadius: 10,
    backgroundColor: '#f3eded',
  },
  placeholderCover: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B3B3B',
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: '#7a6f6f',
    marginBottom: 20,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3eded',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  favoriteButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  favoriteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B3B3B',
    marginLeft: 8,
  },
  favoriteButtonTextActive: {
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B3B3B',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4B3B3B',
    lineHeight: 24,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  subjectTag: {
    backgroundColor: '#f3eded',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  subjectText: {
    fontSize: 14,
    color: '#4B3B3B',
  },
  excerpt: {
    fontSize: 16,
    color: '#4B3B3B',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 12,
  },
});

export default BookInfoTemplate; 