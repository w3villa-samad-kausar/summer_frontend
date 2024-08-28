import React, { useState, useRef } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback, Touchable } from 'react-native'
import CustomStatusBar from '../../components/CustomStatusBar'
import { useRoute } from '@react-navigation/native';
import { errorToastMessage, successToastMessage } from '../../utility/ToastMessage';
import colors from '../../assets/colors';
import { setStoredToken } from '../../utility/AuthToken';
import API from '../../helpers/api/ApiHelper';
import { useDispatch } from 'react-redux';
import { otpVerification, resendOtp } from '../../redux/reducers/AuthSlice';
import LoadingModal from '../../components/universalComponents/LoadingModal';

const OtpVerification = ({ navigation }) => {
  const dispatch = useDispatch()                       
  const route = useRoute()
  const [loading,setLoading]=useState(false)
  const mobileNumber = route.params
  const finalMobile = mobileNumber?.mobileNumber


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

  const handleSubmit = async () => {
    const finalOtp = otp.join('')
    setLoading(true)
    const data = {
      otp: finalOtp,
      mobileNumber: finalMobile
    }
    await dispatch(otpVerification(data))
    setLoading(false)
  }

  const handleResendOtp=async()=>{
    const data={
      mobileNumber:finalMobile
    }
    const action =await dispatch(resendOtp(data))
  }

  const isSubmitDisabled = otp.includes('')

  return (
    <>
      <CustomStatusBar />
      <View style={styles.container}>
        <Text style={styles.heading}>OTP Verification</Text>
        <Text style={styles.text}>We have sent a Verification code to</Text>
        <Text style={styles.number}>{finalMobile}</Text>
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
          style={[styles.button, { backgroundColor: isSubmitDisabled ? colors.primaryBackground : colors.buttonColor }]}
          onPress={handleSubmit}
          disabled={isSubmitDisabled}
        >
          <Text style={styles.buttonText}>Submit OTP</Text>
        </TouchableOpacity>
        <View>

          <Text style={styles.text}>
            Didn't receive the code?
          </Text>
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={styles.resendText}>Resend</Text>
            </TouchableOpacity>
            {loading && <LoadingModal isVisible={loading} />}

        </View>
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
    textAlign:"center",
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color:"black",
    fontSize: 20,
  },
})

export default OtpVerification
