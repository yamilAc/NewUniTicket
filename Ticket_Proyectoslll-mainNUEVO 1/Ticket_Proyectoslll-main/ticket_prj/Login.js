import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { useUser } from './UserContext'; // Update the path
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const Login = () => {
  const navigation = useNavigation();
  const { setUser } = useUser(); // Use the setUser function from the UserContext
  const [universityCode, setUniversityCode] = useState('');
  const [universityPassword, setUniversityPassword] = useState('');
 
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.12:3000/login', {
        university_code: universityCode,
        university_password: universityPassword,
       
      });
 
      if (response.status === 200) {
        const { isAdmin, user_type, user_id, ...userData } = response.data;
 
        setUser({ user_type, user_id, ...userData });
       
        if (user_type == '1' ) {
          navigation.navigate('HomeTeachers');
        }
        else if(user_type == '2'){
          navigation.navigate('HomeStudents');
        }
        else if(user_type==3){
          navigation.navigate('HomeSec');
        }
        else {
          navigation.navigate('Home');
        }
       
      } else {
        // Invalid credentials
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error cases
    }
  };
 
  return (
    <View style={styles.container}>
      <Image
        source={require('./images/mainLogo.png')}
        style={styles.image}
      />
      <Text style={styles.text}>UNI-TICKET</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        onChangeText={(text) => setUniversityCode(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(text) => setUniversityPassword(text)}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.buttonLog}>
        <Text style={styles.buttonText}>
          Iniciar Sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e0904',
  },
  input: {
    width: 200,
    height: 40,
    fontFamily: 'Century Gothic',
    borderRadius: 10,
    borderColor: '#860e66',
    color: '#860e66',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  buttonLog: {
    width: 200,
    height: 40,
    fontFamily: 'Century Gothic',
    borderRadius: 20,
    shadowRadius: 3,
    backgroundColor: '#860e66',
    margin: 10,
    padding: 5,
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#f0f0f0',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 20,
    tintColor: '#d2417b',
  }
});
 
export default Login;