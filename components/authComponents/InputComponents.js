import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import colors from '../../assets/colors'

const InputComponents = ({label,hasMarginTop,keyboardType,isSecureText, value,onChangeText}) => {
  return (
    <TextInput 
    style={[
      styles.textInput, hasMarginTop && styles.marginTop
      ]} 
      placeholder={label} 
      secureTextEntry={isSecureText} 
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}></TextInput>
  )
}
const styles = StyleSheet.create({
  textInput: {
    height: 50,
    width: 300,
    backgroundColor: 'transparent',
    marginTop: 40,
    left: 20,
    borderRadius: 10,
    backgroundColor: colors.secondaryBackground,
    paddingLeft:20,
    // borderBottomWidth:1,
    fontSize: 20
  },
  marginTop: {
    marginTop: 25
  }
})
export default InputComponents