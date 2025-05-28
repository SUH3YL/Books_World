import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearcchScreen from './screen/SearcchScreen';
import BookInfoScreen from './components/pages/BookInfoScreen';
import HomeScreen from './screen/HomeScreen';
import FavoritesScreen from './screen/FavoritesScreen';
import CategoryBooksScreen from './screen/CategoryBooksScreen';
import { BookProvider } from './context/BookContext';
import { FavoritesProvider } from './context/FavoritesContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
                tabBarStyle: { backgroundColor: '#f3eded', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 65 },
                tabBarLabelStyle: { fontSize: 13, marginBottom: 8 },
              })}
            >
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="Search" component={SearchStack} options={{ title: 'Search' }} />
              <Tab.Screen name="Favorites" component={FavoritesStack} options={{ title: 'Favorites' }} />
            </Tab.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        </FavoritesProvider>
      </BookProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
