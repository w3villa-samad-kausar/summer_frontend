import { StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SigninSignupToggler = ({question,button,onPress}) => {
  return (
    <View>
      <Text style={styles.text}>{question}
      <TouchableNativeFeedback onPress={onPress}>
      <Text style={styles.button} >{button}</Text>
      </TouchableNativeFeedback>
      </Text>
      
    </View>
  )
}
const styles = StyleSheet.create({
  text:{
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    marginTop: 10,
  },
  button:{
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    marginTop: 10,
    fontWeight:'400',
    textDecorationLine: 'underline',
    
  }
})
export default SigninSignupToggler

