import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const Text = ({ children, style, type = 'body' }) => {
  return (
    <RNText style={[styles[type], style]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  body: {
    fontSize: 16,
    color: '#666666',
  },
  caption: {
    fontSize: 14,
    color: '#999999',
  },
});

export default Text; 