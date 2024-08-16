import React from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions } from 'react-native';
import colors from '../../assets/colors';

const width=Dimensions.get('screen').width
const FormInputField = ({
  
  placeholderText,
  hasMarginTop,
  keyboardType,
  isSecureText,
  value,
  onChangeText,
  onBlur,
  error,
  touched
}) => (
  <View style={styles.container}>
    <TextInput
      style={[
        styles.textInput, hasMarginTop && styles.marginTop || error && styles.errorMarginTop
      ]}
      placeholder={placeholderText}
      secureTextEntry={isSecureText}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
    />
    {touched && error && (
      <Text style={styles.error}>{error}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems:'center',
    justifyContent:'flex-end',
  },
  textInput: {
    alignSelf:'center',
    height: 50,
    width: 300,
    marginTop: 40,
    
    borderRadius: 10,
    backgroundColor: colors.secondaryBackground,
    paddingLeft: 20,
    fontSize: 20
  },
  marginTop: {
    marginTop: 20
  },
  error: {
    marginTop:5,
    alignSelf:'flex-end',
    right:width-350,
    color: colors.errorMessageColor,
    fontSize: 12,
    fontWeight:"600"
  },
  errorMarginTop:{
    marginTop:10
  }
});

export default FormInputField;
