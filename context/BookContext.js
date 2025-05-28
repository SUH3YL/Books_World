import React, { createContext, useState, useCallback } from 'react';

export const BookContext = createContext();

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

export const BookProvider = ({ children }) => {
  const [categoryBooks, setCategoryBooks] = useState({});
  const [loading, setLoading] = useState({});

  const fetchBooksForCategories = useCallback(async (categories) => {
    let loadingObj = {};
    let booksObj = {};
    await Promise.all(categories.map(async (cat) => {
      loadingObj[cat] = true;
      try {
        const res = await fetch(`https://openlibrary.org/subjects/${cat.toLowerCase()}.json?limit=10`);
        const data = await res.json();
        let books = data.works || [];
        books = books.sort(() => 0.5 - Math.random()).slice(0, 2);
        booksObj[cat] = books;
      } catch (e) {
        booksObj[cat] = [];
      }
      loadingObj[cat] = false;
    }));
    setCategoryBooks(booksObj);
    setLoading(loadingObj);
  }, []);

  const fetchBooksByCategory = useCallback(async (category, limit = 20, offset = 0) => {
    try {
      const res = await fetch(`https://openlibrary.org/subjects/${category.toLowerCase()}.json?limit=${limit}&offset=${offset}`);
      const data = await res.json();
      return data.works || [];
    } catch (e) {
      return [];
    }
  }, []);

  const randomBook = async () => {
    try {
      // Rastgele bir kategori seç
      const randomCategory = popularCategories[Math.floor(Math.random() * popularCategories.length)];
      
      // Kategoriden rastgele bir kitap al
      const response = await fetch(
        `https://openlibrary.org/subjects/${randomCategory.toLowerCase()}.json?limit=50`
      );
      const data = await response.json();
      
      if (data.works && data.works.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.works.length);
        return data.works[randomIndex];
      }
      return null;
    } catch (error) {
      console.error('Error fetching random book:', error);
      return null;
    }
  };

  return (
    <BookContext.Provider
      value={{
        categoryBooks,
        loading,
        fetchBooksForCategories,
        fetchBooksByCategory,
        randomBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}; 