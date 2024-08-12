import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import colors from '../../assets/colors';

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
  <View>
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
  textInput: {
    height: 50,
    width: 300,
    marginTop: 40,
    left: 20,
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
    left:30,
    color: colors.errorMessageColor,
    fontSize: 12,
    fontWeight:"600"
  },
  errorMarginTop:{
    marginTop:10
  }
});

export default FormInputField;
