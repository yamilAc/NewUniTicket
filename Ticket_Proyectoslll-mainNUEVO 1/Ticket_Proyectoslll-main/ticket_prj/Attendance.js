import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
 
const apiUrl = 'http://192.168.1.12:3000';
 
const AttendanceList = ({ route }) => {
  const { eventId } = route.params;
  const [attendanceData, setAttendanceData] = useState([]);
 
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/attendance/${eventId}`);
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
 
    fetchAttendanceData();
  }, [eventId]);
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Asistencia</Text>
      <FlatList
        data={attendanceData}
        keyExtractor={(item) => item.user_full_name}
        renderItem={({ item }) => (
          <View style={styles.attendanceItem}>
            <Text>{item.user_full_name}</Text>
          </View>
        )}
      />
    </View>
  );
};
 
const styles = StyleSheet.create({
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
  attendanceItem: {
    marginBottom: 10,
  },
});
 
export default AttendanceList;