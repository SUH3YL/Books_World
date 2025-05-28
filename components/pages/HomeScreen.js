import React, { useState, useEffect } from 'react';
import HomeTemplate from '../templates/HomeTemplate';

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Burada kitapları yükleyecek API çağrısı yapılacak
    // Örnek veri:
    const dummyBooks = [
      {
        id: 1,
        title: 'React Native ile Mobil Uygulama Geliştirme',
        author: 'John Doe',
        coverImage: 'https://example.com/book1.jpg',
      },
      {
        id: 2,
        title: 'JavaScript Temelleri',
        author: 'Jane Smith',
        coverImage: 'https://example.com/book2.jpg',
      },
    ];

    // API çağrısı simülasyonu
    setTimeout(() => {
      setBooks(dummyBooks);
      setLoading(false);
    }, 1000);
  }, []);

  const handleBookPress = (book) => {
    navigation.navigate('BookDetail', { book });
  };

  return (
    <HomeTemplate
      books={books}
      onBookPress={handleBookPress}
      loading={loading}
    />
  );
};

export default HomeScreen; 