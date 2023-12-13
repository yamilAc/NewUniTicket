import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
 
const apiUrl = 'http://192.168.1.12:3000';
 
const EventFormStudents = () => {
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();
 
  const fetchEvents = () => {
    let url = `${apiUrl}/eventos`;
 
    // Filter events with audience_type equal to 0 or 2
    axios.get(url, { params: { audience_type: [0, 2] } })
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.error('Error fetching events:', error));
  };
 
  useEffect(() => {
    fetchEvents();
  }, []);
 
  useFocusEffect(() => {
    fetchEvents();
  });
 
  return (
    <View style={styles.container}>
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
 
export default EventFormStudents;