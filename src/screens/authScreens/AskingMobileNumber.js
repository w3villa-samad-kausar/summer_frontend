import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors'
import BackgroundImage from '../../components/authComponents/BackgroundImage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomStatusBar from '../../components/CustomStatusBar'
import { useRoute } from '@react-navigation/native'
import API from '../../helpers/api/ApiHelper'
import { errorToastMessage, successToastMessage } from '../../utility/ToastMessage'
import LoadingModal from '../../components/universalComponents/LoadingModal'
width = Dimensions.get('screen').width
height = Dimensions.get('screen').height
const AskingMobileNumber = ({navigation}) => {
  const [loading,setLoading]=useState(false)
  const route=useRoute()
  const data=route.params
  const email=data?.email
  const [mobileNumber, setMobileNumber] = useState('')
  const handleSubmit = async() => {
    if (mobileNumber.length == 10) {
      setLoading(true)
      const data={
        mobileNumber:mobileNumber,
        email:email
      }
      try {
        const response = await API.post('/api/send-Otp',data)
        successToastMessage(response?.msg)
        
        navigation.navigate('OtpVerification', { mobileNumber: data.mobileNumber });        
      } 
      catch (error) {
        errorToastMessage(error?.response?.data?.msg)
        
      }
      finally{
        setLoading(false)
      }
    }
    else {
      alert('Please enter a valid mobile number')
    }
  }

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
          {loading && <LoadingModal isVisible={loading} />}

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