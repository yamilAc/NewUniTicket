import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const apiUrl = 'http://192.168.1.12:3000'; // Replace with your actual API URL

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [newLocationName, setNewLocationName] = useState('');

  useEffect(() => {
    // Fetch locations on component mount
    axios
      .get(`${apiUrl}/locations`)
      .then((response) => setLocations(response.data))
      .catch((error) => console.error('Error fetching locations:', error));
  }, []);

  const handleAddLocation = () => {
    // Perform validation if needed

    // Make a POST request to add a new location
    axios
      .post(`${apiUrl}/locations`, { location_name: newLocationName })
      .then((response) => {
        console.log('New location added:', response.data);
        // Refresh the list of locations
        axios
          .get(`${apiUrl}/locations`)
          .then((response) => setLocations(response.data))
          .catch((error) => console.error('Error fetching locations:', error));
        // Clear the input field
        setNewLocationName('');
      })
      .catch((error) => {
        console.error('Error adding location:', error);
        // Handle error
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Ubicaciones</Text>

      {/* Input for adding a new location */}
      <View style={styles.addLocationContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nueva Ubicación"
          value={newLocationName}
          onChangeText={(text) => setNewLocationName(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddLocation}>
          <Text style={styles.buttonText}>Añadir</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={locations}
        keyExtractor={(item) => (item.location_id ? item.location_id.toString() : 'defaultKey')}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <Text style={styles.locationText}>{item.location_name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  titleText: {
    color: '#d2417b',
    fontFamily: 'century gothic',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationItem: {
    marginBottom: 10,
  },
  locationText: {
    color: '#1e0904',
    fontFamily: 'century gothic',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    fontFamily: 'Century Gothic',
    borderRadius: 10,
    borderColor: '#860e66',
    color: '#d2417b',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    width: 80,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#860e66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#f0f0f0',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Locations;
