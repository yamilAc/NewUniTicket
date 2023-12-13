import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import { useUser } from './UserContext'; // Update the path
 
const QRUser = () => {
  const { user } = useUser();
  const [qrCodeData, setQrCodeData] = useState('');
 
  useEffect(() => {
    const generateQRCode = () => {
      if (user && user.user_id !== undefined) {
        const userId = user.user_id.toString();
        setQrCodeData(userId);
      } else {
        console.error('Error: Missing user ID for QR code');
      }
    };
 
    generateQRCode();
  }, [user]);
 
  return (
    <View style={styles.container}>
      {/* Display QR code */}
      {qrCodeData.trim() !== '' && (
        <View style={styles.qrCodeContainer}>
          <QRCode value={qrCodeData} size={200} />
        </View>
      )}
 
   
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCodeContainer: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#860e66',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#f0f0f0',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
 
export default QRUser;