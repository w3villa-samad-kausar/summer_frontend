import React, { useState, useRef } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import CustomStatusBar from '../../components/CustomStatusBar'

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', ''])

  const inputRefs = useRef([])

  const handleChangeText = (text, index) => {
    const newOtp = [...otp]
    newOtp[index] = text
    setOtp(newOtp)

    // Move to next input if a number is entered
    if (text && index < 3) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleSubmit = () => {
    const finalOtp = otp.join('')
    console.log(finalOtp) // Here you can check if the OTP is correct
  }

  const isSubmitDisabled = otp.includes('')

  return (
    <>
      <CustomStatusBar />
      <View style={styles.container}>
        <Text style={styles.heading}>OTP Verification</Text>
        <Text style={styles.text}>We have sent a Verification code to</Text>
        <Text style={styles.number}>+91 1234567890</Text>
        <View style={styles.inputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[styles.digit, { borderColor: digit.length === 1 ? 'blue' : '#000' }]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isSubmitDisabled ? 'gray' : '#000' }]}
          onPress={handleSubmit}
          disabled={isSubmitDisabled}
        >
          <Text style={styles.buttonText}>Submit OTP</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          Didn't receive the code?<Text style={styles.resendText}> Resend</Text>
        </Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 80,
  },
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginTop: 60,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  digit: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    width: 70,
    fontSize: 26,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
})

export default OtpVerification
