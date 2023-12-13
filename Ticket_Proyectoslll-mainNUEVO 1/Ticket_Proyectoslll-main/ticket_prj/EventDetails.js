import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { useUser } from './UserContext';
 
const apiUrl = 'http://192.168.1.12:3000';
 
const EventDetails = ({ route, navigation }) => {
  const { eventData } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [scanned, setScanned] = useState(false);
 
  const { user } = useUser();
 
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
 
  const handleScanQR = async ({ type, data }) => {
    setScanned(true);
 
    try {
      // Extract the user ID directly from the QR code data
      const userId = data.trim();
 
      if (userId !== '') {
        // Add the attendee to the Attendees table
        await axios.post(`${apiUrl}/attendees`, {
          user_id: userId,
          event_id: eventData.event_id,
        });
 
        // Display a success alert
        Alert.alert('Registrado correctamente', 'El escaneo del código QR fue exitoso.');
 
        // Optionally, you can navigate the user to a success screen or show a success message
      } else {
        console.error('Error: Missing user ID in QR code data');
      }
    } catch (error) {
      console.error('Error processing QR code:', error);
    }
  };
 
 
  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      handleScanQR({ type, data });
    }
  };
 
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Display all event details */}
        <Text style={styles.title}>{eventData.title}</Text>
        <Text style={styles.dateTimeText}>
          Date: {new Date(eventData.event_date).toLocaleDateString()}
        </Text>
        <Text style={styles.dateTimeText}>Hora: {eventData.event_time}</Text>
        <Text style={styles.dateTimeText}>Lugar: {eventData.location_name}</Text>
        <Text style={styles.dateTimeText}>Descripcion: {eventData.description}</Text>
 
        <TouchableOpacity
          onPress={() => navigation.navigate('Attendance', { eventId: eventData.event_id })}
        >
          <Text>Lista de asistencia</Text>
        </TouchableOpacity>
        {/* Button for opening the camera */}
        <TouchableOpacity onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Escanear QR</Text>
        </TouchableOpacity>
 
        {/* Camera component with QR code scanner */}
        {hasPermission && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.camera}
          />
        )}
      </View>
    </ScrollView>
  );
};
 
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateTimeText: {
    color: '#1e0904',
    textAlign: 'left',
    fontFamily: 'century gothic',
    fontSize: 14,
    fontWeight: '100',
    marginTop: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonText: {
    color: '#860e66',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
 
export default EventDetails;