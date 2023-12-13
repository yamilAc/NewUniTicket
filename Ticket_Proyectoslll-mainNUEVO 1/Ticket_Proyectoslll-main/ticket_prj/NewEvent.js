import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const apiUrl = 'http://192.168.1.12:3000';

const NewEvent = () => {
  
  const [eventName, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [eventDate, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventHour, setTime] = useState(new Date());
  const [audienceType, setAudienceType] = useState(0);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    
    // Fetch locations on component mount
    axios.get(`${apiUrl}/locations`)
      .then((response) => setLocations(response.data))
      .catch((error) => console.error('Error fetching locations:', error));
  }, []);

  const createEvent = () => {
    axios.post(`${apiUrl}/evento`, {
      adminId: 2,
      title: eventName,
      description, 
      eventDate: eventDate.toISOString().split('T')[0],
      eventTime: eventHour.toTimeString().split(' ')[0],
      locationId: location,
      audienceType,
    })
      .then((response) => {
        // Refresh the list of events
        axios.get(`${apiUrl}/evento`)
          .then((response) => setEvents(response.data))
          .catch((error) => console.error('Error fetching events:', error));
  
        // Clear input fields
        setName('');
        setDescription(''); // Clear the description field
        setLocation('');
        setDate(new Date());
        setTime(new Date());
      })
      .catch((error) => console.error('Error creating event:', error));
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Crear Evento</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.textIndicator}>Nombre del Evento</Text>
        <TextInput
          style={styles.input}
          placeholder="ej. Conferencia de IA"
          value={eventName}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.textIndicator}>Descripción del Evento</Text>
        <TextInput
            style={styles.input}
            placeholder="Ingrese la descripción del evento"
            value={description}
            onChangeText={(text) => setDescription(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.textIndicator}>Lugar del Evento</Text>
        <RNPickerSelect
          placeholder={{ label: 'Seleccione un lugar', value: null }}
          items={locations.map((location) => ({
            label: location.location_name,
            value: location.location_id,
          }))}
          onValueChange={(value) => setLocation(value)}
        />
      </View>

      <TouchableOpacity
        style={styles.buttonDate}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.buttonText}>Elegir Fecha</Text>
      </TouchableOpacity>
      <Text style={styles.dateTimeText}>Fecha: {eventDate.toDateString()}</Text>

      <Button
        title="Elegir Hora"
        onPress={() => setShowTimePicker(true)}
        buttonStyle={styles.buttonTime}
      />
      <Text style={styles.dateTimeText}>Hora: {eventHour.toTimeString().split(' ')[0]}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.textIndicator}>Tipo de Audiencia</Text>
        <RNPickerSelect
          placeholder={{ label: 'Seleccione un tipo de audiencia', value: null }}
          items={[
            { label: 'Todos', value: 0 },
            { label: 'Docentes', value: 1 },
            { label: 'Estudiantes', value: 2 },
          ]}
          onValueChange={(value) => setAudienceType(value)}
        />
      </View>
      <Button
        title="Agregar Evento"
        onPress={createEvent}
        buttonStyle={styles.addButton}
      />

      {showDatePicker && (
        <DateTimePicker
          value={eventDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (event.type === 'set') {
              setDate(selectedDate || eventDate);
            }
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={eventHour}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (event.type === 'set') {
              setTime(selectedTime || eventHour);
            }
          }}
        />
      )}
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
    inputContainer: {
      marginBottom: 16,
    },
    input: {
      height: 40,
      fontFamily: 'Century Gothic',
      borderRadius: 10,
      borderColor: '#860e66',
      color: '#d2417b',
      borderWidth: 1,
      padding: 10,
    },
    textIndicator: {
      color: '#1e0904',
      textAlign: 'left',
      fontFamily: 'century gothic',
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 10,
    },
    buttonDate: {
      width: '50%',
      height: 40,
      borderRadius: 20,
      backgroundColor: '#860e66',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#f0f0f0',
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
    },
    buttonTime: {
      backgroundColor: '#860e66',
      marginTop: 10,
    },
    addButton: {
      backgroundColor: '#860e66',
      marginTop: 20,
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

export default NewEvent;
