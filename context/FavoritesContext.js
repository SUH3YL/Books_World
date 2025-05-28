import React, { createContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();
const FAVORITES_KEY = 'FAVORITE_BOOKS';

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    const favs = await AsyncStorage.getItem(FAVORITES_KEY);
    setFavorites(favs ? JSON.parse(favs) : []);
    setLoading(false);
  }, []);

  const addFavorite = async (book) => {
    const favs = await AsyncStorage.getItem(FAVORITES_KEY);
    let favArr = favs ? JSON.parse(favs) : [];
    if (!favArr.some(f => f.key === book.key)) {
      favArr.push(book);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favArr));
      setFavorites(favArr);
    }
  };

  const removeFavorite = async (key) => {
    const favs = await AsyncStorage.getItem(FAVORITES_KEY);
    let favArr = favs ? JSON.parse(favs) : [];
    favArr = favArr.filter(f => f.key !== key);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favArr));
    setFavorites(favArr);
  };

  const isFavorite = (key) => favorites.some(f => f.key === key);

  return (
    <FavoritesContext.Provider value={{ favorites, loading, loadFavorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}; 