import React, { useState } from 'react'
import BackgroundImage from '../../components/authComponents/BackgroundImage'
import SigninSignupButtons from '../../components/authComponents/SigninSignupButtons'
import InputComponents from '../../components/authComponents/InputComponents'
import SubmitButton from '../../components/authComponents/SubmitButton'
import Icons from '../../components/authComponents/Icons'
import MainElementIsland from '../../components/authComponents/MainElementIsland'
import CustomScrollView from '../../components/authComponents/CustomScrollView'
import OrComponent from '../../components/authComponents/OrComponent'
import CustomStatusBar from '../../components/CustomStatusBar'
import SigninSignupToggler from '../../components/authComponents/SigninSignupToggler'

const SignupScreen = ({ navigation }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSignUp = () => {
    console.log(name, email, number, password, confirmPassword);
    navigation.navigate('OtpVerification')
  }

  return (
    <>
      <BackgroundImage height='50%' />
      <CustomStatusBar />
      <CustomScrollView >
        <MainElementIsland screenType="signup" marginTop={80} height={700} >
          <SigninSignupButtons
            activeButton='signup' />
          <InputComponents
            hasMarginTop={false}
            label='Enter name'
            value={name}
            onChangeText={setName} />

          <InputComponents
            hasMarginTop={true}
            label='Enter email'
            value={email}
            onChangeText={setEmail}
          />

          <InputComponents
            hasMarginTop={true}
            label='Enter phone number'
            keyboardType='numeric'
            value={number}
            onChangeText={setNumber}
          />

          <InputComponents
            hasMarginTop={true}
            label='Enter password'
            isSecureText={true}
            value={password}
            onChangeText={setPassword}
          />

          <InputComponents
            hasMarginTop={true}
            label='Confirm password'
            isSecureText={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <SubmitButton 
          label="Sign Up" 
          onPress={handleSignUp} />
          
          <SigninSignupToggler
            question="Already have an account?"
            button=" Sign In"
            onPress={() => { navigation.navigate('SignIn') }}
          />
          <OrComponent />
          <Icons />

        </MainElementIsland>
      </CustomScrollView>
    </>
  )
}


export default SignupScreen
