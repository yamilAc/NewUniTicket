import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './LoadingScreen';
import Login from './Login';
import EventForm from './eventForm';
import Locations from './Locations';
import Home from './Home';
import HomeUsers from './HomeUsers'
import HomeSec from './HomeSec'
import HomeStudents from './HomeStudents'
import HomeTeachers from './HomeTeachers'
 
import { UserProvider } from './UserContext';
 
 
const Stack = createStackNavigator();
 
const App = () => {
  return (
    <NavigationContainer>
        <UserProvider>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Load" component={LoadingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="HomeUsers" component={HomeUsers} options={{ headerShown: false }} />
            <Stack.Screen name="HomeSec" component={HomeSec} options={{ headerShown: false }} />
            <Stack.Screen name="HomeStudents" component={HomeStudents} options={{ headerShown: false }} />
            <Stack.Screen name="HomeTeachers" component={HomeTeachers} options={{ headerShown: false }} />
          </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
};
 
export default App;