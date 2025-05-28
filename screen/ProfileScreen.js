import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4B3B3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>
      
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Ionicons name="person-circle" size={100} color="#4B3B3B" />
        </View>
        <Text style={styles.profileName}>Kullanıcı Adı</Text>
        <Text style={styles.profileEmail}>kullanici@email.com</Text>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color="#4B3B3B" />
          <Text style={styles.menuText}>Hesap Bilgileri</Text>
          <Ionicons name="chevron-forward" size={24} color="#4B3B3B" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="#4B3B3B" />
          <Text style={styles.menuText}>Ayarlar</Text>
          <Ionicons name="chevron-forward" size={24} color="#4B3B3B" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={24} color="#4B3B3B" />
          <Text style={styles.menuText}>Yardım</Text>
          <Ionicons name="chevron-forward" size={24} color="#4B3B3B" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3eded',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B3B3B',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3eded',
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B3B3B',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#7a6f6f',
  },
  menuSection: {
    padding: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3eded',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#4B3B3B',
    marginLeft: 15,
  },
});

export default ProfileScreen; 