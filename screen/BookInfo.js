import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesContext } from '../context/FavoritesContext';

const PRIMARY = '#2B6CB0';
const SECONDARY = '#4299E1';
const BG = '#EBF8FF';
const ACCENT = '#F6AD55';
const WHITE = '#FFFFFF';
const TEXT_PRIMARY = '#2D3748';
const TEXT_SECONDARY = '#4A5568';

const BookInfo = ({ route, navigation }) => {
  const { workKey } = route.params || {};
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, isFavorite } = useContext(FavoritesContext);
  const [adding, setAdding] = useState(false);
  const [favoriteState, setFavoriteState] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (!workKey) return;
      setLoading(true);
      try {
        const key = workKey.startsWith('/works/') ? workKey : `/works/${workKey}`;
        const res = await fetch(`https://openlibrary.org${key}.json`);
        const data = await res.json();
        setBook(data);
        setFavoriteState(isFavorite(data.key));
      } catch (e) {
        setBook(null);
      }
      setLoading(false);
    };
    fetchBook();
  }, [workKey, isFavorite]);

  const handleAddFavorite = async () => {
    if (!book) return;
    setAdding(true);
    try {
      await addFavorite({
        key: book.key,
        title: book.title,
        authors: book.authors,
        cover: book.covers && book.covers.length > 0 ? book.covers[0] : null,
      });
      setFavoriteState(true);
      Alert.alert('Başarılı', 'Kitap favorilere eklendi!');
    } catch (e) {
      Alert.alert('Hata', 'Favorilere eklenirken bir hata oluştu.');
    }
    setAdding(false);
  };

  if (loading) {
    return (
      <View style={styles.root}>
        <ActivityIndicator size="large" color={PRIMARY} style={{ marginTop: 40 }} />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.root}>
        <Text style={{ color: TEXT_PRIMARY, fontSize: 18, marginTop: 40 }}>Kitap bilgisi bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={PRIMARY} />
        </TouchableOpacity>
        {book.covers && book.covers.length > 0 ? (
          <Image
            source={{ uri: `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg` }}
            style={styles.cover}
            resizeMode="contain"
          />
        ) : (
          <View style={[styles.cover, styles.noCover]}>
            <Ionicons name="book-outline" size={50} color={PRIMARY} />
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{book.title}</Text>
        {book.authors && Array.isArray(book.authors) && (
          <Text style={styles.author}>{book.authors.map(a => a.name || a.author?.key || '').join(', ')}</Text>
        )}
        <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.description}>{typeof book.description === 'string' ? book.description : (book.description?.value || 'Açıklama yok.')}</Text>
        </ScrollView>
        <TouchableOpacity
          style={[styles.favButton, favoriteState ? styles.favButtonAdded : null]}
          onPress={handleAddFavorite}
          disabled={favoriteState || adding}
        >
          <Text style={styles.favButtonText}>{favoriteState ? 'Favorilere Eklendi' : 'Favorilere Ekle'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: SECONDARY,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 10,
    paddingBottom: 0,
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    top: 10,
    left: 16,
    zIndex: 2,
    backgroundColor: PRIMARY,
    borderRadius: 8,
    padding: 4,
  },
  cover: {
    width: 180,
    height: 180,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: -30,
    backgroundColor: WHITE,
  },
  noCover: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SECONDARY,
  },
  infoContainer: {
    width: '95%',
    backgroundColor: WHITE,
    borderRadius: 24,
    marginTop: -30,
    padding: 20,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: PRIMARY,
    marginBottom: 0,
  },
  author: {
    fontSize: 18,
    color: ACCENT,
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    color: TEXT_PRIMARY,
    marginBottom: 10,
  },
  favButton: {
    backgroundColor: PRIMARY,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  favButtonAdded: {
    backgroundColor: SECONDARY,
  },
  favButtonText: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookInfo;        



