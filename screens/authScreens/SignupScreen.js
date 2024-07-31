import React from 'react'
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
  return (
    <>
      <BackgroundImage height='50%' />
      <CustomStatusBar />
      <CustomScrollView >
        <MainElementIsland screenType="signup" marginTop={80} height={700} >
          <SigninSignupButtons
            activeButton='signup' />
          <InputComponents hasMarginTop={false} label='Enter name' />
          <InputComponents hasMarginTop={true} label='Enter email' />
          <InputComponents hasMarginTop={true} label='Enter phone number' keyboardType='numeric' />
          <InputComponents hasMarginTop={true} label='Enter password' isSecureText={true} />
          <InputComponents hasMarginTop={true} label='Confirm password' isSecureText={true} />
          <SubmitButton label="Sign Up" onPress={() => { navigation.navigate('OtpVerification') }} />
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
