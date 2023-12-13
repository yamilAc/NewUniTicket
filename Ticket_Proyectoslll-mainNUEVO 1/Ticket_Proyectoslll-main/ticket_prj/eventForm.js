import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { useUser } from './UserContext';
 
const apiUrl = 'http://192.168.1.12:3000';
 
 
// ... (other imports)
 
const EventForm = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setName] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setDate] = useState(new Date());
  const [eventHour, setTime] = useState(new Date());
  const [selectedAudienceType, setAudienceType] = useState(null);
  const navigation = useNavigation();
 
  const { user } = useUser();
 
  const fetchEvents = () => {
    let url = `${apiUrl}/evento`;
 
    // Create a params object to handle query parameters
    const params = {};
 
    if (selectedAudienceType !== null) {
      params.audience_type = selectedAudienceType;
    }
 
 
    axios.get(url, { params })
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.error('Error fetching events:', error));
  };
 
  useEffect(() => {
    fetchEvents();
  }, [selectedAudienceType]);
 
  useFocusEffect(() => {
    fetchEvents();
  });
 
  // ... (other functions)
 
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.textIndicator}>Seleccione el tipo de evento:</Text>
        <RNPickerSelect
          placeholder={{ label: 'Seleccione un tipo de audiencia', value: null }}
          items={[
            { label: 'Todos', value: 0 },
            { label: 'Docentes', value: 1 },
            { label: 'Estudiantes', value: 2 },
          ]}
          onValueChange={(value) => setAudienceType(value)}
          style={pickerSelectStyles}
        />
      </View>
 
      <Text style={styles.titleText}>Eventos</Text>
 
      <FlatList
        data={events}
        keyExtractor={(item) => (item.event_id ? item.event_id.toString() : 'defaultKey')}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { eventData: item })}>
              <Text style={styles.listTitle}>{item.title}</Text>
              <Text style={styles.dateTimeText}>
                Date: {new Date(item.event_date).toLocaleDateString()}
              </Text>
              <Text style={styles.dateTimeText}>Hora: {item.event_time}</Text>
              <Text style={styles.dateTimeText}>Lugar: {item.location_name}</Text>
              <Text style={styles.dateTimeText}>Descripcion: {item.description}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
 
 
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});
 
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
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textIndicator: {
    color: '#1e0904',
    textAlign: 'left',
    fontFamily: 'century gothic',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  dateTimeText: {
    color: '#1e0904',
    textAlign: 'left',
    fontFamily: 'century gothic',
    fontSize: 14,
    fontWeight: '100',
    marginTop: 10,
  },
  listTitle: {
    color: '#1e0904',
    fontFamily: 'century gothic',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  eventItem: {
    marginBottom: 10,
  },
});
 
export default EventForm;