import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


// Logo....
import Logo from './images/mainLogo.png';
import Login from './Login';

const BGColor = "#d2417b"


export default function SplashScreen() {
    console.disableYellowBox = true;
    

    // SafeArea Value...
    const edges = useSafeAreaInsets();

    // Animation Values....
    const startAnimation = useRef(new Animated.Value(0)).current;

    // Scaling Down Both logo and Title...
    const scaleLogo = useRef(new Animated.Value(1)).current;
    const scaleTitle = useRef(new Animated.Value(1)).current;

    // Offset Animation....
    const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    // Animating COntent...
    const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    // Animation Done....
    useEffect(() => {


        // Starting Animation after 500ms....
        setTimeout(() => {

            // Parallel Animation...
            Animated.parallel([
                Animated.timing(
                    startAnimation,
                    {
                        // For same Height for non safe Area Devices...
                        toValue: -Dimensions.get('window').height,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleLogo,
                    {
                        // Scaling to 0.35
                        toValue: 0.3,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleTitle,
                    {
                        // Scaling to 0.8
                        toValue: 0.8,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveLogo,
                    {
                        // Moving to Right Most...
                        toValue: {
                            y: (Dimensions.get("window").width / 2) - 35,
                            x: (Dimensions.get('window').height / 2) - 5
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveTitle,
                    {
                        // Moving to Right Most...
                        toValue: {
                            x: 0,
                            // Since image size is 100...
                            y: (Dimensions.get('window').height / 2) - 90
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    contentTransition,
                    {
                        toValue: 0,
                        useNativeDriver: true
                    }
                )
            ])
                .start();

        }, 2000);

    }, [])

   

        return (
          <View style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
          }}>
              <Animated.View style={{
                  flex: 1,
                  backgroundColor: BGColor,
                  zIndex: 1,
                  transform: [
                      { translateY: startAnimation }
                  ]
              }}>
  
                  <Animated.View style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                  }}>
                      <Animated.Image source={Logo} style={{
                          width: 130,
                          height: 130,
                          tintColor:'#FFF',
                          marginBottom: 20,
                          transform: [
                              { translateX: moveLogo.x },
                              { translateY: moveLogo.y },
                              { scale: scaleLogo },
  
                          ]
                      }}></Animated.Image>
  
                      <Animated.Text style={{
                          fontSize: 45,
                          fontWeight: 'bold',
                          color: '#FFF',
                          transform: [
                            { translateX: moveLogo.x },
                            { translateY: moveLogo.y },
                            { scale: scaleTitle }
                          ]
                      }}>UniTicket</Animated.Text>
  
                  </Animated.View>
  
              </Animated.View>
  
              <Animated.View style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(0,0,0,0.04)',
                  zIndex: 0,
                  transform: [
                      { translateY: contentTransition }
                  ]
              }}>
                <Login /> 

  
              </Animated.View>
  
          </View>
      );
}