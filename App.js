import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearcchScreen from './screen/SearcchScreen';
import BookInfoScreen from './components/pages/BookInfoScreen';
import HomeScreen from './screen/HomeScreen';
import FavoritesScreen from './screen/FavoritesScreen';
import CategoryBooksScreen from './screen/CategoryBooksScreen';
import ProfileScreen from './screen/ProfileScreen';
import { BookProvider } from './context/BookContext';
import { FavoritesProvider } from './context/FavoritesContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Header() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Ionicons name="library" size={32} color="#4B3B3B" />
        <Text style={styles.headerText}>BooksWorld</Text>
      </View>
      <TouchableOpacity 
        style={styles.profileContainer}
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons name="person-circle" size={50} color="#4B3B3B" />
      </TouchableOpacity>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CategoryBooks" component={CategoryBooksScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BookInfo" component={BookInfoScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SearchMain" 
        component={SearcchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="BookInfo" 
        component={BookInfoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoritesMain" component={FavoritesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BookInfo" component={BookInfoScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <BookProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <Header />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="MainTabs" component={TabNavigator} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        </FavoritesProvider>
      </BookProvider>
    </SafeAreaProvider>
  );
}

// Tab Navigator'ı ayrı bir component olarak tanımlayalım
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4B3B3B',
        tabBarInactiveTintColor: '#7a6f6f',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f3eded',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          height: 75,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 3,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} options={{ title: 'Search' }} />
      <Tab.Screen name="Favorites" component={FavoritesStack} options={{ title: 'Favorites' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#f3eded',
    paddingTop:40,
    padding: 20,
    marginTop: 0,
    
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B3B3B',
    marginLeft: 10,
  },
  profileContainer: {
    marginRight: 10,
  },
});
