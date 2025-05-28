import React from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import BackButton from '../atoms/BackButton';
import BookCover from '../molecules/BookCover';
import FavoriteButton from '../molecules/FavoriteButton';
import Text from '../atoms/Text';

const BookInfoTemplate = ({
  book,
  loading,
  onBackPress,
  onFavoritePress,
  isFavorite,
  isAdding,
}) => {
  if (loading) {
    return (
      <View style={styles.root}>
        <ActivityIndicator size="large" color="#2B6CB0" style={{ marginTop: 40 }} />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.root}>
        <Text type="body" style={styles.errorText}>
          Kitap bilgisi bulunamadı.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <BackButton onPress={onBackPress} />
        <BookCover coverId={book.covers?.[0]} />
      </View>
      <View style={styles.infoContainer}>
        <Text type="h2" style={styles.title}>
          {book.title}
        </Text>
        {book.authors && Array.isArray(book.authors) && (
          <Text type="body" style={styles.author}>
            {book.authors.map(a => a.name || a.author?.key || '').join(', ')}
          </Text>
        )}
        <ScrollView style={styles.descriptionContainer} showsVerticalScrollIndicator={false}>
          <Text type="body" style={styles.description}>
            {typeof book.description === 'string'
              ? book.description
              : book.description?.value || 'Açıklama yok.'}
          </Text>
        </ScrollView>
        <FavoriteButton
          onPress={onFavoritePress}
          isFavorite={isFavorite}
          isAdding={isAdding}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EBF8FF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#4299E1',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 10,
    paddingBottom: 0,
    position: 'relative',
  },
  infoContainer: {
    width: '95%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginTop: -30,
    padding: 20,
    shadowColor: '#2B6CB0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    color: '#2B6CB0',
    marginBottom: 0,
  },
  author: {
    color: '#F6AD55',
    marginBottom: 10,
  },
  descriptionContainer: {
    marginTop: 10,
  },
  description: {
    color: '#2D3748',
    marginBottom: 10,
  },
  errorText: {
    color: '#2D3748',
    fontSize: 18,
    marginTop: 40,
  },
});

export default BookInfoTemplate; 