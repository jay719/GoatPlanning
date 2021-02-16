import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react'; // using jsx
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import reducers from './reducers'
import { TouchableOpacity} from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './screens/MapScreen.js'
import FavoritesScreen from './screens/FavoritesScreen.js'
import SignInScreen from './screens/SignInScreen.js'
import LostFriend from './screens/LostFriend.js'
import AttractionsScreen from './screens/AttractionsScreen.js'
import FinalizeScreen from './screens/FinalizeScreen.js'
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import CalendarScreen from './screens/CalendarScreen.js';
import { createStore } from 'redux'
import { Provider} from 'react-redux' 
import { LogBox } from 'react-native';

const HomeStack = createStackNavigator();
const TripTabs = createBottomTabNavigator();

const store = createStore(reducers)



// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

export default function App() {

  
  return (
    <Provider store={store} >
        <NavigationContainer>
          <HomeStack.Navigator  
            screenOptions={{ headerStyle: { backgroundColor: 'hsl(181, 59%, 95%)' } }}
          >
            <HomeStack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options= {({navigation}) => ({
                headerRight: props => < MapHeader navigation={navigation} {...props}/>
              })}
            />
            <HomeStack.Screen 
              name="Trip Planner" 
              component={TripStackScreens}
              
            />
            <HomeStack.Screen 
              name="Calendar" 
              component={CalendarScreen}
              
            />
            <HomeStack.Screen 
              name="Set Date" 
              component={AttractionsScreen}
              
            />
            <HomeStack.Screen 
              name="Finalize Trip" 
              component={FinalizeScreen}
              
            />
            
          </HomeStack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}
const  TripStackScreens = () => {
  return (
    <TripTabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Map') {
          return (
              <Ionicons
                name={
                  focused
                  ? 'map-outline'
                  : 'map'
                } 
                size={size}  
                color={color} 
              />
          );
        } else if (route.name === 'Favorites') {
          return (
            <MaterialIcons 
              name={
                focused
                ? "favorite-border" 
                : 'favorite'
              }
              size={size}  
              color={color} />
          );
        }
          else if (route.name === 'Lost'){
            return (
              <Feather name={
                  focused
                  ? 'camera'
                  : 'camera-off'} 
                  size={size} 
                  color={color} 
                />
            );
          }
      },
    })}
    tabBarOptions={{
      activeTintColor: 'green',
      inactiveTintColor: 'gray',
    }}    
    >
      <TripTabs.Screen name = "Map" component = {MapScreen} />
      <TripTabs.Screen name = "Favorites" component = {FavoritesScreen} />
      <TripTabs.Screen name = "Lost" component = {LostFriend} />
    </TripTabs.Navigator>
  );
}




const MapHeader = (props) => {
  return (<TouchableOpacity 
            style={styles.touchable}
            onPress={() => props.navigation.navigate("Trip Planner")}
          >
            <AntDesign name="stepforward" size={24} color="black" />
          </TouchableOpacity>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    paddingRight: 15
  }
});
