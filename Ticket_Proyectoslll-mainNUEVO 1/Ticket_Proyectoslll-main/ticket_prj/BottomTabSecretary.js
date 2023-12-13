import React from "react";
import { Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
 
import EventForm from "./eventForm";
import EventDetails from "./EventDetails";
import Locations from "./Locations";
import NewEvent from "./NewEvent";  
import Attendance from './Attendance';
 
import QR from "./QRUser"
 
 
const EFStack = createStackNavigator();
 
function EventFormStackScreen() {
  return(
    <EFStack.Navigator screenOptions={{
      headerShown:false,
      headerStyle: {
        backgroundColor: '#d2417b'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '800',
      },}}>
      <EFStack.Screen name="EventForm" component={EventForm} options={{ title: 'Inicio' }}/>
      <EFStack.Screen name="EventDetails" component={EventDetails} options={{ title: 'Detalles' }}/>
      <EFStack.Screen name="Attendance" component={Attendance} options={{ title: 'Detalles' }}/>
    </EFStack.Navigator>
  )
}
 
 
const Tab = createBottomTabNavigator();
 
const BottomTab = () => {
    return(
        <Tab.Navigator screenOptions={{            
            headerShown: false,
            tabBarStyle:{
              position: 'absolute',
              backgroundColor: 'transparent',
              height:60,
              paddingBottom:5}}
              }>
           <Tab.Screen name="Eventos" component={EventFormStackScreen}  options={{
              tabBarIcon:({focused}) => (
                <View>
                  <Image
                    source={require('./assets/eventIcon.png')}
                    resizeMode='contain'
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? '#860e66': '#333'
                    }}
                  />
                </View>
              ),
            }}/>
 
 
        </Tab.Navigator>
    );
}
 
export default BottomTab