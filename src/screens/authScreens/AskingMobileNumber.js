import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors'
import BackgroundImage from '../../components/authComponents/BackgroundImage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomStatusBar from '../../components/CustomStatusBar'
width = Dimensions.get('screen').width
height = Dimensions.get('screen').height
const AskingMobileNumber = () => {
  const handleSubmit = () => {
    if (mobileNumber.length == 10) {
      console.log(mobileNumber)
    }
    else {
      alert('Please enter a valid mobile number')
    }
  }
  const [mobileNumber, setMobileNumber] = useState('')

  return (
    <>
      <CustomStatusBar />
      <BackgroundImage height='40%' />
      <View style={styles.background}>

        <View style={styles.container}>

          <Text style={styles.headingText}>Your Phone!</Text>

          <TextInput style={styles.textInput}
            placeholder='Enter Mobile Number'
            keyboardType='number-pad'
            value={mobileNumber}
            onChangeText={setMobileNumber}></TextInput>



          <Text style={styles.infoText}> A 4-digit OTP will be sent via SMS to verify your mobile number</Text>


          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default AskingMobileNumber

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: height / 3,
    borderRadius: 20,
    width: width - 100,
    backgroundColor: colors.secondaryBackground,
    padding: 30
  },
  headingText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500'
  },

  textInput: {
    marginTop: 30,
    width: width - 200,
    height: 40,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderRadius: 10,

  },
  infoText: {
    fontSize: 12,
    color: 'grey',
    marginTop: 30,
    textAlign: 'left'
  },
  button: {
    backgroundColor: colors.buttonColor,
    width: width - 300,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 30,

  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500'

  }
})