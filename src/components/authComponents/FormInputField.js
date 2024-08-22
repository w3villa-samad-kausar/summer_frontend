import React from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions } from 'react-native';
import colors from '../../assets/colors';

const width=Dimensions.get('screen').width
const height=Dimensions.get('screen').height
const FormInputField = ({
  haswidth,
  hasMultiLine,
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
        styles.textInput, haswidth&& styles.widthAdjust ,hasMultiLine&&styles.heightAdjust, hasMarginTop && styles.marginTop || error && styles.errorMarginTop
      ]}
      placeholder={placeholderText}
      secureTextEntry={isSecureText}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      multiline={hasMultiLine}
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
  },
  widthAdjust:{
    width:width-50
  },
  heightAdjust:{
    height:height-800
  }
  
});

export default FormInputField;
