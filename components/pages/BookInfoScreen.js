import React, { useEffect, useState, useContext } from 'react';
import { Alert } from 'react-native';
import { FavoritesContext } from '../../context/FavoritesContext';
import BookInfoTemplate from '../templates/BookInfoTemplate';

const BookInfoScreen = ({ route, navigation }) => {
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

  return (
    <BookInfoTemplate
      book={book}
      loading={loading}
      onBackPress={() => navigation.goBack()}
      onFavoritePress={handleAddFavorite}
      isFavorite={favoriteState}
      isAdding={adding}
    />
  );
};

export default BookInfoScreen; 