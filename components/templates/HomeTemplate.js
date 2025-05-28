import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Text from '../atoms/Text';
import BookList from '../organisms/BookList';

const HomeTemplate = ({ books, onBookPress, loading }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text type="h1" style={styles.title}>
          BooksWorld
        </Text>
      </View>
      <View style={styles.content}>
        <BookList
          books={books}
          onBookPress={onBookPress}
          ListEmptyComponent={
            loading ? (
              <View style={styles.loadingContainer}>
                <Text type="body">Yükleniyor...</Text>
              </View>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default HomeTemplate; 