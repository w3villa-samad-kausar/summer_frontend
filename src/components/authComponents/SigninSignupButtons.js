import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../../assets/colors'

const SigninSignupButtons = ({ activeButton, onPressSignin, onPressSignup }) => {
  return (

    <View style={styles.buttonContainer}>
      <TouchableOpacity
        disabled={true}
        style={[
          styles.signinSignupButton,
          activeButton === 'signin' && styles.activeButton
        ]}
        onPress={onPressSignin}>
        <Text
          style={[
            styles.signinSignupButtonText,
            activeButton === 'signin' && styles.activeButtonText
          ]}>
          Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={true}
        style={[
          styles.signinSignupButton,
          activeButton === 'signup' && styles.activeButton
        ]}
        onPress={onPressSignup}
      >
        <Text
          style={[
            styles.signinSignupButtonText,
            activeButton === 'signup' && styles.activeButtonText
          ]}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'red',
    height: 50,
    marginTop: 50
  },
  signinSignupButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 150,
    height: 40,
    marginHorizontal: 5
  },
  signinSignupButtonText: {
    color: 'black',
    fontSize: 26,
    textAlign: 'center',
    // padding:20
  },
  activeButton: {
    backgroundColor: colors.buttonColor
  },
  activeButtonText: {
    color: 'white'
  }

})
export default SigninSignupButtons