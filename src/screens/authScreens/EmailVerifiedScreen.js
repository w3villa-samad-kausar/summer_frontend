import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EmailVerifiedScreen = ({ route }) => {
  const { email } = route.params;
  const navigation = useNavigation();

  const handleGoToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Verification Successful!</Text>
      <Text style={styles.email}>Email: {email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleGoToDashboard}>
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  email: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmailVerifiedScreen;
