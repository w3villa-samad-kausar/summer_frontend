import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import colors from '../../assets/colors';

const FormLabel = ({ labelText }) => {
  return (
      <Text style={styles.label}>{labelText}</Text>
    
  );
};

const styles = StyleSheet.create({
  
  label: {
    marginLeft:30,
    marginTop:20,
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    marginBottom:-10
  },
});

export default FormLabel;
