import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import BookCard from '../molecules/BookCard';
import Text from '../atoms/Text';

const BookList = ({ books, onBookPress, ListEmptyComponent }) => {
  const renderItem = ({ item }) => (
    <BookCard book={item} onPress={() => onBookPress(item)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          ListEmptyComponent || (
            <View style={styles.emptyContainer}>
              <Text type="body">Henüz kitap bulunmamaktadır.</Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default BookList; 