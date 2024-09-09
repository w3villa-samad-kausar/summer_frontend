import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../../assets/colors'

const SubmitButton = ({ label, onPress}) => {
  return (
    <View style={[styles.buttonContainer]}>
      <TouchableOpacity style={styles.loginButton} onPress={onPress}>
            <Text style={styles.loginButtonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    marginTop: 30,
  },
  loginButton: {
    backgroundColor: colors.buttonColor,
    width: 200,
    borderRadius: 20,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    padding: 5,
  },
})

export default SubmitButton