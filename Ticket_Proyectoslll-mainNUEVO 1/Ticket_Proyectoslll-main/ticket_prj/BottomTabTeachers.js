import React from "react";
import { Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
 
import EventTeacher from "./eventTeachers";
 
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
      <EFStack.Screen name="EventTeacher" component={EventTeacher} options={{ title: 'Inicio' }}/>
    </EFStack.Navigator>
  )
}
 
 
const QRStack = createStackNavigator();
 
function QRStackScreen() {
  return(
    <QRStack.Navigator screenOptions={{
      headerShown:false,
      headerStyle: {
        backgroundColor: '#d2417b'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '800',
      },
     
      }}>
      <QRStack.Screen name="QR" component={QR} options={{ title: 'Nuevo Evento' }}/>
    </QRStack.Navigator>
  )
};
 
 
 
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
 
 
 
        <Tab.Screen name="Mi QR" component={QRStackScreen} options={{
              tabBarIcon:({focused}) => (
                <View>
                  <Image
                    source={require('./assets/qrIcon.png')}
                    resizeMode='contain'
                    style={{
                      width: 30,
                      height: 30,
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