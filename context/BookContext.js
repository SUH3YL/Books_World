import React, { createContext, useState, useCallback } from 'react';

export const BookContext = createContext();

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

  return (
    <BookContext.Provider value={{ categoryBooks, loading, fetchBooksForCategories, fetchBooksByCategory }}>
      {children}
    </BookContext.Provider>
  );
}; 